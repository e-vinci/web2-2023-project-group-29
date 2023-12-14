import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';

import { makeDisappearNavbar } from '../../utils/navbarSetup';
import { getAuthenticatedUser } from '../../utils/auths';
import findAvatarImg  from '../../utils/imagesBossAndPlayer';
import testImageProfil from '../../img/backgrounds/caise.jpg';
import shield from '../../img/backgrounds/Bouclier.png';
import img1 from '../../img/players/image1.png';
import img2 from '../../img/players/image2.png';
import img3 from '../../img/players/image3.png';
import img4 from '../../img/players/image4.png';
import img5 from '../../img/players/image5.png';
import img6 from '../../img/players/image6.png';
import img7 from '../../img/players/image7.png';
import img8 from '../../img/players/image8.png';

const generateAvatarOptions = () => {
  const avatarImages = [img1, img2, img3, img4, img5, img6, img7, img8];

  return avatarImages.map((image, index) => `<img src="${image}" class="avatar-option" data-avatar="${index + 1}" alt="Avatar" style="border-radius: 50%; width: 12.5%; height: 10%;">`).join('');
};



const ModifiedProfilPage = () => {
  clearPage();
  makeDisappearNavbar(false);
    

      const player = getAuthenticatedUser();

        const main = document.querySelector('main');

        const profilPageDiv = document.createElement('div');
        profilPageDiv.style.maxWidth = "100%";
        profilPageDiv.classList.add('container-fluid', 'full-screen-bg');

        const imageBProfil = document.createElement('div');
        imageBProfil.classList.add('full-screen-bois');


        const fromModifiedProfil = document.createElement('from');
        fromModifiedProfil.classList.add('container-fluid-profil');

        const password = document.createElement('div');

        const passwordLabel = document.createElement('label');
        passwordLabel.innerText = "nouveau Mots de Passe";

        const passwordInput = document.createElement('input');
        passwordInput.type = "text";
        passwordInput.id = "newPassword";
        passwordInput.name = "newPassword";

        const confirmedPassword = document.createElement('div');

        const confirmedPasswordLabel = document.createElement('label');
        confirmedPasswordLabel.innerText = "Confirmé Mots de Passe";

        const confirmedPasswordInput = document.createElement('input');
        confirmedPasswordInput.type = "text";
        confirmedPasswordInput.id = "confPassword";
        confirmedPasswordInput.name = "confPassword"

        

        function validateForm() {

            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (newPassword !== confirmPassword) {
              alert("Les nouveaux mots de passe ne correspondent pas.");
            } 
            else {
              alert("Formulaire validé avec succès!");
            }
        }
        

        const avatarList = `<div class="form-group">
                <label for="avatar">Choisissez votre avatar :</label>
                <div id="avatarOptions" class="d-flex flex-wrap">
                  ${generateAvatarOptions()}
                </div>
              </div>
              <input type="hidden" id="selectedAvatar" name="selectedAvatar"></input>`


        const avatarOptions = document.querySelector('#avatarOptions');
        const selectedAvatarInput = document.querySelector('#selectedAvatar');

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
    
        const imgProfil = document.createElement('img');
        imgProfil.src = findAvatarImg.findAvatarImg(`avatar${player.avatarPath}`);
        imgProfil.classList.add('img-profil');

        const imgProfilBack = document.createElement('img');
        imgProfilBack.src = shield;
        imgProfilBack.classList.add('img-profil-shield');

        const Bouttoncancelled = document.createElement('button');
        Bouttoncancelled.textContent = "Annulé";
        Bouttoncancelled.classList.add(testImageProfil);
        Bouttoncancelled.classList.add('button-profil','image-back-profil');
        Bouttoncancelled.addEventListener('click', (e) => {
          e.preventDefault();
          Navigate('/profil');
        });

        const Bouttonvalidated = document.createElement('button');
        Bouttonvalidated.textContent = "Validé";
        Bouttonvalidated.classList.add(testImageProfil);
        Bouttonvalidated.classList.add('button-profil-validated','image-back-profil');
        Bouttonvalidated.addEventListener('click', (e) => {
          e.preventDefault();
          validateForm();
        });




        password.appendChild(passwordLabel);
        password.appendChild(passwordInput);

        confirmedPassword.appendChild(confirmedPasswordLabel);
        confirmedPassword.appendChild(confirmedPasswordInput);

        fromModifiedProfil.appendChild(password);
        fromModifiedProfil.appendChild(confirmedPassword);
        fromModifiedProfil.appendChild(Bouttonvalidated);
        fromModifiedProfil.appendChild(avatarList);
    

        profilPageDiv.appendChild(Bouttoncancelled);
        profilPageDiv.appendChild(imageBProfil);
        profilPageDiv.appendChild(fromModifiedProfil);

        main.appendChild(profilPageDiv);
};

export default ModifiedProfilPage;
