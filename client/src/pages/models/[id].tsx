import { useParams } from 'react-router-dom';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function EditModelPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className='space-y-6 max-w-xl'>
      <PageHeader title={`Edit Model Config: ${id}`} />
      <Card>
        <CardHeader><CardTitle>Configuration Settings</CardTitle></CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>Edit parameters or set as default.</p>
        </CardContent>
      </Card>
    </div>
  );
}
