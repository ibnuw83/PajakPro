import { type TaxDataRow } from '@/lib/types';
import taxDataJson from './tax-data.json';

// This function now returns the imported JSON directly, adding a unique ID to each row.
// It is no longer async and does not access the filesystem.
export const getTaxData = (): TaxDataRow[] => {
  return taxDataJson.map((row, index) => ({
    ...row,
    id: `rule-${index}-${Date.now()}` // Add a simple unique ID
  })) as TaxDataRow[];
};
