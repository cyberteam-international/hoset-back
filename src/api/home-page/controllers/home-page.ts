/**
 * home-page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::home-page.home-page', ({ strapi }) => ({
  async findFull(ctx) {
    try {
      // Попробуем использовать более универсальный подход
      let entity;
      
      try {
        // Сначала пробуем с плагином populate-deep
        entity = await strapi.db.query('api::home-page.home-page').findOne({
          populate: {
            SEO: {
              populate: '*'
            },
            Sections: {
              populate: '*'
            }
          }
        });
      } catch (error) {
        console.log('Trying with manual populate...');
        // Fallback: используем детальный populate вручную
        entity = await strapi.db.query('api::home-page.home-page').findOne({
          populate: {
            SEO: {
              populate: {
                MetaImage: true,
                Keywords: true
              }
            },
            Sections: {
              populate: {
                // Hero Section
                Image: true,
                Button: true,
                // About Section - Image уже включен выше
                // Customers Section
                CustomersBlocks: {
                  populate: {
                    CustomersBlockIconUp: true,
                    CustomersBlockIconCenter: true,
                    CustomersBlockIconDown: true
                  }
                },
                // Included Section
                IncludedBoxes: {
                  populate: {
                    Image: true
                  }
                }
              }
            }
          }
        });
      }

      return { data: entity, meta: {} };
    } catch (error) {
      console.error('Error in findFull:', error);
      ctx.throw(500, 'Internal Server Error');
    }
  }
}));
