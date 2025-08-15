
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


export default function TransactionTypesPage() {
    const [transactionTypes, setTransactionTypes] = useState<string[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
    const [originalType, setOriginalType] = useState<string | undefined>(undefined);

    const refreshData = () => {
        const taxData = getTaxData();
        const uniqueTypes = [...new Set(taxData.map(d => d.jenisTransaksi))];
        setTransactionTypes(uniqueTypes);
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

    const handleDelete = (typeToDelete: string) => {
        const currentTaxData = getTaxData();
        const updatedTaxData = currentTaxData.filter(rule => rule.jenisTransaksi !== typeToDelete);
        updateTaxData(updatedTaxData);
        refreshData();
    }

    const handleSave = (newTypeName: string) => {
        const currentTaxData = getTaxData();
        let updatedTaxData = [...currentTaxData];

        if (originalType && originalType !== newTypeName) { // Editing existing type
            updatedTaxData = currentTaxData.map(rule => 
                rule.jenisTransaksi === originalType ? { ...rule, jenisTransaksi: newTypeName } : rule
            );
        } else if (!originalType && !transactionTypes.includes(newTypeName)) { // Adding new type
            // To make the new type appear in the list, we can add a dummy (inactive) rule for it.
            // This rule won't affect calculations but ensures the type is persisted.
            // Alternatively, manage a separate list for types, but this is simpler with current data structure.
             setTransactionTypes(current => {
                const newSet = new Set([...current, newTypeName]);
                return Array.from(newSet);
            });
        }

        updateTaxData(updatedTaxData);
        refreshData();
        
        // This ensures the new type is visible immediately even if no rule uses it yet.
        if (!originalType) {
             setTransactionTypes(current => {
                const newSet = new Set([...current, newTypeName]);
                return Array.from(newSet);
            });
        }
        
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
                        {transactionTypes.map((type, index) => (
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
