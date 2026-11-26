#!/usr/bin/env bash
# Auto-deploy watcher for the Dograh stack.
#
# Polls origin/deploy; when the remote SHA differs from the local checkout,
# fetches, hard-resets to it, updates the pipecat submodule, and rebuilds.
#
# Images and build cache land on the containerd disk (/var/lib/containerd,
# the 100G sdb) because Docker runs the containerd snapshotter. Named volumes
# stay on the root disk. This script does not change that.
#
# Locking: flock prevents overlapping runs while a build is in progress.

set -uo pipefail

REPO_DIR="$HOME/dograh/repo"
LOG_FILE="$HOME/dograh/auto-deploy.log"
LOCK_FILE="/tmp/dograh-autodeploy.lock"
BRANCH="deploy"

exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  echo "$(date -Is) another deploy is running; skipping" >> "$LOG_FILE"
  exit 0
fi

cd "$REPO_DIR" || { echo "$(date -Is) repo missing: $REPO_DIR" >> "$LOG_FILE"; exit 1; }

LOCAL_SHA=$(git rev-parse HEAD 2>/dev/null)
git fetch origin "$BRANCH" --quiet 2>>"$LOG_FILE" || {
  echo "$(date -Is) fetch failed" >> "$LOG_FILE"; exit 1; }
REMOTE_SHA=$(git rev-parse "origin/$BRANCH" 2>/dev/null)

if [ -z "$REMOTE_SHA" ] || [ "$LOCAL_SHA" = "$REMOTE_SHA" ]; then
  exit 0
fi

echo "$(date -Is) deploy: ${LOCAL_SHA:0:8} -> ${REMOTE_SHA:0:8}" >> "$LOG_FILE"

git reset --hard "origin/$BRANCH" >>"$LOG_FILE" 2>&1 || {
  echo "$(date -Is) reset failed" >> "$LOG_FILE"; exit 1; }
git submodule update --init --depth 1 >>"$LOG_FILE" 2>&1

COMPOSE="deploy/coolify/docker-compose.yaml"
ENV_FILE="deploy/coolify/.env"

if sudo docker compose -p dograh --env-file "$ENV_FILE" -f "$COMPOSE" up -d --build >>"$LOG_FILE" 2>&1; then
  echo "$(date -Is) deploy OK: ${REMOTE_SHA:0:8}" >> "$LOG_FILE"
else
  echo "$(date -Is) deploy FAILED at ${REMOTE_SHA:0:8} (see log above)" >> "$LOG_FILE"
  exit 1
fi

# Containers get new IPs on every recreate, and Coolify's Traefik docker
# provider does not discover these containers, so the file-provider route has
# to be rewritten with the current IPs or ingress breaks after a deploy.
write_route() {
  local api_ip minio_ip host
  host=$(grep -E '^PUBLIC_HOST=' "$ENV_FILE" | cut -d= -f2-)
  api_ip=$(sudo docker inspect dograh-api-1 \
    --format '{{range $k,$v := .NetworkSettings.Networks}}{{if eq $k "coolify"}}{{$v.IPAddress}}{{end}}{{end}}')
  minio_ip=$(sudo docker inspect minio \
    --format '{{range $k,$v := .NetworkSettings.Networks}}{{if eq $k "coolify"}}{{$v.IPAddress}}{{end}}{{end}}')

  if [ -z "$api_ip" ] || [ -z "$minio_ip" ]; then
    echo "$(date -Is) route NOT written: container missing from coolify network" >> "$LOG_FILE"
    return 1
  fi

  sudo tee /data/coolify/proxy/dynamic/dograh.yml >/dev/null <<EOF
http:
  routers:
    dograh-api:
      rule: "Host(\`$host\`) && PathPrefix(\`/api/v1\`)"
      entryPoints: [http]
      service: dograh-api-svc
      priority: 10
    dograh-audio:
      rule: "Host(\`$host\`) && PathPrefix(\`/voice-audio\`)"
      entryPoints: [http]
      service: dograh-audio-svc
      priority: 20
  services:
    dograh-api-svc:
      loadBalancer:
        servers:
          - url: "http://$api_ip:8000"
    dograh-audio-svc:
      loadBalancer:
        servers:
          - url: "http://$minio_ip:9000"
EOF
  echo "$(date -Is) route written: api=$api_ip minio=$minio_ip host=$host" >> "$LOG_FILE"
}

write_route

# Keep the log from growing without bound.
tail -n 2000 "$LOG_FILE" > "$LOG_FILE.tmp" && mv "$LOG_FILE.tmp" "$LOG_FILE"