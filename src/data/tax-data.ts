import { type TaxDataRow } from '@/lib/types';
import taxDataJson from './tax-data.json';

let taxData: TaxDataRow[] = taxDataJson;

// This function now simply returns the in-memory data.
// In a real backend scenario, this would fetch from a database.
export const getTaxData = (): TaxDataRow[] => {
  // In a client-side only app, we can't easily read the file system after the initial load.
  // We'll work with an in-memory version.
  return taxData;
};

// This function updates the in-memory representation.
// In a real app, this would write to a DB or a file on the server.
export const updateTaxData = (newData: TaxDataRow[]) => {
  console.log("Simulating tax data update. Data is updated in memory for this session.");
  taxData = newData;
  // NOTE: This will NOT update the actual tax-data.json file.
  // A proper backend API would be needed to persist changes across deployments.
  console.log(JSON.stringify(newData, null, 2));
};
