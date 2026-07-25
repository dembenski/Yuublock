import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { Player } from "./Yuu API/Player";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";

import { addEnemyAI } from "./EnemyAI";
import { registerEnemyCombat } from "./Combat";



// =====================================
// LARGE WOLFENSTEIN MAP
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
// CREATE GUARANTEED CONNECTED MAZE
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


let directions=[

[2,0],
[-2,0],
[0,2],
[0,-2]

];


directions.sort(()=>Math.random()-0.5);



for(let dir of directions)
{


let nx=x+dir[0];

let nz=z+dir[1];



if(

nx>0 &&
nz>0 &&
nx<mazeWidth-1 &&
nz<mazeHeight-1 &&
maze[nx][nz]==1

)

{


maze[x+dir[0]/2][z+dir[1]/2]=0;


carve(nx,nz);


}



}



}



carve(1,1);





// create extra openings
// prevents dead rooms

for(let x=1;x<mazeWidth-1;x++)
{

for(let z=1;z<mazeHeight-1;z++)
{


if(maze[x][z]==0)
{


let exits=0;


if(maze[x+1][z]==0) exits++;
if(maze[x-1][z]==0) exits++;
if(maze[x][z+1]==0) exits++;
if(maze[x][z-1]==0) exits++;



if(exits==0)
{


maze[x+1][z]=0;


}


}



}

}





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
"Generating Wolfenstein Dungeon..."
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

x*blockSize+offsetX;


let worldZ=

z*blockSize+offsetZ;





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

new Color(

.45,

.45,

.45

)

);


}



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

new Color(

.15,

.15,

.15

)

);





// no objects near start

if(

Math.abs(x-1)>3 ||

Math.abs(z-1)>3

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





// PLAYER START

Player.position.set(

new Vector3(

offsetX+(blockSize),

1,

offsetZ+(blockSize)

)

);




console.log(
"PLAYER SPAWNED INSIDE DUNGEON"
);


console.log(
"WOLFENSTEIN MAZE COMPLETE"
);


}






// =====================================
// OBJECT SPAWNING
// =====================================

function spawnObjects(
x:number,
z:number
)
{


let chance=Math.random();




// ENEMY

if(chance < .10)
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
"Enemy placed"
);



}






// CHEST

else if(chance < .16)
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
"Chest placed"
);



}



}








function getEnemyName()
{

let list=[

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