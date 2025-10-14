/**
 * home-page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::home-page.home-page', ({ strapi }) => ({
  async find(ctx) {
    try {
      // Загружаем home-page со связанными страницами
      const entity = await strapi.db.query('api::home-page.home-page').findOne({
        populate: {
          // Связанные страницы с необходимыми полями
          pages: {
            populate: {
              HomePageMediaPreview: true, // Кастомное поле HomePageMediaPreview
            }
          }
        }
      });

      return { data: entity, meta: {} };
    } catch (error) {
      console.error('Error in find:', error);
      ctx.throw(500, 'Internal Server Error');
    }
  }
}));
