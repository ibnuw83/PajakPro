import { getTaxData } from '@/data/tax-data';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function TransactionTypesPage() {
    const taxData = getTaxData();
    const transactionTypes = [...new Set(taxData.map(d => d.jenisTransaksi))];

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Jenis Transaksi</h1>
                    <p className="text-muted-foreground">Lihat semua jenis transaksi yang tersedia. Data ini diambil dari `src/data/tax-data.json`.</p>
                </div>
            </div>
            <Card>
                <CardContent className="p-0">
                   <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nama Jenis Transaksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactionTypes.map((type, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{type}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
