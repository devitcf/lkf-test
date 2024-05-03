export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT ?? "", 10) || 8000,
    corsEnabled: parseInt(process.env.CORS_ENABLED ?? "", 10) || 0,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
});
