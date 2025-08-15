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

// This function now writes the updated data to the JSON file
export const updateTaxData = async (newData: TaxDataRow[]) => {
  try {
    const jsonString = JSON.stringify(newData, null, 2);
    await fs.writeFile(dataFilePath, jsonString, 'utf8');
    console.log("Tax data successfully updated in tax-data.json");
  } catch (error) {
    console.error("Error writing to tax data file:", error);
  }
};
