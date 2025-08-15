'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getSettings } from '@/data/settings';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Image from 'next/image';

const settingsSchema = z.object({
  title: z.string(),
  description: z.string(),
  logoUrl: z.string(),
  footerText: z.string(),
});

export default function SettingsPage() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
        title: '',
        description: '',
        logoUrl: '',
        footerText: ''
    },
  });

  useEffect(() => {
    const settings = getSettings();
    form.reset(settings);
    if (settings.logoUrl) {
      setLogoPreview(settings.logoUrl);
    }
  }, [form]);

  return (
    <div>
        <div className="mb-6">
            <h1 className="text-3xl font-bold">Pengaturan Aplikasi</h1>
            <p className="text-muted-foreground">Konfigurasi berikut diambil dari `src/data/settings.json`. Untuk mengubahnya, silakan edit file tersebut secara langsung.</p>
        </div>
        <Form {...form}>
            <form className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Informasi Umum</CardTitle>
                    <CardDescription>Atur judul, deskripsi, dan logo aplikasi Anda.</CardDescription>
                </Header>
                <CardContent className="space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Judul Aplikasi</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Contoh: PajakPro" disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Deskripsi Aplikasi</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Contoh: Asisten Pajak Cerdas Anda" disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormItem>
                        <FormLabel>Logo Aplikasi</FormLabel>
                         {logoPreview && (
                            <div className="mt-2">
                                <Image src={logoPreview} alt="Logo Preview" width={80} height={80} className="rounded-md object-contain border p-2" />
                            </div>
                        )}
                         <FormControl>
                           <Input type="file" accept="image/*" className="mt-2" disabled />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Footer</CardTitle>
                    <CardDescription>Atur teks yang ditampilkan di bagian bawah halaman.</CardDescription>
                </Header>
                <CardContent>
                     <FormField
                        control={form.control}
                        name="footerText"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Teks Footer</FormLabel>
                                <FormControl>
                                    <Textarea {...field} disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>
            </form>
        </Form>
    </div>
  );
}
