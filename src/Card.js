export class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }

  getValue() {
    switch (this.rank) {
      case "A":
        // return a placeholder value of 11 for now
        return 11;
      case "K":
      case "Q":
      case "J":
      case "10":
        return 10;
      default:
        return parseInt(this.rank);
    }
  }

  toString() {
    return ` ${this.rank} ${this.suit} `;
  }

  isRed(card, cardElement) {
    (String(card.suit).includes("♥") || String(card.suit).includes("♦")) && cardElement?.setAttribute("data-red", true);
  }

  model(card, index) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    if (!!card) {
      this.isRed(card, cardElement);
      index === 0 ? cardElement.classList.add("back") : (cardElement.innerHTML = card);

    }
    return cardElement;
  }
}
