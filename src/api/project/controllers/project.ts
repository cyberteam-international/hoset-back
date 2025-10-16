/**
 * project controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::project.project', ({ strapi }) => ({
  async find(ctx) {
    // Проверяем, есть ли slug в query параметрах
    if (ctx.query.slug) {
      const slug = ctx.query.slug;
      
      // Используем детальный populate для полного контроля
      const entity = await strapi.db.query('api::project.project').findOne({
        where: { slug },
        populate: {
          SEO: {
            populate: {
              MetaImage: true,
              Keywords: true
            }
          },
          MediaPreview: true,
          category_of_projects: {
            fields: ['Name', 'slug'] // Загружаем только нужные поля категорий
          },
          Sections: {
            populate: {
              // Hero Section
              Image: true,
              Button: true,
              // About Section - поддержка универсального поля Media для изображений и видео
              Media: true,
              Description: true,
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
              // Text Section
              TextItems: {
                populate: true
              }
            }
          }
        }
      });

      if (!entity) {
        return ctx.notFound('Project not found');
      }

      return { data: entity, meta: {} };
    }
    
    // Если нет slug, используем кастомный find с populate для категорий
    ctx.query = {
      ...ctx.query,
      populate: {
        category_of_projects: {
          fields: ['Name', 'slug']
        },
        MediaPreview: true
      }
    };
    
    return await super.find(ctx);
  }
}));
