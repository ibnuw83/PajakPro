'use client';

import { FileText, Lightbulb, Percent, Receipt } from 'lucide-react';
import { type CalculationResult } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

interface PajakProResultsProps {
  results: CalculationResult | null;
  isLoading: boolean;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

const ResultRow = ({ label, value }: { label: string; value: string | null | undefined }) => (
  <div className="flex justify-between items-center text-sm">
    <p className="text-muted-foreground">{label}</p>
    <p className="font-medium text-right">{value || '-'}</p>
  </div>
);

const LoadingSkeleton = () => (
    <div className="space-y-4">
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/6" />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-1/2" />
                 <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-8 w-full mt-2" />
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <Skeleton className="h-6 w-1/2" />
                 <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </CardContent>
        </Card>
    </div>
);


export default function PajakProResults({ results, isLoading }: PajakProResultsProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!results) {
    return (
      <Card className="flex flex-col items-center justify-center text-center p-8 h-full">
        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        <CardTitle>Hasil Perhitungan Akan Muncul di Sini</CardTitle>
        <CardDescription className="mt-2">
          Isi formulir di sebelah kiri dan klik tombol hitung untuk melihat rincian pajak dan saran dari AI.
        </CardDescription>
      </Card>
    );
  }

  const { matchedRule, nilaiTransaksi, dpp, pph, ppn, totalBayar, aiGuidance } = results;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Percent className="h-5 w-5"/>
            </div>
            <div>
                <CardTitle>Parameter Pajak</CardTitle>
                <CardDescription>Aturan pajak yang diterapkan</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
            <ResultRow label="Jenis Pajak" value={matchedRule.jenisPajak} />
            <ResultRow label="Kode Pajak PPh" value={matchedRule.kodePajakEbillingPPh} />
            <ResultRow label="Tarif PPh" value={matchedRule.tarifPajak} />
            <ResultRow label="DPP Rasio" value={matchedRule.dppRasio} />
            <ResultRow label="Kena PPN" value={matchedRule.kenaPpn?.toUpperCase()} />
            <ResultRow label="Kode Pajak PPN" value={matchedRule.kodePajakEbillingPpn} />
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
            <div className="flex items-center gap-3">
                 <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                    <Receipt className="h-5 w-5"/>
                </div>
                <div>
                    <CardTitle>Perhitungan Pajak</CardTitle>
                    <CardDescription>Rincian perhitungan PPh dan PPN</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="space-y-2">
            <ResultRow label="Nilai Transaksi (Bruto)" value={formatCurrency(nilaiTransaksi)} />
            <ResultRow label="Dasar Pengenaan Pajak (DPP)" value={formatCurrency(dpp)} />
            <ResultRow label="Potongan PPh" value={formatCurrency(pph)} />
            <ResultRow label="Potongan PPN (11%)" value={formatCurrency(ppn)} />
            <Separator className="my-3"/>
            <div className="flex justify-between items-center text-lg">
                <p className="font-semibold">Total Tagihan</p>
                <p className="font-bold text-primary">{formatCurrency(totalBayar)}</p>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-accent text-accent-foreground p-2 rounded-lg">
                <Lightbulb className="h-5 w-5"/>
            </div>
            <div>
                 <CardTitle>Saran AI</CardTitle>
                 <CardDescription>Penjelasan dan panduan dari asisten AI</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none text-foreground text-sm" dangerouslySetInnerHTML={{ __html: aiGuidance.replace(/\n/g, '<br />') }} />
        </CardContent>
      </Card>
    </div>
  );
}
