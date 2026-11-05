import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles, MessageSquare, Plus } from 'lucide-react';

const SUGGESTED_VARIABLES = [
  '{{customer_name}}',
  '{{caller_phone}}',
  '{{account_id}}',
  '{{appointment_time}}',
  '{{company_name}}',
];

export function PromptEditor() {
  const [greeting, setGreeting] = useState(
    'Hello! Thanks for calling. My name is Alex, your AI voice assistant. How may I help you today?'
  );
  const [prompt, setPrompt] = useState(
    `You are Alex, an intelligent and friendly voice assistant representing Dograh AI.
Your goals:
1. Greet the customer warmly and ask how you can assist them today.
2. Answer inquiries concisely (1-2 sentences per conversational turn) because you are speaking over voice.
3. If the user asks to speak with a human agent, call the transfer_call tool.
4. If the call reaches a natural conclusion, call the end_call tool after wishing them well.

Tone & Style:
- Warm, polite, articulate, and conversational.
- Never use markdown syntax, asterisks, bullet points, or emojis, as your text will be read aloud by TTS.
- Acknowledge what the user says with brief affirmatives like "Got it," "Understood," or "Sure thing."`
  );

  const insertVariable = (v: string) => {
    setPrompt((prev) => `${prev} ${v}`);
  };

  return (
    <div className="space-y-6">
      {/* First Message Greeting */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Opening Greeting (First Spoken Turn)
            </CardTitle>
            <span className="text-xs text-muted-foreground">Immediate speech</span>
          </div>
          <CardDescription>
            The exact sentence the voice agent will speak as soon as the call connects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
            className="text-sm font-medium"
            placeholder="e.g. Hi there! Thanks for calling..."
          />
        </CardContent>
      </Card>

      {/* Main Persona & Instructions */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              System Prompt & Instructions
            </CardTitle>
            <span className="text-xs font-mono text-muted-foreground">
              {prompt.length} characters
            </span>
          </div>
          <CardDescription>
            Define the persona, conversational guardrails, domain knowledge, and tool calling policies.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Variable Insert Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-muted-foreground mr-1">Insert Variable:</span>
            {SUGGESTED_VARIABLES.map((v) => (
              <Badge
                key={v}
                variant="outline"
                className="cursor-pointer hover:bg-muted hover:border-primary transition-colors text-[11px] font-mono gap-1"
                onClick={() => insertVariable(v)}
              >
                <Plus className="h-2.5 w-2.5" />
                {v}
              </Badge>
            ))}
          </div>

          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Define the agent personality, objectives, instructions, and guardrails..."
            className="min-h-[280px] font-mono text-xs leading-relaxed resize-y"
          />
        </CardContent>
      </Card>
    </div>
  );
}
