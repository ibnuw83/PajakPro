import settingsJson from './settings.json';

export type AppSettings = {
    title: string;
    description: string;
    logoUrl: string;
    footerText: string;
};

// This function now returns the imported JSON directly.
// It is no longer async and does not access the filesystem.
export const getSettings = (): AppSettings => {
  return settingsJson;
};
