'use client'

import { useState, useEffect } from 'react';
import { getTaxData } from '@/data/tax-data';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';


export default function TransactionTypesPage() {
    const [transactionTypes, setTransactionTypes] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const refreshData = () => {
        setIsLoading(true);
        const taxData = getTaxData(); // No await needed
        const uniqueTypes = [...new Set(taxData.map(d => d.jenisTransaksi))];
        setTransactionTypes(uniqueTypes);
        setIsLoading(false);
    }

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Jenis Transaksi</h1>
                    <p className="text-muted-foreground">Lihat semua jenis transaksi yang tersedia. Data ini diambil dari `src/data/tax-data.json`.</p>
                </div>
            </div>
            <Card>
                <CardContent className="p-0">
                   <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nama Jenis Transaksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                            Array.from({length: 5}).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className='h-5 w-48'/></TableCell>
                                </TableRow>
                            ))
                        ) : transactionTypes.map((type, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{type}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
