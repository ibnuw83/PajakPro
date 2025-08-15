'use client';

import { useRef, useMemo } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FileText, Percent, Receipt, Download, Loader2 } from 'lucide-react';

import { type CalculationResult, type FormValues } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Button } from './ui/button';
import React from 'react';

interface PajakProResultsProps {
  results: CalculationResult | null;
  formValues: FormValues | null;
  isLoading: boolean;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
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
    </div>
);


export default function PajakProResults({ results, formValues, isLoading }: PajakProResultsProps) {
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownloadPdf = () => {
    const input = resultsRef.current;
    if (!input) return;
    setIsDownloading(true);

    // Give a bit of time for any re-rendering to settle
    setTimeout(() => {
        html2canvas(input, { scale: 2, backgroundColor: null }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const center = pdfWidth / 2;
            
            pdf.setFontSize(16);
            pdf.text("Hasil Perhitungan Pajak", center, 20, { align: 'center' });
            
            if (formValues) {
                pdf.setFontSize(10);
                pdf.text(`Jenis Transaksi: ${formValues.jenisTransaksi}`, center, 27, { align: 'center' });
                pdf.text(`Wajib Pajak: ${formValues.wp}`, center, 32, { align: 'center' });
            }

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasWidth / canvasHeight;
            const width = pdfWidth - 20; // with margin
            const height = width / ratio;

            let position = formValues ? 40 : 30; // top margin after title
            
            pdf.addImage(imgData, 'PNG', 10, position, width, height);
            pdf.save('hasil-perhitungan-pajak.pdf');
            setIsDownloading(false);
        });
    }, 200)

  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!results) {
    return (
      <Card className="flex flex-col items-center justify-center text-center p-8 h-full">
        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        <CardTitle>Hasil Perhitungan Akan Muncul di Sini</CardTitle>
        <CardDescription className="mt-2">
          Isi formulir di sebelah kiri untuk melihat rincian pajak secara otomatis.
        </CardDescription>
      </Card>
    );
  }

  const { matchedRule, nilaiTransaksi, dpp, pph, ppn, totalBayar, totalPajak } = results;

  return (
    <div className='space-y-6'>
        <div ref={resultsRef} className="flex flex-col md:flex-row gap-6 bg-background p-1">
            <Card className="bg-blue-50 dark:bg-blue-900/20 flex-1">
                <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 text-white p-2 rounded-lg">
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

            <Card className="bg-green-50 dark:bg-green-900/20 flex-1">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="bg-green-600 text-white p-2 rounded-lg">
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
                    <ResultRow label="Total Pajak (PPh + PPN)" value={formatCurrency(totalPajak)} />
                    <Separator className="my-3"/>
                    <div className="flex justify-between items-center text-lg">
                        <p className="font-semibold">Total yang harus dibayarkan</p>
                        <p className="font-bold text-primary">{formatCurrency(totalBayar)}</p>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="mt-6 flex justify-end">
            <Button onClick={handleDownloadPdf} disabled={isDownloading}>
                {isDownloading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Download className="mr-2 h-4 w-4" />
                )}
                Unduh PDF
            </Button>
        </div>
    </div>
  );
}
