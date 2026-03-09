export default () => ({
  database: {
    uri: process.env.DATABASE_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expires: String(process.env.JWT_EXPIRES),
  },
});
