type CountryName = {
  common: string;
  official: string;
};

type CountryCurrency = Record<string, { symbol: string; name: string }>;

type CountryDemonyms = Record<string, { f: string; m: string }>;

type CountryMaps = { googleMaps: string; openStreetMaps: string };

type Continent =
  | 'Europe'
  | 'South America'
  | 'Africa'
  | 'Asia'
  | 'North America'
  | 'Oceania'
  | 'Antarctica';

type Region = 'Europe' | 'Americas' | 'Africa' | 'Asia' | 'Oceania' | 'Antarctic';

type Subregion =
  | 'Australia and New Zealand'
  | 'Caribbean'
  | 'Central America'
  | 'Central Asia'
  | 'Central Europe'
  | 'Eastern Africa'
  | 'Eastern Asia'
  | 'Eastern Europe'
  | 'Melanesia'
  | 'Micronesia'
  | 'Middle Africa'
  | 'North America'
  | 'Northern Africa'
  | 'Northern Europe'
  | 'Polynesia'
  | 'South America'
  | 'South-Eastern Asia'
  | 'Southeast Europe'
  | 'Southern Africa'
  | 'Southern Asia'
  | 'Southern Europe'
  | 'Western Africa'
  | 'Western Asia'
  | 'Western Europe'
  | null;

type StaticImageMap = { png: string; svg: string };

export type Country = {
  name: CountryName & { nativeName?: Record<string, CountryName> };
  tld: string[];
  cca2: string;
  cca3: string;
  ccn3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: CountryCurrency;
  idd: { root: string; suffixes: string[] };
  capital: string[];
  altSpellings: string[];
  region: Region;
  subregion: Subregion;
  languages: Record<string, string>;
  latlng: [number, number];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: CountryDemonyms;
  translations: Record<string, CountryName>;
  flag: string;
  flags: StaticImageMap & { alt?: string };
  maps: CountryMaps;
  population: number;
  gini: Record<string, number>;
  fifa: string;
  car: { signs: string[]; side: 'left' | 'right' };
  timezones: string[];
  continents: Continent[];
  coatOfArms: StaticImageMap;
  startOfWeek: string;
  capitalInfo: { latlng: [number, number] };
  postalCode: { format: string; regex: string };
};
