import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup({ email, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center p-4 bg-muted/30'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1 text-center'>
          <CardTitle className='text-2xl font-bold'>Create an account</CardTitle>
          <CardDescription>Get started building conversational AI voice agents</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            {error && <div className='text-sm text-destructive font-medium'>{error}</div>}
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='name@example.com'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type='submit' className='w-full'>Create Account</Button>
            <div className='text-center text-sm text-muted-foreground'>
              Already have an account?{' '}
              <Link to='/login' className='text-primary hover:underline'>Log in</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
