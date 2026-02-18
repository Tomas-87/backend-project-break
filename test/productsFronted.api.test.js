const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const User = require("../models/User");
const bcrypt = require("bcrypt");

const app = require("../index");
const { Product } = require("../models/Product");

let mongoServer;
let token;

// Arranque de Mongo en memoria
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  //crear admin en la base de datos
  await User.create({
    user: "admin",
    password: await bcrypt.hash("1234", 10),
    role: "admin",
  });
  //obtener token
  const res = await request(app).post("/api/login").send({
    user: "admin",
    password: "1234",
  });

  token = res.body.token;
  console.log("TOKEN:", token);
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

//variable para crear un producto
const buildProduct = (creado = {}) => ({
  name: "Camisetas",
  description: "Camisetas con ositos",
  image: "camiseta.jpg",
  category: "camisetas",
  size: "M",
  color: "rojo",
  price: 20,
  ...creado,
});

//todos los productos
describe("GET / api/products", () => {
  (it("return array", async () => {
    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }),
    it("should return products", async () => {
      await Product.create(buildProduct());

      const res = await request(app).get("/api/products");

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].name).toBe("Camisetas");
      expect(res.body[0].image).toBe("camiseta.jpg");
      expect(res.body[0].price).toBe(20);
    }));
});

// productos por id
describe("GET /api/products/:id", () => {
  it("Return a product by ID", async () => {
    const product = await Product.create(buildProduct());
    const res = await request(app).get(`/api/products/${product._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Camisetas");
  });
  it("return 400 for invalid ID", async () => {
    const res = await request(app).get("/api/products/invalid_id");
    expect(res.statusCode).toBe(400);
  });
  it("return 404 if product does not exist", async () => {
    const res = await request(app).get(
      "/api/products/64b000000000000000000000",
    );
    expect(res.statusCode).toBe(404);
  });
});

//crear productos
describe("POST /api/products", () => {
  it("Create a post successfully", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send(buildProduct());

    expect(res.statusCode).toBe(201);
    expect(res.body.product.name).toBe("Camisetas");
    expect(res.body.product.description).toBe("Camisetas con ositos");
    expect(res.body.product.image).toBe("camiseta.jpg");
    expect(res.body.product.category).toBe("camisetas");
    expect(res.body.product.size).toBe("M");
    expect(res.body.product.color).toBe("rojo");
    expect(res.body.product.price).toBe(20);
  });
  it("persist the product in database", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send(buildProduct());

    const products = await Product.find();
    expect(products.length).toBe(1);
    expect(products[0].name).toBe("Camisetas");
  });
  it("return 400 if name is missing", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send(buildProduct({ name: "" }));
    expect(res.statusCode).toBe(400);
  });
  it("Invalid price return 400 price is not a number", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send(buildProduct({ price: "gratis" }));

    expect(res.statusCode).toBe(400);
  });
});

//actualizar productos
describe("PUT /api/products/:id", () => {
  it("updates an existing product", async () => {
    const product = await Product.create(buildProduct());

    const res = await request(app)
      .put(`/api/products/${product._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(buildProduct({ price: 30, color: "azul" }));

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(30);
    expect(res.body.color).toBe("azul");

    const updatePro = await Product.findById(product._id);
    expect(updatePro.price).toBe(30);
    expect(updatePro.color).toBe("azul");
  });
  it("returns 404 if product does not exist", async () => {
    const exist = "64b000000000000000000000";

    const res = await request(app)
      .put(`/api/products/${exist}`)
      .set("Authorization", `Bearer ${token}`)
      .send(buildProduct());

    expect(res.statusCode).toBe(404);
  });

  it("returns 400 for invalid data", async () => {
    const product = await Product.create(buildProduct());

    const res = await request(app)
      .put(`/api/products/${product._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(buildProduct({ price: "gratis" }));

    expect(res.statusCode).toBe(400);
  });
});

//eliminar productos
describe("DELETE /api/products/:id", () => {
  it("deleete product successfully", async () => {
    const product = await Product.create(buildProduct());

    const res = await request(app)
      .delete(`/api/products/${product._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);

    const deletePro = await Product.findById(product._id);
    expect(deletePro).toBeNull();
  });
  it("product not found retur 404", async () => {
    const res = await request(app)
      .delete("/api/products/64b000000000000000000000")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });
  it("return 400 for invalid product", async () => {
    const res = await request(app)
      .delete("/api/products/invalid_id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(400);
  });
});
