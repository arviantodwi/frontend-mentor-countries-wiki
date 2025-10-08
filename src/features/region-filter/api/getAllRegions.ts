import { constructApi } from '@/shared/utils/api/constructApi';
import type { Country } from '@/types/country';

/**
 * Fetches all countries and returns a list of unique region names or `null` if the request fails.
 * @returns {Promise<string[]>} Unique region names derived from the countries API.
 */
export async function getAllRegions(): Promise<string[]> {
  try {
    const api = constructApi('/all', { fields: ['region'] });
    const response = await fetch(api.toString());

    if (!response.ok) {
      // TODO: Throw error if response.ok is false
      throw new Error('Error');
    }

    const data = (await response.json()) as Pick<Country, 'region'>[];
    const regionList = data.map(({ region }) => region);

    return Array.from(new Set(regionList));
  } catch (error: unknown) {
    // TODO: Handle any error
    throw new Error('Error');
  }
}
