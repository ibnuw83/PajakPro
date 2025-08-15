import { type InfoContentItem } from '@/lib/types';
import infoContentJson from './info-content.json';

// This function now returns the imported JSON directly.
// It is no longer async and does not access the filesystem.
export const getInfoContent = (): InfoContentItem[] => {
  return infoContentJson as InfoContentItem[];
};

export const getInfoContentById = (id: string): InfoContentItem | undefined => {
    const data = getInfoContent();
    return data.find(item => item.id === id);
}
