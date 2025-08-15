'use server';

import settingsJson from './settings.json';
import fs from 'fs/promises';
import path from 'path';

export type AppSettings = {
    title: string;
    description: string;
    logoUrl: string;
    footerText: string;
};

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'settings.json');

// This function now reads the file on every call to ensure fresh data
export const getSettings = async (): Promise<AppSettings> => {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading settings file:", error);
    return settingsJson;
  }
};
