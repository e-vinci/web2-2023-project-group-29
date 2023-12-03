import { makeDisappearNavbar } from "../../utils/navbarSetup";
import { clearPage } from "../../utils/render";

const CreditsPage = () => {
  clearPage();
  makeDisappearNavbar(true);
  
  const main = document.querySelector('main');

  const creditsPage = `
    <div class="full-screen-bg d-flex justify-content-center align-items-center">
        <div class="text-center">
            <p><b>Sound Icons :</b> Hamstring, freepik.com</p>
            <p><b>Main Menu Background :</b> Vertilirdo, deviantart.com</p>
            <p><b>Main Menu Music :</b> Noru, pixabay.com</p>
            <p><b>Textures :</b> PiiiXL, itch.io</p>
            <p><b>Font :</b> Chequered, fontspace.com</p>
            <p><b>Dev Team :</b></p>
            <p>Budak Melik, Ciborowski Dawid, Demir Ahmet Kusay, Garcia Alexandre, Koubai Omar</p>
        </div>
    </div>
    `;

  main.innerHTML = creditsPage;
};

export default CreditsPage;
