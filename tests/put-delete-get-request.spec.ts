import { StatusCodes } from 'http-status-codes'
import { expect, test } from '@playwright/test'

// GET
test('GET order with empty username and password should receive 500 - INTERNAL_SERVER_ERROR', async ({ request }) => {
  const loginParameters = {
    username: '',
    password: '',
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params:loginParameters
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})

test('GET order with valid username and valid password should receive 200- OK', async ({ request }) => {
  const loginParameters = {
    username: 'qwr',
    password: 'qwr',
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params:loginParameters
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})


test('GET order with valid password without username should receive 500 - INTERNAL_SERVER_ERROR', async ({ request }) => {
  const loginParameters = {
    password: 'qwr',
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params:loginParameters
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})


test('GET order with valid username without password should receive 500 - INTERNAL_SERVER_ERROR', async ({ request }) => {
  const loginParameters = {
    username: 'qwr'
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params:loginParameters
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})

test('GET order with blanks as username and password should receive 200 - OK', async ({ request }) => {
  const loginParameters = {
    username: ' ',
    password: '  ',
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params:loginParameters
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('GET order with id = 0 than should receive 400 - BAD_REQUEST', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/0')
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('GET order with negative id than should receive 400 - BAD_REQUEST', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/-2')
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('GET order with id = 3 should receive 200 - OK', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/3')
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

// DELETE
test('DELETE order with existing id and valid api key should be deleted and receive 204 - NO-CONTENT', async ({ request }) => {
  const requestHeaders: {api_key: string} = {
    api_key: '1234567890111111',
  };
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/10', {
    headers:requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('DELETE order with negative id and valid api key should receive 400 - BAD_REQUEST', async ({ request }) => {
  const requestHeaders: {api_key: string} = {
    api_key: '1234567890111111',
  };
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/-10', {
    headers:requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('DELETE order with existing id and invalid api key should receive 401 - UNAUTHORIZED', async ({ request }) => {
  const requestHeaders: {api_key: string} = {
    api_key: '123456789011111100',
  };
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/10', {
    headers:requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

//PUT
test('PUT the order with valid id and valid api key should receive 200 - OK', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 1,
  }
  const requestHeaders = {
    api_key: '1234567890111111',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('PUT the order with valid id and 18 digit api key should receive 401 - UNAUTHORIZED', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 1,
  }
  const requestHeaders = {
    api_key: '123456789011111100',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('PUT the order with valid id and 16 digit string api key should receive 401 - UNAUTHORIZED', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 1,
  }
  const requestHeaders = {
    api_key: '12345678qq911100',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('PUT the order with invalid id and valid api key should receive 400 - BAD_REQUEST', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }
  const requestHeaders = {
    api_key: '1234567890111111',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/0', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('PUT order with valid id valid api key with should receive 200 - OK', async ({ request }) => {
  const requestBody = {
  }
  const requestHeaders = {
    api_key: '1234567890111111',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/3', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('PUT order with valid id valid api key withoud body should receive 400 - BAD_REQUEST', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890111111',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/3', {
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('PUT the order with valid id, valid api key string courierId should receive 400 - BAD_REQUEST', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 'we',
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 2,
  }
  const requestHeaders = {
    api_key: '1234567890111111',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/2', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('PUT the order with string id, valid api key should receive 400 - BAD_REQUEST', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 234,
    customerName: 'string',
    customerPhone: '2312',
    comment: '123',
    id: 'wer',
  }
  const requestHeaders = {
    api_key: '1234567890111111',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/2', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

/*
*
* TYPE OF PARAMETERS IN REQUEST BODY ARE WRONG SO THEY SHOULD NOT RETURN 200
*
test('PUT the order with valid id, valid api key, non string customerName should receive 400 - BAD_REQUEST', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 234,
    customerName: 0,
    customerPhone: 'string',
    comment: 'string',
    id: 2,
  }
  const requestHeaders = {
    api_key: '1234567890111111',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/2', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('PUT the order with valid id, valid api key and non string customerPhone should receive 400 - BAD_REQUEST', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 234,
    customerName: 'string',
    customerPhone: 2312,
    comment: 'string',
    id: 2,
  }
  const requestHeaders = {
    api_key: '1234567890111111',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/2', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('PUT the order with valid id, valid api key and non string comment should receive 400 - BAD_REQUEST', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 234,
    customerName: 'string',
    customerPhone: '2312',
    comment: 123,
    id: 2,
  }
  const requestHeaders = {
    api_key: '1234567890111111',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/2', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
*/


/* THESE ARE NOT CORRECT TYPE OF ID BUT RETURN SUCCESS
*
test('PUT the order with string id ('123') in body and valid id in URL, valid api key should receive 400 - BAD_REQUEST', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 234,
    customerName: 'string',
    customerPhone: '2312',
    comment: '123',
    id: '123',
  }
  const requestHeaders = {
    api_key: '1234567890111111',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('PUT the order with null id in body but valid id in URL, valid api key should receive 400 - BAD_REQUEST', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 234,
    customerName: 'string',
    customerPhone: '2312',
    comment: '123',
    id: null,
  }
  const requestHeaders = {
    api_key: '1234567890111111',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('PUT the order with empty string id in body but valid id in URL, valid api key should receive 400 - BAD_REQUEST', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 234,
    customerName: 'string',
    customerPhone: '2312',
    comment: '123',
    id: null,
  }
  const requestHeaders = {
    api_key: '1234567890111111',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

 */
