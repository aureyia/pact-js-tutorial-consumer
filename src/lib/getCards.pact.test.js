import { getCards} from "@/lib/getCards";
import path from 'path'
import axios from "axios";
import { PactV3, Matchers } from '@pact-foundation/pact'
import { describe, test, expect } from "vitest";

describe('getCards()', () => {
  const provider = new PactV3({
    consumer: 'pact-js-tutorial-consumer',
    provider: 'pact-js-tutorial-provider',
    dir: path.resolve('.', 'pact/pacts'),
    logLevel: 'DEBUG',
  })

  const expectedBody = [
    {
      title: 'Example Title',
      description: 'Example description',
      content: 'Example content',
      footer: 'Example footer',
    },
  ];

  test('returns the correct response', () => {
    provider
      .given('a state')
      .uponReceiving('a request for card data')
      .withRequest({
        method: 'GET',
        path: '/cards',
      })
      .willRespondWith({
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: Matchers.like(expectedBody),
      })

    return provider.executeTest(async (mockserver) => {
      axios.defaults.baseURL = mockserver.url

      const response = await getCards()
      expect(response).to.eql(expectedBody)
    })
  })
})