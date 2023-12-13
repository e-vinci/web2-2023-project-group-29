import boss1 from '../assets/images_boss/boss1.png'
import boss2 from '../assets/images_boss/boss2.png'
import boss3 from '../assets/images_boss/boss3.png'
import boss4 from '../assets/images_boss/boss4.png'
import boss5 from '../assets/images_boss/boss5.png'
import boss6 from '../assets/images_boss/boss6.png'
import boss7 from '../assets/images_boss/boss7.png'
import boss8 from '../assets/images_boss/boss8.png'
import boss9 from '../assets/images_boss/boss9.png'

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



imagesBoss.push({img: boss1, src :'avatar1'})
imagesBoss.push({img: boss2, src :'avatar2'})
imagesBoss.push({img: boss3, src :'avatar3'})
imagesBoss.push({img: boss4, src :'avatar4'})
imagesBoss.push({img: boss5, src :'avatar5'})
imagesBoss.push({img: boss6, src :'avatar6'})
imagesBoss.push({img: boss7, src :'avatar7'})
imagesBoss.push({img: boss8, src :'avatar8'})
imagesBoss.push({img: boss9, src :'avatar9'})



function findBossOrPlayerImg(source){
    return imagesBoss.find((img)=> img.src === source).boss;

}
export default findBossOrPlayerImg;