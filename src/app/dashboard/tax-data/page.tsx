'use client'

import { useState } from 'react';
import { TaxDataTable } from '@/components/tax-data-table';
import { initialTaxData } from '@/data/tax-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { TaxDataForm } from '@/components/tax-data-form';
import { type TaxDataRow } from '@/lib/types';


export default function TaxDataPage() {
    const [data, setData] = useState<TaxDataRow[]>(initialTaxData);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState<TaxDataRow | undefined>(undefined);

    const handleAdd = () => {
        setSelectedRule(undefined);
        setIsFormOpen(true);
    }

    const handleEdit = (rule: TaxDataRow) => {
        setSelectedRule(rule);
        setIsFormOpen(true);
    }

    const handleDelete = (ruleToDelete: TaxDataRow) => {
        setData(currentData => currentData.filter(rule => rule !== ruleToDelete));
    }

    const handleToggleStatus = (ruleToToggle: TaxDataRow) => {
        setData(currentData => currentData.map(rule => 
            rule === ruleToToggle 
            ? { ...rule, status: rule.status === 'aktif' ? 'non-aktif' : 'aktif' }
            : rule
        ));
    }

    const handleSave = (ruleToSave: TaxDataRow) => {
        if (selectedRule) { // Editing existing rule
            setData(currentData => currentData.map(rule => rule === selectedRule ? ruleToSave : rule));
        } else { // Adding new rule
            setData(currentData => [ruleToSave, ...currentData]);
        }
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
