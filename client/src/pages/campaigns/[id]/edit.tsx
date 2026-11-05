import { useParams } from 'react-router-dom';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function EditCampaignPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className='space-y-6 max-w-2xl'>
      <PageHeader title={`Edit Campaign: ${id}`} description='Adjust pacing, concurrency, and retry rules.' />
      <Card>
        <CardHeader>
          <CardTitle>Pacing Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>Configure max concurrent calls.</p>
        </CardContent>
      </Card>
    </div>
  );
}
