'use server';

import { type TaxDataRow } from '@/lib/types';
import taxDataJson from './tax-data.json';
import fs from 'fs/promises';
import path from 'path';

// Construct the absolute path to the JSON file
const dataFilePath = path.join(process.cwd(), 'src', 'data', 'tax-data.json');

// This function now reads the file on every call to ensure fresh data
export const getTaxData = async (): Promise<TaxDataRow[]> => {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading tax data file:", error);
    // Fallback to the imported JSON if reading file fails
    return taxDataJson as TaxDataRow[];
  }
};
