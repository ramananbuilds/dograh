import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Cpu, ShieldAlert } from 'lucide-react';

export function ModelPicker() {
  const [model, setModel] = useState('gpt-4o-mini');
  const [temperature, setTemperature] = useState(0.6);
  const [enableFallback, setEnableFallback] = useState(true);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Cpu className="h-4 w-4 text-primary" />
            Language Model (LLM)
          </CardTitle>
          <span className="text-xs text-muted-foreground font-mono">Stream: Active</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Model Selection */}
        <div className="space-y-1.5">
          <Label className="text-xs">Reasoning Model</Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4o-mini">OpenAI GPT-4o Mini (Fastest / Recommended)</SelectItem>
              <SelectItem value="gpt-4o">OpenAI GPT-4o (Complex Tasks)</SelectItem>
              <SelectItem value="claude-3-5-sonnet">Anthropic Claude 3.5 Sonnet</SelectItem>
              <SelectItem value="gemini-2.0-flash">Google Gemini 2.0 Flash</SelectItem>
              <SelectItem value="grok-beta">xAI Grok Beta</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Temperature Tuning */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <Label className="text-xs">Temperature: {temperature}</Label>
            <span className="text-[10px] text-muted-foreground">Deterministic ↔ Creative</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-primary h-1.5 bg-muted rounded cursor-pointer"
          />
        </div>

        {/* Fallback Resilience */}
        <div className="flex items-center justify-between pt-2 border-t text-xs">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1 font-medium">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
              <span>Multi-Provider Fallback</span>
            </div>
            <div className="text-[11px] text-muted-foreground">
              Auto-failsafe to Claude / Gemini on timeout
            </div>
          </div>
          <Switch checked={enableFallback} onCheckedChange={setEnableFallback} />
        </div>
      </CardContent>
    </Card>
  );
}
