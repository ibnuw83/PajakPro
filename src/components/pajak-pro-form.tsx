'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';
import { Loader2, Calculator } from 'lucide-react';

import { taxData } from '@/data/tax-data';
import { formSchema } from '@/lib/schema';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface PajakProFormProps {
  onCalculate: (values: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
}

const placeholder = 'Pilih...';

export default function PajakProForm({ onCalculate, isLoading }: PajakProFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nilaiTransaksi: 0,
      jenisTransaksi: '',
      wp: '',
      fakturPajak: '',
      asnNonAsn: 'NON ASN',
      golongan: 'I',
      sertifikatKonstruksi: 'Ada',
    },
  });

  const { watch, setValue } = form;
  const jenisTransaksi = watch('jenisTransaksi');
  const wp = watch('wp');
  const asnNonAsn = watch('asnNonAsn');

  const isHonor = useMemo(() => jenisTransaksi.includes('Honor'), [jenisTransaksi]);
  const isConstruction = useMemo(
    () =>
      jenisTransaksi.includes('Konstruksi') ||
      jenisTransaksi.includes('Pemeliharaan Bangunan'),
    [jenisTransaksi]
  );
  const isAsn = useMemo(() => asnNonAsn === 'ASN', [asnNonAsn]);

  const options = useMemo(() => {
    return {
      jenisTransaksi: [...new Set(taxData.map(d => d.jenisTransaksi))],
      wp: [...new Set(taxData.map(d => d.wp))],
      fakturPajak: [...new Set(taxData.filter(d => d.fakturPajak).map(d => d.fakturPajak as string))],
      asnNonAsn: ['ASN', 'NON ASN'],
      golongan: ['I', 'II', 'III', 'IV'],
      sertifikatKonstruksi: ['Ada', 'Tidak Ada'],
    };
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onCalculate)} className="space-y-6">
        <FormField
          control={form.control}
          name="nilaiTransaksi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nilai Transaksi (Bruto)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Contoh: 5000000"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jenisTransaksi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jenis Transaksi</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.jenisTransaksi.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="wp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wajib Pajak (WP)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.wp.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fakturPajak"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faktur Pajak</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.fakturPajak.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="asnNonAsn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status ASN / NON ASN</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!isHonor}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.asnNonAsn.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="golongan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Golongan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!isHonor || !isAsn}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.golongan.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sertifikatKonstruksi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sertifikat Konstruksi</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!isConstruction}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.sertifikatKonstruksi.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Calculator className="mr-2 h-4 w-4" />
          )}
          Hitung Pajak
        </Button>
      </form>
    </Form>
  );
}
