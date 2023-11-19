import Navigate from '../Router/Navigate';
import { addOneUser } from '../../models/users'; // Assurez-vous d'importer correctement la fonction addOneUser

const RegisterPage = () => {
  const main = document.querySelector('main');

  const registerPage = `
    <div class="full-screen-bg">
      <div class="container mt-5">
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
  
              <br>
              <button type="submit" class="btn btn-warning btn-block">S'inscrire</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  main.innerHTML = registerPage;

  const registrationForm = document.querySelector('#registrationForm');
  
  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupérez les valeurs du formulaire
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirmPassword').value;
    const profilePicture = document.querySelector('#profilePicture').value;

    // Créez un objet avec les informations de l'utilisateur
    const userToBeCreated = {
      username,
      email,
      password,
      confirmPassword,
      profilePicture,
    };

    // Ajoutez l'utilisateur en utilisant la fonction réutilisable
    addOneUser(userToBeCreated);

    // Naviguez vers la page "/game" après l'inscription réussie
    Navigate('/game');
  });
};

export default RegisterPage;
