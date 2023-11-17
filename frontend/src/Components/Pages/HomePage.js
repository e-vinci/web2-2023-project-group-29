const HomePage = () => {
  const main = document.querySelector('main');

  const homePage = `
    <div class="container-fluid" style="background-color: black;">
      <div class="row">
        <div class="col-12 text-center mt-5">
          <h1 class="text-white">Bienvenue sur Remember Or Die !</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-center mt-4">
          <button type="button" class="btn btn-warning btn-lg mb-2">Jouer</button>
        </div>
        <div class="col-12 text-center">
          <button type="button" class="btn   btn-warning btn-lg">Règles du Jeu</button>
        </div>
      </div>
    </div>
  `;

  main.innerHTML = homePage;
};

export default HomePage;

