/* eslint-disable no-console */
/* eslint-disable no-plusplus */
// eslint-disable-next-line
import anime from 'animejs';
import levels from '../../../../data/level.json';
import { clearPage } from '../../utils/render';

const cardNumber = levels[0].card_number/2
const bossLifeMax = cardNumber*10;
let bossLife = bossLifeMax;
const memoryTimer = 5;

const main = document.querySelector('main');

function GamePage () {
  clearPage()
  /*  
    Author-> Joshua McFarland -> https://codesandbox.io/u/mcfarljw 
    URL of the Code: https://codesandbox.io/u/mcfarljw
    ligne 34 -> 47
  */ 
  
  // affichage de la barre de vie du boss
  
  displayBossLife();
  // Ajout de la div pour afficher le minuteur
  buildGamePage();

  const cards = document.querySelectorAll('.card');
  const lifeBarWrapper = document.querySelector('#LifeBar');
  const bossLifeWrapper = document.querySelector('#bossLife');


  createTimer(memoryTimer);

  // Retourner toutes les cartes dès le début de la partie afin que le joueur puisse mémoriser les cartes dans le temps imparti
  turnAllTheCards();

  // Mise en place d'un écouteur d'événement sur toutes les cartes lorsque l'on clique sur une carte. Cela la retourne.
  cards.forEach((card) =>
    card.addEventListener('click', () => {
      handleCardClick(card);
      bossLife-=10;
      bossLifeWrapper.innerText = bossLife
      animationBossLife(lifeBarWrapper);
    }),
  );

  
};

function displayBossLife(){
  const div = document.createElement('div');
  div.className = 'container text-center'
  const divrow = document.createElement('div');
  divrow.className = 'row align-items-center'
  const divLife  = document.createElement('div');
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
                  <div class="card-container">`;

  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < cardNumber; index++) {
    innerHTML += `<div class="card">
                  <div class="front">
                      ?
                  </div>
                  <div class="back">
                      ${index + 1}
                  </div>                  
                </div>`;
  }
  main.innerHTML += `${innerHTML} </div>`;
}



function createTimer(timer) {
  let secondsRemaining = timer;
  
  // Mise en place du minuteur avec setTimeout
  const timerInterval = setInterval(() => {
    if (document.getElementById('memoryTimer') !== null) {
      // Mise à jour du texte du minuteur
      document.getElementById('memoryTimer').innerText = `Temps restant : ${secondsRemaining} secondes`;

      // Si les secondes restante sont a 0 on efface la div memoryTimer
      if (secondsRemaining === 0) {
        clearInterval(timerInterval);
        document.getElementById('memoryTimer').innerHTML = '';

        // Retourner toutes les cartes après que le minuteur a expiré
        turnAllTheCards();
      }
      secondsRemaining--;
    } else {
      clearInterval(timerInterval);
    }
  }
}

function turnAllTheCards(){
  
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    handleCardClick(card);
  });
}

function handleCardClick (card)  {
  /** *************************************************************************************
*    Title: flip a card with animeJS
*    Author: Joshua McFarland -> https://codesandbox.io/u/mcfarljw 
*    Date: no date
*    Code version:
*    Availability: https://codesandbox.io/s/e7ou1
*
************************************************************************************** */

  anime({
    targets: card,
    scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 250 }],
    rotateY: { value: '+=540', delay: 200 },
    easing: 'easeInOutSine',
    duration: 400,
  });
};


function animationBossLife(lifeBarWrapper){
  console.log((bossLife/bossLifeMax)*100);
  anime({
    targets:lifeBarWrapper,
    width:`${(bossLife/bossLifeMax)*100}%`,
    duration: 500,
    easing:'easeInOutSine',
    
  })
}





export default GamePage;
