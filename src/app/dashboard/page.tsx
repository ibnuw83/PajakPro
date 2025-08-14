'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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


  if (!isAuthenticated) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Mengarahkan ke halaman login...</p>
        </div>
    );
  }

  return (
    <div>
        <div className="mb-6">
            <h1 className="text-3xl font-bold">Dasbor Admin</h1>
            <p className="text-muted-foreground">Selamat datang! Kelola data aplikasi Anda di sini.</p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Ringkasan</CardTitle>
                <CardDescription>
                    Gunakan menu navigasi di sebelah kiri untuk mengelola data pajak atau pengaturan lainnya.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Saat ini Anda dapat melihat dan mengelola data aturan pajak.</p>
            </CardContent>
        </Card>
    </div>
  );
}
