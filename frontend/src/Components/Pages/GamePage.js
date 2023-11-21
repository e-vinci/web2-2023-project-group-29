/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
// eslint-disable-next-line
import anime from 'animejs';
import levels from '../../../../data/level.json';
import { clearPage } from '../../utils/render';
import img1 from '../../assets/default/bomb.png';
import img2 from '../../assets/default/star.png';
import img3 from '../../assets/default/dude.png';
import imgheart from '../../assets/default/heart.png';
import imgskull from '../../img/favicon.ico'

let firstCard = null; // Variable pour stocker la première carte cliquée

const cardNumber = levels[0].card_number / 2;
const bossLifeMax = cardNumber * 5;
let bossLife = bossLifeMax;
const memoryTimer = 5;
let lifeBarWrapper;
let bossLifeWrapper;
let clickable = false;
let cards;
let gameSeconds = 0;
let idGameTimer;
let timerOfThePlayer;


const main = document.querySelector('main');

function GamePage() {
  clearPage();

  // affichage de la barre de vie du boss
  displayBossLife();
  displayplayerLife();
  // Ajout de la div pour afficher le minuteur
  buildGamePage();

  cards = document.querySelectorAll('.card');
  lifeBarWrapper = document.querySelector('#LifeBar');
  bossLifeWrapper = document.querySelector('#bossLife');
  

  // On creer le timer de memorisation
  createMemoryTimer(memoryTimer);

  // Retourner toutes les cartes dès le début de la partie afin que le joueur puisse mémoriser les cartes dans le temps imparti
  turnAllTheCards();

  // Mise en place d'un écouteur d'événement sur toutes les cartes lorsque l'on clique sur une carte.
  cards.forEach((card) =>
    card.addEventListener('click', () => {
      if (clickable === true) {
        if (!card.classList.contains('card-found')) {
          handleCardClick(card);
          checkMatchingCards(card);
        }
      }
    }),
  );
}

function displayBossLife() {
  const div = document.createElement('div');
  div.className = 'container text-center';
  const divrow = document.createElement('div');
  divrow.className = 'row align-items-center';
  const divLife = document.createElement('div');
  divLife.id = 'life';
  main.appendChild(divLife);

  const divBossLife = document.createElement('div');
  divBossLife.id = 'LifeBar';
  divLife.appendChild(divBossLife);

  const p = document.createElement('p');
  p.innerText = bossLife;
  p.id = 'bossLife';
  p.className = 'text-center';
  divBossLife.appendChild(p);
}

function buildGamePage() {
  let innerHTML = `<div id="memoryTimer"></div>
                   <br> 
                   <div id="gameTimer"></div>
                   <div class="card-container">`;
  const arrayOfCards = initializeArray();
  shuffleArray(arrayOfCards);

  for (let index = 0; index < cardNumber; index++) {
    innerHTML += `<div class="card">
                  <div class="front">
                      ?
                  </div>
                  <div class="back">
                      <img src=${arrayOfCards[index]}>
                  </div>                  
                </div>`;
  }
  main.innerHTML += `${innerHTML} </div>`;
}

function createMemoryTimer(timer) {
  let secondsRemaining = timer;

  // Mise en place du minuteur avec setTimeout
  const timerInterval = setInterval(() => {
    if (document.getElementById('memoryTimer') !== null) {
      // Mise à jour du texte du minuteur
      document.getElementById(
        'memoryTimer',
      ).innerText = `Temps restant : ${secondsRemaining} secondes`;

      // Si les secondes restante sont a 0 on efface la div memoryTimer
      if (secondsRemaining === 0) {
        clearInterval(timerInterval);
        document.getElementById('memoryTimer').innerHTML = '';
        clickable = true;
        // Lance le chrono de la partie
        startGameTimer();
        // Retourner toutes les cartes après que le minuteur ai expiré
        turnAllTheCards();
      }
      secondsRemaining--;
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function turnAllTheCards() {
  cards.forEach((card) => {
    handleCardClick(card);
  });
}

function handleCardClick(card) {
  /** *************************************************************************************
   *    Title: flip a card with animeJS
   *    Author: Joshua McFarland -> https://codesandbox.io/u/mcfarljw
   *    Date: no date
   *    Code version:
   *    Availability: https://codesandbox.io/s/e7ou1
   *
   ************************************************************************************** */
  if (card.classList.contains('card-found')) {
    return;
  }

  anime({
    targets: card,
    scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 250 }],
    rotateY: { value: '+=540', delay: 200 },
    easing: 'easeInOutSine',
    duration: 400,
  });
}

// eslint-disable-next-line no-shadow
function animationBossLife(lifeBarWrapper) {
  console.log((bossLife / bossLifeMax) * 100);
  anime({
    targets: lifeBarWrapper,
    width: `${(bossLife / bossLifeMax) * 100}%`,
    duration: 500,
    easing: 'easeInOutSine',
  });
}
function initializeArray() {
  const array = [img1, img1, img2, img2, img3, img3];
  return array;
}

function shuffleArray(array) {
  /** *************************************************************************************
   *    Title: creation d'une function qui melange un tableau de cards en javascript
   *    Author: ChatGpt -> https://chat.openai.com/
   *    Date: no date
   *    Code version: no code version
   *    Availability: https://chat.openai.com/
   *
   ************************************************************************************** */

  // Algorithme de Fisher-Yates
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function checkMatchingCards(card) {
  if (firstCard == null) {
    firstCard = card;
    return;
  }
  if (firstCard !== null) {
    // Si c'est la deuxième carte cliquée
    const firstCardImgSrc = firstCard.querySelector('.back img').src;
    const secondCardImgSrc = card.querySelector('.back img').src;

    if (firstCardImgSrc !== secondCardImgSrc) {
      
      animationBreakHeart();
      setTimeout(() => {

        handleCardClick(firstCard);
        console.log('first Card= ', firstCard);
        handleCardClick(card);
        console.log('second Card= ', card);

        if (firstCard !== null) {
          firstCard = null;
        }
      }, 850);
    } else {
      // Si les 2 cartes sont identique alors on desactive leur ecouteurs evenements afin qu'on ne puisse plus les retourner,
      // On remet la first Card a Null et on enleve des point de vies au boss.
      if (card.classList.contains('card-found') && firstCard.classList.contains('card-found')) {
        return;
      }
      card.classList.add('card-found');
      firstCard.classList.add('card-found');
      firstCard = null;

      bossLife -= 10;
      bossLifeWrapper.innerText = bossLife;
      animationBossLife(lifeBarWrapper);

      if (bossLife === 0) {
        stopGameTimer();
        alert(`you win with a time of : ${timerOfThePlayer}`);
      }
    }
  }
}

function startGameTimer() {
  /** *************************************************************************************
   *    Title: creation d'un chronometre en javascript
   *    Author: ChatGpt -> https://chat.openai.com/
   *    Date: no date
   *    Code version: no code version
   *    Availability: https://chat.openai.com/
   *
   ************************************************************************************** */
  
  gameSeconds = 0;
  const gameTimerElement = document.getElementById('gameTimer');

  idGameTimer = setInterval(() => {
    gameSeconds++;
    gameTimerElement.innerText = `Temps de jeu : ${formatTime(gameSeconds)}`;
  }, 1000);
}

function stopGameTimer() {
  clearInterval(idGameTimer);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerOfThePlayer = `${formatANumber(minutes)}:${formatANumber(seconds)}`;
  return `${formatANumber(minutes)}:${formatANumber(seconds)}`;
}

function formatANumber(value) {
  return value < 10 ? `0${value}` : value;
}
function displayplayerLife(){
  const divHeart = document.createElement('div')
  divHeart.className = 'divHearts'
  main.appendChild(divHeart);// container for hearts
  for (let index = 0; index <3; index++) {
    const heart = document.createElement('img')
    heart.src = imgheart;
    heart.className = 'heart'
    divHeart.appendChild(heart)
  }
    
}

function animationBreakHeart(){
  const hearts = document.querySelectorAll('.heart');
  if(hearts){
    const heart = hearts[hearts.length-1]
    heart.className = 'skull';
    heart.src=imgskull; 
  }
   
}

export default GamePage;
