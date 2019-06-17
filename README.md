<p align="center">
  <a href="https://axier.io/">
    <img width="200" height="53" src="https://i.imgur.com/6GBAjV1.png" alt="axier logo">
  </a>
</p>

<h1 align="center">TypeORM Express API</h1>

<p align="center">
  <a href="https://github.com/iestyn02/typeorm-express-webpack-api">
    <img src="https://img.shields.io/badge/version-1.0.6-green.svg" alt="version" />
  </a>
</p>

<p align="center">
  <b>A small boilerplate project that focuses on Type ORM integration with Express JS</b></br>
  <sub>Made with ❤️ by <a href="https://www.linkedin.com/in/iestyn-d-24765273/">Iestyn Daly</a></sub>
</p>

<br />

<hr />

## ❯ Why

After scrapping several API projects and trying out multiple ORMs, I finally settled with TypeORM and building an express application in <a href="https://www.typescriptlang.org/">Typescript</a>.  This project focuses on TypeORM integration and thus security features are basic and authentication/authorization has been ommitted.

Try it! I am happy to hear your feedback.

### ❯ Application Goals

- **Simplified Database Query** with the ORM [TypeORM](https://github.com/typeorm/typeorm).
- **RESTful API** built with restful principles in mind...
- **Testing Tools** thanks to [Jest](https://facebook.github.io/jest).
- **Basic Security Features** thanks to [Helmet](https://helmetjs.github.io/).
- **Fast Database Building** with simple migration from [TypeORM](https://github.com/typeorm/typeorm).

### ❯ Table of Contents

-   [📙 Database & Environment](https://github.com/iestyn02/typeorm-express-webpack-api#-database) - _Setup DB_
-   [🛠 Develop](https://github.com/iestyn02/typeorm-express-webpack-api#-develop) - _Run app locally_
-   [🔬 Test](https://github.com/iestyn02/typeorm-express-webpack-api#-test) - _Run tests_
-   ️️[✅ To Do](https://github.com/iestyn02/typeorm-express-webpack-api#-to-do) - _Roadmap and improvements for this repository_

## 📙 Database & Environment

It is essential that you setup your database and .env files for the application to run successfully.

This project uses `postgres` by default but you can change that to any DBMS with a few alterations.  Below is a script to create a `demo` schema in your `postgres` database.

#### Create DB Schema

```sql
CREATE SCHEMA demo
AUTHORIZATION YOUR_DB_USER;
```

#### Setup your .env files

Create two environment files, `.env` and `.env.development`, you can refer to [.env.example](https://github.com/iestyn02/typeorm-express-webpack-api/blob/master/.env.example) as an example.

| <sup>Variable</sup> | <sup>Type</sup> | Description                                                                                |
|---------------------|-----------------|--------------------------------------------------------------------------------------------|
| NODE_ENV            | string          | Node environment, generally development locally and set to production for production build |
| PORT                | number          | Port the API will be served on                                                             |
| POSTGRES_HOST       | string          | Host for your db, generally your localhost if serving locally                              |
| POSTGRES_PORT       | number          | DB port generally 5432                                                                     |
| POSTGRES_DB         | string          | DB you will be accessing                                                                   |
| POSTGRES_USER       | string          | DB Username                                                                                |
| POSTGRES_PASS       | string          | DB Password                                                                                |

## 🛠 Develop

### Requirements
For development, you will only need Node.js installed on your environment.

#### Node

[Node](http://nodejs.org/) is really easy to install.
You should be able to run the following commands after the installation procedure
below.

```
$ node --version
$ v6.10.1
```

## Installation

```
$ git clone git@github.com:iestyn02/typeorm-express-webpack-api.git
$ typeorm-express-webpack-api
$ npm i
```

## Serve Locally

```
$ npm start
```

You will then see a message on your console

<p align="center"><img src="https://i.imgur.com/tgWQwSp.jpg"></p>

## 🔬 Test

This project uses [Jest](https://jestjs.io/) to perform integration testing on endpoints.

Tests should be writtin in a `*.test.ts` file.

```
./
+--src
|   +--api
|   |   +--v1
|   |   |   +--resource
|   |   |   |   +--resource.route.ts
|   |   |   |   +--resource.controller.ts
|   |   |   |   +--resource.test.ts
```

Just run this command to run the tests

```
$ npm run test
```

## ✅ To Do

-   [x] Testing for companies module
-   [x] Improve logging:

## License

[MIT](https://github.com/iestyn02/typeorm-express-webpack-api/blob/master/LICENSE)
