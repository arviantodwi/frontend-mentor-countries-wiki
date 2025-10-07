import type { ApiOptions, ApiRoute, ApiRouteOption } from '../../types/api';

const BASE_API_URL = new URL('https://restcountries.com/v3.1');

/**
 * Constructs a REST Countries API URL for the provided route and options.
 *
 * @template T extends ApiRoute
 * @param {T} route Target API route.
 * @param {ApiRouteOption<T>} option Parameters that customize the request.
 * @returns {URL} Fully composed request URL.
 */
export function constructApi<T extends ApiRoute>(route: T, option: ApiRouteOption<T>): URL {
  const baseUrl = new URL(`${BASE_API_URL}${route}`);

  const { codes, fields, fullText, pathParam, status } = option as ApiOptions;

  if (pathParam) {
    if (route === '/alpha' && codes?.length) {
      baseUrl.searchParams.set('codes', codes.join(','));
    } else {
      baseUrl.pathname = `${baseUrl.pathname}/${pathParam.toLowerCase()}`;
    }
  }

  if (fullText !== undefined) {
    baseUrl.searchParams.set('fullText', String(fullText));
  }

  if (status !== undefined) {
    baseUrl.searchParams.set('status', String(status));
  }

  if (fields?.length && fields.length <= 10) {
    const unifiedFields = Array.from(new Set(fields)).join(',');
    baseUrl.searchParams.set('fields', unifiedFields);
  } else {
    throw new Error('The number of fields cannot exceed 10');
  }

  return baseUrl;
}
