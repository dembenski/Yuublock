// =====================================
// RETRO VOXEL DUNGEON + CHEST LOOT SYSTEM
// =====================================


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



let maze:number[][]=[];



// =====================================
// GAME STORAGE
// =====================================


export let enemies:any[]=[];


export let chests:Entity[]=[];


export let collectedItems:string[]=[];




// =====================================
// CHEST LOOT DATABASE
// =====================================


interface LootItem

{

name:string;

rarity:string;

}




const lootTable:LootItem[] =

[


{
name:"Ancient Bronze Key",
rarity:"Common"
},


{
name:"Rusty Iron Sword",
rarity:"Common"
},


{
name:"Broken Shield Fragment",
rarity:"Common"
},


{
name:"Dungeon Coin",
rarity:"Common"
},


{
name:"Old Machine Gear",
rarity:"Common"
},


{
name:"Blue Crystal Shard",
rarity:"Uncommon"
},


{
name:"Red Crystal Shard",
rarity:"Uncommon"
},


{
name:"Green Crystal Shard",
rarity:"Uncommon"
},


{
name:"Lost Explorer Map",
rarity:"Uncommon"
},


{
name:"Torch Battery Cell",
rarity:"Uncommon"
},


{
name:"Cyber Circuit",
rarity:"Rare"
},


{
name:"Golden Gear",
rarity:"Rare"
},


{
name:"Ancient Rune Stone",
rarity:"Rare"
},


{
name:"Shadow Crystal",
rarity:"Rare"
},


{
name:"Demon Core Fragment",
rarity:"Rare"
},


{
name:"Knight Helmet",
rarity:"Epic"
},


{
name:"Dragon Scale",
rarity:"Epic"
},


{
name:"Void Crystal",
rarity:"Epic"
},


{
name:"Power Generator Core",
rarity:"Epic"
},


{
name:"Ancient Dungeon Crown",
rarity:"Legendary"
}


];






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
// WALL COLORS
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
// FLOOR COLORS
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

if(x>1 && Math.random()<0.75)

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

if(z>1 && Math.random()<0.75)

{

maze[x][z-1]=0;

exits++;

}





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






// FINAL ROOM

maze[mazeWidth-2][mazeHeight-2]=0;

maze[mazeWidth-3][mazeHeight-2]=0;





console.log(

"OPEN DUNGEON GENERATED"

);



}









// =====================================
// CREATE DUNGEON
// =====================================


export async function createDungeon()

{


generateMaze();



console.log(

"BUILDING RETRO DUNGEON"

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






// leave spawn clear

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






// PLAYER SPAWN


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
// SPAWN OBJECTS
// ENEMIES + CHESTS
// =====================================


function spawnObjects(

x:number,

z:number

)

{


let chance=Math.random();





// =====================================
// ENEMY SPAWN
// =====================================


if(chance < 0.12)

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

"Enemy spawned: "

+

data.name

);



}







// =====================================
// CHEST SPAWN
// =====================================


else if(chance < 0.18)

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

0.8,

0

)


);






chests.push(chest);



attachChestLoot(chest);





console.log(

"Treasure chest spawned"

);



}



}









// =====================================
// ENEMY NAMES
// =====================================


function getEnemyName()

{


let list=[


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
// CHEST LOOT SYSTEM
// =====================================


function attachChestLoot(

chest:Entity

)

{


let opened=false;




chest.trigger.initialize(

1,

2,


[

"Left Hand",

"Right Hand"

],


undefined

);







chest.trigger.setOccupiedFunction(

(payload)=>{


if(opened)

{

return;

}





let distance =

Player.position.distanceTo(

chest.pos

);





if(distance < 3)

{


opened=true;



openChest(

chest

);



}



}


);



}









// =====================================
// OPEN CHEST
// =====================================


function openChest(

chest:Entity

)

{


console.log(

"===================="

);


console.log(

"CHEST OPENED"

);



let amount =

1 +

Math.floor(

Math.random()*5

);






for(

let i=0;

i<amount;

i++

)

{


let item = lootTable[

Math.floor(

Math.random()*lootTable.length

)

];





collectedItems.push(

item.name

);





console.log(

"+ "

+

item.name

+

" | "

+

item.rarity

);



}







console.log(

"TOTAL ITEMS FOUND: "

+

collectedItems.length

);



console.log(

"===================="

);






chest.destroy();



}







// =====================================
// SHOW LOOT INVENTORY
// =====================================


export function showLootInventory()

{


console.log(

"========= LOOT ========="

);





if(collectedItems.length==0)

{


console.log(

"No items collected"

);


return;


}





for(let item of collectedItems)

{


console.log(

item

);


}





console.log(

"======================="

);



}

// =====================================
// ENEMY HEALTH BAR STORAGE
// =====================================


interface EnemyHealthDisplay

{

enemy:any;

bar:Entity;

background:Entity;

}



let enemyHealthBars:EnemyHealthDisplay[]=[];






// =====================================
// CREATE ENEMY HEALTH BAR
// =====================================


function createEnemyHealthBar(

enemy:any

)

{


let position = enemy.entity.pos;



let background = cube(

new Vector3(

position.x,

position.y + 2.5,

position.z

),


new Vector3(

2,

0.15,

0.15

),


new Color(

0.15,

0,

0

)

);





let healthBar = cube(

new Vector3(

position.x,

position.y + 2.5,

position.z - 0.1

),


new Vector3(

2,

0.2,

0.2

),


new Color(

0,

1,

0

)

);






enemyHealthBars.push(

{

enemy:enemy,

bar:healthBar,

background:background

}

);



}








// =====================================
// UPDATE HEALTH BARS
// =====================================


function updateEnemyHealthBars()

{


for(let display of enemyHealthBars)

{


if(!display.enemy.alive)

{


display.bar.destroy();

display.background.destroy();


continue;


}





let pos = display.enemy.entity.pos;





display.background.pos = new Vector3(

pos.x,

pos.y + 2.5,

pos.z

);





display.bar.pos = new Vector3(

pos.x,

pos.y + 2.5,

pos.z - 0.1

);







let hpPercent =

display.enemy.hp / 100;



if(hpPercent < 0)

{

hpPercent = 0;

}





display.bar.scale = new Vector3(

2 * hpPercent,

0.2,

0.2

);






if(hpPercent > .5)

{

display.bar.color = new Color(

0,

1,

0

);

}

else if(hpPercent > .25)

{

display.bar.color = new Color(

1,

1,

0

);

}

else

{

display.bar.color = new Color(

1,

0,

0

);

}



}



}







// =====================================
// SPAWN OBJECTS
// ENEMIES + CHESTS
// =====================================


function spawnObjects(

x:number,

z:number

)

{


let chance=Math.random();





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



// NEW

createEnemyHealthBar(data);






console.log(

"Enemy spawned: "

+

data.name

);



}






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

0.8,

0

)

);



chests.push(chest);



attachChestLoot(chest);



console.log(

"Treasure chest spawned"

);



}



}






// =====================================
// GAME UPDATE
// =====================================


Events.onPhysicsUpdate(

()=>{


updateEnemyHealthBars();


});

// =====================================
// ENEMY LOOT DROPS
// =====================================


function dropEnemyLoot(

enemy:any

)

{


let chance=Math.random();



// 50% chance for loot

if(chance > .5)

{

console.log(

"No loot dropped"

);

return;

}






let item = lootTable[

Math.floor(

Math.random()*lootTable.length

)

];







let drop = cube(

new Vector3(

enemy.entity.pos.x,

1,

enemy.entity.pos.z

),


new Vector3(

0.4,

0.4,

0.4

),


new Color(

1,

0.8,

0.1

)

);





console.log(

"Enemy dropped: "

+

item.name

+

" | "

+

item.rarity

);





attachWorldLootPickup(

drop,

item

);



}









// =====================================
// WORLD LOOT PICKUP
// =====================================


function attachWorldLootPickup(

entity:Entity,

item:LootItem

)

{


let collected=false;





entity.trigger.initialize(

1,

2,

[

"Left Hand",

"Right Hand"

],

undefined

);







entity.trigger.setOccupiedFunction(

()=>{


if(collected)

{

return;

}






let distance =

Player.position.distanceTo(

entity.pos

);






if(distance < 3)

{


collected=true;



collectedItems.push(

item.name

);





console.log(

"===================="

);


console.log(

"ITEM COLLECTED"

);


console.log(

item.name

);


console.log(

item.rarity

);


console.log(

"===================="

);






entity.destroy();



}



}

);



}









// =====================================
// CHECK ENEMY DEATH
// =====================================


function checkEnemyDeaths()

{


for(let enemy of enemies)

{


if(enemy.alive && enemy.hp <= 0)

{


enemy.alive=false;





console.log(

"===================="

);


console.log(

"ENEMY DEFEATED"

);


console.log(

enemy.name

);


console.log(

"===================="

);





dropEnemyLoot(enemy);






enemy.entity.destroy();



}



}



}








// =====================================
// UPDATE LOOP
// =====================================


Events.onPhysicsUpdate(

()=>{


updateEnemyHealthBars();


checkEnemyDeaths();


});