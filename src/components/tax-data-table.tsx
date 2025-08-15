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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "./ui/skeleton";

interface TaxDataTableProps {
  data: TaxDataRow[];
  onEdit: (rule: TaxDataRow) => void;
  onDelete: (rule: TaxDataRow) => void;
  onToggleStatus: (rule: TaxDataRow) => void;
  isLoading: boolean;
}

export function TaxDataTable({ data, onEdit, onDelete, onToggleStatus, isLoading }: TaxDataTableProps) {
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
        {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-12" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
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
                        <DropdownMenuItem onClick={() => onEdit(row)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onToggleStatus(row)}>
                            {row.status === 'aktif' ? 'Non-aktifkan' : 'Aktifkan'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                               <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                    className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                >
                                    Hapus
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Tindakan ini tidak dapat dibatalkan. Ini akan menghapus aturan pajak secara permanen dari data.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction onClick={() => onDelete(row)}>Hapus</AlertDialogAction>
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
