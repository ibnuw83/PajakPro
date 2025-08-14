import { z } from 'zod';

export const formSchema = z.object({
  nilaiTransaksi: z.number().min(1, 'Nilai transaksi harus diisi'),
  jenisTransaksi: z.string({ required_error: 'Jenis transaksi harus dipilih.' }),
  wp: z.string({ required_error: 'Wajib Pajak (WP) harus dipilih.' }),
  fakturPajak: z.string({ required_error: 'Status faktur pajak harus dipilih.' }),
  asnNonAsn: z.string(),
  golongan: z.string(),
  sertifikatKonstruksi: z.string(),
});
