import { Badge } from '@/components/ui/badge';

export function StatusBadge({ status }: { status: string }) {
  switch (status?.toLowerCase()) {
    case 'active':
    case 'completed':
    case 'running':
      return <Badge variant='default' className='bg-green-600 hover:bg-green-700'>{status}</Badge>;
    case 'draft':
    case 'paused':
      return <Badge variant='secondary'>{status}</Badge>;
    case 'failed':
    case 'archived':
      return <Badge variant='destructive'>{status}</Badge>;
    default:
      return <Badge variant='outline'>{status || 'Unknown'}</Badge>;
  }
}
