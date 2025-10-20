/**
 * page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::page.page', ({ strapi }) => ({
  async find(ctx) {
    // Проверяем, есть ли slug в query параметрах
    if (ctx.query.slug) {
      const slug = ctx.query.slug;
      
      // Используем детальный populate для полного контроля
      const entity = await strapi.db.query('api::page.page').findOne({
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
              // About Section - поддержка универсального поля Media для изображений и видео
              Media: true,
              MobileMedia: true,
              Description: true,
              UnicFontSizeForTitle: true,
              UnicFontSizeForTitileMobile: true,
              // Customers Section
              CustomersBlocks: {
                populate: {
                  CustomersBlockIconUp: true,
                  CustomersBlockIconCenter: true,
                  CustomersBlockIconDown: true
                }
              },
              // Included Section
              lightVersion: true,
              
              IncludedBoxes: {
                populate: {
                  Image: true,
                  Button: true
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
                  Image: true,
                  Media: true,
                  Button: true
                }
              },
              // Content Section
              Rows: {
                populate: {
                  Image: true,
                  Image2: true
                }
              },
              // Projects List Section
              Projects: {
                populate: {
                  category_of_projects: {
                    fields: ['Name', 'slug']
                  },
                  MediaPreview: true,
                  SEO: {
                    populate: {
                      MetaImage: true,
                      Keywords: true
                    }
                  }
                }
              }
            }
          }
        }
      });

      if (!entity) {
        return ctx.notFound('Page not found');
      }

      return { data: entity, meta: {} };
    }
    
    // Если нет slug, используем стандартный find
    return await super.find(ctx);
  }
}));
