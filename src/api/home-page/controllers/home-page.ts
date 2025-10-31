/**
 * home-page controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::home-page.home-page",
  ({ strapi }) => ({
    async find(ctx) {
      const languageTag = ctx.query.language_tag; // Получаем language_tag из параметров

      try {
        // Формируем условие для фильтрации pages
        const pagesWhereCondition: any = {};

        if (languageTag) {
          pagesWhereCondition.current_language = {
            language_tag: languageTag,
          };
        }

        // Загружаем home-page со связанными страницами
        const entity = await strapi.db
          .query("api::home-page.home-page")
          .findOne({
            populate: {
              // Связанные страницы с необходимыми полями
              pages: {
                where: pagesWhereCondition,
                populate: {
                  HomePageMediaPreview: true, // Кастомное поле HomePageMediaPreview
                  HomePageLogo: true,
                  current_language: true,
                },
              },
            },
          });

        return { data: entity, meta: {} };
      } catch (error) {
        console.error("Error in find:", error);
        ctx.throw(500, "Internal Server Error");
      }
    },
  })
);
