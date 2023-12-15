import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';
import  makeDisappearNavbar  from '../../utils/navbarSetup';
import { getAuthenticatedUser , setAvatar} from '../../utils/auths';
import  calculateRank  from '../../utils/xp';
import lock from '../../assets/default/pngkey.com-lock-image-png-3963255.png'
import img1 from '../../img/players/image1.png';
import img2 from '../../img/players/image2.png';
import img3 from '../../img/players/image3.png';
import img4 from '../../img/players/image4.png';
import img5 from '../../img/players/image5.png';
import img6 from '../../img/players/image6.png';
import img7 from '../../img/players/image7.png';
import img8 from '../../img/players/image8.png';
import img9 from '../../img/players/image9.png';
import img10 from '../../img/players/image10.png';
import img11 from '../../img/players/image11.png';
import img12 from '../../img/players/image12.png';
import img13 from '../../img/players/image13.png';
import img14 from '../../img/players/image14.png';
import img15 from '../../img/players/image15.png';
import img16 from '../../img/players/image16.png';


const avatarAllImages = [
  {
    "url":img1,
    "rank":0 
  }, 
  {
    "url":img2,
    "rank":0 
  }, 
  {
    "url":img3,
    "rank":0 
  }, 
  {
    "url":img4,
    "rank":0 
  }, 
  {
    "url":img5,
    "rank":0 
  }, 
  {
    "url":img6,
    "rank":0 
  }, 
  {
    "url":img7,
    "rank":0 
  }, 
  {
    "url":img8,
    "rank":0 
  }, 
  {
    "url":img9,
    "rank":1 
  }, 
  {
    "url":img10,
    "rank":2 
  }, 
  {
    "url":img11,
    "rank":3 
  }, 
  {
    "url":img12,
    "rank":4 
  }, 
  {
    "url":img13,
    "rank":5
  }, 
  {
    "url":img14,
    "rank":6 
  }, 
  {
    "url":img15,
    "rank":7 
  }, 
  {
    "url":img16,
    "rank":8 
  }, 

];


const ModifiedAvatarPage = () => {
  clearPage();
  makeDisappearNavbar(false);

  const rank = calculateRank();

  // avatarAllImages.forEach((a) => {
  //   console.log(a.rank <= rank.level);
  // });

  // const imageDefault = avatarAllImages.filter((a) => a.rank <= rank.level) // images accecible
  // const imageLock = avatarAllImages.filter((a) => a.rank > rank.level) // images lock

  const main = document.querySelector('main');

  // function generateAvatarOptionsFree() {
  //   return imageDefault.map((image, index) => `<img src="${image.url}" class="avatar-option lock-img" data-avatar="avatar${index + 1}" alt="Avatar" style="border-radius: 50%; width: 12.5%; height: 10%;">`).join('');
  // };

  // function generateAvatarOptionslock() {
  //   return imageLock.map((image, index) => `<img src="${image.url}" class="avatar-option lock-img" data-avatar="avatar${index + 9}" alt="Avatar" style="border-radius: 50%; width: 12.5%; height: 10%;">`).join('');
  // };


  const getAvatarImages = () => {
    let html = '';

    avatarAllImages.forEach((image, index) => {
      if (image.rank <= rank.level) {
        html += `<img src="${image.url}" class="avatar-option" data-avatar="avatar${index + 1}" alt="Avatar" style="border-radius: 50%; width: 12.5%; height: 10%;">`;
      } else {
        html += `<img src="${lock}" class="avatar-option lock-img" data-avatar="avatar${index + 1}" data-locked="true" alt="Avatar" style="border-radius: 50%; width: 12.5%; height: 10%;">`;
      }
    });

    return html;
  }

  const modifiedProfilPage = `
    <div class="full-screen-bg">
      <div class="full-screen-bois">
        <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-md-6">
            <br>
              <form id="modificatedForm">

                <div class="form-group ">
                  <br>
                  <br>
                  <label for="avatar">Choisissez votre avatar :</label>
                  <br>
                  <br>
                  <div id="avatarOptions" class="d-flex flex-wrap ">
                    ${getAvatarImages()}
                  </div>
                </div>
                <br>
                <input type="hidden" id="selectedAvatar" name="selectedAvatar">

                <div id="passwordMismatchError" class="text-danger mt-3 text-center"></div>

                <div class="button-container">
                  <button  type="submit" class="btn btn-warning btn-block">Sauvegarder</button>
                  <button id='backButton' type="submit" class="btn btn-warning btn-block">Annuler</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  

  main.innerHTML = modifiedProfilPage;

  const modificatedForm = document.querySelector('#modificatedForm');
  const passwordMismatchError = document.querySelector('#passwordMismatchError');
  const avatarOptions = document.querySelector('#avatarOptions');
  const selectedAvatarInput = document.querySelector('#selectedAvatar');

  const backButton = document.getElementById('backButton');
  backButton.addEventListener('click', () => {
    Navigate('/profil');
  });

  // Ajout du gestionnaire d'événements pour les options d'avatar
avatarOptions.addEventListener('click', (e) => {
  const selectedAvatar = e.target.dataset.avatar;
  const isLocked = e.target.dataset.locked;
  const avatarImages = document.querySelectorAll('.avatar-option');
  // Retirez la classe "selected" de toutes les images
  if (!isLocked) {
    avatarImages.forEach((image) => {
      image.classList.remove('selected');
    });
  }
  // Ajoutez la classe "selected" à l'image sélectionnée
  if (selectedAvatar && !isLocked) {
    console.log(selectedAvatar);
    selectedAvatarInput.value = selectedAvatar;
    e.target.classList.add('selected');
  }
});

modificatedForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const avatar = selectedAvatarInput.value;
  if (!avatar) {
    passwordMismatchError.textContent = 'Veuillez sélectionner un avatar';
    return;
  }

  const player = getAuthenticatedUser();
  const {playerId} = player;

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/players/updateAvatar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({playerId, avatar}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
    setAvatar(avatar);

    Navigate('/profil');
  } catch (error) {
    passwordMismatchError.textContent = error.message;
  }
});



    
};

export default ModifiedAvatarPage;
