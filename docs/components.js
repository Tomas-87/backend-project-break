const { schema } = require("../models/Product");

module.exports = {
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
      properties: {},
    },
  },
};
