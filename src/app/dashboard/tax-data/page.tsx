'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { TaxDataTable } from '@/components/tax-data-table';
import { TaxDataForm } from '@/components/tax-data-form';
import { getTaxData } from '@/data/tax-data';
import { Card, CardContent } from '@/components/ui/card';
import { type TaxDataRow } from '@/lib/types';
import { PlusCircle } from 'lucide-react';


export default function TaxDataPage() {
    const [data, setData] = useState<TaxDataRow[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState<TaxDataRow | undefined>(undefined);
    const [transactionTypes, setTransactionTypes] = useState<string[]>([]);

    useEffect(() => {
        const initialData = getTaxData();
        setData(initialData);
        setTransactionTypes([...new Set(initialData.map(d => d.jenisTransaksi))]);
    }, []);

    const handleSave = (ruleToSave: TaxDataRow) => {
        let updatedData;
        if (selectedRule) { // Editing existing rule
             updatedData = data.map(rule => rule.id === selectedRule.id ? ruleToSave : rule);
        } else { // Adding new rule
             const newRule = { ...ruleToSave, id: Date.now().toString() };
             updatedData = [newRule, ...data];
        }
        setData(updatedData);
        // In a real app, you would also update the data source (e.g., call an API)
        
        setIsFormOpen(false);
        setSelectedRule(undefined);
    };

    const handleEdit = (rule: TaxDataRow) => {
        setSelectedRule(rule);
        setIsFormOpen(true);
    };

    const handleDelete = (ruleToDelete: TaxDataRow) => {
        const updatedData = data.filter(rule => rule.id !== ruleToDelete.id);
        setData(updatedData);
        // In a real app, you would also update the data source (e.g., call an API)
    };

    const handleAddNew = () => {
        setSelectedRule(undefined);
        setIsFormOpen(true);
    };


    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Data Aturan Pajak</h1>
                    <p className="text-muted-foreground">Kelola semua aturan perhitungan pajak. Perubahan akan disimpan secara lokal.</p>
                </div>
                 <Button onClick={handleAddNew}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Tambah Aturan Pajak
                </Button>
            </div>
            <Card>
                <CardContent className="p-0">
                    <TaxDataTable 
                        data={data}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </CardContent>
            </Card>

            <TaxDataForm 
                isOpen={isFormOpen}
                onOpenChange={setIsFormOpen}
                onSave={handleSave}
                rule={selectedRule}
                transactionTypes={transactionTypes}
            />
        </div>
    )
}
