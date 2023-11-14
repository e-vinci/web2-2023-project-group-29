const LoginPage = () => {
    const main = document.querySelector('main');
  
    const loginPage = `
      <div class="container mt-5" style="background-color: black; color: white;">
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
                <a href="/inscription" class="text-warning">S'inscrire ici</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    `;
  
    main.innerHTML = loginPage;
  };
  
  export default LoginPage;
  