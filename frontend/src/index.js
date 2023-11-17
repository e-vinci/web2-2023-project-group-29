import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

import Navbar from './Components/Navbar/Navbar';
import Router from './Components/Router/Router';

import audioPath from './assets/sound/background_sound.mp3';

const audio = new Audio(audioPath);

audio.setAttribute('autoplay', true);
audio.loop = true;

Navbar();

Router();
