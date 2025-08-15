'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TaxDataTable } from '@/components/tax-data-table';
import { TaxDataForm } from '@/components/tax-data-form';
import { getTaxData } from '@/data/tax-data';
import { Card, CardContent } from '@/components/ui/card';
import { type TaxDataRow } from '@/lib/types';
import { PlusCircle } from 'lucide-react';


export default function TaxDataPage() {
    // NOTE: In a real app, this would be a fetch call to an API.
    // For this prototype, we'll manage state locally.
    const [data, setData] = useState<TaxDataRow[]>(getTaxData());
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState<TaxDataRow | undefined>(undefined);

    const handleSave = (ruleToSave: TaxDataRow) => {
        // This is a mock implementation. In a real app, you would send this to an API.
        const ruleExists = data.some(rule => rule.jenisTransaksi === ruleToSave.jenisTransaksi && JSON.stringify(rule) === JSON.stringify(ruleToSave));

        if (selectedRule) { // Editing existing rule
             setData(data.map(rule => rule === selectedRule ? ruleToSave : rule));
        } else if (!ruleExists) { // Adding new rule
             setData([ruleToSave, ...data]);
        }
        
        setIsFormOpen(false);
        setSelectedRule(undefined);
    };

    const handleEdit = (rule: TaxDataRow) => {
        setSelectedRule(rule);
        setIsFormOpen(true);
    };

    const handleDelete = (ruleToDelete: TaxDataRow) => {
        // This is a mock implementation. In a real app, you would send this to an API.
        setData(data.filter(rule => rule !== ruleToDelete));
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
                    <PlusCircle className="mr-2" />
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
            />
        </div>
    )
}
