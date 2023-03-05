import { Card } from "../src/Card.js";

describe("Card", () => {
  test("getValue should return correct value for each rank", () => {
    const ace = new Card("hearts", "A");
    const king = new Card("spades", "K");
    const queen = new Card("diamonds", "Q");
    const jack = new Card("clubs", "J");
    const ten = new Card("hearts", "10");
    const nine = new Card("spades", "9");

    expect(ace.getValue()).toBe(11);
    expect(king.getValue()).toBe(10);
    expect(queen.getValue()).toBe(10);
    expect(jack.getValue()).toBe(10);
    expect(ten.getValue()).toBe(10);
    expect(nine.getValue()).toBe(9);
  });

  test("toString should return correct string representation", () => {
    const card = new Card("hearts", "A");
    expect(card.toString()).toBe(" A hearts ");
  });
});
