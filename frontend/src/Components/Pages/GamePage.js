/* eslint-disable no-plusplus */
// eslint-disable-next-line
import anime from 'animejs';

const memoryTimer = 5;

const handleCardClick = (card) => {
  /*  
    Author-> Joshua McFarland -> https://codesandbox.io/u/mcfarljw 
    URL of the Code: https://codesandbox.io/u/mcfarljw
    ligne 14 -> 21
  */

  anime({
    targets: card,
    scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 250 }],
    rotateY: { value: '+=540', delay: 200 },
    easing: 'easeInOutSine',
    duration: 400,
  });
};

const GamePage = () => {
  /*  
    Author-> Joshua McFarland -> https://codesandbox.io/u/mcfarljw 
    URL of the Code: https://codesandbox.io/u/mcfarljw
    ligne 34 -> 47
  */ 
  const main = document.querySelector('main');
  
  // Ajout de la div pour afficher le minuteur


  let innerHTML = `<div id="memoryTimer"></div> 
                    <div class="card-container">`;
  
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < 4; index++) {
    innerHTML += `<div class="card">
                    <div class="front">
                        ?
                    </div>
                    <div class="back">
                        ${index + 1}
                    </div>                  
                  </div>`;
  }
  main.innerHTML = `${innerHTML} </div>`;



  const cards = document.querySelectorAll('.card');

  
  let secondsRemaining = memoryTimer;

  // Mise en place du minuteur
  const timerInterval = setInterval(() => {
    document.getElementById('memoryTimer').innerText = `Temps restant : ${secondsRemaining} secondes`;

    if (secondsRemaining === 0) {
      clearInterval(timerInterval);
      document.getElementById('memoryTimer').innerHTML="";

      // Retourner toutes les cartes après que le memoryTimer a expiré
      cards.forEach((card) => {
        handleCardClick(card);
      });
    }
    secondsRemaining--;
  }, 1000);

  // Retourner toutes les cartes dès le début de la partie afin que le joueur puisse mémoriser les cartes dans le temps imparti
  cards.forEach((card) => {
    handleCardClick(card);
  });

  // Mise en place d'un écouteur d'événement sur toutes les cartes lorsque l'on clique sur une carte. Cela la retourne.
  cards.forEach((card) =>
    card.addEventListener('click', () => {
      handleCardClick(card);
    }),
  );
};

export default GamePage;
