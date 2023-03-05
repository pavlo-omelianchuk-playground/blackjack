export class Hand {
  constructor() {
    this.cards = [];
  }

  addCards(cardsArray) {
    // Add a card to the hand
    cardsArray.forEach((card) => {
      this.cards.push(card);
    });
  }

  getScore() {
    // Calculate the score of the hand
    let score = 0;
    let hasAce = false;

    if (!Array.isArray(this.cards)) return;
    console.log(this.cards);
    for (let card of this.cards) {
      if (card.rank === "A") {
        hasAce = true;
      }
      score += card.getValue();
    }
    // If there are any aces in the hand and the score is over 21, reduce the value of one ace from 11 to 1
    if (hasAce && score > 21) {
      score -= 10;
    }
    return score;
  }

  getHandString() {
    let cardsString = this.cards.map((card) => card.toString()).join(", ");
    return `${this.name}: ${cardsString}`;
  }
}
// Define the Player class
export class Player extends Hand {
  constructor() {
    super();
    this.name = "Player";
  }
}

// Define the Dealer class
export class Dealer extends Hand {
  constructor() {
    super();
    this.name = "Dealer";
  }
}
