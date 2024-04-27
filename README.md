# Teplate Backend Application: typescript-express-postgreSQL-prisma
Topics are covered in this template

- Prisma shcema and model
- Postman collection is added (Tasan-Health-Care.postman_collection.json)
- Authentication with json web token
- common CRUD operations for Admin
- Routing setup with express router
- Error Handling
- Image upload during create admin (see form data in postman under body)


## To run this project locally you need to follow this instructions
- You should have postgreSQL installed in your computer
- clone this repository in your machine
```
git clone https://github.com/tauhid-hasan-dev/template-server-typescript-node-express-postgresql-prisma.git
```
- Then run this command
```
yarn install
```
- The connect the project to the database
```
npx prisma migrate dev
```
- To see the database  
```
npx prisma studio
```
- take a look at the .env.example file to replace your own credintials
- Import the postman collection (Tasan-Health-Care.postman_collection.json) to the postman to test the apis



# Setup guideline

```
yarn init
```
### install prisma and typescript as a dev dependency from prisma doc https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql

``` 
yarn init prisma typescript ts-node @types/node -D   
```
### install the config file of typescript.
```
npx tsc --init
```
### Change the rootDir to src and outdir to dist in tsconfig.json file
### Next, set up your Prisma ORM project by creating your Prisma schema file with the following command:
```
npx prisma init
```
### In .env file: change the username and password (of postgreSQL database which is installed in your computer) in the environment variable. And change the database name

```
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name?schema=public"
```
### Install express js and typescript types(as a dev dependency)
```
yarn add express
yarn add -D @types/express
```

### To run typescript install ts-node-dev as a dev dependency
```
yarn add ts-node-dev

```
### Install cors
```
yarn add cors
yarn add -D @types/cors
```
### Create a root directory folder called 'src'
### Inside src file create a server.ts file to create express server
### Create a app.ts file (All the middleware will be there)
### Create a cofig folder inside the src folder (to connect .env file to the project)
### Write necessary code in app.ts and server.ts file 
### To run the project add command at the script in package.json file

```
"scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts"
  },
```
### run this command to start the server 
```
yarn run dev
```

# To start any prisma project 
- we need to add models(or create schemas) in 'schema.prisma' file
- then we need to send that model(schemas) to the database (migration)
- then we can create API's.

### After creating models in schema.prisma file we need to send or connect (Migration) models to the database

```
npx prisma migrate dev
```

### Handle routing with express route
- use express route for routing
- add route middleware in app.tss

### Handle errors with globalErrorHandler middleware
- install zod
- Add globalErrorHandler middleware (app.ts)
- Add not found middleware (app.ts)
### Handle auth validation
- install json web token 
- Install bycrypt for hashing password

# To Upload Image
- upload an image from the client and save it to the current working directory
- then store that image in cloudinary 
- cloudinary will give us a link and this link will be saved in the database.
### Install multer (to upload image and save it to the current directory);

```
yarn add multer
yarn add @types/multer
```
### The follow the cloudinary guideline to upload images from local to cloudinary










