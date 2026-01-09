/**
 * filter router
 */

export default {
  routes: [
    {
      method: "GET",
      path: "/filters/category/:slug",
      handler: "filter.findByCategory",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/filters/collection/:slug",
      handler: "filter.findByCollection",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/filters/all-with-values",
      handler: "filter.findAllWithValues",
      config: {
        auth: false,
      },
    },
    // Стандартные CRUD роуты
    {
      method: "GET",
      path: "/filters",
      handler: "filter.find",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/filters/:id",
      handler: "filter.findOne",
      config: {
        auth: false,
      },
    },
  ],
};
