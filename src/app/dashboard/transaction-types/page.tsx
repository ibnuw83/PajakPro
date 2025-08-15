'use client';

import { useState } from 'react';
import { getTaxData } from '@/data/tax-data';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { TransactionTypeForm } from '@/components/transaction-type-form';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


export default function TransactionTypesPage() {
    // NOTE: In a real-world scenario, you would fetch and update this data via an API.
    // For this prototype, we're managing it in the client-side state.
    const [transactionTypes, setTransactionTypes] = useState([...new Set(getTaxData().map(d => d.jenisTransaksi))]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<string | undefined>(undefined);

    const handleAddNew = () => {
        setSelectedType(undefined);
        setIsFormOpen(true);
    };
    
    const handleEdit = (type: string) => {
        setSelectedType(type);
        setIsFormOpen(true);
    };

    const handleDelete = (typeToDelete: string) => {
        setTransactionTypes(currentTypes => currentTypes.filter(type => type !== typeToDelete));
    };

    const handleSave = (name: string) => {
        if (selectedType) {
            // Edit existing type
            setTransactionTypes(currentTypes => currentTypes.map(t => (t === selectedType ? name : t)));
        } else {
            // Add new type if it doesn't exist
            if (!transactionTypes.includes(name)) {
                setTransactionTypes(currentTypes => [name, ...currentTypes]);
            }
        }
        setIsFormOpen(false);
        setSelectedType(undefined);
    };


    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Jenis Transaksi</h1>
                    <p className="text-muted-foreground">Lihat dan kelola semua jenis transaksi yang tersedia.</p>
                </div>
                 <Button onClick={handleAddNew}>
                    <PlusCircle className="mr-2" />
                    Tambah Jenis Transaksi
                </Button>
            </div>
            <Card>
                <CardContent className="p-0">
                   <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nama Jenis Transaksi</TableHead>
                          <TableHead className="w-[100px] text-right">Aksi</TableHead>
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
                                        <DropdownMenuItem onClick={() => handleEdit(type)}>
                                            <Edit className="mr-2" /> Edit
                                        </DropdownMenuItem>
                                         <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" className="w-full justify-start text-sm text-red-500 hover:text-red-600 px-2 py-1.5 font-normal hover:bg-red-50 dark:hover:bg-red-900/20">
                                                    <Trash2 className="mr-2" /> Hapus
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Tindakan ini tidak dapat dibatalkan. Ini akan menghapus jenis transaksi secara permanen.
                                                </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(type)} className="bg-destructive hover:bg-destructive/90">Hapus</AlertDialogAction>
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
