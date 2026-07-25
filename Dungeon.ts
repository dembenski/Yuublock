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


let pattern=(x+z)%5;



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
// GENERATE SAFE MAZE
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





function carve(x:number,z:number)

{


maze[x][z]=0;



let dirs=[

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





// =====================================
// FIX CLOSED ROOMS
// =====================================


for(let x=1;x<mazeWidth-1;x++)

{

for(let z=1;z<mazeHeight-1;z++)

{


if(maze[x][z]==0)

{


let exits=0;


if(maze[x+1][z]==0)
exits++;

if(maze[x-1][z]==0)
exits++;

if(maze[x][z+1]==0)
exits++;

if(maze[x][z-1]==0)
exits++;




if(exits==0)

{


let openings=[

[1,0],

[-1,0],

[0,1],

[0,-1]

];



let o=openings[

Math.floor(

Math.random()*openings.length

)

];



maze[x+o[0]][z+o[1]]=0;



}



}



}



}







// START ROOM

maze[1][1]=0;

maze[2][1]=0;

maze[1][2]=0;





// EXIT ROOM

maze[mazeWidth-2][mazeHeight-2]=0;

maze[mazeWidth-3][mazeHeight-2]=0;

maze[mazeWidth-2][mazeHeight-3]=0;



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

(x * blockSize)+offsetX;



let worldZ =

(z * blockSize)+offsetZ;







// =================================
// WALLS
// =================================

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







// =================================
// FLOORS
// =================================

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






// keep spawn area empty

if(

!(x==1 && z==1) &&

!(x==2 && z==1) &&

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

offsetX + blockSize,

1,

offsetZ + blockSize

)

);






console.log(

"========================"

);


console.log(

"RETRO MAZE COMPLETE"

);


console.log(

"PLAYER SPAWNED SAFELY"

);


console.log(

"========================"

);



}









// =====================================
// SPAWN ENEMIES / CHESTS
// =====================================

function spawnObjects(

x:number,

z:number

)

{


let chance=Math.random();





// =================================
// ENEMY SPAWN
// =================================

if(chance < .12)

{


let enemy=cube(

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





let data=

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
// CHEST SPAWN
// =================================

else if(chance < .18)

{


let chest=cube(

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
// ENEMY TYPES
// =====================================

function getEnemyName()

{


let list=

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

// =====================================
// SAFETY CHECK
// MAKES SURE PLAYER IS NEVER TRAPPED
// =====================================

function checkRoomOpenings()

{

for(let x=1;x<mazeWidth-1;x++)

{

for(let z=1;z<mazeHeight-1;z++)

{


if(maze[x][z]==0)

{


let exits = 0;



if(maze[x+1][z]==0)

{

exits++;

}


if(maze[x-1][z]==0)

{

exits++;

}


if(maze[x][z+1]==0)

{

exits++;

}


if(maze[x][z-1]==0)

{

exits++;

}





// if room has no exit, cut one open

if(exits==0)

{


let side=Math.floor(Math.random()*4);



if(side==0)

{

maze[x+1][z]=0;

}



if(side==1)

{

maze[x-1][z]=0;

}



if(side==2)

{

maze[x][z+1]=0;

}



if(side==3)

{

maze[x][z-1]=0;

}



console.log(

"Emergency exit created"

);



}



}



}



}



}









// =====================================
// BETTER ENEMY SPACING
// =====================================

function safeEnemySpawn(x:number,z:number)

{


// keep enemies away from start

let distance = Math.sqrt(

(x*x)+(z*z)

);



if(distance < 5)

{

return false;

}




// random spacing

if(Math.random()<0.5)

{

return true;

}



return false;



}