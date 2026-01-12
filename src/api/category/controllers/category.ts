/**
 * category controller
 */

import { factories } from "@strapi/strapi";

interface PaginationQuery {
  page?: number;
  pageSize?: number;
  start?: number;
  limit?: number;
}

export default factories.createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async find(ctx) {
      const pagination = (ctx.query.pagination || {}) as PaginationQuery;
      const filters = (ctx.query.filters || {}) as Record<string, unknown>;

      const baseFilters = {
        ...filters,
        publishedAt: { $notNull: true },
      };

      const entities = await strapi.db
        .query("api::category.category")
        .findMany({
          where: baseFilters,
          populate: {
            Thumbnail: true,
            products: true,
            category: true, // родительская категория
            categories: {
              // подкатегории
              populate: {
                Thumbnail: true,
              },
            },
          },
          orderBy: ctx.query.sort || { createdAt: "desc" },
          offset: pagination.start || 0,
          limit: pagination.limit || pagination.pageSize || 25,
        });

      const total = await strapi.db.query("api::category.category").count({
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

      const entity = await strapi.db.query("api::category.category").findOne({
        where: {
          documentId: id,
          publishedAt: { $notNull: true },
        },
        populate: {
          Thumbnail: true,
          products: true,
          category: true, // родительская категория
          categories: {
            // подкатегории
            populate: {
              Thumbnail: true,
            },
          },
        },
      });

      if (!entity) {
        return ctx.notFound("Category not found");
      }

      return { data: entity };
    },

    // Получить только категории верхнего уровня (без родителя)
    async findTopLevel(ctx) {
      const pagination = (ctx.query.pagination || {}) as PaginationQuery;

      const entities = await strapi.db
        .query("api::category.category")
        .findMany({
          where: {
            publishedAt: { $notNull: true },
            category: null, // без родительской категории
          },
          populate: {
            Thumbnail: true,
            categories: {
              // подкатегории
              populate: {
                Thumbnail: true,
              },
            },
          },
          orderBy: ctx.query.sort || { createdAt: "desc" },
          offset: pagination.start || 0,
          limit: pagination.limit || pagination.pageSize || 25,
        });

      const total = await strapi.db.query("api::category.category").count({
        where: {
          publishedAt: { $notNull: true },
          category: null,
        },
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

    // Получить подкатегории конкретной категории
    async findSubcategories(ctx) {
      const { slug } = ctx.params;

      if (!slug) {
        return ctx.badRequest("Category slug is required");
      }

      // Находим родительскую категорию
      const parentCategory = await strapi.db
        .query("api::category.category")
        .findOne({
          where: {
            slug: slug,
            publishedAt: { $notNull: true },
          },
        });

      if (!parentCategory) {
        return ctx.notFound("Category not found");
      }

      // Находим все подкатегории
      const subcategories = await strapi.db
        .query("api::category.category")
        .findMany({
          where: {
            publishedAt: { $notNull: true },
            category: {
              id: parentCategory.id,
            },
          },
          populate: {
            Thumbnail: true,
            categories: {
              populate: {
                Thumbnail: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        });

      return {
        data: subcategories,
        meta: {
          parent: {
            id: parentCategory.id,
            documentId: (parentCategory as any).documentId,
            Title: (parentCategory as any).Title,
            slug: (parentCategory as any).slug,
          },
          total: subcategories.length,
        },
      };
    },
  })
);
