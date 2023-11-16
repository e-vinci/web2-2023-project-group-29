import  levels  from "../../../../data/level.json";
import Navigate from "../Router/Navigate";
import { clearPage } from '../../utils/render';

const main = document.querySelector('main');

function levelPage (){
    clearPage();
    const divTitle = document.createElement('div');
    main.appendChild(divTitle)
    const title = document.createElement('h1');
    title.innerText = `Image d'un monde`;
    title.className = 'text-center';
    divTitle.appendChild(title);

    const divList = document.createElement('div');
    
    main.appendChild(divList);
    const list = document.createElement('ul');
    list.className = 'list-group'
    divList.appendChild(list)

   
    levels.forEach(level => {
        const rowList = document.createElement('li'); 
        const rowListTitle = document.createElement('h2');
        rowList.appendChild(rowListTitle);
        rowList.className = 'list-group-item text-center'  ; 
        rowList.id = `${level.level_id}` 
        rowListTitle.innerText = level.name;
        list.appendChild(rowList);
        addEventListenerMe(rowList) ;
    });  


}
function addEventListenerMe(wrapper){
    wrapper.addEventListener('click',()=>{
        Navigate(`/game?${wrapper.id}`);
    })
}


export default levelPage;