'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getInfoContent } from '@/data/info-content';
import { type InfoContentItem } from '@/lib/types';
import { Edit } from 'lucide-react';

export default function InfoContentPage() {
    const router = useRouter();
    const [contentItems, setContentItems] = useState<InfoContentItem[]>([]);

    useEffect(() => {
        setContentItems(getInfoContent());
    }, []);

    const handleEdit = (id: string) => {
        router.push(`/dashboard/info-content/edit/${id}`);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Kelola Konten Informasi</h1>
                    <p className="text-muted-foreground">Ubah konten yang ditampilkan di dropdown informasi pada halaman utama.</p>
                </div>
            </div>
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Judul</TableHead>
                                <TableHead>Deskripsi</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contentItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell className="text-muted-foreground">{item.description}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(item.id)}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
