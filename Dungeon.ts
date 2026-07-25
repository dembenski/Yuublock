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
// GENERATE ROOM MAZE
// EVERY ROOM HAS EXITS
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





// east opening

if(x < mazeWidth-2)

{

maze[x+1][z]=0;

}





// south opening

if(z < mazeHeight-2)

{

maze[x][z+1]=0;

}






// extra random openings

if(Math.random()<0.6)

{

if(x>1)

{

maze[x-1][z]=0;

}

}



if(Math.random()<0.6)

{

if(z>1)

{

maze[x][z-1]=0;

}

}



}


}







// guaranteed start room

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

"Generating LARGE WOLFENSTEIN DUNGEON..."

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







// don't spawn beside player

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









// PLAYER START

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


let chance=Math.random();





// enemies spread out

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







// treasure

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