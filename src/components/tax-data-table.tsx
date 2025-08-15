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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Power, PowerOff } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";


interface TaxDataTableProps {
  data: TaxDataRow[];
  onEdit: (rule: TaxDataRow) => void;
  onDelete: (rule: TaxDataRow) => void;
  onToggleStatus: (rule: TaxDataRow) => void;
}

export function TaxDataTable({ data, onEdit, onDelete, onToggleStatus }: TaxDataTableProps) {
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
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium max-w-xs truncate">{row.jenisTransaksi}</TableCell>
            <TableCell>{row.wp || "-"}</TableCell>
            <TableCell>
              <Badge variant="outline">{row.jenisPajak || "-"}</Badge>
            </TableCell>
            <TableCell>{row.tarifPajak || "-"}</TableCell>
            <TableCell>
               <Badge variant={row.kenaPpn === 'ya' ? 'default' : 'secondary'}>
                {row.kenaPpn?.toUpperCase() || 'TIDAK'}
              </Badge>
            </TableCell>
             <TableCell>
              <Badge variant={row.status === 'aktif' ? 'default' : 'destructive'}>
                {row.status?.toUpperCase() || 'NON-AKTIF'}
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
                    <DropdownMenuItem onClick={() => onEdit(row)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onToggleStatus(row)}>
                        {row.status === 'aktif' ? (
                            <>
                                <PowerOff className="mr-2 h-4 w-4" /> Nonaktifkan
                            </>
                        ) : (
                            <>
                                <Power className="mr-2 h-4 w-4" /> Aktifkan
                            </>
                        )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                             <Button variant="ghost" className="w-full justify-start text-sm text-red-500 hover:text-red-600 px-2 py-1.5 font-normal hover:bg-red-50 dark:hover:bg-red-900/20">
                                <Trash2 className="mr-2 h-4 w-4" /> Hapus
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Tindakan ini tidak dapat dibatalkan. Ini akan menghapus aturan pajak secara permanen.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDelete(row)} className="bg-destructive hover:bg-destructive/90">Hapus</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
