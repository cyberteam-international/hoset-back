/**
 * home-page router
 */

import { factories } from '@strapi/strapi';

const defaultRouter = factories.createCoreRouter('api::home-page.home-page');

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes.concat(extraRoutes);
      return routes;
    },
  };
};

const myExtraRoutes = [
  {
    method: 'GET',
    path: '/home-page/full',
    handler: 'api::home-page.home-page.findFull',
    config: {
      policies: ['api::home-page.is-public'],
      auth: false,
    },
  },
];

export default customRouter(defaultRouter, myExtraRoutes);
