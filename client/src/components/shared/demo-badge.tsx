import { FlaskConical } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Marks a surface whose values are illustrative fixtures rather than live data.
 * Render it anywhere the console shows numbers it cannot currently source.
 */
export function DemoBadge({ className, label = 'Demo data' }: { className?: string; label?: string }) {
  return (
    <span
      title='Illustrative values — no backend is connected'
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-300',
        className
      )}
    >
      <FlaskConical className='h-2.5 w-2.5' aria-hidden='true' />
      {label}
    </span>
  );
}