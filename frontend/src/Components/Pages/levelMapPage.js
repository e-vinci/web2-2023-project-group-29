import Navigate from "../Router/Navigate";
import { clearPage } from '../../utils/render';
import imgsea from '../../assets/default/levelMapPageSea.png'
import imgLava from '../../assets/default/levelMapPageLAVE.png'
import imgDesert from '../../assets/default/levelMapPageDesert.png'
// import {getAuthenticatedUser} from '../../utils/auths'
import lock from '../../assets/default/pngkey.com-lock-image-png-3963255.png'

let urlParams =null;
let worldparam=null;
let imagesMap=null;

const main = document.querySelector('main');
function levelPage (){
    clearPage();

    // Récupérez la valeur du paramètre 'levelId'
    urlParams = new URLSearchParams(window.location.search);
    worldparam = urlParams.get('world');
    console.log(worldparam);
    
    imagesMap = [{world:1,img:imgsea},{world:2,img:imgLava},{world:3,img:imgDesert}]

    /* if (!getAuthenticatedUser()){
        Navigate('/login');
        return;
      } */

    buildLevelPage();  

}
function buildLevelPage() {
    const div = document.createElement('div');
    div.className = 'divMap'
    // eslint-disable-next-line eqeqeq
    const imgBackground = imagesMap.find((img)=>img.world == worldparam).img;
    div.style.backgroundImage = `url(${imgBackground})`;
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
    

    
    for (let index = 1; index <= 3; index+=1) {
        const rowDiv = document.createElement('div');
        const rowListTitle = document.createElement('h2');
        rowDiv.appendChild(rowListTitle);
        rowDiv.className = 'rowLevel';
        rowDiv.id =index ;
        divList.appendChild(rowDiv);

        const img = document.createElement('img');
        img.src = lock;
        img.style.maxWidth = '50%'

        rowDiv.appendChild(img)
        addEventListenerMe(rowDiv);
       
    }
}



function addEventListenerMe(wrapper){
     wrapper.addEventListener('click',async ()=>{
        try {
            const response = await fetch(`api/levels/${worldparam}/${wrapper.id}`);

            if(!response.ok)throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

            const data = await response.json(); // Utilisation de response.json() pour obtenir les données JSON
            const {levelId} = data;

            Navigate(`/game?levelId=${levelId}`);
            
        } catch (error) {
            console.error('error: ', error);
            throw error;
        }
        
    })
}


export default levelPage;