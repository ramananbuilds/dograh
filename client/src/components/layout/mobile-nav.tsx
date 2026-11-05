import { SidebarNav } from './sidebar-nav';

export function MobileNav() {
  return (
    <div className="md:hidden border-t border-border bg-card p-4">
      <SidebarNav />
    </div>
  );
}
