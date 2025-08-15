import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getInfoContent } from '@/data/info-content';
import { type InfoContentItem } from '@/lib/types';

export default function InfoContentPage() {
    const contentItems: InfoContentItem[] = getInfoContent();

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Kelola Konten Informasi</h1>
                    <p className="text-muted-foreground">Konten berikut ditampilkan di dropdown informasi pada halaman utama. Untuk mengubahnya, silakan edit file `src/data/info-content.json` secara langsung.</p>
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
                            {contentItems.map((item) => (
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
