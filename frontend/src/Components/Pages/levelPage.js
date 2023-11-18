import  levels  from "../../../../data/level.json";
import Navigate from "../Router/Navigate";
import { clearPage } from '../../utils/render';

const main = document.querySelector('main');

function levelPage (){
    clearPage();
    buildLevelPage();  


}
function buildLevelPage() {
    const divTitle = document.createElement('div');
    main.appendChild(divTitle);

    const title = document.createElement('h1');
    divTitle.appendChild(title);
    title.innerText = `Image d'un monde`;
    title.className = 'text-center';
    

    const divList = document.createElement('div');
    main.appendChild(divList);
    divList.className = 'container'
    


    levels.forEach(level => {
        const rowDiv = document.createElement('div');
    
        const rowListTitle = document.createElement('h2');
        rowDiv.appendChild(rowListTitle);
        rowDiv.className = 'list-group-item text-center';
        rowDiv.id = `${level.level_id}`;
        rowListTitle.innerText = level.name;
        divList.appendChild(rowDiv);
        addEventListenerMe(rowDiv);
    });
    main.id = 'imgLevelMap'
}

function addEventListenerMe(wrapper){
    wrapper.addEventListener('click',()=>{
        Navigate(`/game?${wrapper.id}`);
    })
}


export default levelPage;