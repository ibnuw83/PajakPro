import { type TaxDataRow } from '@/lib/types';
import taxDataJson from './tax-data.json';

const initialTaxData: TaxDataRow[] = taxDataJson;

// This function now simply returns the imported data.
// In a real backend scenario, this would fetch from a database.
export const getTaxData = (): TaxDataRow[] => {
  return initialTaxData;
};

// This function is a placeholder and does not actually update the source file.
// To persist changes, the tax-data.json file must be manually edited
// or a proper backend API must be implemented.
export const updateTaxData = (newData: TaxDataRow[]) => {
  console.log("Simulating tax data update. In a real app, this would write to a DB or a file.");
  // To make this work locally without a backend, you'd need fs.writeFileSync,
  // but that's a server-side operation and won't work in the browser context
  // where this dashboard logic currently runs.
  // For the purpose of this prototype, we log the action.
  // The user would need to copy the newData and replace the content of tax-data.json
  console.log(JSON.stringify(newData, null, 2));
};

// We will simulate the update by creating a dummy file.
// In a real-world scenario, you would have a backend that handles this.
if (typeof window !== 'undefined') {
    (window as any).updateTaxData = (newData: TaxDataRow[]) => {
        console.log("Updating tax data in memory. This will not persist across reloads on a deployed server.");
        // This is a client-side "mock" of persistence.
        // It won't work on Vercel as expected.
        try {
            localStorage.setItem('pajakpro-tax-data', JSON.stringify(newData));
        } catch (e) {
            console.error("Could not save to localStorage", e);
        }
    };
     (window as any).getTaxData = () => {
        try {
            const stored = localStorage.getItem('pajakpro-tax-data');
            return stored ? JSON.parse(stored) : initialTaxData;
        } catch (e) {
            return initialTaxData;
        }
    }
}
