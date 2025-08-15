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

interface TaxDataTableProps {
  data: TaxDataRow[];
}

export function TaxDataTable({ data }: TaxDataTableProps) {
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
        {data.map((row, index) => (
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
