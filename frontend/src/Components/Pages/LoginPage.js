import Navigate from '../Router/Navigate';
import { verifyLogin } from '../../models/users'; // Assurez-vous d'importer correctement la fonction verifyLogin

const LoginPage = () => {
  const main = document.querySelector('main');

  const loginPage = `
    <div class="full-screen-bg">
      <div class="container mt-5">
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
  
              <br>
              <button type="submit" class="btn btn-warning btn-block">Se connecter</button>
              
              <p class="mt-3 text-center">
                Vous n'avez pas de compte ? 
                <a href="/inscription" class="text-warning" data-uri="/register">S'inscrire ici</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  main.innerHTML = loginPage;

  const loginForm = document.querySelector('#loginForm');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Je récupère les valeurs du formulaire
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Je vérifie la connexion en utilisant la fonction réutilisable
    const loginSuccess = verifyLogin(email, password);

    if (loginSuccess) {
      Navigate('/game');
    }
  });
};

export default LoginPage;
