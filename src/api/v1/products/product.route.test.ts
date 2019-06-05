import "mocha";
import { SuperTest, Test } from "supertest";
import { getTestApp } from "../../../utils/test.app";
// import { ProductController as Products } from "./product.controller";
import { ProductService as Products } from "../../@services/product.service";
import { Product } from "../../@models/product";

describe("Products API", () => {

  let app: SuperTest<Test>;

  beforeAll(done => {
    getTestApp().then(a => { app = a; done(); }).catch(done);
  });


  describe("GET /v1/products", () => {

    beforeAll(done => {
      Promise.all([
        Products.add({ name: "Dublin Blonde", regular_price: 10, company_id: 1 }),
        Products.add({ name: "Oranges", regular_price: 20, company_id: 1 }),
        Products.add({ name: "Pears", regular_price: 30, company_id: 1 }),
      ]).then(() => done()).catch(done);
    });

    afterAll(done => {
      Products.deleteAll().then(() => done()).catch(done);
    });

    it("should return all Products", done => {
      app.get("/v1/products")
        .expect((res: any) => {
          // if (!res.body.data) throw new Error("API: Expected data in response");
          if (!res.body) throw new Error("API: Expected data in response");
          if (res.body.length != 3) throw new Error("API: Expected 3 Products in response");
        })
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe("POST /v1/products", () => {

    let fields = { name: "Dublin Blonde", regular_price: 10, company_id: 1 };

    afterAll(done => {
      Products.deleteAll().then(() => done()).catch(done);
    });

    it("should 400 if `name` not provided", done => {
      app.post(`/v1/products`)
        .send({ name: '' })
        .expect("Content-Type", /json/)
        .expect(400, { error: { message: "Product requires `name`" } }, done);
    });

    it("should create and return a new product", done => {
      app.post("/v1/products")
        .send(fields)
        .expect(201)
        .expect("Content-Type", /json/)
        .expect((res: any) => {
          if (!res.body) throw new Error("API: Expected data in response");
          if (!res.body.id) throw new Error("API: Expected Product to have id");
          if (!res.body.name) throw new Error("API: Expected Product to have name");
          if (res.body.name !== fields.name) throw new Error(`API: Expected Product name to be '${fields.name}'`);
        })
        .then(async (res: any) => {
          let product_1 = await Products.getById(res.body.id);
          if (!product_1) throw new Error("DB: Expected record to exist in DB");
          if (product_1.name !== fields.name) throw new Error(`DB: Expected Product name to be '${fields.name}'`);
        }).then(done, done);
    });
  });

  describe("GET /v1/products/:id", () => {

    let product: Product;

    beforeAll(done => {
      Products.add({ name: "Dublin Blonde", regular_price: 10.50, company_id: 1 })
        .then(i => { product = i; done() })
        .catch(done);
    });

    afterAll(done => {
      Products.deleteAll().then(() => done()).catch(done);
    });

    it("should 404 if no Product exists with `id`", done => {
      app.get(`/v1/products/9999`)
        .expect("Content-Type", /json/)
        .expect(404, { error: { message: "Not Found" } }, done);
    });

    it("should get product with `id`", done => {
      app.get(`/v1/products/${product.id}`)
        .expect("Content-Type", /json/)
        .expect(200, {
          id: product.id,
          name: product.name,
          desc: null,
          regular_price: 10.5,
          sale_price: null,
          company_id: product.company_id,
          image_url: null
        }, done);
    });
  });

  describe("PATCH /v1/products/:id", () => {

    let product: Product;
    let fields = { name: "Dublin Red", regular_price: 11, company_id: 1 };

    beforeAll(done => {
      Products.add({ name: "Dublin Blonde", regular_price: 10, company_id: 1 })
        .then(i => {
          product = i;
          done()
        })
        .catch(done);
    });

    afterAll(done => {
      Products.deleteAll().then(() => done()).catch(done);
    });

    it("should 404 if no Product exists with `id`", done => {
      app.patch("/v1/products/9999")
        .send(fields)
        .expect("Content-Type", /json/)
        .expect(404, { error: { message: "Not Found" } }, done);
    });

    it("should 400 if `name` not provided", done => {
      app.patch(`/v1/products/${product.id}`)
        .send({ name: '' })
        .expect("Content-Type", /json/)
        .expect(400, { error: { message: "Product requires `name`" } }, done);
    });

    it("should update product with `id`", done => {
      app.patch(`/v1/products/${product.id}`)
        .send(fields)
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res: any) => {
          if (!res.body) throw new Error("API: Expected data in response");
          if (!res.body.id) throw new Error("API: Expected Product to have id");
          if (!res.body.name) throw new Error("API: Expected Product to have name");
          if (res.body.name !== fields.name) throw new Error(`API: Expected Product name to be '${fields.name}'`);
        })
        .then(async (res: any) => {
          let product_1 = await Products.getById(res.body.id);
          if (!product_1) throw new Error("DB: Expected record to exist in DB");
          if (product_1.name !== fields.name) throw new Error(`DB: Expected Product name to be '${fields.name}'`);
        }).then(done, done);
    });
  });

  describe("DELETE /v1/products/:id", () => {

    let product: Product;

    beforeAll(done => {
      Products.add({ name: "Dublin Red", regular_price: 11, company_id: 1 })
        .then(i => { product = i; done() })
        .catch(done);
    });

    afterAll(done => {
      Products.deleteAll().then(() => done()).catch(done);
    });

    it("should 404 if no Product exists with `id`", done => {
      app.delete("/v1/products/9999")
        .expect("Content-Type", /json/)
        .expect(404, { error: { message: "Not Found" } }, done);
    });

    it("should delete product with `id`", done => {
      app.delete(`/v1/products/${product.id}`)
        .expect("Content-Type", /json/)
        .expect(200, `${product.id}`)
        // .expect(200, product.id)
        .then(() => {
          return Products.getById(product.id)
            .then(x => {
              throw new Error("DB: Expected record not to exist in DB")
            })
            .catch(e => null);
        }).then(done, done);
    });
  });
});
