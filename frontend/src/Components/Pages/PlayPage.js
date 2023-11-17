import Navigate from '../Router/Navigate';
import {clearPage} from '../../utils/render'
import { playAudio } from '../../utils/audioManager';

const navbar = document.querySelector('#navbarWrapper');
  navbar.style.display = 'none';

const HomePage = () => {

  clearPage();

  playAudio();

  const main = document.querySelector('main');

  const container = document.createElement('div');
  container.classList.add('container-fluid', 'full-screen-bg');

  const row = document.createElement('div');
  row.classList.add('row');

  const col = document.createElement('div');
  col.classList.add('col-md-3', 'game-menu');

  const listGroup = document.createElement('div');
  listGroup.classList.add('list-group');

  const links = [
    { text: 'Play', uri: '/login' },
    { text: 'Rules', uri: '/rules' },
    { text: 'Credits', uri: '/credits' },
  ];

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

  col.appendChild(listGroup);
  row.appendChild(col);
  container.appendChild(row);
  main.appendChild(container);
};

export default HomePage;
