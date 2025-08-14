'use client'

import { useEffect, useMemo, useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type TaxDataRow } from '@/lib/types';
import { taxRuleSchema } from '@/lib/schema';
import { ScrollArea } from './ui/scroll-area';
import { getTaxData } from '@/data/tax-data';


interface TaxDataFormProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSave: (data: TaxDataRow) => void;
    rule?: TaxDataRow;
}

const allOptions = {
    wp: ['Orang Pribadi', 'Badan Usaha', 'Tidak ada'],
    fakturPajak: ['Dapat menerbitkan', 'Tidak dapat menerbitkan', 'Tidak ada'],
    asnNonAsn: ['ASN', 'NON ASN', 'Tidak ada'],
    golongan: ['I', 'II', 'III', 'IV', 'Tidak ada'],
    sertifikatKonstruksi: ['Ada', 'Tidak Ada', 'Tidak ada'],
    jenisPajak: ['PPh 21', 'PPh 22', 'PPh 23', 'Pasal 4 ayat 2', 'PPN'],
    tarifPajak: ['0%', '0.5%', '1.5%', '1.75%', '2%', '2.5%', '3%', '3.5%', '4%', '5%', '6%', '15%', '25%', '30%', '35%'],
    kenaPpn: ['ya', 'tidak'],
    status: ['aktif', 'non-aktif'],
};

export function TaxDataForm({ isOpen, onOpenChange, onSave, rule }: TaxDataFormProps) {
  const [transactionTypes, setTransactionTypes] = useState<string[]>([]);
  
  const form = useForm<z.infer<typeof taxRuleSchema>>({
    resolver: zodResolver(taxRuleSchema),
    defaultValues: rule || {
        jenisTransaksi: '',
        wp: 'Tidak ada',
        fakturPajak: 'Tidak ada',
        asnNonAsn: 'Tidak ada',
        golongan: 'Tidak ada',
        sertifikatKonstruksi: 'Tidak ada',
        jenisPajak: '',
        kodePajakEbillingPPh: '',
        dppRasio: '',
        ptkp: '',
        tarifPajak: '',
        kenaPpn: 'tidak',
        kodePajakEbillingPpn: '',
        status: 'aktif',
    },
  });

  useEffect(() => {
    // Fetch unique transaction types
    const taxData = getTaxData();
    const uniqueTypes = [...new Set(taxData.map(d => d.jenisTransaksi))];
    setTransactionTypes(uniqueTypes);

    form.reset(rule || {
        jenisTransaksi: '',
        wp: 'Tidak ada',
        fakturPajak: 'Tidak ada',
        asnNonAsn: 'Tidak ada',
        golongan: 'Tidak ada',
        sertifikatKonstruksi: 'Tidak ada',
        jenisPajak: '',
        kodePajakEbillingPPh: '',
        dppRasio: '',
        ptkp: '',
        tarifPajak: '',
        kenaPpn: 'tidak',
        kodePajakEbillingPpn: '',
        status: 'aktif',
    });
  }, [rule, form, isOpen]);

  const onSubmit = (values: z.infer<typeof taxRuleSchema>) => {
    const processedValues = Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, value === 'Tidak ada' || value === '' ? null : value])
    ) as unknown as TaxDataRow;
    onSave(processedValues);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] grid-rows-[auto_minmax(0,1fr)_auto] max-h-[90svh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>{rule ? 'Edit Aturan Pajak' : 'Tambah Aturan Pajak Baru'}</DialogTitle>
          <DialogDescription>
            {rule ? 'Ubah detail aturan pajak di bawah ini.' : 'Isi detail untuk aturan pajak yang baru.'}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1">
            <div className="px-6 py-4">
                <Form {...form}>
                <form id="tax-rule-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground mt-4">Kondisi Aturan (Pemicu)</h3>
                    <FormField
                        control={form.control}
                        name="jenisTransaksi"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Jika Jenis Transaksi adalah...</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih jenis transaksi..." />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {transactionTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                    {type}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField control={form.control} name="wp" render={({ field }) => (
                        <FormItem><FormLabel>dan Wajib Pajak (WP) adalah...</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value || 'Tidak ada'}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{allOptions.wp.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="fakturPajak" render={({ field }) => (
                        <FormItem><FormLabel>dan Faktur Pajak...</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value || 'Tidak ada'}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{allOptions.fakturPajak.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="asnNonAsn" render={({ field }) => (
                        <FormItem><FormLabel>dan Statusnya...</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value || 'Tidak ada'}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{allOptions.asnNonAsn.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="golongan" render={({ field }) => (
                        <FormItem><FormLabel>dan Golongannya...</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value || 'Tidak ada'}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{allOptions.golongan.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="sertifikatKonstruksi" render={({ field }) => (
                        <FormItem><FormLabel>dan Sertifikat Konstruksi...</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value || 'Tidak ada'}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{allOptions.sertifikatKonstruksi.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                    )} />
                        <FormField control={form.control} name="ptkp" render={({ field }) => (
                        <FormItem><FormLabel>dan Nilai Transaksi (PTKP)...</FormLabel><FormControl><Input {...field} value={field.value || ''} placeholder="Contoh: > 2000000 atau 0-450000"/></FormControl><FormMessage /></FormItem>
                    )} />
                    
                    <h3 className="text-sm font-medium text-muted-foreground mt-6 pt-4 border-t">Hasil Perhitungan (Aksi)</h3>
                    <FormField
                        control={form.control}
                        name="jenisPajak"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Maka Jenis Pajak yang berlaku adalah...</FormLabel>
                            <FormControl>
                                <div>
                                    <Input {...field} list="jenis-pajak-options" value={field.value || ''} placeholder="Contoh: PPh 21 atau ketik manual" />
                                    <datalist id="jenis-pajak-options">
                                        {allOptions.jenisPajak.map(o => <option key={o} value={o} />)}
                                    </datalist>
                                </div>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                        <FormField control={form.control} name="kodePajakEbillingPPh" render={({ field }) => (
                        <FormItem><FormLabel>Kode Pajak PPh</FormLabel><FormControl><Input {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
                    )} />
                        <FormField control={form.control} name="dppRasio" render={({ field }) => (
                        <FormItem><FormLabel>DPP Rasio</FormLabel><FormControl><Input {...field} value={field.value || ''} placeholder="Contoh: 100/111 atau 100/100"/></FormControl><FormMessage /></FormItem>
                    )} />
                    
                    <FormField
                        control={form.control}
                        name="tarifPajak"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Tarif Pajak</FormLabel>
                            <FormControl>
                                <div>
                                    <Input {...field} list="tarif-pajak-options" value={field.value || ''} placeholder="Contoh: 2.5% atau ketik manual" />
                                    <datalist id="tarif-pajak-options">
                                        {allOptions.tarifPajak.map(o => <option key={o} value={o} />)}
                                    </datalist>
                                </div>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField control={form.control} name="kenaPpn" render={({ field }) => (
                        <FormItem><FormLabel>Dikenakan PPN?</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value || 'tidak'}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{allOptions.kenaPpn.map(o => <SelectItem key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                    )} />
                        <FormField control={form.control} name="kodePajakEbillingPpn" render={({ field }) => (
                        <FormItem><FormLabel>Kode Pajak PPN</FormLabel><FormControl><Input {...field} value={field.value || ''}/></FormControl><FormMessage /></FormItem>
                    )} />

                    <h3 className="text-sm font-medium text-muted-foreground mt-6 pt-4 border-t">Status Aturan</h3>
                    <FormField control={form.control} name="status" render={({ field }) => (
                        <FormItem><FormLabel>Status</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{allOptions.status.map(o => <SelectItem key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                    )} />
                </form>
                </Form>
            </div>
        </ScrollArea>
        <DialogFooter className="p-6 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
            <Button type="submit" form="tax-rule-form">Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
