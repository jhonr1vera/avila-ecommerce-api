import prisma from "../src/prisma"

const Roles = [
    {
        "id": 1,
        "roleName": "user"
    },
    {
        "id": 1,
        "roleName": "admin",
        "adminKey": process.env.ADMIN_KEY
    }
]

const products = [
    {
    "name": "Harina de trigo",
    "description": "Harina de trigo de 2 kilos",
    "price": 12,
    "quantity": 20
    },
    {
    "name": "Harina P.A.N",
    "description": "Harina P.A.N de 2 kilos",
    "price": 12,
    "quantity": 20
    }
]

const defaultUsers = [
    {
        "username": "testUser",
        "password": "abC.1234",
        "firstName": "Name",
        "lastName": "LastName",
        "roleId": 1
    },
    {
        "username": "testAdmin",
        "password": "abC.1234",
        "firstName": "Name",
        "lastName": "LastName",
        "roleId": 2
    }
]

const seed = async () => {
    
    for(let rol of Roles){
        await prisma.role.create({data: rol})
    }

    for(let user of defaultUsers){
        await prisma.user.create({data: user})
    }

    for(let product of products){
        await prisma.product.create({data: product})
    }
}

seed()

