import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';

export function UserMenu() {
  const { user, logout } = useAuthStore();
  const initial = user?.email ? user.email.charAt(0).toUpperCase() : 'O';

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
        <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-semibold text-[10px] flex items-center justify-center">
          {initial}
        </div>
        <span className="font-medium text-zinc-300 max-w-[120px] truncate">
          {user?.email || 'Operator'}
        </span>
      </div>

      <button
        onClick={logout}
        title="Sign out"
        className="p-1.5 rounded-lg hover:bg-rose-500/10 text-zinc-400 hover:text-rose-400 transition-colors"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}
