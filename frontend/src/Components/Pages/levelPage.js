import  levels  from "../../../../data/level.json";
import Navigate from "../Router/Navigate";
import { clearPage } from '../../utils/render';


const main = document.querySelector('main');
function levelPage (){
    clearPage();
    buildLevelPage();  

}
function buildLevelPage() {
    const div = document.createElement('div');
    div.className = 'divMap'
    main.appendChild(div)
    const divTitle = document.createElement('div');
    div.appendChild(divTitle);

    const title = document.createElement('h1');
    divTitle.appendChild(title);
    title.innerText = `Image d'un monde`;
    title.className = 'text-center';
    

    const divList = document.createElement('div');
    div.appendChild(divList);
    divList.className = 'levels'
    


    levels.forEach(level => {
        const rowDiv = document.createElement('div');
        const rowListTitle = document.createElement('h2');
        rowDiv.appendChild(rowListTitle);
        rowDiv.className = 'rowLevel';
        rowDiv.id = `${level.level_id}`;
        divList.appendChild(rowDiv);
        addEventListenerMe(rowDiv);
    });
}

function addEventListenerMe(wrapper){
    wrapper.addEventListener('click',()=>{
        Navigate(`/game?${wrapper.id}`);
    })
}


export default levelPage;