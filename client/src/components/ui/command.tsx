import * as React from 'react';
import { cn } from '@/lib/utils';

export function Command({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground', className)} {...props} />;
}
