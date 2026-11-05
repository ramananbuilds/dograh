import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function NewModelPage() {
  return (
    <div className='space-y-6 max-w-xl'>
      <PageHeader title='New Model Configuration' description='Register a named LLM preset with parameters.' />
      <Card>
        <CardHeader><CardTitle>Model Parameters</CardTitle></CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label>Configuration Name</Label>
            <Input placeholder='e.g., Fast Reasoning' />
          </div>
          <div className='space-y-2'>
            <Label>Model ID</Label>
            <Input placeholder='gpt-4o-mini' />
          </div>
          <Button className='w-full'>Save Configuration</Button>
        </CardContent>
      </Card>
    </div>
  );
}
