import { Game } from "./src/Game.js";

const dealerElement = document.getElementById("dealer");
const playerElement = document.getElementById("player");
const hit = document.getElementById("hit");
const pass = document.getElementById("pass");
const notice = document.getElementById("notice");
const newGame = document.getElementById("new-game");
const layout = document.querySelector(".layout");

const game = new Game();
layout.style.display = "none";

hit.addEventListener("click", () => {
  game.playerHit(playerElement, dealerElement);
});
pass.addEventListener("click", () => {
  game.playerStand(dealerElement);
});
newGame.addEventListener("click", () => {
  layout.style.display = "block";
  notice.style.display = "none";

  game.reset(playerElement, dealerElement);
  game.start(playerElement, dealerElement);
});
