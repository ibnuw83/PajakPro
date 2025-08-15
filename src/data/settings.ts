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

// This function now writes the updated data to the JSON file
export const updateSettings = async (newSettings: Partial<AppSettings>): Promise<AppSettings> => {
    const currentSettings = await getSettings();
    const updatedSettings = { ...currentSettings, ...newSettings };
    try {
      const jsonString = JSON.stringify(updatedSettings, null, 2);
      await fs.writeFile(dataFilePath, jsonString, 'utf8');
      console.log("Settings successfully updated in settings.json");
    } catch (error) {
      console.error("Error writing to settings file:", error);
    }
    return updatedSettings;
};
