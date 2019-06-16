import 'mocha';
import { SuperTest, Test } from 'supertest';
import { getTestApp } from '../../../utils/testing/app';
import { CompanyService as Companies } from '../../@services/company.service';
import { Company } from '../../@models/company';
import { companies as mockData } from '../../../utils/testing/data';

describe('Companies API', () => {

  let app: SuperTest<Test>;

  beforeAll(done => {
    getTestApp().then(a => { app = a; done(); }).catch(done);
  });

  describe('GET /v1/companies', () => {

    beforeAll(done => {
      Promise.all([
        Companies.add(mockData[0]),
        Companies.add(mockData[1]),
        Companies.add(mockData[2])
      ]).then(() => done()).catch(done);
    });

    afterAll(done => {
      Companies.deleteAll().then(() => done()).catch(done);
    });

    it('should return all companies', done => {
      app.get('/v1/companies')
        .expect((res: any) => {
          if (!res.body.data) throw new Error('API: Expected data in response');
          if (res.body.data.length != 3) throw new Error('API: Expected 3 companies in response');
        })
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('POST /v1/companies', () => {

    let fields = mockData[0];

    afterAll(done => {
      Companies.deleteAll().then(() => done()).catch(done);
    });

    it('should 400 if `name` not provided', done => {
      app.post(`/v1/companies`)
        .send({ name: '' })
        .expect('Content-Type', /json/)
        .expect(400, { error: { message: '`name` is required' } }, done);
    });

    it('should create and return a new company', done => {
      app.post('/v1/companies')
        .send(fields)
        .expect(201)
        .expect('Content-Type', /json/)
        .expect((res: any) => {
          if (!res.body.data) throw new Error('API: Expected data in response');
          if (!res.body.data.id) throw new Error('API: Expected company to have id');
          if (!res.body.data.name) throw new Error('API: Expected company to have name');
          if (res.body.data.name !== fields.name) throw new Error(`API: Expected company name to be '${fields.name}'`);
        })
        .then(async (res: any) => {
          let company_1 = await Companies.getById(res.body.data.id);
          if (!company_1) throw new Error('DB: Expected record to exist in DB');
          if (company_1.name !== fields.name) throw new Error(`DB: Expected company name to be '${fields.name}'`);
        }).then(done, done);
    });
  });

  describe('GET /v1/companies/:id', () => {

    let company: Company;

    beforeAll(done => {
      Companies.add(mockData[0])
        .then(i => { company = i; done() })
        .catch(done);
    });

    afterAll(done => {
      Companies.deleteAll().then(() => done()).catch(done);
    });

    it('should 404 if no company exists with `id`', done => {
      app.get(`/v1/companies/9999999`)
        .expect('Content-Type', /json/)
        .expect(404, { error: { message: 'Not Found' } }, done);
    });

    it('should get company with `id`', done => {
      app.get(`/v1/companies/${company.id}`)
        .expect('Content-Type', /json/)
        .expect(200, {
          status: 200,
          data: {
            id: company.id,
            avatar: company.avatar,
            name: company.name,
            email: company.email,
            website_url: company.website_url,
            phone: company.phone,
            address: company.address,
            about: company.about,
            registered: company.registered,
            latitude: company.latitude,
            longitude: company.longitude
          }
        }, done);
    });
  });

  describe('PATCH /v1/companies/:id', () => {

    let company: Company;
    let fields = mockData[0];

    beforeAll(done => {
      Companies.add(mockData[1])
        .then(i => {
          company = i;
          done()
        })
        .catch(done);
    });

    afterAll(done => {
      Companies.deleteAll().then(() => done()).catch(done);
    });

    it('should 404 if no company exists with `id`', done => {
      app.patch('/v1/companies/9999')
        .send(fields)
        .expect('Content-Type', /json/)
        .expect(404, { error: { message: 'Not Found' } }, done);
    });

    it('should 400 if `name` not provided', done => {
      app.patch(`/v1/companies/${company.id}`)
        .send({ name: '' })
        .expect('Content-Type', /json/)
        .expect(400, { error: { message: '`name` is required' } }, done);
    });

    it('should update company with `id`', done => {
      app.patch(`/v1/companies/${company.id}`)
        .send(fields)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res: any) => {
          if (!res.body.data) throw new Error('API: Expected data in response');
          if (!res.body.data.id) throw new Error('API: Expected company to have id');
          if (!res.body.data.name) throw new Error('API: Expected company to have name');
          if (res.body.data.name !== fields.name) throw new Error(`API: Expected company name to be '${fields.name}'`);
        })
        .then(async (res: any) => {
          let company_1 = await Companies.getById(res.body.id);
          if (!company_1) throw new Error('DB: Expected record to exist in DB');
          if (company_1.name !== fields.name) throw new Error(`DB: Expected company name to be '${fields.name}'`);
        }).then(done, done);
    });
  });

  describe('DELETE /v1/companies/:id', () => {

    let company: Company;

    beforeAll(done => {
      Companies.add(mockData[0])
        .then(i => { company = i; done() })
        .catch(done);
    });

    afterAll(done => {
      Companies.deleteAll().then(() => done()).catch(done);
    });

    it('should 404 if no company exists with `id`', done => {
      app.delete('/v1/companies/-1')
        .expect('Content-Type', /json/)
        .expect(404, { error: { message: 'Not Found' } }, done);
    });

    it('should delete company with `id`', done => {
      app.delete(`/v1/companies/${company.id}`)
        .expect('Content-Type', /json/)
        .expect(200, {
          status: 200,
          data: company.id
        })
        .then(() => {
          return Companies.getById(company.id)
            .then(x => {
              throw new Error('DB: Expected record not to exist in DB')
            })
            .catch(e => null);
        }).then(done, done);
    });
  });
});
