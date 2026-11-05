import { useParams } from 'react-router-dom';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function TelephonyDetailPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className='space-y-6 max-w-xl'>
      <PageHeader title={`Telephony Trunk: ${id}`} description='Manage inbound phone numbers and SIP credentials.' />
      <Card>
        <CardHeader><CardTitle>Assigned Numbers</CardTitle></CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>No numbers bound to this configuration.</p>
        </CardContent>
      </Card>
    </div>
  );
}
