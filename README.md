# Avila E-commerce API Documentation

This API powers Avila E-commerce, a B2C platform designed to connect businesses with consumers through a scalable and secure backend.

### API Design
This API is built using a Layered Architecture to promote separation of concerns and uphold the Single Responsibility Principle (SRP). Each layer is designed to encapsulate a specific aspect of the system’s functionality, resulting in a clean, modular structure that simplifies maintenance and scalability. There is these layers:

- **Routes**: Responsible for handling incoming HTTP requests and directing them to the appropriate controllers.
- **Controllers**: Manage the application's logic, processing the requests from the routes, and coordinating with services to fulfill them.
- **Services**: Encapsulate the business logic, ensuring reusable and modular functionality across the application.
- **Repository**: Manages database interactions, ensuring efficient data retrieval and persistence while handling errors.

### Database Design
PostgreSQL was selected as the database engine due to its robust support for relational data modeling. Its rich feature set makes it particularly well-suited for managing relationships between entities. I used Prisma ORM to streamline database interactions, offering type-safe queries, intuitive schema management, and built-in protection against common vulnerabilities such as SQL injection.

## Base URL

```bash
http://localhost:5000/
```

### Technologies
- Express.js
- TypeScript
- Prisma
- PostgreSQL

### Requirements:
- Node +18
- VSCode (recommended editor)
- PostgreSQL and any Database Manager.
- Postman, ThunderClient (Editor extension) or any API Platform.

### Additional dependecies
- zod – Data validation
- jsonwebtoken – Access control
- dotenv – Environment variables
- morgan – HTTP request logging


```
NOTE: For aditional information about dependencies look at the package.json file
```


## Development Setup

1. Start the project by setting up your `.env` file with all required environment variables. This ensures the application has access to essential configuration values like database credentials, API keys, and security tokens.


2. Initial setup for install dependencies

```bash
# /main-directory
$ npm install
```

3. Database setup `schema at ./prisma/schema.prisma`

    1. Create a PostgreSQL database, then update your .env file with the correct connection string. Once configured, run the following command to initialize the Prisma schema:

```bash
# /main-directory
npx prisma migrate dev
```

4. Seed Initial Data `seed at ./prisma/seed.ts`
    
    1. To populate the database with essential configuration and sample data for testing purposes, run the following commands from the project’s root directory:

```bash
# /main-directory
npx prisma db seed
npm run prisma-seed  
```

## Roles and test users 👥

This API defines two distinct roles with different levels of access
- User: Standard access for general application functionality.
- Admin: Include the ability to manage products and deactivate sales.

After run the `Seed Initial Data` command, you will have two users ready for testing:

In login endpoint:

#### With user role

```
{
    "username": "testUser",
    "password": "abC.1234",
}
```
#### With admin role
```
{
    "username": "testAdmin",
    "password": "abC.1234",
}
```

You can also create custom users. However, if you're creating an admin user, make sure to include the `adminKey` in your request for security purposes. This key must be predefined in your `.env` file before running the application.

When registering users, be aware of the role identifiers:
- User: 1
- Admin: 2

These role IDs are seeded automatically and can be found in the following file `/prisma/seed.ts`

## Run server

```bash
# /main-directory
$ npm run dev
```

## Endpoints

### Roles 👑

- `GET api/v1/auth/roles`: Admin

### Products 🦖

- `GET    /api/v1/products`: Both roles
- `GET    /api/v1/products/:id`: Both roles
- `POST    /api/v1/products`: Admin
```
{
   "name": "Laptop Asus",
   "description": "Gaming laptop",
   "price": 1000,
   "quantity" 20
}
```
- `PATCH   /api/v1/products/:id`: Admin
```
{
# All fields are optional due is a patch method (minimun one)
   "name": "Laptop Asus",
   "description": "Gaming laptop",
   "price": 1000,
   "quantity" 20
}
```
- `PATCH /api/v1/products/:id/delete`: Admin

### Sales 🪙

- `GET    /api/v1/sales`: Admin
- `GET    /api/v1/sales/user/me`: User owner
- `GET    /api/v1/sales/user/:id`: Admin
- `GET    /api/v1/sales/:id`: Admin or User Owner
- `PATCH /api/v1/sales/:id`: Admin
```
{
   "status": "En_camino"
}
```
- `POST   /api/v1/sales`: User
```
{
   "paymentMethod": "Visa",
    "items": [
       {
          "productId": 1,
          "quantity": 10
       }
    ]
}
```
- `PATCH /api/v1/sales/:id/delete`: Admin

### User 👤
- `POST /api/v1/auth/login`: Both roles
```
{
    "username": "testUser",
    "password": "abC.1234",
}
```
- `POST /api/v1/auth/register`:  Both roles
```
{
    "username": "testUser",
    "password": "abC.1234",
    "roleId": 1,
    "firstName": "Name",
    "lastName": "Lastname",
    "adminKey": YOUR_ADMIN_KEY #Not neccesary with an user role
}
```

```
NOTE: In the main directory, you will find a file called Avila_Ecommerce.postman_collection.json. This file is to import into Postman to obtain all the endpoints and body examples, but if you prefer not to use Postman, there is a dto directory in each entity that contains the type of request body expected by the endpoints. REMEMBER TO SET THE URL VARIABLE
```

## Response Format

### Success
```
Ex:
{
  "message": "Action executed successfully"
}
```

### Error `formats in ./src/shared/utils/custom-errors.ts`
```
Ex:
{
  "type": "TypeClassError",
  "message": "Purchase by id not found"
}
```

## Authentication

```
Authorization: Bearer <your_jwt_token>
```

## How to test

1. Set the enviroment variables.
2. Run the `Seed Initial Data` command if you have not.
3. Register a new user o Log in with the user provided after run the `Seed Initial Data` command.
4. When log in you will obtain a token, that you will need to use in every request, except by register and login.
5. Start testing depending of the user role and the endpont role needed.

## Author

- [@Jhon Rivera](https://www.github.com/jhonr1vera)
