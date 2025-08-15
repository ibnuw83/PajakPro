'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getInfoContentById, updateInfoContentById } from '@/data/info-content';
import { type InfoContentItem, type InfoContentSection } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, PlusCircle, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const sectionSchema = z.object({
  trigger: z.string().min(1, 'Judul bagian harus diisi.'),
  content: z.string().min(1, 'Konten bagian harus diisi.'),
  type: z.enum(['list', 'paragraph', 'table']),
});

const infoContentSchema = z.object({
  title: z.string().min(1, 'Judul harus diisi.'),
  description: z.string().min(1, 'Deskripsi harus diisi.'),
  sections: z.array(sectionSchema),
});


export default function EditInfoContentPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();

  const [infoItem, setInfoItem] = useState<InfoContentItem | null>(null);

  const form = useForm<z.infer<typeof infoContentSchema>>({
    resolver: zodResolver(infoContentSchema),
    defaultValues: {
      title: '',
      description: '',
      sections: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'sections',
  });

  useEffect(() => {
    if (typeof id === 'string') {
      const data = getInfoContentById(id);
      if (data) {
        setInfoItem(data);
        form.reset(data);
      } else {
        router.push('/dashboard/info-content');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, router]);
  
  const onSubmit = (values: z.infer<typeof infoContentSchema>) => {
    if (typeof id !== 'string') return;
    
    const updatedItem: InfoContentItem = {
        id,
        ...values
    };
    
    updateInfoContentById(id, updatedItem);
    
    toast({
      title: 'Konten berhasil disimpan!',
      description: `Perubahan pada "${values.title}" telah disimpan.`,
    });
    router.push('/dashboard/info-content');
  };

  if (!infoItem) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
        </Button>
    
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Edit Konten: {infoItem.title}</CardTitle>
              <CardDescription>
                Gunakan formulir di bawah ini untuk mengedit konten informasi.
                <br/>
                <small className='text-xs text-muted-foreground'>Untuk Table, pisahkan kolom dengan (;) dan baris dengan (|). Untuk paragraf, pisahkan dengan (|)</small>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul Utama</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle>Bagian Konten</CardTitle>
                <CardDescription>Atur bagian-bagian yang akan ditampilkan dalam accordion.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {fields.map((field, index) => (
                    <Card key={field.id} className="p-4 relative">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name={`sections.${index}.trigger`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Judul Bagian</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            <FormField
                                control={form.control}
                                name={`sections.${index}.type`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipe Konten</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih tipe..." />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="paragraph">Paragraf</SelectItem>
                                                <SelectItem value="list">Daftar (List)</SelectItem>
                                                <SelectItem value="table">Tabel</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name={`sections.${index}.content`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Isi Konten</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} rows={5} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                        </div>
                         <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => remove(index)}
                            >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </Card>
                ))}
                 <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ trigger: '', content: '', type: 'paragraph' })}
                    >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Tambah Bagian
                </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.push('/dashboard/info-content')}>
              Batal
            </Button>
            <Button type="submit">Simpan Perubahan</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
