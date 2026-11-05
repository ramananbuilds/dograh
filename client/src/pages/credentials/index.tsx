import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useCredentials } from '@/hooks/use-credentials';
import { Plus, ShieldCheck } from 'lucide-react';

export default function CredentialsPage() {
  const { data: creds = [] } = useCredentials();

  return (
    <div className='space-y-6'>
      <PageHeader title='Webhook Credentials' description='Manage auth tokens and headers for external webhooks.'>
        <Button className='gap-2'><Plus className='h-4 w-4' /> Add Credential</Button>
      </PageHeader>
      <Card>
        <CardHeader><CardTitle>Configured Credentials ({creds.length})</CardTitle></CardHeader>
        <CardContent>
          <div className='flex flex-col items-center justify-center p-8 text-center text-muted-foreground'>
            <ShieldCheck className='h-8 w-8 mb-2' />
            <p className='text-sm'>No webhook credentials stored.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
