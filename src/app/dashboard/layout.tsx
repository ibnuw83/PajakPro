'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Home,
  PanelLeft,
  Settings,
  LogOut,
  Table,
  Calculator,
  ClipboardList,
  BookText,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getSettings, type AppSettings } from '@/data/settings';
import Image from 'next/image';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [settings, setSettings] = useState<AppSettings | null>(null);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Beranda' },
    { href: '/dashboard/tax-data', icon: Table, label: 'Data Pajak' },
    { href: '/dashboard/transaction-types', icon: ClipboardList, label: 'Jenis Transaksi' },
    { href: '/dashboard/info-content', icon: BookText, label: 'Konten Informasi'},
    { href: '/dashboard/settings', icon: Settings, label: 'Pengaturan'},
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
        <div className="flex flex-col gap-2 p-4">
            <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary">
                {settings?.logoUrl ? (
                    <Image src={settings.logoUrl} alt="Logo" width={24} height={24} className="h-6 w-6 object-contain" />
                ) : (
                    <Calculator className="h-6 w-6" />
                )}
                <span className="text-xl font-bold">{settings?.title || 'PajakPro'}</span>
            </Link>
        </div>
        <nav className="flex flex-col gap-1 p-4 pt-0">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === item.href && "bg-muted text-primary"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto p-4">
             <Button variant="outline" className="w-full" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Keluar
            </Button>
        </div>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  {settings?.logoUrl ? (
                      <Image src={settings.logoUrl} alt="Logo" width={20} height={20} className="h-5 w-5 object-contain transition-all group-hover:scale-110" />
                  ) : (
                      <Calculator className="h-5 w-5 transition-all group-hover:scale-110" />
                  )}
                  <span className="sr-only">{settings?.title || 'PajakPro'}</span>
                </Link>
                {navItems.map((item) => (
                    <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                        pathname === item.href && "text-foreground"
                    )}
                    >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                    </Link>
                ))}
                 <Link
                    href="#"
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                    <LogOut className="h-5 w-5" />
                    Keluar
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
           <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="icon" className="hidden sm:inline-flex" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 sm:pt-0">{children}</main>
      </div>
    </div>
  );
}
