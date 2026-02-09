const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../index");
const Product = require("../models/Product");

let mongoServer;

// Arranque de Mongo en memoria
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

// Limpia la BBDD antes de cada test
beforeEach(async () => {
  await Product.deleteMany();
});

// limpia la BBDD y cierra la conexión después de los tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("GET /products", () => {
  it("Return a list of products with name, description, image, category, color, size and price", async () => {
    await Product.create({
      name: "Camiseta",
      description: "Camiseta de algodón",
      image: "camiseta.jpg",
      category: "camisetas",
      color: "rojo",
      size: "M",
      price: 20,
    });

    const res = await request(app).get("/products");

    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Camiseta");
    expect(res.text).toContain("camiseta.jpg");
    expect(res.text).toContain("20");
  });
});

describe("POST /dashboard", () => {
  it("Create a new product", async () => {
    const res = await request(app).post("/dashboard").send({
      name: "Camisetas",
      description: "Camisetas de algodón",
      image: "camisetas.jpg",
      category: "camisetas",
      color: "blanco",
      size: "L",
      price: 100,
    });

    expect(res.statusCode).toBe(302);

    const products = await Product.find();
    expect(products.length).toBe(1);
    expect(products[0].name).toBe("Camisetas");
    expect(products[0].description).toBe("Camisetas de algodón");
    expect(products[0].image).toBe("camisetas.jpg");
    expect(products[0].category).toBe("camisetas");
    expect(products[0].color).toBe("blanco");
    expect(products[0].size).toBe("L");
    expect(products[0].price).toBe(100);
  });
  it("it does not allow creation of a product without a name", async () => {
    const res = await request(app).post("/dashboard").send({
      description: "Camisetas de algodón",
      image: "camisetas.jpg",
      category: "camisetas",
      color: "blanco",
      size: "L",
      price: 100,
    });
    expect(res.statusCode).toBe(400);
  });
  it("it does not allow creation of a product without a price", async () => {
    const res = await request(app).post("/dashboard").send({
      name: "Camisetas",
      description: "Camisetas de algodón",
      image: "camisetas.jpg",
      category: "camisetas",
      color: "blanco",
      size: "L",
    });
    expect(res.statusCode).toBe(400);
  });
  it("it does not allow creation of a product with a non-numeric price", async () => {
    const res = await request(app).post("/dashboard").send({
      name: "Camisetas",
      description: "Camisetas de algodón",
      image: "camisetas.jpg",
      category: "camisetas",
      color: "blanco",
      size: "L",
      price: "cien",
    });
    expect(res.statusCode).toBe(400);
  });
  it("it does not allow creation of a product with a negative price", async () => {
    const res = await request(app).post("/dashboard").send({
      name: "Camisetas",
      description: "Camisetas de algodón",
      image: "camisetas.jpg",
      category: "camisetas",
      color: "blanco",
      size: "L",
      price: -100,
    });
    expect(res.statusCode).toBe(400);
  });
});

describe("POST /dashboard invalid category", () => {
  it("it does not allow creation of a product with an invalid category", async () => {
    const res = await request(app).post("/dashboard").send({
      name: "Camisetas",
      description: "Camisetas de algodón",
      image: "camisetas.jpg",
      category: "invalid_category",
      color: "blanco",
      size: "L",
      price: 100,
    });
    expect(res.statusCode).toBe(400);
  });
});

describe("POST /dashboard invalid color", () => {
  it("it does not allow creation of a product with an invalid color", async () => {
    const res = await request(app).post("/dashboard").send({
      name: "Camisetas",
      description: "Camisetas de algodón",
      image: "camisetas.jpg",
      category: "camisetas",
      color: "invalid_color",
      size: "L",
      price: 100,
    });
    expect(res.statusCode).toBe(400);
  });
});

describe("POST /dashboard invalid size", () => {
  it("it does not allow creation of a product with an invalid size", async () => {
    const res = await request(app).post("/dashboard").send({
      name: "Camisetas",
      description: "Camisetas de algodón",
      image: "camisetas.jpg",
      category: "camisetas",
      color: "blanco",
      size: "invalid_size",
      price: 100,
    });
    expect(res.statusCode).toBe(400);
  });
});

describe("PUT /dashboard/:productId", () => {
  it("updates an existing product", async () => {
    const product = await Product.create({
      name: "Camiseta",
      description: "Camiseta de algodón",
      image: "camiseta.jpg",
      category: "camisetas",
      color: "rojo",
      size: "M",
      price: 20,
    });
    const res = await request(app)
      .post(`/dashboard/${product._id}?_method=PUT`)
      .send({
        name: "Camiseta Actualizada",
        description: "Camiseta de algodón actualizada",
        image: "camiseta_actualizada.jpg",
        category: "camisetas",
        color: "azul",
        size: "L",
        price: 25,
      });
    expect(res.statusCode).toBe(302);
    const updatedProduct = await Product.findById(product._id);
    expect(updatedProduct.name).toBe("Camiseta Actualizada");
    expect(updatedProduct.description).toBe("Camiseta de algodón actualizada");
    expect(updatedProduct.image).toBe("camiseta_actualizada.jpg");
    expect(updatedProduct.category).toBe("camisetas");
    expect(updatedProduct.color).toBe("azul");
    expect(updatedProduct.size).toBe("L");
    expect(updatedProduct.price).toBe(25);
  });
  it("returns 404 if product does not exist", async () => {
    const exist = "64b0000000000000000000000";

    const res = await request(app)
      .post(`/dashboard/${exist}/edit?_method=PUT`)
      .send({
        name: "Camiseta Actualizada",
        description: "Camiseta de algodón actualizada",
        image: "camiseta_actualizada.jpg",
        category: "camisetas",
        color: "azul",
        size: "L",
        price: 25,
      });
    expect(res.statusCode).toBe(404);
  });

  it("does not allow updating with invalid price", async () => {
    const product = await Product.create({
      name: "Camiseta",
      description: "Camiseta de algodón",
      image: "camiseta.jpg",
      category: "camisetas",
      color: "rojo",
      size: "M",
      price: 20,
    });
    const res = await request(app)
      .post(`/dashboard/${product._id}?_method=PUT`)
      .send({
        name: "Camiseta Actualizada",
        description: "Camiseta de algodón actualizada",
        image: "camiseta_actualizada.jpg",
        category: "camisetas",
        color: "azul",
        size: "L",
        price: "invalid_price",
      });
    expect(res.statusCode).toBe(400);
  });
});

describe("DELETE /dashboard/:id/delete", () => {
  it("elimina un producto existente", async () => {
    const product = await Product.create({
      name: "Camiseta",
      description: "Camiseta de algodón",
      image: "camiseta.jpg",
      category: "camisetas",
      color: "rojo",
      size: "M",
      price: 15,
    });

    const res = await request(app).post(
      `/dashboard/${product._id}/delete?_method=DELETE`,
    );

    expect(res.statusCode).toBe(302);

    const products = await Product.find();
    expect(products.length).toBe(0);
  });
});

describe("GET /products/:id", () => {
  it("Returns full product detail", async () => {
    const product = await Product.create({
      name: "Camiseta",
      description: "Camiseta de algodón",
      image: "camiseta.jpg",
      category: "camisetas",
      color: "rojo",
      size: "M",
      price: 20,
    });
    const res = await request(app).get(`/products/${product._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Camiseta");
    expect(res.text).toContain("Camiseta de algodón");
    expect(res.text).toContain("camiseta.jpg");
    expect(res.text).toContain("camisetas");
    expect(res.text).toContain("rojo");
    expect(res.text).toContain("M");
    expect(res.text).toContain("20");
  });
});
