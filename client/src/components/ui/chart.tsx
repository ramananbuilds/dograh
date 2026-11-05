import * as React from 'react';
import { ResponsiveContainer } from 'recharts';

export function ChartContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width='100%' height='100%'>
        {children as React.ReactElement}
      </ResponsiveContainer>
    </div>
  );
}
