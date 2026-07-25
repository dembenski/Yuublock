import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { Player } from "./Yuu API/Player";
import { Events } from "./Yuu API/Events";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";

import { addEnemyAI } from "./EnemyAI";
import { registerEnemyCombat } from "./Combat";
import { spawnDungeonCollectibles } from "./DungeonCollectibles";




// =====================================
// DUNGEON SIZE
// =====================================


const mazeWidth = 31;

const mazeHeight = 31;

const blockSize = 8;



let maze:number[][] = [];





// =====================================
// OBJECT STORAGE
// =====================================


export let enemies:any[] = [];

export let chests:Entity[] = [];





// =====================================
// ENEMY HEALTH BAR STORAGE
// =====================================


let enemyHealthBars:any[]=[];






// =====================================
// CREATE CUBE
// =====================================


function cube(

pos:Vector3,

scale:Vector3,

color:Color

):Entity

{


return spawnPrimitive.cube(

pos,

scale,


Quaternion.fromEuler(

new Vector3(

0,

0,

0

)

),


color,

1,

true,

"Static",

undefined

);


}








// =====================================
// FLOATING HEALTH BAR CREATOR
// =====================================


function createEnemyHealthBar(enemyData:any)

{


let barBackground = cube(

new Vector3(

enemyData.entity.pos.x,

4.5,

enemyData.entity.pos.z

),


new Vector3(

2.5,

0.15,

0.15

),


new Color(

0.15,

0,

0

)

);







let barHealth = cube(

new Vector3(

enemyData.entity.pos.x,

4.5,

enemyData.entity.pos.z-0.25

),


new Vector3(

2.5,

0.18,

0.18

),


new Color(

0,

1,

0

)

);






enemyHealthBars.push(

{

enemy:enemyData,

background:barBackground,

health:barHealth

}

);





console.log(

"Health bar created for "

+

enemyData.name

);


}








// =====================================
// UPDATE FLOATING HEALTH BARS
// =====================================


function updateEnemyHealthBars()

{


for(let ui of enemyHealthBars)

{


if(!ui.enemy.entity)

{

continue;

}




let pos = ui.enemy.entity.pos;





// move above enemy


ui.background.pos = new Vector3(

pos.x,

pos.y + 3.5,

pos.z

);



ui.health.pos = new Vector3(

pos.x,

pos.y + 3.5,

pos.z - 0.25

);







// calculate health


let percent =

ui.enemy.hp /

ui.enemy.maxHp;





if(percent < 0)

{

percent=0;

}



if(percent > 1)

{

percent=1;

}





ui.health.scale = new Vector3(

2.5 * percent,

0.18,

0.18

);






// enemy dead


if(ui.enemy.hp<=0)

{


ui.background.destroy();

ui.health.destroy();


enemyHealthBars.splice(

enemyHealthBars.indexOf(ui),

1

);



console.log(

ui.enemy.name +

" health bar removed"

);



}



}



}






// =====================================
// ENEMY DATA CREATOR
// =====================================


function createEnemyData(

enemy:Entity,

name:string

)

{


return {


entity:enemy,


name:name,


hp:100,


maxHp:100,


damage:10,


alive:true



};


}

 
// =====================================
// RETRO WALL COLORS
// =====================================


function wallColor(

x:number,

z:number

):Color

{


let pattern=(x+z)%5;



if(pattern==0)

{

return new Color(

0.55,

0.45,

0.35

);

}



if(pattern==1)

{

return new Color(

0.42,

0.35,

0.28

);

}



if(pattern==2)

{

return new Color(

0.32,

0.30,

0.28

);

}



if(pattern==3)

{

return new Color(

0.25,

0.22,

0.18

);

}



return new Color(

0.48,

0.38,

0.30

);


}







// =====================================
// RETRO FLOOR COLORS
// =====================================


function floorColor(

x:number,

z:number

):Color

{


if((x+z)%2==0)

{


return new Color(

0.18,

0.15,

0.12

);


}



return new Color(

0.10,

0.10,

0.08

);



}







// =====================================
// GENERATE OPEN ROOM MAZE
// =====================================


function generateMaze()

{


maze=[];



for(let x=0;x<mazeWidth;x++)

{


maze[x]=[];



for(let z=0;z<mazeHeight;z++)

{


maze[x][z]=1;


}



}







for(

let x=1;

x<mazeWidth-1;

x+=2

)

{



for(

let z=1;

z<mazeHeight-1;

z+=2

)

{



maze[x][z]=0;



let exits=0;





// EAST

if(x<mazeWidth-2)

{

maze[x+1][z]=0;

exits++;

}







// WEST

if(

x>1 &&

Math.random()<0.75

)

{

maze[x-1][z]=0;

exits++;

}








// SOUTH

if(z<mazeHeight-2)

{

maze[x][z+1]=0;

exits++;

}








// NORTH

if(

z>1 &&

Math.random()<0.75

)

{

maze[x][z-1]=0;

exits++;

}








// emergency opening

if(exits==0)

{

maze[x+1][z]=0;

}



}


}







// player starting room


maze[1][1]=0;

maze[2][1]=0;

maze[1][2]=0;








// final room


maze[mazeWidth-2][mazeHeight-2]=0;

maze[mazeWidth-3][mazeHeight-2]=0;





console.log(

"Open room maze generated"

);



}









// =====================================
// BUILD DUNGEON
// =====================================


export async function createDungeon()

{


generateMaze();



console.log(

"Generating RETRO WOLFENSTEIN DUNGEON..."

);







// spawn collectibles

spawnDungeonCollectibles(

maze,

mazeWidth,

mazeHeight,

blockSize

);






let offsetX=

-(mazeWidth*blockSize)/2;



let offsetZ=

-(mazeHeight*blockSize)/2;









for(let x=0;x<mazeWidth;x++)

{



for(let z=0;z<mazeHeight;z++)

{



let worldX=

(x*blockSize)+offsetX;



let worldZ=

(z*blockSize)+offsetZ;








// ================================
// WALLS
// ================================


if(maze[x][z]==1)

{


cube(

new Vector3(

worldX,

3,

worldZ

),


new Vector3(

blockSize,

6,

blockSize

),


wallColor(

x,

z

)

);



}









// ================================
// FLOORS
// ================================


else

{


cube(

new Vector3(

worldX,

0,

worldZ

),


new Vector3(

blockSize,

0.2,

blockSize

),


floorColor(

x,

z

)

);










// don't spawn around player


if(

!(x==1 && z==1)

&&

!(x==2 && z==1)

&&

!(x==1 && z==2)

)

{


spawnObjects(

worldX,

worldZ

);



}




}



}



}









// =================================
// PLAYER START
// =================================


Player.position.set(

new Vector3(

offsetX+blockSize,

1,

offsetZ+blockSize

)

);








console.log(

"===================="

);



console.log(

"DUNGEON READY"

);



console.log(

"PLAYER SPAWNED"

);



console.log(

"===================="

);



}