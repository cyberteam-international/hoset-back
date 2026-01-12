/**
 * category router
 */

export default {
  routes: [
    {
      method: "GET",
      path: "/categories/top-level",
      handler: "category.findTopLevel",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/categories/:slug/subcategories",
      handler: "category.findSubcategories",
      config: {
        auth: false,
      },
    },
    // Стандартные CRUD роуты
    {
      method: "GET",
      path: "/categories",
      handler: "category.find",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/categories/:id",
      handler: "category.findOne",
      config: {
        auth: false,
      },
    },
  ],
};
