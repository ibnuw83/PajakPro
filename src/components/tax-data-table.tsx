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
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";

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
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{row.jenisTransaksi}</TableCell>
            <TableCell>{row.wp}</TableCell>
            <TableCell>
              <Badge variant="outline">{row.jenisPajak}</Badge>
            </TableCell>
            <TableCell>{row.tarifPajak}</TableCell>
            <TableCell>
              <Badge variant={row.kenaPpn === 'ya' ? 'default' : 'secondary'}>
                {row.kenaPpn?.toUpperCase()}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Buka menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
