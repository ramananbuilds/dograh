import { WorkflowRun } from '@/types/run';
import { StatusBadge } from '@/components/shared/status-badge';

export function RunRow({ run }: { run: WorkflowRun }) {
  return (
    <div className='flex items-center justify-between p-3 border-b'>
      <span className='font-mono text-xs'>{run.id}</span>
      <StatusBadge status={run.status} />
    </div>
  );
}
