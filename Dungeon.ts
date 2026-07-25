import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { Player } from "./Yuu API/Player";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";

import { addEnemyAI } from "./EnemyAI";
import { registerEnemyCombat } from "./Combat";
import { spawnDungeonCollectibles } from "./DungeonCollectibles";
import { spawnDungeonCollectibles } from "./DungeonCollectibles";



// =====================================
// DUNGEON SIZE
// =====================================

const mazeWidth = 31;
const mazeHeight = 31;

const blockSize = 8;


let maze:number[][] = [];



export let enemies:any[] = [];

export let chests:Entity[] = [];





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
// RETRO WALL COLORS
// =====================================

function wallColor(x:number,z:number):Color

{

let pattern = (x+z)%5;


if(pattern==0)

{

return new Color(

.55,

.45,

.35

);

}


if(pattern==1)

{

return new Color(

.42,

.35,

.28

);

}


if(pattern==2)

{

return new Color(

.32,

.30,

.28

);

}


if(pattern==3)

{

return new Color(

.25,

.22,

.18

);

}



return new Color(

.48,

.38,

.30

);


}





// =====================================
// RETRO FLOOR COLORS
// =====================================

function floorColor(x:number,z:number):Color

{

if((x+z)%2==0)

{

return new Color(

.18,

.15,

.12

);

}


return new Color(

.10,

.10,

.08

);


}





// =====================================
// GENERATE OPEN ROOM MAZE
// =====================================

function generateMaze()

{


maze=[];



// fill walls

for(let x=0;x<mazeWidth;x++)

{

maze[x]=[];


for(let z=0;z<mazeHeight;z++)

{

maze[x][z]=1;

}


}





// create rooms

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


// room center

maze[x][z]=0;


let exits=0;




// east opening

if(x < mazeWidth-2)

{

maze[x+1][z]=0;

exits++;

}





// west opening

if(

x>1 &&

Math.random()<0.75

)

{

maze[x-1][z]=0;

exits++;

}





// south opening

if(z < mazeHeight-2)

{

maze[x][z+1]=0;

exits++;

}





// north opening

if(

z>1 &&

Math.random()<0.75

)

{

maze[x][z-1]=0;

exits++;

}





// emergency door

if(exits==0)

{

maze[x+1][z]=0;

}


}


}





// start room

maze[1][1]=0;

maze[2][1]=0;

maze[1][2]=0;





// final room opening

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



spawnDungeonCollectibles(
    maze,
    mazeWidth,
    mazeHeight,
    blockSize
);


let offsetX =

-(mazeWidth * blockSize)/2;



let offsetZ =

-(mazeHeight * blockSize)/2;







for(let x=0;x<mazeWidth;x++)

{


for(let z=0;z<mazeHeight;z++)

{


let worldX =

(x * blockSize) + offsetX;



let worldZ =

(z * blockSize) + offsetZ;







// ================================
// WALL BLOCKS
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
// FLOOR BLOCKS
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








// keep starting room clear

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
// PLAYER SPAWN
// =================================


Player.position.set(

new Vector3(

offsetX + blockSize,

1,

offsetZ + blockSize

)

);







console.log(

"===================="

);


console.log(

" DUNGEON READY "

);


console.log(

" PLAYER SPAWNED "

);


console.log(

"===================="

);



}









// =====================================
// SPAWN ENEMIES + CHESTS
// =====================================

function spawnObjects(

x:number,

z:number

)

{


let chance = Math.random();





// =================================
// ENEMIES
// =================================


if(chance < .12)

{


let enemy = cube(

new Vector3(

x,

1,

z

),


new Vector3(

1,

2,

1

),


new Color(

1,

0,

0

)

);







let data =

{


entity:enemy,


name:getEnemyName(),


hp:100,


damage:10,


alive:true



};






enemies.push(data);




addEnemyAI(enemy);




registerEnemyCombat(data);





console.log(

"Enemy spawned"

);



}







// =================================
// CHESTS
// =================================


else if(chance < .18)

{


let chest = cube(

new Vector3(

x,

1,

z

),


new Vector3(

1,

1,

1

),


new Color(

1,

.8,

0

)

);





chests.push(chest);





console.log(

"Chest spawned"

);



}



}





// =====================================
// ENEMY NAME LIST
// =====================================

function getEnemyName()

{


let list =

[

"Goblin",

"Skeleton",

"Orc",

"Shadow Beast",

"Mutant Guard",

"Cyber Demon"

];





return list[

Math.floor(

Math.random()*list.length

)

];



}





// =====================================
// END OF DUNGEON SCRIPT
// =====================================