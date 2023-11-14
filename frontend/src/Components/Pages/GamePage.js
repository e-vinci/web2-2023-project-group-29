// eslint-disable-next-line
import anime from 'animejs';



const GamePage = () => {

    /*  
    Author-> Joshua McFarland -> https://codesandbox.io/u/mcfarljw 
    URL of the Code: https://codesandbox.io/u/mcfarljw
    */
    const main=document.querySelector('main');
    
    main.innerHTML=`<div class="card-container">
                      <div class="card">
                        <div class="front">
                          A
                        </div>
                        <div class="back">
                          B
                        </div>
                      </div>
                    </div>`;
    const card = document.querySelector(".card");

    let playing = false;
    

    card.addEventListener("click", () => {
      if (playing) return;

      playing = true;

      anime({
        targets: card,
        scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 250 }],
        rotateY: { value: "+=540", delay: 200 },
        easing: "easeInOutSine",
        duration: 400,
        
        // eslint-disable-next-line no-unused-vars
        complete: (anim) => {
          playing = false;
        }
      });
    });

};

export default GamePage;

