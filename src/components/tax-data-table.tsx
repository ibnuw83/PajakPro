'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { type TaxDataRow } from "@/lib/types"
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";

interface TaxDataTableProps {
  data: TaxDataRow[];
  isLoading: boolean;
}

export function TaxDataTable({ data, isLoading }: TaxDataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Jenis Transaksi</TableHead>
          <TableHead>WP</TableHead>
          <TableHead>Jenis Pajak</TableHead>
          <TableHead>Tarif</TableHead>
          <TableHead>Kena PPN</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-12" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                </TableRow>
            ))
        ) : data.map((row, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium max-w-xs truncate">{row.jenisTransaksi}</TableCell>
            <TableCell>{row.wp}</TableCell>
            <TableCell>
              <Badge variant="outline">{row.jenisPajak}</Badge>
            </TableCell>
            <TableCell>{row.tarifPajak}</TableCell>
            <TableCell>
               <Badge variant={row.kenaPpn === 'ya' ? 'default' : 'secondary'}>
                {row.kenaPpn?.toUpperCase() || 'TIDAK'}
              </Badge>
            </TableCell>
             <TableCell>
              <Badge variant={row.status === 'aktif' ? 'default' : 'secondary'}>
                {row.status?.toUpperCase() || 'AKTIF'}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
