/**
 * filter controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::filter.filter",
  ({ strapi }) => ({
    // Получить все уникальные фильтры и их значения по категории
    async findByCategory(ctx) {
      const { slug } = ctx.params;

      if (!slug) {
        return ctx.badRequest("Category slug is required");
      }

      // Находим все товары в этой категории
      const products = await strapi.db.query("api::product.product").findMany({
        where: {
          publishedAt: { $notNull: true },
          categories: {
            slug: slug,
          },
        },
        populate: {
          Characteristics: {
            populate: {
              filter: true,
            },
          },
        },
      });

      // Собираем уникальные фильтры и их значения
      const filtersMap = new Map<
        string,
        { id: number; documentId: string; Name: string; values: Set<string> }
      >();

      for (const product of products) {
        const characteristics = (product as any).Characteristics || [];
        for (const char of characteristics) {
          if (char.filter) {
            const filterId = char.filter.documentId;
            if (!filtersMap.has(filterId)) {
              filtersMap.set(filterId, {
                id: char.filter.id,
                documentId: char.filter.documentId,
                Name: char.filter.Name,
                values: new Set(),
              });
            }
            if (char.Value) {
              filtersMap.get(filterId)!.values.add(char.Value);
            }
          }
        }
      }

      // Преобразуем в массив
      const filters = Array.from(filtersMap.values()).map((f) => ({
        id: f.id,
        documentId: f.documentId,
        Name: f.Name,
        values: Array.from(f.values).sort(),
      }));

      return {
        data: filters,
        meta: {
          category: slug,
          totalProducts: products.length,
        },
      };
    },

    // Получить все уникальные фильтры и их значения по коллекции
    async findByCollection(ctx) {
      const { slug } = ctx.params;

      if (!slug) {
        return ctx.badRequest("Collection slug is required");
      }

      const products = await strapi.db.query("api::product.product").findMany({
        where: {
          publishedAt: { $notNull: true },
          collections: {
            slug: slug,
          },
        },
        populate: {
          Characteristics: {
            populate: {
              filter: true,
            },
          },
        },
      });

      const filtersMap = new Map<
        string,
        { id: number; documentId: string; Name: string; values: Set<string> }
      >();

      for (const product of products) {
        const characteristics = (product as any).Characteristics || [];
        for (const char of characteristics) {
          if (char.filter) {
            const filterId = char.filter.documentId;
            if (!filtersMap.has(filterId)) {
              filtersMap.set(filterId, {
                id: char.filter.id,
                documentId: char.filter.documentId,
                Name: char.filter.Name,
                values: new Set(),
              });
            }
            if (char.Value) {
              filtersMap.get(filterId)!.values.add(char.Value);
            }
          }
        }
      }

      const filters = Array.from(filtersMap.values()).map((f) => ({
        id: f.id,
        documentId: f.documentId,
        Name: f.Name,
        values: Array.from(f.values).sort(),
      }));

      return {
        data: filters,
        meta: {
          collection: slug,
          totalProducts: products.length,
        },
      };
    },

    // Получить все фильтры со всеми возможными значениями
    async findAllWithValues(ctx) {
      // Получаем все опубликованные товары с характеристиками
      const products = await strapi.db.query("api::product.product").findMany({
        where: {
          publishedAt: { $notNull: true },
        },
        populate: {
          Characteristics: {
            populate: {
              filter: true,
            },
          },
        },
      });

      const filtersMap = new Map<
        string,
        { id: number; documentId: string; Name: string; values: Set<string> }
      >();

      for (const product of products) {
        const characteristics = (product as any).Characteristics || [];
        for (const char of characteristics) {
          if (char.filter) {
            const filterId = char.filter.documentId;
            if (!filtersMap.has(filterId)) {
              filtersMap.set(filterId, {
                id: char.filter.id,
                documentId: char.filter.documentId,
                Name: char.filter.Name,
                values: new Set(),
              });
            }
            if (char.Value) {
              filtersMap.get(filterId)!.values.add(char.Value);
            }
          }
        }
      }

      const filters = Array.from(filtersMap.values()).map((f) => ({
        id: f.id,
        documentId: f.documentId,
        Name: f.Name,
        values: Array.from(f.values).sort(),
      }));

      return {
        data: filters,
        meta: {
          totalProducts: products.length,
          totalFilters: filters.length,
        },
      };
    },
  })
);
