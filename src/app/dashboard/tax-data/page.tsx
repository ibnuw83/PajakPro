'use client'

import { useState, useEffect } from 'react';
import { TaxDataTable } from '@/components/tax-data-table';
import { getTaxData } from '@/data/tax-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { type TaxDataRow } from '@/lib/types';


export default function TaxDataPage() {
    const [data, setData] = useState<TaxDataRow[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const refreshData = async () => {
        setIsLoading(true);
        const freshData = await getTaxData();
        setData(freshData);
        setIsLoading(false);
    }

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Data Aturan Pajak</h1>
                    <p className="text-muted-foreground">Lihat semua aturan perhitungan pajak. Untuk mengubah data, edit file `src/data/tax-data.json` secara langsung.</p>
                </div>
            </div>
            <Card>
                <CardContent className="p-0">
                    <TaxDataTable 
                        data={data}
                        isLoading={isLoading}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
