import type { Country } from './country';

type Endpoints =
  | 'independent'
  | 'all'
  | 'name'
  | 'alpha'
  | 'currency'
  | 'demonym'
  | 'lang'
  | 'capital'
  | 'region'
  | 'subregion'
  | 'translation';

export type ApiRoute = `/${Endpoints}`;

type EndpointFromRoute<T extends ApiRoute> = T extends `/${infer E}` ? E : never;

export type ApiOptions = {
  /**
   * Common option, applicable for any routes.
   */
  fields?: (keyof Country)[];
  /**
   * Applicable for these routes:
   * - `/name`
   * - `/alpha`
   * - `/currency`
   * - `/demonym`
   * - `/lang`
   * - `/capital`
   * - `/region`
   * - `/subregion`
   * - `/translation`
   */
  pathParam?: string;
  /**
   * Applicable for the `/independent` route.
   */
  status?: boolean;
  /**
   * Applicable for the `/name` route.
   */
  fullText?: boolean;
  /**
   * Applicable for the `/alpha` route. Cannot be used simultaneously with `pathParam`.
   */
  codes?: string[];
};

type BaseOptions = Pick<ApiOptions, 'fields'>;

type ApiRouteOptionByEndpoint<T extends Endpoints> = T extends 'independent'
  ? BaseOptions & Pick<ApiOptions, 'status'>
  : T extends 'all'
    ? BaseOptions
    : T extends 'name'
      ? BaseOptions & Pick<ApiOptions, 'pathParam' | 'fullText'>
      : T extends 'alpha'
        ? BaseOptions & Pick<ApiOptions, 'pathParam' | 'codes'>
        : T extends Omit<Endpoints, 'independent' | 'all' | 'name' | 'alpha'>
          ? BaseOptions & Pick<ApiOptions, 'pathParam'>
          : never;

export type ApiRouteOption<T extends ApiRoute> = ApiRouteOptionByEndpoint<EndpointFromRoute<T>>;
