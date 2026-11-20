import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

export function AppLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar is desktop-only; below md it becomes the drawer below. */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile navigation drawer */}
      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
            aria-hidden="true"
          />
          <div className="relative flex h-full w-64 max-w-[80vw]">
            <Sidebar />
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              title="Close navigation"
              aria-label="Close navigation"
              className="absolute top-4 -right-10 p-2 rounded-lg bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col h-screen min-w-0 overflow-hidden">
        <Topbar onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
}