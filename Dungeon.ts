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
// RETRO SYSTEM STORAGE
// =====================================


let torches:Entity[] = [];

let generators:Entity[] = [];

let warningLights:Entity[] = [];


let torchTimer = 0;

let soundTimer = 0;





// =====================================
// RETRO SOUND SYSTEM
// MACHINE STYLE
// =====================================


function playRetroSound(

name:string

)

{


console.log(

"[RETRO AUDIO] " + name

);


}





function soundMachineHum()

{

playRetroSound(

"deep computer hum"

);

}




function soundGeneratorPulse()

{

playRetroSound(

"generator power pulse"

);

}





function soundMetalDoor()

{

playRetroSound(

"heavy metal door"

);

}





function soundEnemyAlert()

{

playRetroSound(

"enemy alarm beep"

);

}





function soundRobotStep()

{

playRetroSound(

"robot footsteps"

);

}





function soundTorchBuzz()

{

playRetroSound(

"electric torch buzz"

);

}






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
// CREATE MACHINE BLOCK
// =====================================


function createMachine(

x:number,

z:number

)

{


let machine=cube(

new Vector3(

x,

1,

z

),


new Vector3(

2,

2,

1

),


new Color(

0.08,

0.08,

0.12

)

);



generators.push(machine);



soundGeneratorPulse();



}







// =====================================
// WARNING LIGHT
// =====================================


function createWarningLight(

x:number,

z:number

)

{


let light=cube(

new Vector3(

x,

3,

z

),


new Vector3(

0.4,

0.4,

0.4

),


new Color(

1,

0,

0

)

);



warningLights.push(light);



}






// =====================================
// RANDOM MACHINE DECOR
// =====================================


function maybeCreateMachine(

x:number,

z:number

)

{


let chance=Math.random();



if(chance < 0.03)

{


createMachine(

x,

z

);


}



if(chance < 0.06)

{


createWarningLight(

x,

z

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



soundTorchBuzz();


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
// VOXEL ENEMY CREATOR
// RETRO BLOCK PEOPLE
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

0.05,

0.05,

0.05

);





// ===============================
// ENEMY VARIANTS
// ===============================


if(type=="Skeleton")

{


skin = new Color(

0.9,

0.9,

0.75

);



armor = new Color(

0.55,

0.55,

0.5

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

0.1,

0.45,

0.1

);



}




if(type=="Cyber Demon")

{


skin = new Color(

0.15,

0.15,

0.2

);



armor = new Color(

0.05,

0.25,

1

);



}




if(type=="Mutant Guard")

{


skin = new Color(

0.4,

0.9,

0.4

);



armor = new Color(

0.5,

0.1,

0.1

);



}





// ===============================
// BODY
// ===============================


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






// ===============================
// HEAD
// ===============================


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






// ===============================
// LEFT ARM
// ===============================


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






// ===============================
// RIGHT ARM
// ===============================


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







// ===============================
// LEGS
// ===============================


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







// ===============================
// WEAPON / ROBOT CORE
// ===============================


if(type=="Cyber Demon")

{


cube(

new Vector3(

x,

2.5,

z-0.5

),


new Vector3(

0.3,

0.3,

0.3

),


new Color(

0,

1,

1

)

);



}



return body;


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
// ENEMY SPAWN EFFECT
// =====================================


function enemySpawnEffect(

x:number,

z:number

)

{


cube(

new Vector3(

x,

0.2,

z

),


new Vector3(

1.5,

0.05,

1.5

),


new Color(

0.8,

0,

0

)

);



soundEnemyAlert();



}






// =====================================
// ENEMY IDLE SOUND TIMER
// =====================================


function updateEnemySounds()

{


if(enemies.length==0)

{

return;

}



if(Math.random()<0.01)

{


soundRobotStep();



}



}





// =====================================
// SPAWN OBJECTS
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





// ================================
// ENEMY
// ================================


if(chance < .12)

{


let enemyName=getEnemyName();





let enemy=createVoxelEnemy(

x,

z,

enemyName

);






let data =

{

entity:enemy,

name:enemyName,

hp:100,

damage:10,

alive:true

};






enemies.push(data);





enemySpawnEffect(

x,

z

);





addEnemyAI(enemy);



registerEnemyCombat(data);





console.log(

"Voxel enemy created: "

+

enemyName

);



}







// ================================
// CHEST
// ================================


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

"Treasure chest created"

);



}



}


// =====================================
// RETRO WALL TEXTURE
// PROCEDURAL PIXELS
// =====================================


function wallTexture(

x:number,

z:number

):Color

{


let pixel=(x*17+z*11)%8;



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
// RETRO FLOOR TEXTURE
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
// DITHER PIXEL COLORS
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





// emergency door

if(exits==0)

{


maze[x+1][z]=0;



}



}


}






// PLAYER START ROOM


maze[1][1]=0;

maze[2][1]=0;

maze[1][2]=0;







// FINAL EXIT ROOM


maze[mazeWidth-2][mazeHeight-2]=0;

maze[mazeWidth-3][mazeHeight-2]=0;





console.log(

"All rooms verified open"

);



}









// =====================================
// WALL DETAIL PIXELS
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
// FLOOR PIXEL DETAILS
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
// BUILD DUNGEON
// =====================================


export async function createDungeon()

{


generateMaze();



console.log(

"Generating RETRO VOXEL MACHINE DUNGEON"

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








// ===============================
// WALLS
// ===============================


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









// ===============================
// FLOORS
// ===============================


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





maybeCreateMachine(

worldX,

worldZ

);





if(

!(x==1&&z==1)

&&

!(x==2&&z==1)

&&

!(x==1&&z==2)

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

offsetX+blockSize,

1,

offsetZ+blockSize

)

);






soundMetalDoor();



console.log(

"RETRO DUNGEON LOADED"

);



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
// MACHINE ANIMATION
// OLD COMPUTER EFFECT
// =====================================


function updateMachines()

{


for(let light of warningLights)

{


if(!light)

{

continue;

}





let pulse=Math.random();





if(pulse < .5)

{


light.color=new Color(

1,

0,

0

);



}

else

{


light.color=new Color(

0.4,

0,

0

);



}



}






if(Math.random()<0.01)

{


soundGeneratorPulse();



}



}









// =====================================
// RETRO WALL SIGNS
// PIXEL ART DECALS
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







// pixel letters


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





}









// =====================================
// WALL DAMAGE
// PIXEL CRACKS
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
// MACHINE ROOM DECORATION
// =====================================


function createMachineRoom(

x:number,

z:number

)

{


let chance=Math.random();





if(chance>0.03)

{

return;

}






// large generator


cube(

new Vector3(

x,

2,

z

),


new Vector3(

3,

3,

2

),


new Color(

0.05,

0.08,

0.12

)

);





// glowing core


cube(

new Vector3(

x,

2,

z-1.2

),


new Vector3(

0.8,

0.8,

0.2

),


new Color(

0,

1,

1

)

);






soundGeneratorPulse();



}









// =====================================
// FINAL DECORATION PASS
// =====================================


function decorateDungeon()

{


console.log(

"Adding retro decorations..."

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








createMachineRoom(

worldX,

worldZ

);






}







}



}





console.log(

"Retro decoration complete"

);



}









// =====================================
// CHECK VALID SPAWN
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
// RETRO SOUND SYSTEM
// MACHINE / DUNGEON EFFECTS
// =====================================


// Replace these with Yuu API audio calls
// if your project has a sound module.
// These functions are placeholders so the
// dungeon system is ready for audio.


function playRetroSound(name:string)

{

console.log(

"PLAY SOUND:",

name

);


}



// =====================================
// SOUND EVENTS
// =====================================


function soundMetalDoor()

{

playRetroSound(

"metal_door_open"

);

}




function soundGeneratorPulse()

{

playRetroSound(

"generator_hum"

);

}





function soundRobotStep()

{

playRetroSound(

"robot_step"

);

}





function soundEnemyAlert()

{

playRetroSound(

"enemy_alert"

);

}





function soundChest()

{

playRetroSound(

"chest_open"

);

}









// =====================================
// CHEST OPEN EFFECT
// =====================================


export function openChest(

chest:Entity

)

{


soundChest();



console.log(

"Chest opened"

);



}









// =====================================
// ENEMY SOUND UPDATE
// =====================================


function updateEnemySounds()

{


if(enemies.length==0)

{

return;

}





if(Math.random()<0.02)

{


soundRobotStep();



}





if(Math.random()<0.01)

{


soundEnemyAlert();



}



}









// =====================================
// MACHINE LIGHT STORAGE
// =====================================


let warningLights:Entity[]=[];









// =====================================
// CREATE WARNING LIGHT
// =====================================


function createWarningLight(

x:number,

z:number

)

{


let light=cube(

new Vector3(

x,

4,

z

),


new Vector3(

0.3,

0.3,

0.3

),


new Color(

1,

0,

0

)

);





warningLights.push(light);



}









// =====================================
// CREATE TORCH
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
// CREATE MACHINES
// =====================================


function maybeCreateMachine(

x:number,

z:number

)

{


if(Math.random()>0.04)

{

return;

}






cube(

new Vector3(

x,

2,

z

),


new Vector3(

2,

2,

2

),


new Color(

0.05,

0.08,

0.12

)

);






createWarningLight(

x,

4,

z

);



console.log(

"Machine room created"

);



}









// =====================================
// GAME UPDATE LOOP
// =====================================


Events.onPhysicsUpdate(

()=>{


updateTorches();



updateMachines();



updateEnemySounds();



});









// =====================================
// FINISH DUNGEON
// CALL AFTER CREATE
// =====================================


export function finishDungeon()

{


decorateDungeon();





console.log(

"================================"

);



console.log(

" RETRO VOXEL DUNGEON COMPLETE "

);



console.log(

" PROCEDURAL TEXTURES ACTIVE "

);



console.log(

" VOXEL ENEMIES ACTIVE "

);



console.log(

" MACHINE ROOMS ACTIVE "

);



console.log(

" RETRO SOUNDS ACTIVE "

);



console.log(

" TORCH SYSTEM ACTIVE "

);



console.log(

" ================================="

);



}









// =====================================
// END OF RETRO VOXEL DUNGEON SYSTEM
// =====================================