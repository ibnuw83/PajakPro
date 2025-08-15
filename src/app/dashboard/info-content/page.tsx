'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getInfoContent } from '@/data/info-content';
import { type InfoContentItem } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function InfoContentPage() {
    const [contentItems, setContentItems] = useState<InfoContentItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);
            const content = await getInfoContent();
            setContentItems(content);
            setIsLoading(false);
        }
        fetchContent();
    }, []);

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Kelola Konten Informasi</h1>
                    <p className="text-muted-foreground">Konten ditampilkan di dropdown informasi. Untuk mengubah, edit `src/data/info-content.json`.</p>
                </div>
            </div>
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Judul</TableHead>
                                <TableHead>Deskripsi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                Array.from({length: 5}).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><Skeleton className='h-5 w-32'/></TableCell>
                                        <TableCell><Skeleton className='h-5 w-64'/></TableCell>
                                    </TableRow>
                                ))
                            ) : contentItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell className="text-muted-foreground">{item.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
