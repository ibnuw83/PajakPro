'use client'

import { useState } from 'react';
import { getTaxData } from '@/data/tax-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


export default function TransactionTypesPage() {
    const [transactionTypes, setTransactionTypes] = useState<string[]>([...new Set(getTaxData().map(d => d.jenisTransaksi))]);

    const handleAdd = () => {
        // For now, we'll just log to the console.
        // A dialog or form would be needed to add a new one.
        console.log("Add new transaction type clicked");
        alert("Fungsionalitas 'Tambah Jenis Transaksi' belum diimplementasikan.");
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Jenis Transaksi</h1>
                    <p className="text-muted-foreground">Lihat dan kelola semua jenis transaksi yang tersedia.</p>
                </div>
                 <Button onClick={handleAdd}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Tambah Jenis Transaksi
                </Button>
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
                        {transactionTypes.map((type, index) => (
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
