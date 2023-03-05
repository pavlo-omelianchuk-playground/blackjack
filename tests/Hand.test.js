import { Card } from "../src/Card.js";
import { Dealer, Hand, Player } from "../src/Hand.js";

describe("Hand class", () => {
  let hand;

  beforeEach(() => {
    hand = new Hand();
  });

  test("addCards method should add cards to the hand", () => {
    const card1 = new Card("♥", "2");
    const card2 = new Card("♦", "K");
    hand.addCards([card1, card2]);
    expect(hand.cards).toContain(card1);
    expect(hand.cards).toContain(card2);
  });

  test("getScore method should calculate the score of the hand", () => {
    const card1 = new Card("♥", "A");
    const card2 = new Card("♦", "K");
    const card3 = new Card("♠", "6");
    hand.addCards([card1, card2, card3]);
    expect(hand.getScore()).toBe(17);
  });

  test("getHandString method should return a string representation of the hand", () => {
    const card1 = new Card("♥", "2");
    const card2 = new Card("♦", "K");
    hand.addCards([card1, card2]);
    expect(hand.getHandString()).toBe("undefined:  2 ♥ ,  K ♦ ");
  });
});

describe("Player class", () => {
  let player;

  beforeEach(() => {
    player = new Player();
  });

  test('constructor should set the name property to "Player"', () => {
    expect(player.name).toBe("Player");
  });
});

describe("Dealer class", () => {
  let dealer;

  beforeEach(() => {
    dealer = new Dealer();
  });

  test('constructor should set the name property to "Dealer"', () => {
    expect(dealer.name).toBe("Dealer");
  });
});
