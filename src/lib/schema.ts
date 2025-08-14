import { z } from 'zod';

export const formSchema = z.object({
  nilaiTransaksi: z.number().min(1, 'Nilai transaksi harus diisi'),
  jenisTransaksi: z.string({ required_error: 'Jenis transaksi harus dipilih.' }).min(1, 'Jenis transaksi harus dipilih.'),
  wp: z.string({ required_error: 'Wajib Pajak (WP) harus dipilih.' }).min(1, 'Wajib Pajak (WP) harus dipilih.'),
  fakturPajak: z.string({ required_error: 'Status faktur pajak harus dipilih.' }).min(1, 'Status faktur pajak harus dipilih.'),
  asnNonAsn: z.string(),
  golongan: z.string(),
  sertifikatKonstruksi: z.string(),
});

export const taxRuleSchema = z.object({
  jenisTransaksi: z.string().min(1, 'Jenis transaksi harus diisi.'),
  wp: z.string(),
  fakturPajak: z.string().nullable(),
  asnNonAsn: z.string().nullable(),
  golongan: z.string().nullable(),
  sertifikatKonstruksi: z.string().nullable(),
  jenisPajak: z.string().nullable(),
  kodePajakEbillingPPh: z.string().nullable(),
  dppRasio: z.string().nullable(),
  ptkp: z.string().nullable(),
  tarifPajak: z.string().nullable(),
  kenaPpn: z.string().nullable(),
  kodePajakEbillingPpn: z.string().nullable(),
  status: z.enum(['aktif', 'non-aktif']),
});
