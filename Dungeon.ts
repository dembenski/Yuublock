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

const mazeWidth = 25;

const mazeHeight = 25;


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


}





// =====================================
// BUILD DUNGEON
// =====================================

export async function createDungeon()

{


generateMaze();



console.log(

"Generating LARGE Wolfenstein maze..."

);




// CENTER OFFSET

let offsetX = -(mazeWidth * blockSize)/2;

let offsetZ = -(mazeHeight * blockSize)/2;





for(let x=0;x<mazeWidth;x++)

{


for(let z=0;z<mazeHeight;z++)

{


let worldX =

(x * blockSize)+offsetX;


let worldZ =

(z * blockSize)+offsetZ;






// WALL

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







// FLOOR

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





// don't spawn at start

if(!(x==1 && z==1))

{

spawnObjects(

worldX,

worldZ

);

}



}


}



}




// MOVE PLAYER INTO START ROOM

Player.position.set(

new Vector3(

offsetX + blockSize,

1,

offsetZ + blockSize

)

);



console.log(

"Maze complete"

);


console.log(

"Player placed inside dungeon"

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




// MORE SPREAD OUT ENEMIES

if(chance < .18)

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

"Enemy placed"

);


}






else if(chance < .25)

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


}



}







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