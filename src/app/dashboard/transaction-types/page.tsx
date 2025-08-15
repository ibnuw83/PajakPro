
'use client'

import { useState, useEffect } from 'react';
import { getTaxData, updateTaxData } from '@/data/tax-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { TransactionTypeForm } from '@/components/transaction-type-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { type TaxDataRow } from '@/lib/types';


export default function TransactionTypesPage() {
    const [transactionTypes, setTransactionTypes] = useState<string[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
    const [originalType, setOriginalType] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const refreshData = async () => {
        setIsLoading(true);
        const taxData = await getTaxData();
        const uniqueTypes = [...new Set(taxData.map(d => d.jenisTransaksi))];
        setTransactionTypes(uniqueTypes);
        setIsLoading(false);
    }

    useEffect(() => {
        refreshData();
    }, []);


    const handleAdd = () => {
        setSelectedType(undefined);
        setOriginalType(undefined);
        setIsFormOpen(true);
    }

    const handleEdit = (type: string) => {
        setSelectedType(type);
        setOriginalType(type);
        setIsFormOpen(true);
    }

    const handleDelete = async (typeToDelete: string) => {
        const currentTaxData = await getTaxData();
        const updatedTaxData = currentTaxData.filter(rule => rule.jenisTransaksi !== typeToDelete);
        await updateTaxData(updatedTaxData);
        await refreshData();
    }

    const handleSave = async (newTypeName: string) => {
        const currentTaxData = await getTaxData();
        let updatedTaxData;

        if (originalType) { 
            // Editing existing type name
            if (originalType !== newTypeName) {
                updatedTaxData = currentTaxData.map(rule => 
                    rule.jenisTransaksi === originalType ? { ...rule, jenisTransaksi: newTypeName } : rule
                );
            } else {
                // Name is the same, no changes needed
                setIsFormOpen(false);
                return;
            }
        } else {
            // Adding a new transaction type
            const newRule: TaxDataRow = {
                jenisTransaksi: newTypeName,
                wp: 'Tidak ada',
                fakturPajak: null,
                asnNonAsn: null,
                golongan: null,
                sertifikatKonstruksi: null,
                jenisPajak: 'Belum diatur',
                kodePajakEbillingPPh: null,
                dppRasio: null,
                ptkp: null,
                tarifPajak: '0%',
                kenaPpn: 'tidak',
                kodePajakEbillingPpn: null,
                status: 'non-aktif',
            };
            updatedTaxData = [newRule, ...currentTaxData];
        }
        
        await updateTaxData(updatedTaxData);
        await refreshData();
        setIsFormOpen(false);
    };


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
                          <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={2} className="text-center">Memuat data...</TableCell>
                            </TableRow>
                        ) : transactionTypes.map((type, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{type}</TableCell>
                             <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Buka menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => handleEdit(type)}>Edit</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                         <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                               <DropdownMenuItem
                                                    onSelect={(e) => e.preventDefault()}
                                                    className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                                >
                                                    Hapus
                                                </DropdownMenuItem>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Tindakan ini tidak dapat dibatalkan. Ini akan menghapus jenis transaksi dan semua aturan pajak yang terkait.
                                                </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(type)}>Hapus</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <TransactionTypeForm
                isOpen={isFormOpen}
                onOpenChange={setIsFormOpen}
                onSave={handleSave}
                transactionType={selectedType}
            />

        </div>
    )
}
