import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import App from './App';
import { CountryDetailsPage } from './features/countries/pages/CountryDetailsPage';
import { CountryListPage } from './features/countries/pages/CountryListPage';

const rootRoute = createRootRoute({
  component: App,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CountryListPage,
});

const countryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/country',
  component: CountryDetailsPage,
});

const routeTree = rootRoute.addChildren([indexRoute, countryRoute]);

export const router = createRouter({ routeTree });
