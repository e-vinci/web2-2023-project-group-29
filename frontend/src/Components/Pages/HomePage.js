import audioPath from '../../assets/sound/background_sound.mp3';

const HomePage = () => {
  const main = document.querySelector('main');
  const audio = new Audio(audioPath);

  audio.play();
  audio.setAttribute('autoplay', true);
  audio.loop = true;

  const homePage = `
    <div class="container-fluid full-screen-bg">
      <div class="row">
        <div class="col-md-3 game-menu">
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action">Play</a>
            <a href="#" class="list-group-item list-group-item-action">Rules</a>
            <a href="#" class="list-group-item list-group-item-action">Credits</a>
          </div>
        </div>
      </div>
    </div>
  `;
  main.innerHTML = homePage;
  main.appendChild(audio);
};

export default HomePage;

