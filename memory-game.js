"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

let count = {first: 0, second: 0};
let evt1 = {};
let evt2 = {};

const colors = shuffle(COLORS);

createCards(colors);


function shuffle(items) {
  for (let i = items.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    let newCard = document.createElement("div");
    newCard.setAttribute("class", color);
    newCard.addEventListener("click", function(evt){
      if (count.first == 0 || count.second == 0) {
        flipCard(newCard);
        handleCardClick(evt);
      };
    });
    gameBoard.appendChild(newCard);
  }
}

/** Flip a card face-up. */
function flipCard(card) {
  card.style.backgroundColor = card.getAttribute("class");
}

/** Flip a card face-down. */
function unFlipCard(card) {
  card.style.backgroundColor = "white";
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  /* Keeps count of how many cards clicked
  the else if condition checks if the user clicked on the same card */
  if (count.first == 0 && count.second == 0) {
    count.first = 1;
    evt1 = evt.target;
  } else if (count.second == 0 && evt1 != evt.target) {
    count.second = 1;
    evt2 = evt.target;
  }

  /* Checks if flipped cards are the same class */
  if (count.first == 1 && count.second == 1) {
    if (evt1.className != evt2.className) {
      setTimeout(function(){
        unFlipCard(evt1);
        unFlipCard(evt2);
        count.first = 0;
        count.second = 0;
      }, 1000);
    } else {
      count.first = 0;
      count.second = 0;
    };
  }
}
