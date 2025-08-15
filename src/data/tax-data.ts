import { type TaxDataRow } from '@/lib/types';
import taxDataJson from './tax-data.json';

// This function now returns the imported JSON directly.
// It is no longer async and does not access the filesystem.
export const getTaxData = (): TaxDataRow[] => {
  return taxDataJson as TaxDataRow[];
};
