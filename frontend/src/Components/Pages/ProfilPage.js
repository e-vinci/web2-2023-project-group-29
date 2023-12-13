import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';
// import { playAudio } from '../../utils/audioManager';
import { makeDisappearNavbar } from '../../utils/navbarSetup';

import testImageProfil from '../../img/backgrounds/caise.jpg';


const ProfilPage = () => {
  clearPage();
  makeDisappearNavbar(false);
  // playAudio();

      const valeurRecuperee = sessionStorage.getItem('email');

      fetch(`http://localhost:3000/readOneUserFromUsername/${valeurRecuperee}`).then(response => {

          if (!response.ok) {

            throw new Error(`Erreur HTTP: ${response.status}`);
          }
          return response.json();

      }).then(playerInfo =>{

        const main = document.querySelector('main');

        const worldPageDiv = document.createElement('div');
        worldPageDiv.style.maxWidth = "100%";
        worldPageDiv.classList.add('container-fluid', 'full-screen-bg');

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
        colonne1Value.innerHTML = playerInfo.login;


        const colonne2Div = document.createElement('tr');
        const colonne2Name = document.createElement('td');
        colonne2Name.innerHTML = "XP";
        const colonne2Value = document.createElement('td');
        colonne2Value.innerHTML = playerInfo.xp;


        const colonne3Div = document.createElement('tr');
        const colonne3Name = document.createElement('td');
        colonne3Name.innerHTML = "Email";
        const colonne3Value = document.createElement('td');
        colonne3Value.innerHTML = playerInfo.email;

        const imgProfil = document.createElement('img');
        imgProfil.src = playerInfo.avatar_path;
        imgProfil.classList.add('img-profil');

        const BouttonModifier = document.createElement('button');
        BouttonModifier.textContent = "modifier profil";
        BouttonModifier.classList.add(testImageProfil);
        BouttonModifier.classList.add('button-profil','image-back-profil');
        BouttonModifier.addEventListener('click', (e) => {
          e.preventDefault();
          Navigate('/login');
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



        
        worldPageDiv.appendChild(BouttonModifier);
        worldPageDiv.appendChild(imageBProfil);
        worldPageDiv.appendChild(imgProfil);
        worldPageDiv.appendChild(tableProfil);

        main.appendChild(worldPageDiv);
      })

  
};

export default ProfilPage;
