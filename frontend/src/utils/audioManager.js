let audio;

export function initializeAudio(audioPath) {
  audio = new Audio(audioPath);
}

export function playAudio() {
  if (audio.paused) {
    audio.setAttribute('autoplay', true);
    audio.loop = true;
    audio.play();
  }
}

export function pauseAudio() {
  if (!audio.paused) {
    audio.pause();
  }
}
