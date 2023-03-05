import { Card } from "./Card.js";
import { Deck } from "./Deck.js";
import { Dealer, Hand, Player } from "./Hand.js";

// Define the Game class
export class Game {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
    this.card = new Card();
    this.hand = new Hand();
    this.isPlayerTurn;
  }

  playersScore() {
    return this.player.getScore();
  }
  dealerScore() {
    return this.dealer.getScore();
  }

  dealCard() {
    return this.deck.dealCard();
  }

  // start game
  start(playerElement, dealerElement) {
    this.isPlayerTurn = true;
    // Shuffle the deck and deal the cards
    this.deck.shuffle();

    // add cards to the player and dealer hands
    this.player.addCards([this.dealCard(), this.dealCard()]);
    this.dealer.addCards([this.dealCard(), this.dealCard()]);

    // paint cards
    this.player.cards.forEach((card) => {
      const newCard = this.card.model(card);
      playerElement.append(newCard);
    });
    this.dealer.cards.forEach((card, index) => {
      //using index for determine first dealers card and hide it
      const newCard = this.card.model(card, index);
      dealerElement.append(newCard);
    });
  }

  playerHit(playerElement, dealerElement) {
    // Player takes another card
    if (this.isPlayerTurn) {
      const dealCard = this.dealCard();
      this.player.addCards([dealCard]);
      const newCard = this.card.model(dealCard);
      playerElement.append(newCard);

      if (this.playersScore() > 21) {
        this.isPlayerTurn = false;
        this.playerStand(dealerElement);
      }
    }
  }

  playerStand(dealerElement) {
    // Player stands and it's the dealer's turn.
    // Dealer takes cards until the score is 17 or more
    this.isPlayerTurn = false;
    const hiddenCard = dealerElement.children[0];
    hiddenCard.classList.remove("back");
    hiddenCard.innerHTML = this.dealer.cards[0];
    while (this.dealerScore() < 17) {
      const dealCard = this.dealCard();
      this.dealer.addCards([dealCard]);
      const newCard = this.card.model(dealCard);
      dealerElement.append(newCard);
    }
    this.determineWinner();
  }

  showNotice = (text) => {
    const notice = document.getElementById("notice");

    notice.children[0].children[0].innerHTML = text;
    notice.style.display = "flex";
  };

  determineWinner() {
    const isBlackJack = {
      player: this.playersScore() === 21 && this.player.cards.length === 2,
      dealer: this.dealerScore() === 21 && this.dealer.cards.length === 2,
    };

    if (this.playersScore() >= 22) {
      this.showNotice(
        `${isBlackJack["dealer"] ? "Dealer has a BlackJack. " : ""} You go bust! Your hand is ${
          this.player.cards
        } with a value of ${this.playersScore()}.`
      );
    } else if (this.dealerScore() >= 22) {
      this.showNotice(
        `You Win ${isBlackJack["player"] ? "BlackJack! " : "!"}Dealer go BUST! With ${
          this.dealer.cards
        } and a value of ${this.dealerScore()}.`
      );
    } else if (this.playersScore() > this.dealerScore()) {
      this.showNotice(`You win ${isBlackJack["player"] ? "BlackJack " : ""}with total ${this.playersScore()}`);
    } else if (this.dealerScore() > this.playersScore()) {
      this.showNotice(`Dealer win ${isBlackJack["dealer"] ? "BlackJack " : ""}with total ${this.dealerScore()}`);
    } else {
      this.showNotice(`Tie with totals Player: ${this.playersScore()} /  Dealer: ${this.dealerScore()}`);
      return "Tie game";
    }
  }

  reset(playerElement, dealerElement) {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();

    while (dealerElement.children.length > 0) {
      dealerElement.children[0].remove();
    }
    while (playerElement.children.length > 0) {
      playerElement.children[0].remove();
    }
  }
}
