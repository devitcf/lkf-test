export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT ?? "", 10) || 8000,
    corsEnabled: parseInt(process.env.CORS_ENABLED ?? "", 10) || 0,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
});
