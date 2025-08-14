export type TaxDataRow = {
  jenisTransaksi: string;
  wp: string;
  fakturPajak: string | null;
  asnNonAsn: string | null;
  golongan: string | null;
  sertifikatKonstruksi: string | null;
  jenisPajak: string | null;
  kodePajakEbillingPPh: string | null;
  dppRasio: string | null;
  ptkp: string | null;
  tarifPajak: string | null;
  kenaPpn: string | null;
  kodePajakEbillingPpn: string | null;
  status?: 'aktif' | 'non-aktif';
};

export interface CalculationResult {
  matchedRule: TaxDataRow;
  nilaiTransaksi: number;
  dpp: number;
  pph: number;
  ppn: number;
  totalPajak: number;
  totalBayar: number;
}
