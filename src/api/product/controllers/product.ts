/**
 * product controller
 */

import { factories } from "@strapi/strapi";

interface PaginationQuery {
  page?: number;
  pageSize?: number;
  start?: number;
  limit?: number;
}

interface CharacteristicFilter {
  [filterDocumentId: string]: string | string[];
}

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async find(ctx) {
      const pagination = (ctx.query.pagination || {}) as PaginationQuery;
      const filters = (ctx.query.filters || {}) as Record<string, unknown>;

      // Получаем фильтры по характеристикам из query
      // Формат: ?characteristics[filterDocumentId]=value или ?characteristics[filterDocumentId][]=value1&characteristics[filterDocumentId][]=value2
      const characteristicsFilter = (ctx.query.characteristics ||
        {}) as CharacteristicFilter;
      const hasCharacteristicsFilter =
        Object.keys(characteristicsFilter).length > 0;

      // Фильтруем только опубликованные записи (publishedAt не null)
      const baseFilters = {
        ...filters,
        publishedAt: { $notNull: true },
      };

      // Получаем товары
      let entities = await strapi.db.query("api::product.product").findMany({
        where: baseFilters,
        populate: {
          Media: true,
          Sizes: true,
          Characteristics: {
            populate: {
              filter: true,
            },
          },
          categories: true,
          collections: true,
        },
        orderBy: ctx.query.sort || { createdAt: "desc" },
      });

      // Фильтруем по характеристикам на уровне приложения
      if (hasCharacteristicsFilter) {
        entities = entities.filter((product: any) => {
          const characteristics = product.Characteristics || [];

          // Проверяем каждый фильтр
          for (const [filterDocumentId, filterValues] of Object.entries(
            characteristicsFilter
          )) {
            const values = Array.isArray(filterValues)
              ? filterValues
              : [filterValues];

            // Ищем характеристику с этим фильтром
            const hasMatch = characteristics.some((char: any) => {
              if (!char.filter || char.filter.documentId !== filterDocumentId) {
                return false;
              }
              return values.includes(char.Value);
            });

            // Если не найдено совпадение для этого фильтра - товар не подходит
            if (!hasMatch) {
              return false;
            }
          }

          return true;
        });
      }

      // Применяем пагинацию после фильтрации
      const total = entities.length;
      const page = Number(pagination.page) || 1;
      const pageSize =
        Number(pagination.pageSize) || Number(pagination.limit) || 25;
      const offset = (page - 1) * pageSize;
      const pageCount = Math.ceil(total / pageSize);

      const paginatedEntities = entities.slice(offset, offset + pageSize);

      return {
        data: paginatedEntities,
        meta: {
          pagination: {
            page,
            pageSize,
            pageCount,
            total,
          },
        },
      };
    },

    async findOne(ctx) {
      const { id } = ctx.params;

      const entity = await strapi.db.query("api::product.product").findOne({
        where: {
          documentId: id,
          publishedAt: { $notNull: true },
        },
        populate: {
          Media: true,
          Sizes: true,
          Characteristics: {
            populate: {
              filter: true,
            },
          },
          categories: true,
          collections: true,
        },
      });

      if (!entity) {
        return ctx.notFound("Product not found");
      }

      return { data: entity };
    },
  })
);
