import Navigate from '../Router/Navigate';
import data from '../../data/User.json'

const RegisterPage = () => {
  const main = document.querySelector('main');

  const registerPage = `
    <div class="full-screen-bg">
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-15 d-flex justify-content-end">
            <!-- Modification du style du bouton "Back" -->
            <button id="backButton" class="btn btn-warning ml-auto">Retour</button>
          </div>
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
              <div id="passwordMismatchError" class="text-danger"></div>
              <div id="existingUserError" class="text-danger"></div>

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

  // Ajout du gestionnaire d'événements pour le bouton Back
  const backButton = document.getElementById('backButton');
  backButton.addEventListener('click', () => {
    Navigate('/login'); // Naviguer vers la page de connexion
  });

  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirmPassword').value;
    const avatarPath = document.querySelector('#profilePicture').value;

    if (password !== confirmPassword) {
      console.log('Error');
    }

    const userToBeCreated = {
      username,
      email,
      password,
      avatarPath
    };

    data.push(userToBeCreated);

    Navigate('/login');
  });
};

export default RegisterPage;
