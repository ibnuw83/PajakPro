'use client'

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface TransactionTypeFormProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSave: (name: string) => void;
    transactionType?: string;
}

const formSchema = z.object({
  name: z.string().min(1, 'Nama jenis transaksi harus diisi.'),
});

export function TransactionTypeForm({ isOpen, onOpenChange, onSave, transactionType }: TransactionTypeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: transactionType || '',
    },
  });

  useEffect(() => {
    form.reset({
        name: transactionType || '',
    });
  }, [transactionType, form, isOpen]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSave(values.name);
  };
  
  const title = transactionType ? 'Edit Jenis Transaksi' : 'Tambah Jenis Transaksi Baru';
  const description = transactionType ? 'Ubah nama jenis transaksi di bawah ini.' : 'Isi nama untuk jenis transaksi yang baru.';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>
                {description}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                 <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Nama Jenis Transaksi</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
