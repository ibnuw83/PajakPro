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

export const getInfoContentById = async (id: string): Promise<InfoContentItem | undefined> => {
    const data = await getInfoContent();
    return data.find(item => item.id === id);
}
