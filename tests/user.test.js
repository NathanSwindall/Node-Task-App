const request = require('supertest');
const app = require("../src/app")
const User = require('../src/models/user')
const {userOne, setupDatabase} = require('../tests/db')

beforeEach( async () => {
    await setupDatabase()
})

test("Should create user", async () => {
    const response = await request(app)
        .post("/users")
        .send({
            name: "Nathan",
            email: "Nathan@example.com",
            password: "Mypass777"
        })
        .expect(201)
})

test("Should login user", async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    })
})


test("Should delete a user", async () => {

})


test("Should not delete a user", async () => {

})



