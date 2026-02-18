module.exports = {
  "/api/products": {
    get: {
      summary: "Get all products",
      tags: ["Products"],
      responses: {
        200: {
          description: "List of products",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
        },
        500: { description: "Internal server error" },
      },
    },
    post: {
      summary: "Create a new product",
      tags: ["Products"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Product",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Product created successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Product" },
            },
          },
        },
        400: { description: "Invalid data" },
        500: { description: "Internal server error" },
      },
    },
  },
  "/api/products/search": {
    get: {
      summary: "Search products with filters",
      tags: ["Products"],
      parameters: [
        {
          name: "name",
          in: "query",
          schema: { type: "string" },
          description: "Filter by product name (partial match)",
        },
        {
          name: "category",
          in: "query",
          schema: {
            type: "string",
            enum: ["camisetas", "pantalones", "zapatos", "accesorios"],
          },
        },
        {
          name: "size",
          in: "query",
          schema: {
            type: "string",
            enum: ["S", "M", "L", "XL"],
          },
        },
        {
          name: "minPrice",
          in: "query",
          schema: { type: "number" },
        },
        {
          name: "maxPrice",
          in: "query",
          schema: { type: "number" },
        },
        {
          name: "sort",
          in: "query",
          schema: {
            type: "string",
            enum: ["price_asc", "price_desc", "name_asc", "name_desc"],
          },
        },
        {
          name: "page",
          in: "query",
          schema: { type: "integer", default: 1 },
        },
        {
          name: "limit",
          in: "query",
          schema: { type: "integer", default: 10 },
        },
      ],
      responses: {
        200: {
          description: "Filtered products",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  total: { type: "integer" },
                  page: { type: "integer" },
                  totalPages: { type: "integer" },
                  products: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Product",
                    },
                  },
                },
              },
            },
          },
        },
        500: { description: "Internal server error" },
      },
    },
  },

  "/api/products/{id}": {
    put: {
      summary: "Update a product by ID",
      tags: ["Products"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Product ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Product",
            },
          },
        },
      },
      responses: {
        200: { description: "Product updated successfully" },
        400: { description: "Invalid product data or ID" },
        404: { description: "Product not found" },
        500: { description: "Internal server error" },
      },
    },

    get: {
      summary: "Get a product by ID",
      tags: ["Products"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Product ID",
        },
      ],
      responses: {
        200: {
          description: "Product found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Product",
              },
            },
          },
        },
        400: { description: "Invalid product ID" },
        404: { description: "Product not found" },
        500: { description: "Internal server error" },
      },
    },

    delete: {
      summary: "Delete a product by ID",
      tags: ["Products"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Product ID",
        },
      ],
      responses: {
        200: { description: "Product deleted successfully" },
        400: { description: "Invalid product ID" },
        404: { description: "Product not found" },
        500: { description: "Internal server error" },
      },
    },
  },
};

//http://localhost:3000/api_docs
