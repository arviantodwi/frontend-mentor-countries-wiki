import { constructApi } from "@/shared/utils/api/constructApi";
import type { ApiOptions } from "@/types/api";
import type { Country } from "@/types/country";

type CompactCountry = Pick<Country, 'name' | 'population' | 'region' | 'capital' | 'flags'>;

/**
 * Fetches every country and returns the subset of fields required by the listing view.
 * @returns {Promise<CompactCountry[]>} Countries with basic metadata.
 */
export async function getAllCountries(): Promise<CompactCountry[]> {
  try {
    const fields: ApiOptions['fields'] = ['name', 'population', 'region', 'capital', 'flags'];
    const api = constructApi('/all', { fields });
    const response = await fetch(api.toString());

    if (!response.ok) {
      // TODO: Throw error if response.ok is false
      throw new Error('Error');
    }

    const data = (await response.json()) as Pick<
      Country,
      'name' | 'population' | 'region' | 'capital' | 'flags'
    >[];

    return data;
  } catch (error: unknown) {
    // TODO: Handle any error
    throw new Error('Error');
  }
}
