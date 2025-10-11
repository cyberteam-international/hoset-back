/**
 * home-page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::home-page.home-page', ({ strapi }) => ({
  async findFull(ctx) {
    try {
      // Используем детальный populate для полного контроля
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
              },
              // Content Section
              Rows: {
                populate: {
                  Image: true,
                  Image2: true
                }
              }
            }
          }
        }
      });

      return { data: entity, meta: {} };
    } catch (error) {
      console.error('Error in findFull:', error);
      ctx.throw(500, 'Internal Server Error');
    }
  }
}));
