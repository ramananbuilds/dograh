import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function NewConnectionPage() {
  return (
    <div className='space-y-6 max-w-xl'>
      <PageHeader title='Add Provider Connection' description='Configure BYOK API credentials for an AI provider.' />
      <Card>
        <CardHeader><CardTitle>Connection Details</CardTitle></CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label>Provider</Label>
            <Select defaultValue='openai'>
              <SelectTrigger><SelectValue placeholder='Select provider' /></SelectTrigger>
              <SelectContent>
                <SelectItem value='openai'>OpenAI</SelectItem>
                <SelectItem value='anthropic'>Anthropic</SelectItem>
                <SelectItem value='elevenlabs'>ElevenLabs</SelectItem>
                <SelectItem value='cartesia'>Cartesia</SelectItem>
                <SelectItem value='deepgram'>Deepgram</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2'>
            <Label>API Key</Label>
            <Input type='password' placeholder='sk-...' />
          </div>
          <Button className='w-full'>Save Connection</Button>
        </CardContent>
      </Card>
    </div>
  );
}
