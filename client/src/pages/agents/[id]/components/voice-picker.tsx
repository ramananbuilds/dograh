import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, Sparkles } from 'lucide-react';

interface VoiceOption {
  id: string;
  name: string;
  gender: string;
  accent: string;
  description: string;
  previewUrl: string;
}

const ELEVENLABS_VOICES: VoiceOption[] = [
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', gender: 'Female', accent: 'American', description: 'Calm, confident, natural customer support voice', previewUrl: '' },
  { id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi', gender: 'Female', accent: 'American', description: 'Strong, energetic, conversational', previewUrl: '' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella', gender: 'Female', accent: 'American', description: 'Warm, engaging, narrative', previewUrl: '' },
  { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni', gender: 'Male', accent: 'American', description: 'Professional, articulate, well-paced', previewUrl: '' },
  { id: 'VR6AewLTigWG4xSOukaG', name: 'Josh', gender: 'Male', accent: 'American', description: 'Deep, conversational, friendly', previewUrl: '' },
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', gender: 'Male', accent: 'American', description: 'Deep, clear, trustworthy voice', previewUrl: '' },
];

export function VoicePicker() {
  const [provider, setProvider] = useState('elevenlabs');
  const [selectedVoice, setSelectedVoice] = useState('21m00Tcm4TlvDq8ikWAM');
  const [isPlaying, setIsPlaying] = useState(false);
  const [stability, setStability] = useState(0.5);
  const [similarity, setSimilarity] = useState(0.75);
  const [speed, setSpeed] = useState(1.0);

  const togglePreview = () => {
    setIsPlaying(!isPlaying);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-primary" />
            Voice Engine (TTS)
          </CardTitle>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">
            Ultra-Low Latency
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Provider selector */}
        <div className="space-y-1.5">
          <Label className="text-xs">TTS Voice Provider</Label>
          <Select value={provider} onValueChange={setProvider}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="elevenlabs">ElevenLabs (Turbo v2.5)</SelectItem>
              <SelectItem value="cartesia">Cartesia (Sonic Engine)</SelectItem>
              <SelectItem value="deepgram">Deepgram Aura</SelectItem>
              <SelectItem value="murf">Murf AI</SelectItem>
              <SelectItem value="sarvam">Sarvam AI (Indic)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Voice choice with play button */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Voice Character</Label>
            <span className="text-[11px] text-muted-foreground">Preview audio</span>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedVoice} onValueChange={setSelectedVoice}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ELEVENLABS_VOICES.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.name} ({v.gender}, {v.accent})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-9 w-9 shrink-0"
              onClick={togglePreview}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 text-primary animate-pulse" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* ElevenLabs Specific Tuning Sliders */}
        {provider === 'elevenlabs' && (
          <div className="space-y-3 pt-2 border-t">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Voice Stability & Delivery Tuning</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Stability: {stability}</span>
                <span className="text-[10px] text-muted-foreground">More expressive ↔ More consistent</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={stability}
                onChange={(e) => setStability(parseFloat(e.target.value))}
                className="w-full accent-primary h-1.5 bg-muted rounded cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Similarity / Clarity: {similarity}</span>
                <span className="text-[10px] text-muted-foreground">Artifact reduction</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={similarity}
                onChange={(e) => setSimilarity(parseFloat(e.target.value))}
                className="w-full accent-primary h-1.5 bg-muted rounded cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Speaking Pace: {speed}x</span>
                <span className="text-[10px] text-muted-foreground">0.7x ↔ 1.3x</span>
              </div>
              <input
                type="range"
                min="0.7"
                max="1.3"
                step="0.05"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-primary h-1.5 bg-muted rounded cursor-pointer"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
