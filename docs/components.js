const { Component } = require("react");

module.exports = {
  Components: {
    schemas: {
      Product: {
        type: "object",
        required: [
          "name",
          "description",
          "image",
          "category",
          "size",
          "color",
          "price",
        ],
        properties: {
          name: {
            type: "string",
            example: "Camisetas",
            minLength: 3,
            maxLength: 100,
          },
          description: {
            type: "string",
            minLength: 10,
            maxLength: 500,
          },
          image: {
            type: "string",
          },
          category: {
            type: "string",
            enum: ["camisetas", "pantalones", "zapatos", "accesorios"],
            example: "camisetas",
          },
          size: {
            type: "string",
            enum: ["S", "M", "L", "XL"],
            example: "M",
          },
          color: {
            type: "string",
            enum: ["rojo", "azul", "verde", "negro", "blanco"],
            example: "blanco",
          },
          price: {
            type: "number",
            example: 19.99,
            minimum: 0,
          },
        },
      },
    },
  },
};
