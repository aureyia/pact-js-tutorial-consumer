import { getCards} from "@/lib/getCards";
import axios from "axios";
import { describe, test, expect, vi } from "vitest";

vi.mock('axios')

describe("getCards()", () => {
  test('return valid cards', async () => {
    const cards = [
      {
        title: 'Example Title',
        description: 'Example description',
        content: 'Example content',
        footer: 'Example footer',
      },
    ];

    axios.get.mockResolvedValue({
      data: cards
    })

    const returnedCards = await getCards();

    expect(returnedCards).toEqual(cards)
  });
});
