/**
 * collection controller
 */

import { factories } from "@strapi/strapi";

interface PaginationQuery {
  page?: number;
  pageSize?: number;
  start?: number;
  limit?: number;
}

export default factories.createCoreController(
  "api::collection.collection",
  ({ strapi }) => ({
    async find(ctx) {
      const pagination = (ctx.query.pagination || {}) as PaginationQuery;
      const filters = (ctx.query.filters || {}) as Record<string, unknown>;

      const baseFilters = {
        ...filters,
        publishedAt: { $notNull: true },
      };

      const entities = await strapi.db
        .query("api::collection.collection")
        .findMany({
          where: baseFilters,
          populate: {
            Thumbnail: true,
            products: true,
          },
          orderBy: ctx.query.sort || { createdAt: "desc" },
          offset: pagination.start || 0,
          limit: pagination.limit || pagination.pageSize || 25,
        });

      const total = await strapi.db.query("api::collection.collection").count({
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

      const entity = await strapi.db
        .query("api::collection.collection")
        .findOne({
          where: {
            documentId: id,
            publishedAt: { $notNull: true },
          },
          populate: {
            Thumbnail: true,
            products: true,
          },
        });

      if (!entity) {
        return ctx.notFound("Collection not found");
      }

      return { data: entity };
    },
  })
);
