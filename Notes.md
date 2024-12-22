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