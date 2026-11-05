import { defineConfig } from '@hey-api/openapi-ts';

const backendUrl = (process.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '');

export default defineConfig({
  input: `${backendUrl}/api/v1/openapi.json`,
  output: 'src/api/generated',
  plugins: [
    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: './src/api/client',
    },
  ],
});

