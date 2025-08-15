'use client'

import { useState, useEffect } from 'react';
import { TaxDataTable } from '@/components/tax-data-table';
import { getTaxData, updateTaxData } from '@/data/tax-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { TaxDataForm } from '@/components/tax-data-form';
import { type TaxDataRow } from '@/lib/types';


export default function TaxDataPage() {
    const [data, setData] = useState<TaxDataRow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState<TaxDataRow | undefined>(undefined);
    const [originalRule, setOriginalRule] = useState<TaxDataRow | undefined>(undefined);


    const refreshData = async () => {
        setIsLoading(true);
        const freshData = await getTaxData();
        setData(freshData);
        setIsLoading(false);
    }

    useEffect(() => {
        refreshData();
    }, []);

    const handleAdd = () => {
        setSelectedRule(undefined);
        setOriginalRule(undefined);
        setIsFormOpen(true);
    }

    const handleEdit = (rule: TaxDataRow) => {
        setSelectedRule(rule);
        setOriginalRule(rule);
        setIsFormOpen(true);
    }

    const handleDelete = async (ruleToDelete: TaxDataRow) => {
        const currentData = await getTaxData();
        const updatedData = currentData.filter(rule => 
            JSON.stringify(rule) !== JSON.stringify(ruleToDelete)
        );
        await updateTaxData(updatedData);
        refreshData();
    }

    const handleToggleStatus = async (ruleToToggle: TaxDataRow) => {
        const currentData = await getTaxData();
        const updatedData = currentData.map(rule => 
            JSON.stringify(rule) === JSON.stringify(ruleToToggle) 
            ? { ...rule, status: rule.status === 'aktif' ? 'non-aktif' : 'aktif' }
            : rule
        );
        await updateTaxData(updatedData);
        refreshData();
    }

    const handleSave = async (ruleToSave: TaxDataRow) => {
        const currentData = await getTaxData();
        let updatedData;
        
        if (originalRule) { // Editing existing rule
            updatedData = currentData.map(rule => 
                JSON.stringify(rule) === JSON.stringify(originalRule) ? ruleToSave : rule
            );
        } else { // Adding new rule
            updatedData = [ruleToSave, ...currentData];
        }
        await updateTaxData(updatedData);
        refreshData();
        setIsFormOpen(false);
    };


    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Data Aturan Pajak</h1>
                    <p className="text-muted-foreground">Lihat dan kelola semua aturan perhitungan pajak.</p>
                </div>
                 <Button onClick={handleAdd}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Tambah Aturan
                </Button>
            </div>
            <Card>
                <CardContent className="p-0">
                    <TaxDataTable 
                        data={data}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggleStatus={handleToggleStatus}
                        isLoading={isLoading}
                    />
                </CardContent>
            </Card>
            <TaxDataForm 
                isOpen={isFormOpen}
                onOpenChange={setIsFormOpen}
                onSave={handleSave}
                rule={selectedRule}
            />
        </div>
    )
}
