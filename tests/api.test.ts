import app from '../src/app'
import supertest from 'supertest'
import { register, login } from '../src/services/user'
import prisma from '../src/utils/prisma'

const api = supertest(app)
const testUsername = 'testuser'
const testPassword = 'password'
let token: string | null

beforeEach(async () => {
  await prisma.favorite.deleteMany()
  await prisma.account.deleteMany()
  await register(testUsername, testPassword)
  token = await login(testUsername, testPassword)
})

test('register', async () => {
  const userInfo = {
    username: 'testoman',
    password: 'testopass'
  }

  await api
    .post('/api/user/register')
    .send(userInfo)
    .expect(200)
})

test('register - existing user', async () => {
  const userInfo = {
    username: testUsername,
    password: 'xyz'
  }

  await api
    .post('/api/user/register')
    .send(userInfo)
    .expect(409)
})

test('login', async () => {
  const userInfo = {
    username: testUsername,
    password: testPassword
  }

  await api
    .post('/api/user/login')
    .send(userInfo)
    .expect(200)
})

test('login - incorrect password', async () => {
  const userInfo = {
    username: testUsername,
    password: 'incorrect'
  }

  await api
    .post('/api/user/login')
    .send(userInfo)
    .expect(401)
})

test('login - user does not exist', async () => {
  const userInfo = {
    username: 'invalid',
    password: 'incorrect'
  }

  await api
    .post('/api/user/login')
    .send(userInfo)
    .expect(401)
})

test('get movie', async () => {
  const response = await api
    .get('/api/movie/603')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.id).toBe(603)
})

test('search', async () => {
  const response = await api
    .get('/api/search?q=the matrix')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body[0].id).toBe(603)
})

test('add and remove favorite', async () => {
  await api
    .put('/api/favorite/603')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)

  let response = await api
    .get('/api/favorite/603')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.id).toBe(603)

  await api
    .delete('/api/favorite/603')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)

  response = await api
    .get('/api/favorite/603')
    .set('Authorization', `Bearer ${token}`)
    .expect(404)
})

afterAll(() => {
  prisma.$disconnect()
})
