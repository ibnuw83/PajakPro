'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Calculator, LogIn } from 'lucide-react';
import { getSettings, type AppSettings } from '@/data/settings';


export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<AppSettings | null>(null);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication
    setTimeout(() => {
      if (email === 'admin@pajakpro.com' && password === 'password') {
        // In a real app, you'd set a token in localStorage or a cookie
        localStorage.setItem('user', 'authenticated');
        router.push('/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Gagal',
          description: 'Email atau password salah. Silakan coba lagi.',
        });
      }
      setIsLoading(false);
    }, 1000);
  };
  
  if (!settings) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
       <div className="absolute top-4 left-4 flex items-center gap-3">
         <div className="bg-primary text-primary-foreground p-2 rounded-lg">
          {settings.logoUrl ? <img src={settings.logoUrl} alt="Logo" className="h-6 w-6" /> : <Calculator className="h-6 w-6" />}
         </div>
         <div>
           <h1 className="text-2xl font-bold font-headline text-primary">{settings.title}</h1>
           <p className="text-sm text-muted-foreground">{settings.description}</p>
         </div>
       </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Masuk ke akun Anda untuk mengakses pengaturan</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@pajakpro.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Loading...' : <><LogIn className="mr-2 h-4 w-4" /> Masuk</>}
            </Button>
          </form>
        </CardContent>
      </Card>
        <p className="text-center text-sm text-muted-foreground mt-4">
            Lanjutkan ke <a href="/" className="underline">Kalkulator Pajak</a>
        </p>
    </div>
  );
}
