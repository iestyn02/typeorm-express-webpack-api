import "mocha";
import { SuperTest, Test } from "supertest";
import { expect } from 'chai';
import { getTestApp } from "./utils/test.app";

describe("TypeORM API", () => {

  let app: SuperTest<Test>;

  beforeAll(done => {
    getTestApp().then(a => { app = a; done(); }).catch(done);
  });

  it("should return a friendly message", done => {
    app.get("/")
      .expect("Content-Type", /json/)
      .expect(200, done)
      .expect(res => {
        expect(res.body).have.property('data');
      });
  });

});
