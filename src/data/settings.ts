export type AppSettings = {
    title: string;
    description: string;
    logoUrl: string;
    footerText: string;
};

const SETTINGS_KEY = 'pajakpro-settings';

const defaultSettings: AppSettings = {
    title: 'PajakPro',
    description: 'Asisten Pajak Cerdas Anda',
    logoUrl: '',
    footerText: '© {year} PajakPro. Dibuat untuk kemudahan perhitungan pajak.',
};

export const getSettings = (): AppSettings => {
    if (typeof window === 'undefined') {
        return defaultSettings;
    }
    try {
        const storedSettings = localStorage.getItem(SETTINGS_KEY);
        if (storedSettings) {
            // Merge stored settings with defaults to ensure all keys are present
            const parsed = JSON.parse(storedSettings);
            return { ...defaultSettings, ...parsed };
        }
    } catch (error) {
        console.error("Failed to parse settings from localStorage", error);
    }
    return defaultSettings;
};

export const updateSettings = (newSettings: Partial<AppSettings>): AppSettings => {
    const currentSettings = getSettings();
    const updatedSettings = { ...currentSettings, ...newSettings };
     if (typeof window !== 'undefined') {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(updatedSettings));
     }
    return updatedSettings;
};
