import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className='flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-lg bg-card/50'>
      <div className='p-3 bg-muted rounded-full mb-4'>
        <Icon className='h-8 w-8 text-muted-foreground' />
      </div>
      <h3 className='text-lg font-semibold'>{title}</h3>
      <p className='text-sm text-muted-foreground max-w-sm mt-1 mb-4'>{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
