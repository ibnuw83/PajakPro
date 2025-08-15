import { type InfoContentItem } from '@/lib/types';
import infoContentJson from './info-content.json';


const initialInfoContent: InfoContentItem[] = infoContentJson;


// This function now simply returns the imported data.
export const getInfoContent = (): InfoContentItem[] => {
  return initialInfoContent;
};

// This function is a placeholder for a real backend operation.
export const updateInfoContent = (newData: InfoContentItem[]) => {
  console.log("Simulating info content update.");
  console.log(JSON.stringify(newData, null, 2));
};

export const getInfoContentById = (id: string): InfoContentItem | undefined => {
    const data = getInfoContent();
    return data.find(item => item.id === id);
}

export const updateInfoContentById = (id: string, updatedItem: InfoContentItem) => {
    const data = getInfoContent();
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index] = updatedItem;
        updateInfoContent(data);
    }
}