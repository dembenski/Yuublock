import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { Player } from "./Yuu API/Player";
import { Events } from "./Yuu API/Events";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";

import { addEnemyAI } from "./EnemyAI";
import { registerEnemyCombat } from "./Combat";




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
// TORCH STORAGE
// =====================================

let torches:Entity[] = [];

let torchTimer = 0;






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
// VOXEL ENEMY CREATOR
// RETRO BLOCK PERSON
// =====================================


function createVoxelEnemy(

x:number,

z:number,

type:string

):Entity

{


let skin = new Color(

0.75,

0.55,

0.35

);


let armor = new Color(

0.8,

0.05,

0.05

);


let boots = new Color(

0.08,

0.08,

0.08

);



// different enemy colors


if(type=="Skeleton")

{

armor = new Color(

0.85,

0.85,

0.75

);

}


if(type=="Orc")

{

skin = new Color(

0.2,

0.8,

0.25

);


armor = new Color(

0.15,

0.4,

0.1

);

}


if(type=="Cyber Demon")

{

armor = new Color(

0.1,

0.2,

1

);

}







// MAIN BODY

let body = cube(

new Vector3(

x,

2,

z

),


new Vector3(

1.2,

1.5,

0.8

),


armor

);






// HEAD

cube(

new Vector3(

x,

3.7,

z

),


new Vector3(

1,

1,

1

),


skin

);






// LEFT ARM

cube(

new Vector3(

x-0.9,

2,

z

),


new Vector3(

0.3,

1.1,

0.3

),


armor

);






// RIGHT ARM

cube(

new Vector3(

x+0.9,

2,

z

),


new Vector3(

0.3,

1.1,

0.3

),


armor

);







// LEFT LEG

cube(

new Vector3(

x-0.35,

0.8,

z

),


new Vector3(

0.35,

1,

0.35

),


boots

);






// RIGHT LEG

cube(

new Vector3(

x+0.35,

0.8,

z

),


new Vector3(

0.35,

1,

0.35

),


boots

);






return body;


}


// =====================================
// RETRO PIXEL WALL TEXTURE
// PROCEDURAL COLORS ONLY
// =====================================

function wallTexture(

x:number,

z:number

):Color

{


let pixel =

(x * 17 + z * 11) % 8;



if(pixel==0)

{

return new Color(

0.65,

0.45,

0.25

);

}



if(pixel==1)

{

return new Color(

0.50,

0.32,

0.18

);

}



if(pixel==2)

{

return new Color(

0.35,

0.25,

0.18

);

}



if(pixel==3)

{

return new Color(

0.75,

0.55,

0.30

);

}



if(pixel==4)

{

return new Color(

0.25,

0.20,

0.15

);

}



return new Color(

0.42,

0.30,

0.20

);


}







// =====================================
// RETRO FLOOR TILE
// =====================================

function floorTexture(

x:number,

z:number

):Color

{


if((x+z)%2==0)

{

return new Color(

0.22,

0.18,

0.14

);

}



return new Color(

0.12,

0.10,

0.08

);


}







// =====================================
// PIXEL DITHER COLORS
// =====================================

function ditherColor(

x:number,

z:number

):Color

{


let pattern=(x+z)%3;



if(pattern==0)

{

return new Color(

0.8,

0.6,

0.35

);

}



if(pattern==1)

{

return new Color(

0.35,

0.25,

0.15

);

}



return new Color(

0.15,

0.12,

0.08

);


}







// =====================================
// GENERATE OPEN ROOM MAZE
// NO TRAPPED ROOMS
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


// room center

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







// starting room

maze[1][1]=0;

maze[2][1]=0;

maze[1][2]=0;







// final exit

maze[mazeWidth-2][mazeHeight-2]=0;

maze[mazeWidth-3][mazeHeight-2]=0;



console.log(

"Open dungeon generated"

);


}



// =====================================
// CREATE WALL PIXEL DETAILS
// =====================================

function createWallDetail(

x:number,

z:number,

worldX:number,

worldZ:number

)

{


let pattern=(x+z)%4;



if(pattern==0)

{


cube(

new Vector3(

worldX,

5,

worldZ-4

),


new Vector3(

2,

1,

0.1

),


ditherColor(

x,

z

)

);


}





if(pattern==1)

{


cube(

new Vector3(

worldX+2,

3,

worldZ-4

),


new Vector3(

3,

0.8,

0.1

),


ditherColor(

x,

z

)

);


}


}







// =====================================
// FLOOR PIXELS
// =====================================

function createFloorDetail(

x:number,

z:number,

worldX:number,

worldZ:number

)

{


if((x+z)%3==0)

{


cube(

new Vector3(

worldX,

0.12,

worldZ

),


new Vector3(

1,

0.03,

1

),


ditherColor(

x,

z

)

);


}


}







// =====================================
// TORCH CREATION
// =====================================

function createTorch(

x:number,

z:number

)

{


let torch=cube(

new Vector3(

x,

2,

z

),


new Vector3(

0.3,

1,

0.3

),


new Color(

1,

0.5,

0.1

)

);



torches.push(torch);


}







function maybeCreateTorch(

x:number,

z:number

)

{


if(Math.random()<0.08)

{


createTorch(

x,

z

);


}


}









// =====================================
// BUILD DUNGEON
// =====================================

export async function createDungeon()

{


generateMaze();



console.log(

"Generating RETRO VOXEL DUNGEON..."

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








// ==============================
// WALLS
// ==============================

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


wallTexture(

x,

z

)

);





createWallDetail(

x,

z,

worldX,

worldZ

);



}









// ==============================
// FLOORS
// ==============================

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


floorTexture(

x,

z

)

);






createFloorDetail(

x,

z,

worldX,

worldZ

);





maybeCreateTorch(

worldX,

worldZ

);






// leave spawn room clear

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

offsetX+blockSize,

1,

offsetZ+blockSize

)

);







console.log(

"======================"

);


console.log(

" RETRO VOXEL DUNGEON READY "

);


console.log(

" PLAYER SPAWNED "

);


console.log(

"======================"

);



}


// =====================================
// CHECK VALID SPAWN
// PREVENT BAD SPAWNS
// =====================================

function validSpawn(

x:number,

z:number

)

{


let gx=Math.floor(

(x+(mazeWidth*blockSize)/2)

/blockSize

);



let gz=Math.floor(

(z+(mazeHeight*blockSize)/2)

/blockSize

);






if(

gx<0 ||

gz<0 ||

gx>=mazeWidth ||

gz>=mazeHeight

)

{

return false;

}






return maze[gx][gz]==0;


}









// =====================================
// SPAWN OBJECTS
// VOXEL ENEMIES + CHESTS
// =====================================

function spawnObjects(

x:number,

z:number

)

{


if(!validSpawn(x,z))

{

return;

}






let chance=Math.random();








// =================================
// VOXEL ENEMY
// =================================

if(chance < .12)

{


let enemyName=getEnemyName();





let enemy=createVoxelEnemy(

x,

z,

enemyName

);








let data=

{


entity:enemy,


name:enemyName,


hp:100,


damage:10,


alive:true



};







enemies.push(data);







addEnemyAI(enemy);






registerEnemyCombat(data);







console.log(

"Voxel enemy spawned: "

+

enemyName

);





}









// =================================
// CHEST
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

0.8,

0

)

);






chests.push(chest);







console.log(

"Treasure chest spawned"

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

"Shadow Beast",

"Mutant Guard",

"Cyber Demon",

"Dungeon Knight",

"Ancient Warrior"

];






return list[

Math.floor(

Math.random()*list.length

)

];



}


// =====================================
// TORCH FLICKER SYSTEM
// OLD SCHOOL LIGHT EFFECT
// =====================================

function updateTorches()

{


torchTimer += 0.05;





for(let torch of torches)

{


if(!torch)

{

continue;

}





let flicker=Math.random();





if(flicker < 0.5)

{


torch.color=new Color(

1,

0.45,

0.05

);


}

else

{


torch.color=new Color(

1,

0.75,

0.15

);


}



}


}









// =====================================
// RETRO WALL SIGNS
// =====================================

function createRetroSign(

x:number,

z:number

)

{


if(Math.random()>0.05)

{

return;

}






// sign board

cube(

new Vector3(

x,

2.5,

z

),


new Vector3(

3,

1.5,

0.15

),


new Color(

0.12,

0.05,

0.02

)

);







// pixel lettering

cube(

new Vector3(

x-1,

2.5,

z-0.2

),


new Vector3(

0.2,

0.8,

0.05

),


new Color(

1,

0.8,

0.2

)

);






cube(

new Vector3(

x,

2.8,

z-0.2

),


new Vector3(

1,

0.2,

0.05

),


new Color(

1,

0.8,

0.2

)

);






console.log(

"Retro sign created"

);



}









// =====================================
// WALL DAMAGE
// PIXEL CRACK EFFECT
// =====================================

function createWallDamage(

x:number,

z:number,

worldX:number,

worldZ:number

)

{


let damage=(x*z)%6;





if(damage==0)

{


cube(

new Vector3(

worldX,

2,

worldZ-4

),


new Vector3(

1,

0.2,

0.05

),


new Color(

0.1,

0.08,

0.05

)

);



}








if(damage==1)

{


cube(

new Vector3(

worldX+1,

4,

worldZ-4

),


new Vector3(

0.2,

1,

0.05

),


new Color(

0.1,

0.08,

0.05

)

);



}



}









// =====================================
// FLOOR RUBBLE
// =====================================

function createRubble(

x:number,

z:number

)

{


if(Math.random()>0.08)

{

return;

}






cube(

new Vector3(

x,

0.18,

z

),


new Vector3(

0.5,

0.1,

0.5

),


new Color(

0.35,

0.30,

0.25

)

);



}









// =====================================
// FINAL DECORATION PASS
// =====================================

function decorateDungeon()

{


console.log(

"Adding retro voxel decorations..."

);







for(let x=1;x<mazeWidth-1;x++)

{


for(let z=1;z<mazeHeight-1;z++)

{


if(maze[x][z]==0)

{


let worldX=

(x*blockSize)

-

(mazeWidth*blockSize)/2;





let worldZ=

(z*blockSize)

-

(mazeHeight*blockSize)/2;






createRetroSign(

worldX,

worldZ

);







createRubble(

worldX,

worldZ

);



}



}



}







console.log(

"Decoration complete"

);



}









// =====================================
// START DECORATIONS
// CALL AFTER CREATE DUNGEON
// =====================================

export function finishDungeon()

{


decorateDungeon();






console.log(

"=============================="

);



console.log(

" RETRO VOXEL DUNGEON COMPLETE "

);



console.log(

" TEXTURES ACTIVE "

);



console.log(

" VOXEL ENEMIES ACTIVE "

);



console.log(

" TORCHES ACTIVE "

);



console.log(

"=============================="

);



}









// =====================================
// GAME LOOP
// =====================================

Events.onPhysicsUpdate(

()=>{


updateTorches();



});








// =====================================
// END OF DUNGEON SYSTEM
// =====================================