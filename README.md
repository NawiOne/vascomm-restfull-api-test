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

5. Run the application<br>
   ```sh
    nodemon
    ```
    <br>

## Endpoint List
**BASE URL -> http://localhost:3000**

***USER/CUSTOMER (User CRUD)***
 * GET -> /api/v1/auth/google  ***(use web browser to test this endpoint)***<br>

 * POST -> /api/v1/auth/register<br>
 ``payload``
   ```sh
         {
            "name": "Nawi Rudin",
            "email": "rudinnawi@gmail.com",
            "password": "test123",
            "confirmPassword": "test123"
         }
   ```

 * POST -> /api/v1/auth/user/register<br>
   ``payload``
   ```sh
         {
            "name": "Nawi Rudin",
            "email": "rudinnawi@gmail.com",
            "password": "test123",
            "confirmPassword": "test123"
         }
   ```

 * POST -> /api/v1/auth/user/login<br>
   ``payload``
   ```sh
         {
            "email": "test@gmail.com",
            "password": "test123",
         }
   ```

 * POST -> /api/v1/auth/login<br>
   ``payload``
   ```sh
         {
            "email": "test@gmail.com",
            "password": "test123",
         }
   ```

 * GET -> /api/v1/customer <br>
   ``query url``
   ```sh
         search: string
         page: number
         count: number
         orderBy: column_name,
         orderType: 'ASC/DESC'
   ```

 * GET -> /api/v1/customer/:id
 * PATCH -> /api/v1/customer/:id<br>
  ``payload``
   ```sh
         {
            "email": "test@gmail.com",
            "name": "nawi",
         }
   ```
 * DELETE -> /api/v1/customer/:id<br><br><br>



 ***PRODUCT (Product CRUD)***
 * POST -> /api/v1/product<br>
   ``payload``
   ```sh
         {
            "name": "oppo",
            "desc": "hp baru",
            "stock": 5
         }
   ```

 * GET -> /api/v1/product <br>
   ``query url``
   ```sh
         search: string
         page: number
         count: number
         orderBy: column_name,
         orderType: 'ASC/DESC'
   ```
 * GET -> /api/v1/product/:id
 * PATCH -> /api/v1/product/:id<br>
   ```sh
         {
            "name": "oppo",
            "desc": "hp baru",
            "stock": 5
         }
      ```
 * DELETE -> /api/v1/product/:id
 


### Database
  This repo uses [PostgreSQL](https://www.postgresql.org/) for the database




[Nodejs-url]:https://nodejs.org/en
[Express-url]: https://expressjs.com/
[Express-generator-url]: https://expressjs.com/en/starter/generator.html
[Jwt-url]: https://jwt.io/
[Postgresql-url]: https://www.postgresql.org/
[Knex-url]: https://knexjs.org/
 
