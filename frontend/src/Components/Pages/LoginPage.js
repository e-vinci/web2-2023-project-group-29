import Navigate from '../Router/Navigate';
import { verifyLogin } from '../../models/users';
// import data from '../../data/User.json'

const LoginPage = () => {
  const main = document.querySelector('main');

  const loginPage = `
    <div class="full-screen-bg">
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-15 d-flex justify-content-end">
            <!-- Ajout du bouton "Retour" -->
            <button id="backButton" class="btn btn-warning ml-auto">Retour</button>
          </div>
          <div class="col-md-6">
            <form id="loginForm">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" name="email" required>
              </div>

              <div class="form-group">
                <label for="password">Mot de passe</label>
                <input type="password" class="form-control" id="password" name="password" required>
              </div>
              
              <br>
              <div class="text-center">
                <button type="submit" class="btn btn-warning btn-block">Se connecter</button>
              </div>
              <br>
              <p class="mt-3 text-center">
                N'avez-vous pas de compte ? 
                <a id="register" class="text-warning">S'inscrire ici</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  main.innerHTML = loginPage;

  const loginForm = document.querySelector('#loginForm');

  // Ajout du gestionnaire d'événements pour le bouton "Retour"
  const backButton = document.getElementById('backButton');
  backButton.addEventListener('click', () => {
    Navigate('/play'); // Naviguer vers la page de jeu
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const email = emailInput.value;
    const password = passwordInput.value;

    const loginSuccess = verifyLogin(email, password);
    if (loginSuccess) {
      Navigate('/game');
    } else {
      // Effacer les champs email et mot de passe
      emailInput.value = '';
      passwordInput.value = '';
    }
  });

  const register = document.querySelector("#register");
  register.addEventListener("click", () => Navigate("/register"));
};

export default LoginPage;
