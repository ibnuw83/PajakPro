'use client'

import { TaxDataTable } from '@/components/tax-data-table';
import { taxData } from '@/data/tax-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function TaxDataPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Data Aturan Pajak</h1>
                    <p className="text-muted-foreground">Lihat dan kelola semua aturan perhitungan pajak.</p>
                </div>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Tambah Aturan
                </Button>
            </div>
            <Card>
                <CardContent className="p-0">
                    <TaxDataTable data={taxData} />
                </CardContent>
            </Card>
        </div>
    )
}
