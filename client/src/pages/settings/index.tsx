import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useOrganization } from '@/hooks/use-organization';

export default function SettingsPage() {
  const { context, preferences } = useOrganization();

  return (
    <div className='space-y-6 max-w-2xl'>
      <PageHeader title='Organization Settings' description='General preferences, default providers, and webhooks.' />
      <Card>
        <CardHeader><CardTitle>Organization Info</CardTitle></CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label>Organization Name</Label>
            <Input defaultValue={context?.name || 'Default Organization'} />
          </div>
          <div className='space-y-2'>
            <Label>Timezone</Label>
            <Input defaultValue={preferences?.default_timezone || 'UTC'} />
          </div>
          <Button>Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
