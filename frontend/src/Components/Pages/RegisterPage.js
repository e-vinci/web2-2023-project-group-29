import Navigate from '../Router/Navigate';
import img1 from '../../img/players/image1.png';
import img2 from '../../img/players/image2.png';
import img3 from '../../img/players/image3.png';
import img4 from '../../img/players/image4.png';
import img5 from '../../img/players/image5.png';
import img6 from '../../img/players/image6.png';
import img7 from '../../img/players/image7.png';
import img8 from '../../img/players/image8.png';

const RegisterPage = () => {
  const main = document.querySelector('main');

  const generateAvatarOptions = () => {
    const avatarImages = [img1, img2, img3, img4, img5, img6, img7, img8];

    return avatarImages.map((image, index) => `<img src="${image}" class="avatar-option" data-avatar="avatar${index + 1}" alt="Avatar" style="border-radius: 50%; width: 12.5%; height: 10%;">`).join('');
  };

  const registerPage = `
    <div class="full-screen-bg">
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-6">
            <button id="backButton" class="btn btn-warning">Retour</button>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-6">
            <form id="registrationForm">
              <div class="form-group">
                <label for="username">Nom d'utilisateur</label>
                <input type="text" class="form-control" id="username" name="username" required>
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" name="email" required>
              </div>

              <div class="form-group">
                <label for="password">Mot de passe</label>
                <input type="password" class="form-control" id="password" name="password" required>
              </div>

              <div class="form-group">
                <label for="confirmPassword">Confirmer le mot de passe</label>
                <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" required>
              </div>

              <div class="form-group">
                <label for="avatar">Choisissez votre avatar :</label>
                <div id="avatarOptions" class="d-flex flex-wrap">
                  ${generateAvatarOptions()}
                </div>
              </div>
              <input type="hidden" id="selectedAvatar" name="selectedAvatar">

              <div id="passwordMismatchError" class="text-danger mt-3 text-center"></div>
              <div id="existingUserError" class="text-danger mt-3 text-center"></div>

              <br>
              <div class="text-center">
                <button type="submit" class="btn btn-warning btn-block">S'inscrire</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  main.innerHTML = registerPage;

  const registrationForm = document.querySelector('#registrationForm');
  const passwordMismatchError = document.querySelector('#passwordMismatchError');
  const avatarOptions = document.querySelector('#avatarOptions');
  const selectedAvatarInput = document.querySelector('#selectedAvatar');

  const backButton = document.getElementById('backButton');
  backButton.addEventListener('click', () => {
    Navigate('/login');
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

  registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const login = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const avatarPath = selectedAvatarInput.value;

    try {
      const response = await fetch('http://localhost:3000/players/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, email, password, avatarPath }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      Navigate('/login');
    } catch (error) {
      passwordMismatchError.textContent = error.message;
    }
  });
};

export default RegisterPage;
