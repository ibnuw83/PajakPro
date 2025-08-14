'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getSettings, updateSettings, type AppSettings } from '@/data/settings';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const settingsSchema = z.object({
  title: z.string().min(1, 'Judul harus diisi.'),
  description: z.string().min(1, 'Deskripsi harus diisi.'),
  logoUrl: z.string().url('URL logo tidak valid.').or(z.literal('')),
  footerText: z.string().min(1, 'Teks footer harus diisi.'),
});

export default function SettingsPage() {
  const { toast } = useToast();
  const [initialSettings, setInitialSettings] = useState<AppSettings>(getSettings());

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialSettings,
  });

  useEffect(() => {
    const settings = getSettings();
    setInitialSettings(settings);
    form.reset(settings);
  }, [form]);

  const onSubmit = (values: z.infer<typeof settingsSchema>) => {
    updateSettings(values);
    toast({
      title: 'Pengaturan disimpan!',
      description: 'Perubahan Anda telah berhasil disimpan.',
    });
    // Optionally, force a reload to see changes applied everywhere
    window.location.reload();
  };

  return (
    <div>
        <div className="mb-6">
            <h1 className="text-3xl font-bold">Pengaturan Aplikasi</h1>
            <p className="text-muted-foreground">Ubah tampilan dan nuansa aplikasi Anda dari sini.</p>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Informasi Umum</CardTitle>
                    <CardDescription>Atur judul, deskripsi, dan logo aplikasi Anda.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Judul Aplikasi</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Contoh: PajakPro" />
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
                                    <Input {...field} placeholder="Contoh: Asisten Pajak Cerdas Anda" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="logoUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>URL Logo</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="https://example.com/logo.png" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Footer</CardTitle>
                    <CardDescription>Atur teks yang ditampilkan di bagian bawah halaman. Gunakan {'{year}'} untuk menampilkan tahun saat ini.</CardDescription>
                </CardHeader>
                <CardContent>
                     <FormField
                        control={form.control}
                        name="footerText"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Teks Footer</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit">Simpan Perubahan</Button>
            </div>
            </form>
        </Form>
    </div>
  );
}
