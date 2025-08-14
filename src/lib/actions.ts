'use server';

import { taxGuidance, type TaxGuidanceInput } from '@/ai/flows/tax-guidance';

export async function getAIGuidance(input: TaxGuidanceInput) {
  try {
    const result = await taxGuidance(input);
    return { success: true, guidance: result.guidance };
  } catch (error) {
    console.error('Error getting AI guidance:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, guidance: null, error: `Gagal memuat saran AI: ${errorMessage}` };
  }
}
