export const config = {
  env: {
    secret: process.env.SECRET,
    originDomain: process.env.ORIGIN_DOMAIN || "*",
    port: process.env.PORT || 8080,
    mongoDBUri: process.env.PROD_MONGODB_URI || "mongodb://localhost/test",
  },
};
