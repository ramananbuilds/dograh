import { Badge } from '@/components/ui/badge';

export function StatusBadge({ status }: { status: string }) {
  switch (status?.toLowerCase()) {
    case 'active':
      return <Badge variant='default' className='bg-emerald-600 hover:bg-emerald-700 capitalize'>Active</Badge>;
    case 'running':
      // In-flight reads as active/cyan so it never looks identical to a finished run.
      return <Badge variant='outline' className='border-brand/40 bg-brand/10 text-brand capitalize'>{status}</Badge>;
    case 'completed':
      return <Badge variant='default' className='bg-emerald-600 hover:bg-emerald-700 capitalize'>Completed</Badge>;
    case 'draft':
      return <Badge variant='secondary' className='capitalize'>Draft</Badge>;
    case 'paused':
      return <Badge variant='secondary' className='capitalize'>Paused</Badge>;
    case 'failed':
      return <Badge variant='destructive' className='capitalize'>Failed</Badge>;
    case 'archived':
      return <Badge variant='destructive' className='capitalize'>Archived</Badge>;
    default:
      return <Badge variant='outline' className='capitalize'>{status || 'Unknown'}</Badge>;
  }
}
