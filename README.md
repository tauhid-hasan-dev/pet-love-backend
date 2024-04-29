# Pet Adoption Platform by Tauhid Hasan

### **Technology Stack:**

-  **Programming Language:** TypeScript
-  **Web Framework:** Express.js
-  **Object Relational Mapping (ORM):** Prisma with PostgreSQL
-  **Authentication:** JWT (JSON Web Tokens)

### **Topics are covered in this template:**

- Data validation with Prisma ORM
- Authentication with json web token
- CRUD operations(Pet, Adoption request, User)
- Error Handling using zod error.
- Routing with express router.

### **To run this project locally, follow theese instructions**
- You should have postgreSQL installed in your computer
- take a look at the .env.example file to replace your own credintials
- Import the postman collection to the postman to test the apis

**Clone this repository in your machine**

```
git clone https://github.com/tauhid-hasan-dev/template-server-typescript-node-express-postgresql-prisma.git
```
**Install yarn for node_modules**
```
yarn install
```
**Run the project**
```
yarn run dev
```
**The connect the project to the database**
```
npx prisma migrate dev
```
**To connect to the database**  
```
npx prisma studio
```















