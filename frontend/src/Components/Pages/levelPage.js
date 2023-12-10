import  levels  from "../../../../data/level.json";
import Navigate from "../Router/Navigate";
import { clearPage } from '../../utils/render';
import imgLvel1 from '../../assets/levelMapPage.png'
import lock from '../../assets/pngkey.com-lock-image-png-3963255.png'

const main = document.querySelector('main');
function levelPage (){
    clearPage();
    buildLevelPage();  

}
function buildLevelPage() {
    const div = document.createElement('div');
    div.id = 'divMap';
    div.className = 'd-flex flex-column vh-100'
    div.style.backgroundImage = `url(${imgLvel1})`;
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

        const img = document.createElement('img');
        img.src = lock;
        img.style.maxWidth = '50%'

        rowDiv.appendChild(img)
        addEventListenerMe(rowDiv);
        
    });
}

function addEventListenerMe(wrapper){
    wrapper.addEventListener('click',()=>{
        Navigate(`/game?${wrapper.id}`);
    })
}


export default levelPage;