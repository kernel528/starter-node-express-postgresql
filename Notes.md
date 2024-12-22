### Setup DB Access
- Updated the .env file with the development and production database URLs.
- Added the .env* file to the .gitignore file.
- Updated the knexfile.js file with the development and production database URLs.
- Updated package.json with the `knex` command to run the migrations and seeds.

### Setup DB files...
- Needed to copy the migration files from the `starter-backend-deployment` to the `starter-node-express-postgresql` project.
```aiignore
# joe @ obiwan in ~/github/kernel528/Chegg-Skills/starters/starter-node-express-postgresql on git:module-3.11.6 x [2024-12-21 19:40:34] C:1 
: npm run knex -- migrate:list   

> starter-node-express-postgresql@1.0.0 knex
> knex migrate:list

Using environment: development
The migration directory is corrupt, the following files are missing: 20201019105046_createProductsTable.js
Error: The migration directory is corrupt, the following files are missing: 20201019105046_createProductsTable.js
    at validateMigrationList (/Users/joe/github/kernel528/Chegg-Skills/starters/starter-node-express-postgresql/node_modules/knex/lib/migrations/migrate/Migrator.js:567:11)
    at Migrator.list (/Users/joe/github/kernel528/Chegg-Skills/starters/starter-node-express-postgresql/node_modules/knex/lib/migrations/migrate/Migrator.js:285:7)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
# joe @ obiwan in ~/github/kernel528/Chegg-Skills/starters/starter-node-express-postgresql on git:module-3.11.6 x [2024-12-21 19:40:47] C:1 
: cp ../starter-backend-deployment/api/db/migrations/20201019105046_createProductsTable.js ./src/db/migrations 

# joe @ obiwan in ~/github/kernel528/Chegg-Skills/starters/starter-node-express-postgresql on git:module-3.11.6 x [2024-12-21 19:42:43]
: npm run knex -- migrate:list                                                                                

> starter-node-express-postgresql@1.0.0 knex
> knex migrate:list

Using environment: development
Found 1 Completed Migration file/files.
20201019105046_createProductsTable.js
Found 5 Pending Migration file/files.
20241213193233_createSuppliersTable.js
20241213194941_createProductsTable.js
20241213204943_createCategoriesTable.js
20241213205201_createProductsCategoriesTable.js
20241213222635_productsAddPriceAndChangeProductNameToProductTitle.js

# joe @ obiwan in ~/github/kernel528/Chegg-Skills/starters/starter-node-express-postgresql on git:module-3.11.6 x [2024-12-21 19:42:48]
: 
```
### Remove the old products table migration file
- Realized cannot have both createProductsTable.js files in the migrations directory.
- Decided to stop previous app, delete products table and remove the old migration file.
- Suspended app on render.com.
- Deleted the products and knex_migration tables in the database using DBeaver.
- Removed the old migration file from the migrations directory.
```aiignore
# joe @ obiwan in ~/github/kernel528/Chegg-Skills/starters/starter-node-express-postgresql on git:module-3.11.6 x [2024-12-21 19:56:44]
: npm run knex -- migrate:list  

> starter-node-express-postgresql@1.0.0 knex
> knex migrate:list

Using environment: development
No Completed Migration files Found.
Found 5 Pending Migration file/files.
20241213193233_createSuppliersTable.js
20241213194941_createProductsTable.js
20241213204943_createCategoriesTable.js
20241213205201_createProductsCategoriesTable.js
20241213222635_productsAddPriceAndChangeProductNameToProductTitle.js
```

### Run the migrations and seeds for Production
```aiignore
# joe @ obiwan in ~/github/kernel528/Chegg-Skills/starters/starter-node-express-postgresql on git:module-3.11.6 x [2024-12-21 19:56:52]
: NODE_ENV=production npm run knex -- migrate:list  

> starter-node-express-postgresql@1.0.0 knex
> knex migrate:list

Using environment: production
No Completed Migration files Found.
Found 5 Pending Migration file/files.
20241213193233_createSuppliersTable.js
20241213194941_createProductsTable.js
20241213204943_createCategoriesTable.js
20241213205201_createProductsCategoriesTable.js
20241213222635_productsAddPriceAndChangeProductNameToProductTitle.js

# joe @ obiwan in ~/github/kernel528/Chegg-Skills/starters/starter-node-express-postgresql on git:module-3.11.6 x [2024-12-21 19:58:30]
: NODE_ENV=production npm run knex -- migrate:latest

> starter-node-express-postgresql@1.0.0 knex
> knex migrate:latest

Using environment: production
Batch 1 run: 5 migrations

# joe @ obiwan in ~/github/kernel528/Chegg-Skills/starters/starter-node-express-postgresql on git:module-3.11.6 x [2024-12-21 19:59:24]
: NODE_ENV=production npm run knex -- seed:run      

> starter-node-express-postgresql@1.0.0 knex
> knex seed:run

Using environment: production
Ran 4 seed files
```

### Deploy Web App to Render.com
- Went through the steps to create a new web service on Render.com.  Connected to my GitHub repository.
- Added the PRODUCTION_DATABASE_URL environment variable to the web service.  Used the DB URL from the .env file.
- Deployed the web service.
  - Initial attempt failed for two reasons:
    1. I forgot to push my local changes to the GitHub repository.
    2. I forgot to double-check the server.js file for any changes needed.  Didn't need to make any changes.
- After pushing and merging updates to main branch, attempted to deploy again.
  - This time the deployment was successful!
  - The web service is now live at https://kernel528-starter-node-express-postgresql.onrender.com/

### Setup Local Dev Environment with Docker
- Make sure docker or colima (preferred on macos) is installed.
  - On Linux:
  ```aiignore
  : dpkg -l | grep docker
  ii  docker-buildx                              0.14.1-0ubuntu1~24.04.1                      amd64        Docker CLI plugin for extended build capabilities with BuildKit
  ii  docker-clean                               2.0.4-5                                      all          simple Shell script to clean up the Docker Daemon
  ii  docker-compose                             1.29.2-6ubuntu1                              all          define and run multi-container Docker applications with YAML
  ii  docker-doc                                 26.1.3-0ubuntu1~24.04.1                      all          Linux container runtime -- documentation
  ii  docker-registry                            2.8.2+ds1-1ubuntu0.24.04.2                   amd64        Docker toolset to pack, ship, store, and deliver content
  ii  docker.io                                  26.1.3-0ubuntu1~24.04.1                      amd64        Linux container runtime
  ii  golang-docker-credential-helpers           0.6.4+ds1-1ubuntu0.24.04.2                   amd64        native stores to safeguard Docker credentials
  ii  python3-compose                            1.29.2-6ubuntu1                              all          Python implementation of docker-compose file specification
  ii  python3-docker                             5.0.3-1ubuntu1.1                             all          Python 3 wrapper to access docker.io's control socket
  ii  python3-dockerpty                          0.4.1-5                                      all          Pseudo-tty handler for docker Python client (Python 3.x)
  ```
  - On MacOS:
  ```aiignore
  : brew list colima --versions
  colima 0.8.1
  
  : brew list --versions | grep docker
  docker 27.4.1
  docker-buildx 0.19.3
  docker-completion 27.4.1
  docker-compose 2.32.1
  ```
- Setup & run the docker postgres container, if not already running on jedi or localhost...
  ```aiignore
  docker container run -it --name chegg_dev --hostname chegg_dev --restart=always -v /files0/postgres-docker/chegg_dev:/var/lib/postgresql/data -e POSTGRES_PASSWORD=<the password> -p 5432:5432 -d kernel528/postgres:16
  ```
- Validate with DBeaver or DB console in IDE
- Update the .env file with applicable `development` and `production` connection strings.  These are not stored in github (of course).
  - Check credentials.md file
    ```aiignore
    DEVELOPMENT_DATABASE_URL="postgresql://<dev username>:<dev password>@<dev host>/<dev postgres db>"
    PRODUCTION_DATABASE_URL="postgresql://<prod username>:<prod password>@<prod host>/<prod postgres db>?ssl=true"
    ```
- Check & run migrations, if needed...
  ```aiignore
  : cd  ~/github/kernel528/Chegg-Skills/starters/starter-node-express-postgresql
  
  : git sync (to make sure on latest main branch)
  
  : NODE_ENV=development npm run knex -- migrate:list
  
  > starter-node-express-postgresql@1.0.0 knex
  > knex migrate:list
  
  Using environment: development
  No Completed Migration files Found.
  Found 5 Pending Migration file/files.
  20241213193233_createSuppliersTable.js
  20241213194941_createProductsTable.js
  20241213204943_createCategoriesTable.js
  20241213205201_createProductsCategoriesTable.js
  20241213222635_productsAddPriceAndChangeProductNameToProductTitle.js
  
  : NODE_ENV=development npm run knex -- migrate:latest
  
  > starter-node-express-postgresql@1.0.0 knex
  > knex migrate:latest
  
  Using environment: development
  Batch 1 run: 5 migrations
  ```
- Run the seed scripts, if needed...
  ```aiignore
  : NODE_ENV=development npm run knex -- seed:run   

  > starter-node-express-postgresql@1.0.0 knex
  > knex seed:run
  
  Using environment: development
  Ran 4 seed files
  ```
- Repeat the above `node run knex...` commands for `production` to do same to remote production database.
- Check with using IDE console or DBeaver to see data is seeded into DB.

#### Start dev/local node app

```aiignore
: npm run dev

> starter-node-express-postgresql@1.0.0 dev
> nodemon src/server.js

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node src/server.js`
Express server running at http://localhost:5001!

```
- Test with postman or open browser to url and check routes (e.g. /products, /products/:productId...)
  - Current list of routes which can be checked:
    - get
      - http://localhost:5001/categories
      - http://localhost:5001/products/
      - http://localhost:5001/products/1
      - http://localhost:5001/products/out-of-stock-count
      - http://localhost:5001/products/price-summary
      - http://localhost:5001/products/price-summary
      - http://localhost:5001/suppliers
    - post (example, TBD)
      - http://localhost:5001/suppliers
      ```aiignore
      {
          "data": {
              "supplier_name": "Joe Tech",
              "supplier_address_line_1": "123 Main Street",
              "supplier_address_line_2": "Suite 400",
              "supplier_city": "Wyoming",
              "supplier_state": "Minnesota",
              "supplier_zip": 55092,
              "supplier_phone": 7631234567,
              "supplier_email": "joe@tech.com",
              "supplier_notes": "Just a note.",
              "supplier_type_of_goods": "Raw"
          }
      }
      ```
    - put (example, TBD)
      - http://localhost:5001/suppliers/6
      ```aiignore
      {
          "data": {
              "supplier_name": "Joe Tech",
              "supplier_address_line_1": "123 Main Street",
              "supplier_address_line_2": "Suite 400",
              "supplier_city": "Wyoming",
              "supplier_state": "Minnesota",
              "supplier_zip": 55092,
              "supplier_phone": 7631234567,
              "supplier_email": "joe@tech.com",
              "supplier_notes": "Just a note. With update after testing delete and post again. Testing after refactor with await, async module 3.10.7. Test local dev with docker.",
              "supplier_type_of_goods": "Raw"
          }
      }
      ```
    - del (example, TBD)