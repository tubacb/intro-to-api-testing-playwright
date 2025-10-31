import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from './dto/login-dto'

test('should return token with correct name and password', async ({ request }) => {
  // prepare request body
  const requestBody = LoginDto.createLoginDto()
  const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
    data: requestBody,
  })
  console.log('response body:', await response.text())
})

test('should return 401-UNAUTHORIZED and should not return token with incorrect password', async ({
  request,
}) => {
  // prepare request body
  const requestBody = new LoginDto(process.env.USER || '', '')
  const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
    data: requestBody,
  })
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('should return 401-UNAUTHORIZED and should not return token with incorrect user', async ({
  request,
}) => {
  // prepare request body
  const requestBody = new LoginDto('', process.env.PASSWORD || '')
  const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
    data: requestBody,
  })
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('should return 200-OK and checks whether the response contains a valid JSON Web Token (JWT)', async ({
  request,
}) => {
  // prepare request body
  const requestBody = LoginDto.createLoginDto()
  const jwtRegex = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
  const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
    data: requestBody,
  })
  const jwtValue = await response.text()
  console.log('response body:', jwtValue)
  expect(jwtValue).toMatch(jwtRegex)
  expect(response.status()).toBe(StatusCodes.OK)
})

test('should return METHOD_NOT_ALLOWED with incorrect HTTP method', async ({ request }) => {
  // prepare request body
  const requestBody = LoginDto.createLoginDto()
  const response = await request.get('https://backend.tallinn-learning.ee/login/student', {
    data: requestBody,
  })
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})
