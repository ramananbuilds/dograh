# Dograh Client Console (SPA)

A modern, standalone client-side React SPA for managing Dograh AI voice agents, outbound campaigns, analytics, provider connections, and developer API keys. Inspired by the ElevenLabs console experience.

## Architecture

- **Zero SSR**: Pure client-side single-page app (Vite + React 19).
- **Direct API**: Connects directly to Dograh backend REST endpoints (`/api/v1/*`) using JWT bearer tokens or `X-API-Key`.
- **Auto-generated SDK**: Typed API operations generated from Dograh's OpenAPI spec using `@hey-api/openapi-ts`.

## Getting Started

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default:
```env
VITE_BACKEND_URL=http://localhost:8000
```

### 3. Generate Typed API Client
When your Dograh backend is running on `http://localhost:8000`:
```bash
npm run generate-client
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
```
Outputs static assets into `dist/`. Deploy to any static host (Vercel, Netlify, Cloudflare Pages, S3, or Nginx).

## Folder Structure

```
client/
├── src/
│   ├── api/             # API client config & generated SDK
│   ├── hooks/           # TanStack Query hooks for every Dograh domain
│   ├── stores/          # Zustand stores (Auth, Theme, Sidebar)
│   ├── types/           # Domain TypeScript definitions
│   ├── lib/             # Shared formatters & query client setup
│   ├── components/
│   │   ├── ui/          # Radix & Tailwind UI primitives
│   │   ├── layout/      # App shell (Sidebar, Topbar, Nav)
│   │   └── shared/      # MetricCards, StatusBadges, AudioPlayer, etc.
│   └── pages/           # Route views (Dashboard, Agents, Campaigns, etc.)
```

