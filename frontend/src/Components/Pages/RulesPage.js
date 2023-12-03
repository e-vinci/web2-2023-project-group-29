import Navigate from '../Router/Navigate';
import { makeDisappearNavbar } from '../../utils/navbarSetup';
import { clearPage } from '../../utils/render';

const RulesPage = () => {
  clearPage();
  makeDisappearNavbar(true);
  const main = document.querySelector('main');

  const rulesPage = `
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6">
                <button id="backButton" class="btn btn-warning">Back</button>
            </div>
        </div>
    </div>
    <div class="full-screen-bg d-flex justify-content-center align-items-center">
        <div class="text-center">
            <p>
                Meme on rit.
            </p>
        </div>
    </div>
    `;

  main.innerHTML = rulesPage;

  const backButton = document.getElementById('backButton');
  backButton.addEventListener('click', () => {
    Navigate('/play');
  });
};

export default RulesPage;
