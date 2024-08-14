## Built With
* [Node.js][Nodejs-url]
* [ExpressJs][Express-url]
* [ExpressJs Generator][Express-generator-url]
* [JWT][Jwt-url]
* [PostreSQL][Postgresql-url]
* [KnexJs][Knex-url]


## Getting Started


### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/NawiOne/vascomm-restfull-api-test.git
   ```
2. Switch to the repo folder
   ```sh
   cd vascomm-restfull-api-test
   ```
3. Install NPM packages
   ```sh
   npm install
   npm install nodemon
   ```
4. Enter your Key in `.env`
   ```js
    DB_URL=
    DB_HOST=
    DB_NAME=
    DB_USERNAME=
    DB_PASSWORD=
    BCRYPT_SALT=
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    JWT_SECRET_KEY=
   ```
5. Migrate Database<br>
   you can migrate database using 
   ```sh
    npx knex migrate:latest
    npx knex seed:run
    ```

### Database
  This repo uses [PostgreSQL](https://www.postgresql.org/) for the database


### Endpoint List
BASE URL -> http://localhost:3000

USER/CUSTOMER
 * POST -> /api/v1/auth/register
 * POST -> /api/v1/auth/user/register
 * GET -> /api/v1/auth/google  ***(use web browser to test this endpoint)***
 * POST -> /api/v1/auth/user/login
 * POST -> /api/v1/auth/login
 * GET -> /api/v1/customer
 * GET -> /api/v1/customer/:id
 * PATCH -> /api/v1/customer/:id
 * DELETE -> /api/v1/customer/:id

 PRODUCT
 * POST -> /api/v1/product
 * GET -> /api/v1/product
 * GET -> /api/v1/product/:id
 * PATCH -> /api/v1/product/:id
 * DELETE -> /api/v1/product/:id




[Nodejs-url]:https://nodejs.org/en
[Express-url]: https://expressjs.com/
[Express-generator-url]: https://expressjs.com/en/starter/generator.html
[Jwt-url]: https://jwt.io/
[Postgresql-url]: https://www.postgresql.org/
[Knex-url]: https://knexjs.org/
 
