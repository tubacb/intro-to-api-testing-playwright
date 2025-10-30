import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { RiskDTO } from '../src/dto/risk-dto'
import { LoanDTO } from '../src/dto/loan-dto'

const url = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'
let requestBody
let reponseBody
let riskDto
test('The risk score of application with positive income, positive debt for the user older than 16 should be negative decision', async ({
  request,
}) => {
  // Build and send a GET request to the server
  requestBody = new LoanDTO(100, 0, 17, true, 1000, 12)
  const response = await request.post(url, { data: requestBody })
  reponseBody = await response.json()
  riskDto = new RiskDTO(
    reponseBody.riskScore,
    reponseBody.riskLevel,
    reponseBody.riskPeriods,
    reponseBody.applicationId,
    reponseBody.riskDecision,
  )
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check response status, decision and level
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(riskDto.riskDecision).toBe('negative')
  expect.soft(riskDto.riskLevel).toBe('Very High Risk')
})

test('The risk score of application with positive income, positive debt for the user older than 16 should be Positive Decision with Medium risk', async ({
  request,
}) => {
  // Build and send a GET request to the server
  const requestBody = new LoanDTO(2000, 0, 30, true, 500, 6)
  const response = await request.post(url, { data: requestBody })
  reponseBody = await response.json()
  riskDto = new RiskDTO(
    reponseBody.riskScore,
    reponseBody.riskLevel,
    reponseBody.riskPeriods,
    reponseBody.applicationId,
    reponseBody.riskDecision,
  )
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check response status, decision and level
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(riskDto.riskDecision).toBe('positive')
  expect.soft(riskDto.riskLevel).toBe('Medium Risk')
})

test('The risk score of application with positive income, positive debt for the user older than 16 should be Positive Decision with Low risk', async ({
  request,
}) => {
  // Build and send a GET request to the server
  const requestBody = new LoanDTO(20000, 0, 30, true, 500, 12)
  const response = await request.post(url, { data: requestBody })
  reponseBody = await response.json()
  riskDto = new RiskDTO(
    reponseBody.riskScore,
    reponseBody.riskLevel,
    reponseBody.riskPeriods,
    reponseBody.applicationId,
    reponseBody.riskDecision,
  )
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check response status, decision and level
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(riskDto.riskDecision).toBe('positive')
  expect.soft(riskDto.riskLevel).toBe('Low Risk')
})
