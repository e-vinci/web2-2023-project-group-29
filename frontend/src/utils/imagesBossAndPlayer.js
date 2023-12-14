import boss1 from '../assets/images_boss/boss1.png'
import boss2 from '../assets/images_boss/boss2.png'
import boss3 from '../assets/images_boss/boss3.png'
import boss4 from '../assets/images_boss/boss4.png'
import boss5 from '../assets/images_boss/boss5.png'
import boss6 from '../assets/images_boss/boss6.png'
import boss7 from '../assets/images_boss/boss7.png'
import boss8 from '../assets/images_boss/boss8.png'
import boss9 from '../assets/images_boss/boss9.png'

import img1 from '../img/players/image1.png';
import img2 from '../img/players/image2.png';
import img3 from '../img/players/image3.png';
import img4 from '../img/players/image4.png';
import img5 from '../img/players/image5.png';
import img6 from '../img/players/image6.png';
import img7 from '../img/players/image7.png';
import img8 from '../img/players/image8.png';
import img9 from '../img/players/image9.png';
import img10 from '../img/players/image10.png';
import img11 from '../img/players/image11.png';
import img12 from '../img/players/image12.png';
import img13 from '../img/players/image13.png';
import img14 from '../img/players/image14.png';
import img15 from '../img/players/image15.png';
import img16 from '../img/players/image16.png';

const imagesBoss = []

imagesBoss.push({boss: boss1, src :'boss1'})
imagesBoss.push({boss: boss2, src :'boss2'})
imagesBoss.push({boss: boss3, src :'boss3'})
imagesBoss.push({boss: boss4, src :'boss4'})
imagesBoss.push({boss: boss5, src :'boss5'})
imagesBoss.push({boss: boss6, src :'boss6'})
imagesBoss.push({boss: boss7, src :'boss7'})
imagesBoss.push({boss: boss8, src :'boss8'})
imagesBoss.push({boss: boss9, src :'boss9'})



imagesBoss.push({img: img1, src :'avatar1'})
imagesBoss.push({img: img2, src :'avatar2'})
imagesBoss.push({img: img3, src :'avatar3'})
imagesBoss.push({img: img4, src :'avatar4'})
imagesBoss.push({img: img5, src :'avatar5'})
imagesBoss.push({img: img6, src :'avatar6'})
imagesBoss.push({img: img7, src :'avatar7'})
imagesBoss.push({img: img8, src :'avatar8'})
imagesBoss.push({img: img9, src :'avatar9'})
imagesBoss.push({img: img10, src :'avatar10'})
imagesBoss.push({img: img11, src :'avatar11'})
imagesBoss.push({img: img12, src :'avatar12'})
imagesBoss.push({img: img13, src :'avatar13'})
imagesBoss.push({img: img14, src :'avatar14'})
imagesBoss.push({img: img15, src :'avatar15'})
imagesBoss.push({img: img16, src :'avatar16'})



function findBossOrPlayerImg(source){
    return imagesBoss.find((img)=> img.src === source).boss;

}

function findAvatarImg(source){
    return imagesBoss.find((img)=> img.src === source).img;

}
export default { findBossOrPlayerImg, findAvatarImg };