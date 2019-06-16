import 'mocha';
import { SuperTest, Test } from 'supertest';
import { getTestApp } from '../../../utils/testing/app';
import { CompanyService as Companies, ProductService as Products } from '../../@services/index';
import { companies as mockData } from '../../../utils/testing/data';

describe('Products API', () => {

  let app: SuperTest<Test>;
  let company_id: number;

  beforeAll(done => {
    getTestApp().then(a => { app = a; done(); }).catch(done);
  });

  describe('GET /v1/products', () => {

    beforeAll(done => {
      Companies.add(mockData[1])
        .then(i => {
          company_id = i.id;
          Promise.all([
            Products.add({ name: 'Dublin Blonde', regular_price: 10, company_id }),
            Products.add({ name: 'Dublin Red', regular_price: 20, company_id }),
            Products.add({ name: 'Dublin IPA', regular_price: 30, company_id }),
          ]).then(() => done()).catch(done);
        })
        .catch(done);
    });

    afterAll(done => {
      Promise.all([
        Products.deleteAll(),
        Companies.deleteById(company_id)
      ]).then(() => done()).catch(done);
    });

    it('should return all Products', done => {
      app.get('/v1/products')
        .expect((res: any) => {
          if (!res.body.data) throw new Error('API: Expected data in response');
          if (res.body.data.length != 3) throw new Error('API: Expected 3 Products in response');
        })
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
