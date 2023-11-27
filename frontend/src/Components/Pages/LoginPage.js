import Navigate from '../Router/Navigate';
import data from '../../data/User.json';

const LoginPage = () => {
  const main = document.querySelector('main');

  const loginPage = `
    <div class="full-screen-bg">
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-6">
            <button id="backButton" class="btn btn-warning">Retour</button>
          </div>
        </div>
        <div class="row justify-content-center">
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
              <!-- Ajout de div pour afficher les messages d'erreur -->
              <div id="loginError" class="text-danger mt-3 text-center"></div>
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
  const loginError = document.querySelector('#loginError');

  const backButton = document.getElementById('backButton');
  backButton.addEventListener('click', () => {
    Navigate('/play');
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const email = emailInput.value;
    const password = passwordInput.value;

    // TODO: Ajouter la logique de connexion avec vérification des informations
    const user = data.find(u => u.email === email);

    if (user) {
      if (user.password === password) {
        Navigate('/game');
      } else {
        loginError.textContent = 'Mot de passe incorrect.';
      }
    } else {
      loginError.textContent = 'Aucun compte associé à cet email.';
    }
  });

  const register = document.querySelector("#register");
  register.addEventListener("click", () => Navigate("/register"));
};

export default LoginPage;
