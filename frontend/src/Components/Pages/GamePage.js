// eslint-disable-next-line
import anime from 'animejs';

const handleCardClick = (card) => {
  /*  
    Author-> Joshua McFarland -> https://codesandbox.io/u/mcfarljw 
    URL of the Code: https://codesandbox.io/u/mcfarljw
    ligne 11 -> 17
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
    ligne 27 -> 41
  */

  let innerHTML = `<div class="card-container">`;
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < 4; index++) {
    innerHTML += `<div class="card">
                    <div class="front">
                        ${index}
                    </div>
                    <div class="back">
                        ${index + 1}
                    </div>                  
                  </div>`;
  };

  const main = document.querySelector('main');
  main.innerHTML = `${innerHTML} </div>`;

  const cards = document.querySelectorAll('.card');

  // Mise en place d'ecouteur d'evenement sur toutes les cartes lorsque que l'on click sur une carte. Cela la retourne .
  cards.forEach((card) =>
    card.addEventListener('click', () => {
      handleCardClick(card);
    }),
  );
};

export default GamePage;
