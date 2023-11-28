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
                <label for="profilePicture">Photo de profil</label>
                <input type="file" class="form-control-file" id="profilePicture" name="profilePicture" accept="image/*" required>
              </div>

              <!-- Ajout de divs pour afficher les messages d'erreur -->
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

  const backButton = document.getElementById('backButton');
  backButton.addEventListener('click', () => {
    Navigate('/login');
  });

  registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const avatarPath = document.querySelector('#profilePicture').value;

    try {
      const response = await fetch('http://votre-backend-api.com/players/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, avatarPath }),
      });

      if (!response.ok) {
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

