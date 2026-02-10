module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Tienda de ropa API",
    description: "Tienda de ropa con Express, MongoDB, Mongoose, Swagger",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
};
