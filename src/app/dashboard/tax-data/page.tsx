'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { TaxDataTable } from '@/components/tax-data-table';
import { TaxDataForm } from '@/components/tax-data-form';
import { getTaxData } from '@/data/tax-data';
import { Card, CardContent } from '@/components/ui/card';
import { type TaxDataRow } from '@/lib/types';
import { PlusCircle } from 'lucide-react';

const STORAGE_KEY = 'taxData';

export default function TaxDataPage() {
    const [data, setData] = useState<TaxDataRow[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState<TaxDataRow | undefined>(undefined);
    const [transactionTypes, setTransactionTypes] = useState<string[]>([]);

    useEffect(() => {
        let storedData;
        try {
            const item = window.localStorage.getItem(STORAGE_KEY);
            storedData = item ? JSON.parse(item) : null;
        } catch (error) {
            console.error("Failed to parse tax data from localStorage", error);
            storedData = null;
        }
        
        const initialData = storedData || getTaxData();
        setData(initialData);
        setTransactionTypes([...new Set(initialData.map((d: TaxDataRow) => d.jenisTransaksi))]);
    }, []);

    const updateData = (updatedData: TaxDataRow[]) => {
        setData(updatedData);
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
        } catch (error) {
            console.error("Failed to save tax data to localStorage", error);
        }
    };

    const handleSave = (ruleToSave: TaxDataRow) => {
        let updatedData;
        if (selectedRule) { // Editing existing rule
             updatedData = data.map(rule => rule.id === selectedRule.id ? ruleToSave : rule);
        } else { // Adding new rule
             const newRule = { ...ruleToSave, id: `rule-${Date.now()}` };
             updatedData = [newRule, ...data];
        }
        updateData(updatedData);
        
        setIsFormOpen(false);
        setSelectedRule(undefined);
    };

    const handleEdit = (rule: TaxDataRow) => {
        setSelectedRule(rule);
        setIsFormOpen(true);
    };

    const handleDelete = (ruleToDelete: TaxDataRow) => {
        const updatedData = data.filter(rule => rule.id !== ruleToDelete.id);
        updateData(updatedData);
    };
    
    const handleToggleStatus = (ruleToToggle: TaxDataRow) => {
        const updatedData = data.map(rule => 
            rule.id === ruleToToggle.id 
            ? { ...rule, status: rule.status === 'aktif' ? 'non-aktif' : 'aktif' }
            : rule
        );
        updateData(updatedData);
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
                        onToggleStatus={handleToggleStatus}
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
