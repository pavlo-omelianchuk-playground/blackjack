import { Card } from "../src/Card.js";
import { Deck } from "../src/Deck.js";

describe("Deck", () => {
  test("should initialize a deck of cards", () => {
    const deck = new Deck();
    expect(deck.cards.length).toBe(52);

    const aces = deck.cards.filter((card) => card.rank === "A");
    expect(aces.length).toBe(4);

    const spades = deck.cards.filter((card) => card.suit === "♠");
    expect(spades.length).toBe(13);

    const hearts = deck.cards.filter((card) => card.suit === "♥");
    expect(hearts.length).toBe(13);

    const clubs = deck.cards.filter((card) => card.suit === "♣");
    expect(clubs.length).toBe(13);

    const diamonds = deck.cards.filter((card) => card.suit === "♦");
    expect(diamonds.length).toBe(13);

    const cardRanks = deck.cards.map((card) => card.rank);
    const uniqueRanks = [...new Set(cardRanks)];
    expect(uniqueRanks.length).toBe(13);

    const cardSuits = deck.cards.map((card) => card.suit);
    const uniqueSuits = [...new Set(cardSuits)];
    expect(uniqueSuits.length).toBe(4);
  });

  test("should shuffle the deck of cards", () => {
    const deck = new Deck();
    const originalCards = [...deck.cards];

    deck.shuffle();
    expect(deck.cards.length).toBe(originalCards.length);

    let cardsAreShuffled = false;
    for (let i = 0; i < deck.cards.length; i++) {
      if (deck.cards[i].rank !== originalCards[i].rank || deck.cards[i].suit !== originalCards[i].suit) {
        cardsAreShuffled = true;
        break;
      }
    }

    expect(cardsAreShuffled).toBe(true);
  });

  test("should deal one card from the deck", () => {
    const deck = new Deck();
    const card = deck.dealCard();
    expect(deck.cards.length).toBe(51);
    expect(card).toBeInstanceOf(Card);
  });
});
