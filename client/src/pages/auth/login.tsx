import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('demo@dograh.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  const handleDemoClick = () => {
    loginAsDemo();
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[#090a0c] text-zinc-100 relative overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md bg-[#111215]/90 border-zinc-800/90 shadow-2xl backdrop-blur-xl rounded-2xl relative z-10">
        <CardHeader className="space-y-2 text-center pb-6">
          {/* ElevenLabs Soundmark */}
          <div className="flex justify-center pb-2">
            <div className="flex items-center gap-1.5 h-10 px-3 bg-white/[0.08] border border-white/[0.1] rounded-xl shadow-inner">
              <span className="w-1 h-3.5 bg-white rounded-full animate-pulse" />
              <span className="w-1 h-6 bg-white rounded-full animate-pulse [animation-delay:0.15s]" />
              <span className="w-1 h-4.5 bg-white rounded-full animate-pulse [animation-delay:0.3s]" />
            </div>
          </div>
          <CardTitle className="text-xl font-bold tracking-tight text-white">
            Dograh Voice Console
          </CardTitle>
          <CardDescription className="text-xs text-zinc-400">
            Conversational AI voice platform with telephony and WebRTC support
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button
            type="button"
            className="w-full bg-white text-zinc-950 hover:bg-zinc-200 font-semibold gap-2 rounded-xl py-5 shadow-sm text-xs transition-transform active:scale-[0.99]"
            onClick={handleDemoClick}
          >
            <Sparkles className="h-4 w-4 text-indigo-600" />
            Explore in Demo Mode (No Backend)
            <ArrowRight className="h-3.5 w-3.5 ml-auto text-zinc-600" />
          </Button>

          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-[#111215] px-2 text-zinc-500 font-semibold tracking-wider">
                Or sign in with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {error && (
              <div className="text-xs text-rose-400 font-medium bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-lg">
                {error}
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs text-zinc-300">
                Work Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-900/90 border-zinc-800 text-xs rounded-xl focus-visible:ring-indigo-500 text-white placeholder:text-zinc-600"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs text-zinc-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-900/90 border-zinc-800 text-xs rounded-xl focus-visible:ring-indigo-500 text-white"
              />
            </div>
            <Button
              type="submit"
              variant="outline"
              className="w-full bg-zinc-900 border-zinc-800 hover:bg-zinc-850 hover:text-white text-zinc-200 text-xs rounded-xl py-4 mt-2"
            >
              Sign In to Console
            </Button>
            <div className="text-center text-xs text-zinc-500 pt-2">
              Don't have an account?{' '}
              <Link to="/signup" className="text-zinc-300 hover:text-white underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
