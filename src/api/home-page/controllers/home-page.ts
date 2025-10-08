/**
 * home-page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::home-page.home-page', ({ strapi }) => ({
  async findFull(ctx) {
    try {
      // Используем плагин populate-deep для автоматического populate всего
      const populateDeepPlugin = strapi.plugin('populate-deep');
      
      if (populateDeepPlugin) {
        // Если плагин доступен, используем его
        const entity = await strapi.entityService.findMany('api::home-page.home-page', {
          populate: populateDeepPlugin.service('populate-deep').buildPopulateDeep('api::home-page.home-page')
        });
        
        const data = Array.isArray(entity) ? entity[0] : entity;
        return { data, meta: {} };
      } else {
        // Fallback: используем максимально глубокий populate вручную
        const entity = await strapi.db.query('api::home-page.home-page').findOne({
          populate: {
            SEO: {
              populate: {
                MetaImage: true,
                Keywords: true
              }
            },
            Sections: {
              populate: {
                Image: true,
                Button: true,
                CustomersBlocks: {
                  populate: {
                    CustomersBlockIconUp: true,
                    CustomersBlockIconCenter: true,
                    CustomersBlockIconDown: true
                  }
                }
              }
            }
          }
        });

        return { data: entity, meta: {} };
      }
    } catch (error) {
      console.error('Error in findFull:', error);
      ctx.throw(500, 'Internal Server Error');
    }
  }
}));
