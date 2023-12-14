import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';
import { makeDisappearNavbar } from '../../utils/navbarSetup';
import { getAuthenticatedUser , setAvatar} from '../../utils/auths';
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



const ModifiedAvatarPage = () => {
  clearPage();
  makeDisappearNavbar(false);
  const main = document.querySelector('main');

  const generateAvatarOptions = () => {
    const avatarImages = [img1, img2, img3, img4, img5, img6, img7, img8,
      img9,img10,img11,img12,img13,img14,img15,img16
    ];

    return avatarImages.map((image, index) => `<img src="${image}" class="avatar-option" data-avatar="avatar${index + 1}" alt="Avatar" style="border-radius: 50%; width: 12.5%; height: 10%;">`).join('');
  };

  const modifiedProfilPage = `
    <div class="full-screen-bg">
      <div class="full-screen-bois">
        <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-md-6">
            <br>
              <form id="modificatedForm">

                <div class="form-group">
                  <label for="avatar">Choisissez votre avatar :</label>
                  <br>
                  <br>
                  <div id="avatarOptions" class="d-flex flex-wrap">
                    ${generateAvatarOptions()}
                  </div>
                </div>
                <br>
                <input type="hidden" id="selectedAvatar" name="selectedAvatar">

                <div id="passwordMismatchError" class="text-danger mt-3 text-center"></div>

                <div class="button-container">
                  <button  type="submit" class="btn btn-warning btn-block">Sauvegardé</button>
                  <button id='backButton' type="submit" class="btn btn-warning btn-block">Annulé</button>
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
  const avatarImages = document.querySelectorAll('.avatar-option');
  // Retirez la classe "selected" de toutes les images
  avatarImages.forEach((image) => {
    image.classList.remove('selected');
  });
  // Ajoutez la classe "selected" à l'image sélectionnée
  if (selectedAvatar) {
    selectedAvatarInput.value = selectedAvatar;
    e.target.classList.add('selected');
  }
});

modificatedForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const avatar = selectedAvatarInput.value;
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
