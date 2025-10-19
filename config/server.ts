export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  httpServer: {
      requestTimeout: 1000 * 60 * 3,
  },
});
