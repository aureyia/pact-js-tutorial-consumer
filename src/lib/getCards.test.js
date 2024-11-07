import { getCards} from "@/lib/getCards";
import path from 'path'
import axios from "axios";
import { PactV3 } from '@pact-foundation/pact'
import { describe, it, expect } from "vitest";

describe('API service', () => {
  const provider = new PactV3({
    consumer: 'pact-js-tutorial-consumer',
    provider: 'pact-js-tutorial-provider',
    dir: path.resolve('.', 'pact/pacts'),
    logLevel: 'DEBUG',
  })

  describe('getCards()', () => {

    const expectedBody = [
      {
        title: 'Example Title',
        description: 'Example description',
        content: 'Example content',
        footer: 'Example footer',
      },
    ];

      it('returns the correct response', () => {
      provider
        .given('a patient is logged in')
        .uponReceiving('a request for some data')
        .withRequest({
          method: 'GET',
          path: '/cards',
        })
        .willRespondWith({
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: expectedBody,
        })

      return provider.executeTest(async (mockserver) => {
        axios.defaults.baseURL = mockserver.url

        const response = await getCards()
        expect(response).to.eql(expectedBody)
      })
    })
  })
})