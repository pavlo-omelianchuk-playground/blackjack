import { Card } from "../src/Card.js";
import { Deck } from "../src/Deck.js";
import { Game } from "../src/Game.js";
import { Dealer, Player } from "../src/Hand.js";

describe("Game", () => {
  let game;
  let playerElement;
  let dealerElement;

  beforeEach(() => {
    game = new Game();

    playerElement = document.createElement("div");
    dealerElement = document.createElement("div");
    document.body.appendChild(playerElement);
    document.body.appendChild(dealerElement);
  });

  afterEach(() => {
    playerElement.remove();
    dealerElement.remove();
  });

  describe("start()", () => {
    it("should shuffle the deck and deal cards to the player and dealer", () => {
      game.start(playerElement, dealerElement);
      expect(game.deck).toBeInstanceOf(Deck);
      expect(game.player).toBeInstanceOf(Player);
      expect(game.dealer).toBeInstanceOf(Dealer);
      expect(game.player.cards).toHaveLength(2);
      expect(game.dealer.cards).toHaveLength(2);
    });
  });

  describe("perform playerHit event", () => {
    it("should add a card to the player and stop their turn if their score goes over 21", () => {
      // Set up initial game state
      // game.start(playerElement, dealerElement);
      game.isPlayerTurn = true;
      game.deck.cards = [new Card("♠", "10"), new Card("♦", "10")];
      game.player.addCards([new Card("♣", "2"), new Card("♦", "6")]);
      game.dealer.addCards([new Card("♣", "3"), new Card("♦", "5")]);

      // Perform playerHit() and check the resulting game state
      game.playerHit(playerElement, dealerElement);
      expect(game.player.cards).toHaveLength(3);
      expect(game.playersScore()).toBe(18);
      expect(game.isPlayerTurn).toBe(true);

      // game.playerHit(playerElement, dealerElement);
      // expect(game.player.cards).toHaveLength(4);
      // expect(game.playersScore()).toBe(28);
      // expect(game.isPlayerTurn).toBe(false);
    });
  });

  describe("perform playerStand event", () => {
    it.skip("should reveal the dealer's hidden card and keep adding cards to the dealer until their score is 17 or higher", () => {
      // Set up initial game state

      game.deck.cards = [
        new Card("10", "♠"),
        new Card("8", "♦"),
        new Card("7", "♥"),
        new Card("2", "♠"),
        new Card("K", "♥"),
      ];
      game.player.addCards([new Card("6", "♣"), new Card("5", "♦")]);
      game.dealer.addCards([new Card("A", "♠"), new Card("Q", "♦")]);

      // Perform playerStand() and check the resulting game state
      game.playerStand(dealerElement);
      expect(dealerElement.children).toHaveLength(3);
      expect(game.dealer.cards).toHaveLength(3);
      expect(game.dealerScore()).toBe(18);
    });
  });

  describe("determine winner", () => {
    game = new Game();

    it.skip("should show the correct message for a tie game", () => {
      game.player.addCards([new Card("10", "♠"), new Card("Q", "♣")]);
      game.dealer.addCards([new Card("Q", "♥"), new Card("10", "♦")]);
      const result = game.determineWinner();
      expect(result).toBe("Tie game");
    });

    it.skip("should show the correct message when the player wins", () => {
      game.player.addCards([new Card("A", "♠"), new Card("K", "♦")]);
      game.dealer.addCards([new Card("J", "♥"), new Card("2", "♦")]);
      const result = game.determineWinner();
      expect(result).toBe("Player wins!");
    });

    it.skip("should show the correct message when the dealer wins", () => {
      game.player.addCards([new Card("6", "♠"), new Card("8", "♦")]);
      game.dealer.addCards([new Card("A", "♣"), new Card("K", "♠")]);
      const result = game.determineWinner();
      expect(result).toBe("Dealer wins!");
    });
  });

  describe("reset game", () => {
    it("should reset the game state and remove all cards from the player and dealer elements", () => {
      // Set up initial game state
      game.deck.cards = [
        { rank: "5", suit: "♠" },
        { rank: "10", suit: "♦" },
        { rank: "7", suit: "♥" },
      ];
      game.player.cards = [
        { rank: "2", suit: "♣" },
        { rank: "6", suit: "♦" },
      ];
      game.dealer.cards = [
        { rank: "K", suit: "♠" },
        { rank: "3", suit: "♦" },
      ];
      playerElement.innerHTML = '<div class="card">5♠</div><div class="card">6♦</div>';
      dealerElement.innerHTML = '<div class="card">K♠</div><div class="card">3♦</div>';

      // Perform reset() and check the resulting game state
      game.reset(playerElement, dealerElement);
      expect(game.deck).toBeInstanceOf(Deck);
      expect(game.player).toBeInstanceOf(Player);
      expect(game.dealer).toBeInstanceOf(Dealer);
      expect(game.player.cards).toHaveLength(0);
      expect(game.dealer.cards).toHaveLength(0);
      expect(playerElement.children).toHaveLength(0);
      expect(dealerElement.children).toHaveLength(0);
    });
  });
});
