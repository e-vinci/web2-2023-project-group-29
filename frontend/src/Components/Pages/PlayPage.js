import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';
import { playAudio, toggleAudio, isAudioCurrentlyPlaying } from '../../utils/audioManager';
import muteImgPath from '../../img/mute.png';
import soundImgPath from '../../img/sound.png';

const setupNavbar = () => {
  const navbar = document.querySelector('#navbarWrapper');
  navbar.style.display = 'none';
};

const createListGroup = () => {
  const links = [
    { text: 'Play', uri: '/login' },
    { text: 'Rules', uri: '/rules' },
    { text: 'Credits', uri: '/credits' },
  ];

  const listGroup = document.createElement('div');
  listGroup.classList.add('list-group');

  links.forEach((link) => {
    const anchor = document.createElement('a');
    anchor.setAttribute('href', '#');
    anchor.classList.add('list-group-item', 'list-group-item-action');
    anchor.setAttribute('data-uri', link.uri);
    anchor.textContent = link.text;
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      Navigate(link.uri);
    });
    listGroup.appendChild(anchor);
  });

  return listGroup;
};

const createAudioButton = () => {
  const audioButton = document.createElement('button');
  audioButton.classList.add(
    'btn',
    'btn-outline-primary',
    'position-fixed',
    'bottom-0',
    'end-0',
    'm-5',
  );
  audioButton.style.backgroundColor = 'rgba(58, 60, 61, 0.300)';
  audioButton.style.borderColor = 'rgba(58, 60, 61, 0)';

  const imgElement = document.createElement('img');
  imgElement.src = soundImgPath;
  imgElement.alt = 'Audio button';
  imgElement.style.width = '40px';
  imgElement.style.height = '40px';
  imgElement.id = 'audioButtonImg'; // Ensure to add this ID to your image element

  audioButton.appendChild(imgElement);

  return audioButton;
};

const updateAudioButtonImage = () => {
  const imgElement = document.querySelector('#audioButtonImg');
  
  if (isAudioCurrentlyPlaying()) {
    imgElement.src = soundImgPath;
  } else {
    imgElement.src = muteImgPath;
  }
};

const HomePage = () => {
  clearPage();
  playAudio();
  setupNavbar();

  const main = document.querySelector('main');
  const container = document.createElement('div');
  container.classList.add('container-fluid', 'full-screen-bg');
  
  const row = document.createElement('div');
  row.classList.add('row');

  const col = document.createElement('div');
  col.classList.add('col-md-3', 'game-menu');

  const listGroup = createListGroup();
  const audioButton = createAudioButton();
  audioButton.addEventListener('click', () => {
    toggleAudio();
    updateAudioButtonImage();
  });

  col.appendChild(listGroup);
  row.appendChild(col);
  container.appendChild(row);
  main.appendChild(container);
  main.appendChild(audioButton);
};

export default HomePage;
