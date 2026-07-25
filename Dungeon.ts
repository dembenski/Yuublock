import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { Player } from "./Yuu API/Player";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";

import { addEnemyAI } from "./EnemyAI";
import { registerEnemyCombat } from "./Combat";




// =====================================
// MAZE SIZE
// =====================================

const mazeWidth = 31;

const mazeHeight = 31;

const blockSize = 8;


let maze:number[][] = [];




export let enemies:any[] = [];

export let chests:Entity[] = [];






// =====================================
// CREATE BLOCK
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
// RETRO WALL TEXTURE COLORS
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
// RETRO FLOOR TILE COLORS
// =====================================


function floorColor(x:number,z:number):Color
{


let tile = (x+z)%2;



if(tile==0)

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
// GENERATE MAZE
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



// carve connected paths

function carve(x:number,z:number)

{

maze[x][z]=0;



let dirs =

[

[2,0],

[-2,0],

[0,2],

[0,-2]

];



dirs.sort(()=>Math.random()-0.5);



for(let d of dirs)

{

let nx=x+d[0];

let nz=z+d[1];



if(

nx>0 &&

nz>0 &&

nx<mazeWidth-1 &&

nz<mazeHeight-1 &&

maze[nx][nz]==1

)

{


maze[x+d[0]/2][z+d[1]/2]=0;


carve(nx,nz);


}


}


}



carve(1,1);



// guaranteed start

maze[1][1]=0;


// guaranteed exit

maze[mazeWidth-2][mazeHeight-2]=0;


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





let offsetX =

-(mazeWidth * blockSize)/2;



let offsetZ =

-(mazeHeight * blockSize)/2;






for(let x=0;x<mazeWidth;x++)

{


for(let z=0;z<mazeHeight;z++)

{


let worldX =

(x*blockSize)+offsetX;



let worldZ =

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


wallColor(x,z)

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

.2,

blockSize

),


floorColor(x,z)

);







// keep start room empty

if(

!(x==1 && z==1)

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

offsetX + blockSize,

1,

offsetZ + blockSize

)

);





console.log(

"MAZE COMPLETE"

);


console.log(

"PLAYER INSIDE START ROOM"

);



}

// =====================================
// SPAWN OBJECTS
// =====================================

function spawnObjects(

x:number,

z:number

)

{


let chance = Math.random();





// ================================
// ENEMIES
// ================================

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









// ================================
// CHESTS
// ================================

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
// ENEMY NAMES
// =====================================

function getEnemyName()

{


let list =

[

"Goblin",

"Skeleton",

"Orc",

"Shadow Beast"

];





return list[

Math.floor(

Math.random()*list.length

)

];

}