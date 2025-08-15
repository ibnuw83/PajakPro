'use client';

import { useState, useEffect, useCallback } from 'react';
import { type z } from 'zod';
import { Calculator, LogIn, Info } from 'lucide-react';

import { type formSchema } from '@/lib/schema';
import { getTaxData } from '@/data/tax-data';
import { getInfoContent } from '@/data/info-content';
import { getSettings, type AppSettings } from '@/data/settings';
import { findMatchingRule, calculateTaxes } from '@/lib/logic';
import { type CalculationResult, type InfoContentItem, type FormValues, type TaxDataRow } from '@/lib/types';
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
import Image from 'next/image';

const STORAGE_KEY = 'taxData';

export default function Home() {
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [formValues, setFormValues] = useState<FormValues | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [infoContent, setInfoContent] = useState<InfoContentItem[]>([]);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [taxRules, setTaxRules] = useState<TaxDataRow[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    let storedData;
    try {
        const item = window.localStorage.getItem(STORAGE_KEY);
        storedData = item ? JSON.parse(item) : null;
    } catch (error) {
        console.error("Failed to parse tax data from localStorage", error);
        storedData = null;
    }
    setTaxRules(storedData || getTaxData());
    setInfoContent(getInfoContent());
    setSettings(getSettings());
  }, []);

  const handleCalculate = useCallback(async (values: z.infer<typeof formSchema> | null) => {
      setIsLoading(true);
      setFormValues(values);
      if (!values) {
          setResults(null);
          setIsLoading(false);
          return;
      }
      
      const matchedRule = findMatchingRule(values, taxRules);

      if (!matchedRule) {
          setResults(null);
          setIsLoading(false);
          return;
      }
      
      const calculatedTaxes = calculateTaxes(values.nilaiTransaksi, matchedRule);
      setResults(calculatedTaxes);
      setIsLoading(false);
  }, [taxRules]);
  
  if (!settings) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
       <header className="p-4 border-b bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
           <div className="flex items-center gap-3">
             {settings.logoUrl && !settings.logoUrl.startsWith('data:image/') ? <Image src={settings.logoUrl} alt="Logo" width={32} height={32} className="h-8 w-8 object-contain" /> : <Calculator className="h-8 w-8" />}
             <div>
              <h1 className="text-2xl font-bold font-headline">
                {settings.title}
              </h1>
              <p className="text-sm text-primary-foreground/80">{settings.description}</p>
             </div>
           </div>
           <div className='flex items-center gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="outline" size="icon" className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground border-primary-foreground/20">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Informasi Pajak</span>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-screen max-w-2xl text-card-foreground">
                 <DropdownMenuLabel>Informasi Pajak</DropdownMenuLabel>
                 <DropdownMenuSeparator />
                 <ScrollArea className="h-[70vh]">
                  <Accordion type="single" collapsible className="w-full p-4">
                    {infoContent.map(item => (
                       <AccordionItem value={item.id} key={item.id}>
                          <AccordionTrigger>{item.title}</AccordionTrigger>
                          <AccordionContent>
                              <Accordion type="single" collapsible className="w-full">
                                {item.sections.map((section, index) => (
                                    <AccordionItem value={`section-${index}`} key={index}>
                                        <AccordionTrigger>{section.trigger}</AccordionTrigger>
                                        <AccordionContent>
                                            {section.type === 'paragraph' && (
                                                <div className="text-sm space-y-2">
                                                    {section.content.split('|').map((paragraph, pIndex) => (
                                                        <p key={pIndex}>{paragraph.startsWith('-') ? <ul className="list-disc pl-5"><li className='list-item'>{paragraph.substring(1)}</li></ul> : paragraph}</p>
                                                    ))}
                                                </div>
                                            )}
                                            {section.type === 'list' && (
                                                <ul className="list-disc pl-5 space-y-2 text-sm">
                                                    {section.content.split(';').map((listItem, lIndex) => (
                                                        <li key={lIndex}>{listItem}</li>
                                                    ))}
                                                </ul>
                                            )}
                                            {section.type === 'table' && (
                                                <Table>
                                                    <TableBody>
                                                        {section.content.split('|').map((row, rIndex) => (
                                                            <TableRow key={rIndex}>
                                                                {row.split(';').map((cell, cIndex) => (
                                                                    <TableCell key={cIndex}>{cell}</TableCell>
                                                                ))}
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            )}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                              </Accordion>
                          </AccordionContent>
                       </AccordionItem>
                    ))}
                  </Accordion>
                 </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild variant="secondary" className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login Admin
                </Link>
            </Button>
           </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 bg-muted">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          <Card className="lg:col-span-2 bg-slate-50 dark:bg-slate-900/20">
            <CardHeader>
              <CardTitle>Kalkulator Pajak</CardTitle>
            </CardHeader>
            <CardContent>
              <PajakProForm onCalculate={handleCalculate} taxData={taxRules} />
            </CardContent>
          </Card>
          <div className="lg:col-span-3">
              <PajakProResults results={results} formValues={formValues} isLoading={isLoading} />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground border-t mt-auto bg-background">
        {settings.footerText.replace('{year}', new Date().getFullYear().toString())}
      </footer>
    </div>
  );
}
