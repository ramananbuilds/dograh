import { useParams } from 'react-router-dom';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function EditConnectionPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className='space-y-6 max-w-xl'>
      <PageHeader title={`Edit Connection: ${id}`} />
      <Card>
        <CardHeader><CardTitle>Manage Credentials</CardTitle></CardHeader>
        <CardContent className='space-y-4'>
          <p className='text-sm text-muted-foreground'>Configure provider authentication parameters.</p>
          <Button variant='destructive'>Delete Connection</Button>
        </CardContent>
      </Card>
    </div>
  );
}
