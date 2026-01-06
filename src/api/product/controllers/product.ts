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

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async find(ctx) {
      const pagination = (ctx.query.pagination || {}) as PaginationQuery;
      const filters = (ctx.query.filters || {}) as Record<string, unknown>;

      // Фильтруем только опубликованные записи (publishedAt не null)
      const baseFilters = {
        ...filters,
        publishedAt: { $notNull: true },
      };

      // Добавляем populate для всех связанных полей
      const entities = await strapi.db.query("api::product.product").findMany({
        where: baseFilters,
        populate: {
          Media: true,
          Sizes: true,
          Characteristics: true,
          categories: true,
          collections: true,
        },
        orderBy: ctx.query.sort || { createdAt: "desc" },
        offset: pagination.start || 0,
        limit: pagination.limit || pagination.pageSize || 25,
      });

      // Получаем общее количество для пагинации
      const total = await strapi.db.query("api::product.product").count({
        where: baseFilters,
      });

      const page = pagination.page || 1;
      const pageSize = pagination.pageSize || 25;
      const pageCount = Math.ceil(total / pageSize);

      return {
        data: entities,
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
          Characteristics: true,
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
