'use client';

import { useState } from 'react';
import { type z } from 'zod';
import { Calculator, LogIn, Info } from 'lucide-react';

import { type formSchema } from '@/lib/schema';
import { getTaxData } from '@/data/tax-data';
import { findMatchingRule, calculateTaxes } from '@/lib/logic';
import { type CalculationResult } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

import PajakProForm from '@/components/pajak-pro-form';
import PajakProResults from '@/components/pajak-pro-results';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


export default function Home() {
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCalculate = (values: z.infer<typeof formSchema> | null) => {
      if (!values) {
          setResults(null);
          return;
      }
      
      setIsLoading(true);
      const taxData = getTaxData();
      const matchedRule = findMatchingRule(values, taxData);

      if (!matchedRule) {
          setResults(null);
          setIsLoading(false);
          return;
      }
      
      const calculatedTaxes = calculateTaxes(values.nilaiTransaksi, matchedRule);
      setResults(calculatedTaxes);
      setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-4 border-b bg-card shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="bg-primary text-primary-foreground p-2 rounded-lg">
               <Calculator className="h-6 w-6" />
             </div>
             <div>
              <h1 className="text-2xl font-bold font-headline text-primary">
                PajakPro
              </h1>
              <p className="text-sm text-muted-foreground">Asisten Pajak Cerdas Anda</p>
             </div>
           </div>
           <div className='flex items-center gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="outline" size="icon">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Informasi PPh 21</span>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-screen max-w-2xl">
                 <DropdownMenuLabel>Informasi PPh 21</DropdownMenuLabel>
                 <DropdownMenuSeparator />
                 <ScrollArea className="h-[70vh]">
                  <Accordion type="single" collapsible className="w-full p-4">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Dasar Hukum</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                          <li>UU No. 7/1983 s.t.d.t.d UU No. 7 TAHUN 2021 (UU HPP)</li>
                          <li>PP No. 58 TAHUN 2023</li>
                          <li>PERATURAN MENTERI KEUANGAN REPUBLIK INDONESIA NOMOR 168 TAHUN 2023</li>
                          <li>PERATURAN DIREKTUR JENDERAL PAJAK NOMOR PER-2/PJ/2024</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Objek Pajak</AccordionTrigger>
                      <AccordionContent>
                         <p className="text-sm">Penghasilan yang diterima oleh wajib pajak orang pribadi sehubungan dengan pekerjaan, jasa, atau kegiatan, termasuk:</p>
                        <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
                            <li>Gaji, upah, tunjangan, dan pembayaran lain sejenisnya</li>
                            <li>Honorarium, uang saku, dan imbalan sejenisnya</li>
                            <li>Hadiah atau penghargaan</li>
                            <li>Dan lain-lain</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-3">
                      <AccordionTrigger>Penghasilan Tidak Kena Pajak (PTKP)</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm mb-2">Besaran PTKP per tahun:</p>
                         <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell>Wajib Pajak Orang Pribadi</TableCell>
                              <TableCell>Rp 54.000.000</TableCell>
                            </TableRow>
                             <TableRow>
                              <TableCell>Tambahan untuk Wajib Pajak kawin</TableCell>
                              <TableCell>Rp 4.500.000</TableCell>
                            </TableRow>
                             <TableRow>
                              <TableCell>Tambahan untuk setiap tanggungan (maks. 3)</TableCell>
                              <TableCell>Rp 4.500.000</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-4">
                      <AccordionTrigger>Tarif Pajak (Pasal 17)</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm mb-2">Tarif progresif berdasarkan penghasilan kena pajak:</p>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Lapisan Penghasilan Kena Pajak</TableHead>
                              <TableHead>Tarif</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>sampai dengan Rp60.000.000</TableCell>
                              <TableCell>5%</TableCell>
                            </TableRow>
                             <TableRow>
                              <TableCell>di atas Rp60.000.000 s.d. Rp250.000.000</TableCell>
                              <TableCell>15%</TableCell>
                            </TableRow>
                             <TableRow>
                              <TableCell>di atas Rp250.000.000 s.d. Rp500.000.000</TableCell>
                              <TableCell>25%</TableCell>
                            </TableRow>
                             <TableRow>
                              <TableCell>di atas Rp500.000.000 s.d. Rp5.000.000.000</TableCell>
                              <TableCell>30%</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>di atas Rp5.000.000.000</TableCell>
                              <TableCell>35%</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                         <p className="text-sm mt-4 mb-2">Bagi Wajib Pajak yang tidak memiliki NPWP, dikenakan tarif 20% lebih tinggi.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                 </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild variant="outline">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login Admin
                </Link>
            </Button>
           </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          <Card className="lg:col-span-2 h-fit">
            <CardHeader>
              <CardTitle>Kalkulator Pajak</CardTitle>
            </CardHeader>
            <CardContent>
              <PajakProForm onCalculate={handleCalculate} />
            </CardContent>
          </Card>
          <div className="lg:col-span-3">
            <PajakProResults results={results} isLoading={isLoading} />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} PajakPro. Dibuat untuk kemudahan perhitungan pajak.
      </footer>
    </div>
  );
}
