import { type z } from 'zod';
import { type TaxDataRow } from './types';
import { type formSchema } from './schema';

function checkPtkp(ptkp: string | null, value: number) {
  if (!ptkp) return true; // No PTKP condition means it applies to all values

  if (ptkp.startsWith('> ')) {
    const limit = parseFloat(ptkp.replace('> ', ''));
    return value > limit;
  }

  if (ptkp.includes('-')) {
    const [min, max] = ptkp.split('-').map(parseFloat);
    return value > min && value <= max;
  }

  return false;
}

export function findMatchingRule(values: z.infer<typeof formSchema>, data: TaxDataRow[]): TaxDataRow | undefined {
    return data.find(rule => {
        // Only match active rules
        if (rule.status === 'non-aktif') {
            return false;
        }

        const isHonor = values.jenisTransaksi.includes('Honor');
        const isConstruction = values.jenisTransaksi.includes('Konstruksi') || values.jenisTransaksi.includes('Pemeliharaan Bangunan');

        const ptkpMatch = checkPtkp(rule.ptkp, values.nilaiTransaksi);
        const jenisTransaksiMatch = rule.jenisTransaksi === values.jenisTransaksi;
        const wpMatch = rule.wp === values.wp;
        const fakturPajakMatch = rule.fakturPajak === null || rule.fakturPajak === values.fakturPajak;
        
        const asnMatch = !isHonor || rule.asnNonAsn === null || rule.asnNonAsn === values.asnNonAsn;
        const golonganMatch = !isHonor || values.asnNonAsn !== 'ASN' || rule.golongan === null || rule.golongan === values.golongan;
        const sertifikatMatch = !isConstruction || rule.sertifikatKonstruksi === null || rule.sertifikatKonstruksi === values.sertifikatKonstruksi;

        return ptkpMatch && jenisTransaksiMatch && wpMatch && fakturPajakMatch && asnMatch && golonganMatch && sertifikatMatch;
    });
}

export function calculateTaxes(nilaiTransaksi: number, rule: TaxDataRow) {
    let dpp = 0;
    if (rule.dppRasio) {
        const [pembilang, penyebut] = rule.dppRasio.split('/').map(Number);
        if (penyebut !== 0) {
            dpp = nilaiTransaksi * (pembilang / penyebut);
        }
    }

    let pph = 0;
    if (rule.tarifPajak) {
        const tarif = parseFloat(rule.tarifPajak.replace(',', '.').replace('%', '')) / 100;
        pph = dpp * tarif;
    }

    const ppn = rule.kenaPpn === 'ya' ? dpp * 0.11 : 0;
    
    // totalBayar is the net amount received by the provider/vendor
    const totalBayar = nilaiTransaksi - pph;
    const totalPajak = pph + ppn;

    return {
        matchedRule: rule,
        nilaiTransaksi,
        dpp,
        pph,
        ppn,
        totalPajak,
        totalBayar,
    }
}
