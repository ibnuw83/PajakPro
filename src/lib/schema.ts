import { z } from 'zod';

export const formSchema = z.object({
  nilaiTransaksi: z.number({required_error: "Nilai transaksi harus diisi."}).min(1, 'Nilai transaksi harus lebih dari 0.'),
  jenisTransaksi: z.string({ required_error: 'Jenis transaksi harus dipilih.' }).min(1, 'Jenis transaksi harus dipilih.'),
  wp: z.string({ required_error: 'Wajib Pajak (WP) harus dipilih.' }).min(1, 'Wajib Pajak (WP) harus dipilih.'),
  fakturPajak: z.string({ required_error: 'Status faktur pajak harus dipilih.' }).min(1, 'Status faktur pajak harus dipilih.'),
  asnNonAsn: z.string(),
  golongan: z.string(),
  sertifikatKonstruksi: z.string(),
});

export const taxRuleSchema = z.object({
  jenisTransaksi: z.string().min(1, 'Jenis transaksi harus diisi.'),
  wp: z.string().nullable().default(null),
  fakturPajak: z.string().nullable().default(null),
  asnNonAsn: z.string().nullable().default(null),
  golongan: z.string().nullable().default(null),
  sertifikatKonstruksi: z.string().nullable().default(null),
  jenisPajak: z.string().nullable().default(null),
  kodePajakEbillingPPh: z.string().nullable(),
  dppRasio: z.string().nullable(),
  ptkp: z.string().nullable(),
  tarifPajak: z.string().nullable().default(null),
  kenaPpn: z.enum(['ya', 'tidak']).nullable().default('tidak'),
  kodePajakEbillingPpn: z.string().nullable(),
  status: z.enum(['aktif', 'non-aktif']).default('aktif'),
});
