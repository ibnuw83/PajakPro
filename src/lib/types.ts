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
};

export interface CalculationResult {
  matchedRule: TaxDataRow;
  nilaiTransaksi: number;
  dpp: number;
  pph: number;
  ppn: number;
  totalBayar: number;
  aiGuidance: string;
}
