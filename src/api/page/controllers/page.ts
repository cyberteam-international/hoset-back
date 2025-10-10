/**
 * page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::page.page', ({ strapi }) => ({
  async find(ctx) {
    // Проверяем, есть ли slug в query параметрах
    if (ctx.query.slug) {
      const slug = ctx.query.slug;
      
      let entity;
      
      try {
        // Сначала пробуем с универсальным populate
        entity = await strapi.db.query('api::page.page').findOne({
          where: { slug },
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
        entity = await strapi.db.query('api::page.page').findOne({
          where: { slug },
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
                },
                // Video Section
                Video: true,
                MobileVideo: true,
                // Big Gallery Section
                Gallary: true,
                // Advantages Section (поддерживает обе версии)
                AdvantagesBoxes: {
                  populate: {
                    Icon: true
                  }
                },
                // Call To Action Section
                CallToActionItems: {
                  populate: true
                },
                // Gallery Section
                GallaryItems: {
                  populate: {
                    Image: true
                  }
                }
              }
            }
          }
        });
      }

      if (!entity) {
        return ctx.notFound('Page not found');
      }

      return { data: entity, meta: {} };
    }
    
    // Если нет slug, используем стандартный find
    return await super.find(ctx);
  }
}));
