'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { TaxDataTable } from '@/components/tax-data-table';
import { TaxDataForm } from '@/components/tax-data-form';
import { getTaxData } from '@/data/tax-data';
import { Card, CardContent } from '@/components/ui/card';
import { type TaxDataRow } from '@/lib/types';
import { PlusCircle } from 'lucide-react';

const TAX_RULES_STORAGE_KEY = 'taxData';
const TRANSACTION_TYPES_STORAGE_KEY = 'transactionTypes';


export default function TaxDataPage() {
    const [data, setData] = useState<TaxDataRow[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState<TaxDataRow | undefined>(undefined);
    const [transactionTypes, setTransactionTypes] = useState<string[]>([]);

    useEffect(() => {
        // Load tax rules
        const storedRules = window.localStorage.getItem(TAX_RULES_STORAGE_KEY);
        const initialRules = storedRules ? (JSON.parse(storedRules) as TaxDataRow[]) : getTaxData();
        setData(initialRules);
        
        // Load transaction types
        const storedTypes = window.localStorage.getItem(TRANSACTION_TYPES_STORAGE_KEY);
        if (storedTypes) {
            setTransactionTypes(JSON.parse(storedTypes));
        } else {
            // If no stored types, derive from initial rules and then store it
            const initialTypes = [...new Set(initialRules.map((d: TaxDataRow) => d.jenisTransaksi))].sort();
            setTransactionTypes(initialTypes);
            window.localStorage.setItem(TRANSACTION_TYPES_STORAGE_KEY, JSON.stringify(initialTypes));
        }

    }, []);

    const updateData = (updatedData: TaxDataRow[]) => {
        setData(updatedData);
        try {
            window.localStorage.setItem(TAX_RULES_STORAGE_KEY, JSON.stringify(updatedData));
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
        // Deleting a rule does NOT affect the master list of transaction types.
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
