'use client';

import { useState, useEffect } from 'react';
import { getTaxData } from '@/data/tax-data';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { TransactionTypeForm } from '@/components/transaction-type-form';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { type TaxDataRow } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const TAX_RULES_STORAGE_KEY = 'taxData';
const TRANSACTION_TYPES_STORAGE_KEY = 'transactionTypes';

export default function TransactionTypesPage() {
    const [taxRules, setTaxRules] = useState<TaxDataRow[]>([]);
    const [transactionTypes, setTransactionTypes] = useState<string[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
    const { toast } = useToast();

    useEffect(() => {
        // Load tax rules
        const storedTaxRules = window.localStorage.getItem(TAX_RULES_STORAGE_KEY);
        const initialTaxRules = storedTaxRules ? JSON.parse(storedTaxRules) : getTaxData();
        setTaxRules(initialTaxRules);

        // Load transaction types
        const storedTransactionTypes = window.localStorage.getItem(TRANSACTION_TYPES_STORAGE_KEY);
        if (storedTransactionTypes) {
            setTransactionTypes(JSON.parse(storedTransactionTypes));
        } else {
            // If no stored types, derive from initial rules and store it
            const initialTypes = [...new Set(initialTaxRules.map((d: TaxDataRow) => d.jenisTransaksi))].sort();
            setTransactionTypes(initialTypes);
            window.localStorage.setItem(TRANSACTION_TYPES_STORAGE_KEY, JSON.stringify(initialTypes));
        }
    }, []);

    const updateTaxRules = (updatedRules: TaxDataRow[]) => {
        setTaxRules(updatedRules);
        try {
            window.localStorage.setItem(TAX_RULES_STORAGE_KEY, JSON.stringify(updatedRules));
        } catch (error) {
            console.error("Failed to save tax rules to localStorage", error);
        }
    };
    
    const updateTransactionTypes = (updatedTypes: string[]) => {
        const sortedTypes = updatedTypes.sort();
        setTransactionTypes(sortedTypes);
         try {
            window.localStorage.setItem(TRANSACTION_TYPES_STORAGE_KEY, JSON.stringify(sortedTypes));
        } catch (error) {
            console.error("Failed to save transaction types to localStorage", error);
        }
    }

    const handleAddNew = () => {
        setSelectedType(undefined);
        setIsFormOpen(true);
    };
    
    const handleEdit = (type: string) => {
        setSelectedType(type);
        setIsFormOpen(true);
    };

    const handleDelete = (typeToDelete: string) => {
        // 1. Update the list of transaction types
        const updatedTypes = transactionTypes.filter(t => t !== typeToDelete);
        updateTransactionTypes(updatedTypes);

        // 2. Update the tax rules by filtering out any that use the deleted type
        const updatedRules = taxRules.filter(rule => rule.jenisTransaksi !== typeToDelete);
        updateTaxRules(updatedRules);

        toast({
          title: "Jenis Transaksi Dihapus",
          description: `"${typeToDelete}" dan semua aturan pajak terkait telah dihapus.`,
        });
    };

    const handleSave = (newName: string) => {
        let updatedRules: TaxDataRow[];

        if (selectedType) { // Editing an existing type
            if (newName !== selectedType && transactionTypes.includes(newName)) {
                toast({ variant: "destructive", title: "Gagal", description: "Nama jenis transaksi sudah ada." });
                return;
            }
            // 1. Update the list of types
            const updatedTypes = transactionTypes.map(t => t === selectedType ? newName : t);
            updateTransactionTypes(updatedTypes);

            // 2. Update the rules that used the old type
            updatedRules = taxRules.map(rule => 
                rule.jenisTransaksi === selectedType ? { ...rule, jenisTransaksi: newName } : rule
            );
            toast({ title: "Berhasil", description: `"${selectedType}" diubah menjadi "${newName}".`});
        } else { // Adding a new type
            if (transactionTypes.includes(newName)) {
                toast({ variant: "destructive", title: "Gagal", description: "Nama jenis transaksi sudah ada." });
                return;
            }
            // 1. Add to the list of types
            const updatedTypes = [...transactionTypes, newName];
            updateTransactionTypes(updatedTypes);
            
            // 2. To add a new type, we still add a new default/placeholder rule for it for convenience.
            const newRule: TaxDataRow = {
                id: `rule-${Date.now()}`,
                jenisTransaksi: newName,
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
            updatedRules = [newRule, ...taxRules];
            toast({ title: "Berhasil", description: `Jenis transaksi baru "${newName}" telah ditambahkan.`});
        }
        
        updateTaxRules(updatedRules);
        setIsFormOpen(false);
        setSelectedType(undefined);
    };


    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Jenis Transaksi</h1>
                    <p className="text-muted-foreground">Lihat dan kelola semua jenis transaksi. Perubahan akan disimpan secara permanen.</p>
                </div>
                 <Button onClick={handleAddNew}>
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
                                            <Edit className="mr-2 h-4 w-4" /> Edit
                                        </DropdownMenuItem>
                                         <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" className="w-full justify-start text-sm text-red-500 hover:text-red-600 px-2 py-1.5 font-normal hover:bg-red-50 dark:hover:bg-red-900/20">
                                                    <Trash2 className="mr-2 h-4 w-4" /> Hapus
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Tindakan ini tidak dapat dibatalkan. Ini akan menghapus jenis transaksi dan SEMUA aturan pajak yang menggunakannya.
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
