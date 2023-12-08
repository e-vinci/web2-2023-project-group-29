import Navigate from '../Router/Navigate';

const RegisterPage = () => {
  const main = document.querySelector('main');

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
                  <img src="../../img/players/GraveRobber.png" class="avatar-option" data-avatar="GraveRobber.png">
                  <img src="../../img/players/SteamMan.png" class="avatar-option" data-avatar="SteamMan.png">
                  <img src="../../img/players/Woodcutter.png" class="avatar-option" data-avatar="Woodcutter.png">
                </div>
              </div>
              <input type="hidden" id="selectedAvatar" name="selectedAvatar"> <!-- Nouveau: élément caché pour stocker l'avatar sélectionné -->

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
  const selectedAvatarInput = document.querySelector('#selectedAvatar'); // Nouveau: élément pour stocker l'avatar sélectionné

  const backButton = document.getElementById('backButton');
  backButton.addEventListener('click', () => {
    Navigate('/login');
  });

  avatarOptions.addEventListener('click', (e) => {
    const selectedAvatar = e.target.dataset.avatar;
    if (selectedAvatar) {
      console.log('Avatar sélectionné :', selectedAvatar);
      selectedAvatarInput.value = selectedAvatar; // Mettez à jour la valeur de l'élément caché
    }
  });

  registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const avatarPath = selectedAvatarInput.value; // Utilisez la valeur de l'élément caché

    console.log(username, email, password, avatarPath);

    try {
      const response = await fetch('http://localhost:3000/players/register', { // Endpoint mis à jour
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, avatarPath }),
      });

      if (!response.ok) {
        console.log(response.body);
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      Navigate('/login');
    } catch (error) {
      passwordMismatchError.textContent = error.message;
    }
  });
};

export default RegisterPage;
