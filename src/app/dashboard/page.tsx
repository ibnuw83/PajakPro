'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, LogOut, Calculator } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user === 'authenticated') {
      setIsAuthenticated(true);
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!isAuthenticated) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Mengarahkan ke halaman login...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header className="p-4 border-b bg-card shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                        <LayoutDashboard className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold font-headline text-primary">
                        Dasbor Pengaturan
                        </h1>
                        <p className="text-sm text-muted-foreground">Kelola pengaturan aplikasi Anda</p>
                    </div>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Keluar
                </Button>
            </div>
      </header>
       <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Selamat Datang!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Ini adalah halaman dasbor Anda. Pengaturan menu akan tersedia di sini.</p>
                </CardContent>
            </Card>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} PajakPro.
      </footer>
    </div>
  );
}
