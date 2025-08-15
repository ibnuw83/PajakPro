import { z } from "zod";
import { formSchema } from "./schema";

export type FormValues = z.infer<typeof formSchema>;

export type TaxDataRow = {
  jenisTransaksi: string;
  wp: string | null;
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

export type InfoContentSection = {
  trigger: string;
  content: string;
  type: 'list' | 'paragraph' | 'table';
};

export type InfoContentItem = {
  id: string;
  title: string;
  description: string;
  sections: InfoContentSection[];
};
