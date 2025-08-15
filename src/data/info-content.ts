'use server';

import { type InfoContentItem } from '@/lib/types';
import infoContentJson from './info-content.json';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'info-content.json');

// This function now reads the file on every call to ensure fresh data
export const getInfoContent = async (): Promise<InfoContentItem[]> => {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading info content file:", error);
    return infoContentJson as InfoContentItem[];
  }
};

// This function now writes the updated data to the JSON file
export const updateInfoContent = async (newData: InfoContentItem[]) => {
  try {
    const jsonString = JSON.stringify(newData, null, 2);
    await fs.writeFile(dataFilePath, jsonString, 'utf8');
    console.log("Info content successfully updated in info-content.json");
  } catch (error) {
    console.error("Error writing to info content file:", error);
  }
};

export const getInfoContentById = async (id: string): Promise<InfoContentItem | undefined> => {
    const data = await getInfoContent();
    return data.find(item => item.id === id);
}

export const updateInfoContentById = async (id: string, updatedItem: InfoContentItem) => {
    const data = await getInfoContent();
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index] = updatedItem;
        await updateInfoContent(data);
    }
}
