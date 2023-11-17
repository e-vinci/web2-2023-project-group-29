const HomePage = () => {
  const main = document.querySelector('main');

  const homePage = `
    <div class="container-fluid full-screen-bg">
      <div class="row">
        <div class="col-md-3 game-menu">
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action" data-uri="/login">Play</a>
            <a href="#" class="list-group-item list-group-item-action" data-uri="/rules">Rules</a>
            <a href="#" class="list-group-item list-group-item-action" data-uri="/credits">Credits</a>
          </div>
        </div>
      </div>
    </div>
  `;
  main.innerHTML = homePage;
};

// eslint-disable-next-line spaced-comment
/*function addEventListenerBtn(listGroup, dataUri){
  if (dataUri === "/login") {

  }
  listGroup.addEventListener('click',()=>{
      Navigate();
  })
}*/

export default HomePage;

