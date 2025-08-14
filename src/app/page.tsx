'use client';

import { useState } from 'react';
import { type z } from 'zod';
import { Calculator, LogIn } from 'lucide-react';

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

export default function Home() {
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCalculate = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setResults(null);
    
    // Get the most current tax data
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
           <Button asChild variant="outline">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login Admin
              </Link>
           </Button>
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
