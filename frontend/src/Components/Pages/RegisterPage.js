// RegisterPage.js

import Navigate from '../Router/Navigate';
import { addOneUser, readAllUsers } from '../../models/users';

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

    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirmPassword').value;

    // Vérification de la correspondance des mots de passe
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    // Vérification si l'utilisateur existe déjà
    const existingUser = readAllUsers().find((user) => user.email === email);
    if (existingUser) {
      alert("Cet utilisateur existe déjà. Veuillez vous connecter.");
      Navigate('/login');
      return;
    }

    const userToBeCreated = {
      username,
      email,
      password,
    };

    addOneUser(userToBeCreated);
    Navigate('/login');
  });
};

export default RegisterPage;
