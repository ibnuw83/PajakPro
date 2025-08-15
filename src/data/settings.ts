import settingsJson from './settings.json';

export type AppSettings = {
    title: string;
    description: string;
    logoUrl: string;
    footerText: string;
};

const defaultSettings: AppSettings = settingsJson;

// This function now simply returns the imported data.
export const getSettings = (): AppSettings => {
    return defaultSettings;
};

// This function is a placeholder for a real backend operation.
export const updateSettings = (newSettings: Partial<AppSettings>): AppSettings => {
    const currentSettings = getSettings();
    const updatedSettings = { ...currentSettings, ...newSettings };
    console.log("Simulating settings update.");
    console.log(JSON.stringify(updatedSettings, null, 2));
    return updatedSettings;
};
