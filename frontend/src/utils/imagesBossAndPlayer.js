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

const imagesBoss = []

imagesBoss.push({img: boss1, src :'boss1'})
imagesBoss.push({img: boss2, src :'boss2'})
imagesBoss.push({img: boss3, src :'boss3'})
imagesBoss.push({img: boss4, src :'boss4'})
imagesBoss.push({img: boss5, src :'boss5'})
imagesBoss.push({img: boss6, src :'boss6'})
imagesBoss.push({img: boss7, src :'boss7'})
imagesBoss.push({img: boss8, src :'boss8'})
imagesBoss.push({img: boss9, src :'boss9'})



imagesBoss.push({img: img1, src :'avatar1'})
imagesBoss.push({img: img2, src :'avatar2'})
imagesBoss.push({img: img3, src :'avatar3'})
imagesBoss.push({img: img4, src :'avatar4'})
imagesBoss.push({img: img5, src :'avatar5'})
imagesBoss.push({img: img6, src :'avatar6'})
imagesBoss.push({img: img7, src :'avatar7'})
imagesBoss.push({img: img8, src :'avatar8'})



function findBossOrPlayerImg(source){
    const found  = imagesBoss.find((img)=> img.src === source);
    return found.img;

}
export default findBossOrPlayerImg;