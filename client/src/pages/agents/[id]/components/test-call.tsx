import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Phone, Mic, MicOff, PhoneOff, Radio } from 'lucide-react';

export function TestCall({ agentId: _agentId }: { agentId: string }) {
  const [activeTab, setActiveTab] = useState<'browser' | 'phone'>('browser');
  const [isCalling, setIsCalling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 234-5678');
  const [callDuration, setCallDuration] = useState(0);

  const toggleCall = () => {
    if (isCalling) {
      setIsCalling(false);
      setCallDuration(0);
    } else {
      setIsCalling(true);
      const timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
      setTimeout(() => clearInterval(timer), 60000);
    }
  };

  return (
    <Card className="border-primary/20 bg-card/60 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Radio className="h-4 w-4 text-primary animate-pulse" />
            Live Voice Simulator
          </CardTitle>
          <div className="flex bg-muted rounded p-0.5 text-xs">
            <button
              onClick={() => setActiveTab('browser')}
              className={`px-2 py-0.5 rounded transition-all ${
                activeTab === 'browser' ? 'bg-background shadow font-semibold' : 'text-muted-foreground'
              }`}
            >
              Browser
            </button>
            <button
              onClick={() => setActiveTab('phone')}
              className={`px-2 py-0.5 rounded transition-all ${
                activeTab === 'phone' ? 'bg-background shadow font-semibold' : 'text-muted-foreground'
              }`}
            >
              Phone
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeTab === 'browser' ? (
          <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed bg-muted/40 text-center space-y-3">
            {isCalling ? (
              <>
                <div className="flex items-center gap-1.5 h-10">
                  <span className="w-1.5 h-6 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-10 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-8 bg-primary rounded-full animate-bounce" />
                  <span className="w-1.5 h-12 bg-primary rounded-full animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1.5 h-5 bg-primary rounded-full animate-bounce [animation-delay:0.3s]" />
                </div>
                <div className="text-xs font-mono text-emerald-600 font-semibold">
                  Connected: 0:{callDuration < 10 ? `0${callDuration}` : callDuration}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 gap-1.5 text-xs"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <MicOff className="h-3.5 w-3.5 text-destructive" /> : <Mic className="h-3.5 w-3.5" />}
                    {isMuted ? 'Muted' : 'Mute'}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-8 gap-1.5 text-xs"
                    onClick={toggleCall}
                  >
                    <PhoneOff className="h-3.5 w-3.5" />
                    Hang Up
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <Mic className="h-6 w-6" />
                </div>
                <div className="text-xs text-muted-foreground">
                  Test conversational latency & interruptions directly in your browser.
                </div>
                <Button className="w-full gap-2" size="sm" onClick={toggleCall}>
                  <Mic className="h-4 w-4" />
                  Start Web Call
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Destination Phone Number</span>
              <Input
                placeholder="+1 (555) 000-0000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-xs font-mono"
              />
            </div>
            <Button className="w-full gap-2" size="sm" onClick={toggleCall}>
              <Phone className="h-4 w-4" />
              Dial Test Call
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
