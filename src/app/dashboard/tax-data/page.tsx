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
    // Use window.getTaxData if it exists (for local simulation), otherwise fallback to static import
    const dataSource = typeof window !== 'undefined' && (window as any).getTaxData ? (window as any).getTaxData : getTaxData;
    const dataUpdater = typeof window !== 'undefined' && (window as any).updateTaxData ? (window as any).updateTaxData : updateTaxData;


    const [data, setData] = useState<TaxDataRow[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState<TaxDataRow | undefined>(undefined);

    useEffect(() => {
        setData(dataSource());
    }, [dataSource]);

    const refreshData = () => {
        const freshData = dataSource();
        setData(freshData);
    }

    const handleAdd = () => {
        setSelectedRule(undefined);
        setIsFormOpen(true);
    }

    const handleEdit = (rule: TaxDataRow) => {
        setSelectedRule(rule);
        setIsFormOpen(true);
    }

    const handleDelete = (ruleToDelete: TaxDataRow) => {
        const currentData = dataSource();
        const updatedData = currentData.filter(rule => 
            JSON.stringify(rule) !== JSON.stringify(ruleToDelete)
        );
        dataUpdater(updatedData);
        refreshData();
    }

    const handleToggleStatus = (ruleToToggle: TaxDataRow) => {
        const currentData = dataSource();
        const updatedData = currentData.map(rule => 
            JSON.stringify(rule) === JSON.stringify(ruleToToggle) 
            ? { ...rule, status: rule.status === 'aktif' ? 'non-aktif' : 'aktif' }
            : rule
        );
        dataUpdater(updatedData);
        refreshData();
    }

    const handleSave = (ruleToSave: TaxDataRow) => {
        const currentData = dataSource();
        let updatedData;
        if (selectedRule) { // Editing existing rule
            updatedData = currentData.map(rule => 
                JSON.stringify(rule) === JSON.stringify(selectedRule) ? ruleToSave : rule
            );
        } else { // Adding new rule
            updatedData = [ruleToSave, ...currentData];
        }
        dataUpdater(updatedData);
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
