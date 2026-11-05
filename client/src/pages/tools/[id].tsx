import { useParams } from 'react-router-dom';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function ToolDetailPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className='space-y-6 max-w-2xl'>
      <PageHeader title={`Tool Editor: ${id}`} description='Configure parameters and HTTP test payloads.' />
      <Card>
        <CardHeader><CardTitle>Tool Definition</CardTitle></CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>Tool endpoint definition and JSON schema.</p>
        </CardContent>
      </Card>
    </div>
  );
}
