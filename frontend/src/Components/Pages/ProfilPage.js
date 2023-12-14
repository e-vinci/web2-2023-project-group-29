import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';

import { makeDisappearNavbar } from '../../utils/navbarSetup';
import { getAuthenticatedUser } from '../../utils/auths';
import findAvatarImg  from '../../utils/imagesBossAndPlayer';
import testImageProfil from '../../img/backgrounds/caise.jpg';
import shield from '../../img/backgrounds/Bouclier.png';


const ProfilPage = () => {
  clearPage();
  makeDisappearNavbar(false);

      const player = getAuthenticatedUser();

        const main = document.querySelector('main');

        const profilPageDiv = document.createElement('div');
        profilPageDiv.style.maxWidth = "100%";
        profilPageDiv.classList.add('container-fluid', 'full-screen-bg');

        const imageBProfil = document.createElement('div');
        imageBProfil.classList.add('full-screen-bois');


        const tableProfil = document.createElement('table');
        tableProfil.classList.add('container-fluid-profil');

        const theadDutableau = document.createElement('thead');


        const titreDiv = document.createElement('tr');
        const titre = document.createElement('td');
        titre.innerText = "Fiche D'Aventure";

        const tbodyDutableau = document.createElement('tbody');


        const colonne1Div = document.createElement('tr');
        const colonne1Name = document.createElement('td');
        colonne1Name.innerHTML = "Pseudo";
        const colonne1Value = document.createElement('td');
        colonne1Value.innerHTML = player.login;


        const colonne2Div = document.createElement('tr');
        const colonne2Name = document.createElement('td');
        colonne2Name.innerHTML = "XP";
        const colonne2Value = document.createElement('td');
        colonne2Value.innerHTML = player.xp;


        const colonne3Div = document.createElement('tr');
        const colonne3Name = document.createElement('td');
        colonne3Name.innerHTML = "Email";
        const colonne3Value = document.createElement('td');
        colonne3Value.innerHTML = player.email;



        const imgProfil = document.createElement('img');
        imgProfil.src = findAvatarImg.findAvatarImg(`avatar${player.avatarPath}`);
        imgProfil.classList.add('img-profil');

        const imgProfilBack = document.createElement('img');
        imgProfilBack.src = shield;
        imgProfilBack.classList.add('img-profil-shield');

        const BouttonModifier = document.createElement('button');
        BouttonModifier.textContent = "modifier profil";
        BouttonModifier.classList.add(testImageProfil);
        BouttonModifier.classList.add('button-profil','image-back-profil');
        BouttonModifier.addEventListener('click', (e) => {
          e.preventDefault();

          Navigate('/modifiedProfil');
        });




        titreDiv.appendChild(titre);
        theadDutableau.appendChild(titreDiv);

        colonne1Div.appendChild(colonne1Name);
        colonne1Div.appendChild(colonne1Value);

        colonne2Div.appendChild(colonne2Name);
        colonne2Div.appendChild(colonne2Value);

        colonne3Div.appendChild(colonne3Name);
        colonne3Div.appendChild(colonne3Value);

        tbodyDutableau.appendChild(colonne1Div);
        tbodyDutableau.appendChild(colonne2Div);
        tbodyDutableau.appendChild(colonne3Div);


        tableProfil.appendChild(theadDutableau);
        tableProfil.appendChild(tbodyDutableau);



    
        profilPageDiv.appendChild(imgProfilBack);
        profilPageDiv.appendChild(BouttonModifier);
        profilPageDiv.appendChild(imageBProfil);
        profilPageDiv.appendChild(imgProfil);
        profilPageDiv.appendChild(tableProfil);

        main.appendChild(profilPageDiv);
};

export default ProfilPage;
