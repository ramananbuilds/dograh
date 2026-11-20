/**
 * The console runs standalone (Vite + React) with no guaranteed backend.
 * When `VITE_BACKEND_URL` is unreachable, every data surface falls back to
 * illustrative fixtures. Surfacing that honestly is the difference between a
 * demo and a lie: nothing here should read as a live production metric.
 */
export const IS_DEMO_MODE = true;

export const DEMO_LABEL = 'Demo data';