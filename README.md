# Avila E-commerce API Documentation

This API powers Avila E-commerce, a B2C platform designed to connect businesses with consumers through a scalable and secure backend.

## Table of Contents

- [Development Setup](#development-setup)
- [Roles and test users](#roles-and-test-users)
- [Run Server](#run-server)
- [API Reference](#api-reference)
- [Endpoints](#endpoints)
- [Testing](#testing)

### Architecture

This API follows a **Layered Architecture** pattern promoting separation of concerns:

- **Routes**: Handle HTTP requests and route them to controllers
- **Controllers**: Process requests and coordinate with services
- **Services**: Implement business logic and rules
- **Repository**: Manage database interactions and data persistence

This structure ensures maintainable, testable, and scalable code following SOLID principles.

### Database Design
PostgreSQL was selected as the database engine due to its robust support for relational data modeling. Its rich feature set makes it particularly well-suited for managing relationships between entities. I used Prisma ORM to streamline database interactions, offering type-safe queries, intuitive schema management, and built-in protection against common vulnerabilities such as SQL injection.

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

## Roles and test users

This API defines two distinct roles with different levels of access
- User: Standard access for general application functionality.
- Admin: Include the ability to manage products and deactivate sales.

After run the `Seed Initial Data` command, you will have two users ready for testing:

In login endpoint:

### With user role

```
{
    "username": "testUser",
    "password": "abC.1234",
}
```
### With admin role
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

## API Reference

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication
All protected endpoints require a Bearer token:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Roles 👑

- `GET /auth/roles`: Admin
```
[
   {
      "id": 1,
      "roleName": "user,
      "adminKey": "1234-!"
   },...
]
```

### Products 🦖

- `GET    /products`: Both roles
```
[
   {
      "id": 1,
      "name": "Laptop Asus",
      "price": 1000,
      "quantity":20,
      "description": "Gaming Laptop"
   },...
]
```
- `GET    /products/:id`: Both roles
```
{
   "id": 1,
   "name": "Laptop Asus",
   "price": 1000,
   "quantity":20,
   "description": "Gaming Laptop",
   "createdAt": date
}
```

- `POST    /products`: Admin
```
{
   "name": "Laptop Asus",
   "description": "Gaming laptop",
   "price": 1000,
   "quantity": 20
}
```
- `PATCH   /products/:id`: Admin
```
{
# All fields are optional due is a patch method (minimun one)
   "name": "Laptop Asus",
   "description": "Gaming laptop",
   "price": 1000,
   "quantity": 20
}
```
- `PATCH /products/:id/delete`: Admin

### Sales 🪙

- `GET /sales`: Admin
```
[
   {
      "id": 1,
      "saleDate": date,
      "totalAmount": 1000,
      "customerId": 1,
      "status": "Pendiente",
      "user" : {
         "id": 1,
         "username": "testUser"
      }
   },...
]
```
- `GET    /sales/user/me`: User owner
```
[
   {
      "id": 1,
      "saleDate": date,
      "totalAmount": 1000,
      "customerId": 1,
      "status": "Pendiente",
      "user" : {
         "id": 1,
         "username": "testUser"
      }
   },...
]
```
- `GET   /sales/user/:id`: Admin
```
[
  {
      "id": 1,
      "saleDate": date,
      "totalAmount": 1000,
      "customerId": 1,
      "paymentMethod": "Visa",
      "status"
      "status": "Pendiente"
      "user" : {
         "id": 1,
         "username": "testUser"
      }
   },...
]  
```
- `GET   /sales/:id`: Admin or User Owner
```
{
  "id": 1,
  "saleDate": date,
  "totalAmount": 1000,
  "customerId": 1,
  "paymentMethod": "Visa",
  "status": "Pendiente",
  "user" : {
      "id": 1,
      "username": "testUser",
      "firstName": "Nombre",
      "lastName": "Apellido"
  }
  "items": [
      {
        "id": 1,
        "quantity": 2,
        "productId": 1,
        "salePrice": 13,
        "totalPrice": 26,
        "product": {
            "id": 1,
            "name": "Juguete"
        }
      }
  ]
}
```

- `PATCH /sales/:id`: Admin
```
{
   "status": "En_camino"
}
```
- `POST   /sales`: User
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
- `PATCH /sales/:id/delete`: Admin

### User 👤
- `POST /auth/login`: Both roles
```
{
    "username": "testUser",
    "password": "abC.1234",
}
```
- `POST /auth/register`:  Both roles
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

### General Response Format

#### Success
```
Ex:
{
  "message": "Action executed successfully"
}
```

#### Error `formats in ./src/shared/utils/custom-errors.ts`
```
Ex:
{
  "type": "TypeClassError",
  "message": "Error description here"
}
```

## Testing

### Postman Collection
Import the provided Postman collection for easy testing:
```
Avila_Ecommerce.postman_collection.json
```

### Manual Testing
1. Start the development server
2. Use the seeded test accounts or register a new user
3. Test endpoints based on role permission, remember to use token in request

## Author

- [@Jhon Rivera](https://www.github.com/jhonr1vera)
