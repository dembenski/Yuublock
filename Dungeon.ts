// =====================================
// RETRO VOXEL DUNGEON + 120 CHEST LOOT SYSTEM
// =====================================


import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { Player } from "./Yuu API/Player";

import { addEnemyAI } from "./EnemyAI";
import { registerEnemyCombat } from "./Combat";

import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";




// =====================================
// DUNGEON SIZE
// =====================================

const mazeWidth = 31;
const mazeHeight = 31;

const blockSize = 8;



let maze:number[][] = [];




// =====================================
// GAME STORAGE
// =====================================


export let enemies:any[] = [];


export let chests:Entity[] = [];


// Player inventory

export let collectedItems:string[] = [];





// =====================================
// CHEST LOOT ITEM TYPE
// =====================================


interface LootItem

{

name:string;

rarity:string;

}





// =====================================
// 120 ITEM CHEST DATABASE
// =====================================


const lootTable:LootItem[] =

[


// ================================
// COMMON ITEMS 1-30
// ================================


{name:"Ancient Bronze Coin",rarity:"Common"},
{name:"Rusty Iron Key",rarity:"Common"},
{name:"Broken Sword",rarity:"Common"},
{name:"Old Dungeon Map",rarity:"Common"},
{name:"Leather Strap",rarity:"Common"},
{name:"Iron Scrap",rarity:"Common"},
{name:"Torch Oil",rarity:"Common"},
{name:"Dungeon Bread",rarity:"Common"},
{name:"Old Helmet",rarity:"Common"},
{name:"Stone Fragment",rarity:"Common"},
{name:"Cracked Shield",rarity:"Common"},
{name:"Copper Ring",rarity:"Common"},
{name:"Lost Journal Page",rarity:"Common"},
{name:"Bone Piece",rarity:"Common"},
{name:"Rusty Gear",rarity:"Common"},
{name:"Old Arrow",rarity:"Common"},
{name:"Broken Spear Tip",rarity:"Common"},
{name:"Wooden Handle",rarity:"Common"},
{name:"Small Health Potion",rarity:"Common"},
{name:"Empty Bottle",rarity:"Common"},
{name:"Dungeon Candle",rarity:"Common"},
{name:"Old Backpack",rarity:"Common"},
{name:"Traveler Cloth",rarity:"Common"},
{name:"Cracked Gem",rarity:"Common"},
{name:"Small Battery",rarity:"Common"},
{name:"Metal Plate",rarity:"Common"},
{name:"Old Coin Stack",rarity:"Common"},
{name:"Faded Banner",rarity:"Common"},
{name:"Goblin Tooth",rarity:"Common"},
{name:"Broken Lock",rarity:"Common"},



// ================================
// UNCOMMON ITEMS 31-60
// ================================


{name:"Silver Coin Pouch",rarity:"Uncommon"},
{name:"Magic Herb",rarity:"Uncommon"},
{name:"Crystal Fragment",rarity:"Uncommon"},
{name:"Ancient Scroll",rarity:"Uncommon"},
{name:"Warrior Badge",rarity:"Uncommon"},
{name:"Machine Gear",rarity:"Uncommon"},
{name:"Power Cell",rarity:"Uncommon"},
{name:"Bone Charm",rarity:"Uncommon"},
{name:"Lost Ring",rarity:"Uncommon"},
{name:"Explorer Badge",rarity:"Uncommon"},
{name:"Blue Crystal Shard",rarity:"Uncommon"},
{name:"Red Crystal Shard",rarity:"Uncommon"},
{name:"Green Crystal Shard",rarity:"Uncommon"},
{name:"Healing Herb Bundle",rarity:"Uncommon"},
{name:"Silver Dagger",rarity:"Uncommon"},
{name:"Encrypted Data Chip",rarity:"Uncommon"},
{name:"Ancient Compass",rarity:"Uncommon"},
{name:"Hunter Trophy",rarity:"Uncommon"},
{name:"Energy Crystal",rarity:"Uncommon"},
{name:"Mechanical Part",rarity:"Uncommon"},
{name:"Lost Explorer Map",rarity:"Uncommon"},
{name:"Torch Battery Cell",rarity:"Uncommon"},
{name:"Golden Coin",rarity:"Uncommon"},
{name:"Magic Dust",rarity:"Uncommon"},
{name:"Frozen Shard",rarity:"Uncommon"},
{name:"Poison Vial",rarity:"Uncommon"},
{name:"Spider Silk",rarity:"Uncommon"},
{name:"Rune Fragment",rarity:"Uncommon"},
{name:"Silver Bracelet",rarity:"Uncommon"},
{name:"Ancient Key Piece",rarity:"Uncommon"},



// ================================
// RARE ITEMS 61-90
// ================================


{name:"Cyber Circuit",rarity:"Rare"},
{name:"Golden Gear",rarity:"Rare"},
{name:"Ancient Rune Stone",rarity:"Rare"},
{name:"Shadow Crystal",rarity:"Rare"},
{name:"Demon Core Fragment",rarity:"Rare"},
{name:"Dragon Bone",rarity:"Rare"},
{name:"Void Metal",rarity:"Rare"},
{name:"Dark Energy Cell",rarity:"Rare"},
{name:"Royal Coin",rarity:"Rare"},
{name:"Ancient Warrior Seal",rarity:"Rare"},
{name:"Crystal Sword Fragment",rarity:"Rare"},
{name:"Titan Armor Piece",rarity:"Rare"},
{name:"Lost Technology Core",rarity:"Rare"},
{name:"Shadow Blade",rarity:"Rare"},
{name:"Phoenix Feather",rarity:"Rare"},
{name:"Mystic Orb",rarity:"Rare"},
{name:"Cursed Necklace",rarity:"Rare"},
{name:"Ancient Robot Chip",rarity:"Rare"},
{name:"Power Reactor",rarity:"Rare"},
{name:"Guardian Emblem",rarity:"Rare"},
{name:"Demon Horn",rarity:"Rare"},
{name:"Dark Crystal Eye",rarity:"Rare"},
{name:"Frozen Heart",rarity:"Rare"},
{name:"Lightning Core",rarity:"Rare"},
{name:"Ancient Battery",rarity:"Rare"},
{name:"Golden Circuit",rarity:"Rare"},
{name:"Void Shard",rarity:"Rare"},
{name:"Shadow Gem",rarity:"Rare"},
{name:"War Machine Part",rarity:"Rare"},
{name:"Dragon Claw",rarity:"Rare"},



// ================================
// EPIC + LEGENDARY 91-120
// ================================


{name:"Knight Helmet",rarity:"Epic"},
{name:"Dragon Scale",rarity:"Epic"},
{name:"Void Crystal",rarity:"Epic"},
{name:"Power Generator Core",rarity:"Epic"},
{name:"Ancient Crown Piece",rarity:"Epic"},
{name:"Demon Armor Fragment",rarity:"Epic"},
{name:"Titan Core",rarity:"Epic"},
{name:"Phoenix Crystal",rarity:"Epic"},
{name:"Royal Sword Fragment",rarity:"Epic"},
{name:"Ancient AI Core",rarity:"Epic"},
{name:"Celestial Stone",rarity:"Epic"},
{name:"Galaxy Crystal",rarity:"Epic"},
{name:"Eternal Flame",rarity:"Epic"},
{name:"Shadow Armor Plate",rarity:"Epic"},
{name:"Guardian Core",rarity:"Epic"},
{name:"Ancient Dragon Eye",rarity:"Epic"},
{name:"Void Engine",rarity:"Epic"},
{name:"Dark Matter Core",rarity:"Epic"},
{name:"Legendary Rune",rarity:"Epic"},
{name:"Ancient Reactor",rarity:"Epic"},


{name:"Ancient Dungeon Crown",rarity:"Legendary"},
{name:"Dragon King's Heart",rarity:"Legendary"},
{name:"Void Emperor Crystal",rarity:"Legendary"},
{name:"Lost Civilization Core",rarity:"Legendary"},
{name:"Ultimate Power Gem",rarity:"Legendary"},
{name:"God Slayer Blade",rarity:"Legendary"},
{name:"Ancient World Key",rarity:"Legendary"},
{name:"Eternal Guardian Seal",rarity:"Legendary"},
{name:"Universe Core",rarity:"Legendary"},
{name:"The Forgotten Relic",rarity:"Legendary"},


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



// Fill everything with walls

for(let x=0;x<mazeWidth;x++)

{


maze[x]=[];


for(let z=0;z<mazeHeight;z++)

{


maze[x][z]=1;


}


}






// Create rooms and paths

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






// East

if(x<mazeWidth-2)

{

maze[x+1][z]=0;

exits++;

}





// West

if(

x>1 &&

Math.random()<0.75

)

{

maze[x-1][z]=0;

exits++;

}





// South

if(z<mazeHeight-2)

{

maze[x][z+1]=0;

exits++;

}





// North

if(

z>1 &&

Math.random()<0.75

)

{

maze[x][z-1]=0;

exits++;

}





// Safety opening

if(exits==0)

{

maze[x+1][z]=0;

}



}


}







// Player starting room

maze[1][1]=0;

maze[2][1]=0;

maze[1][2]=0;






// Final room

maze[mazeWidth-2][mazeHeight-2]=0;

maze[mazeWidth-3][mazeHeight-2]=0;





console.log(

"OPEN ROOM MAZE GENERATED"

);



}

// =====================================
// CREATE DUNGEON
// =====================================


export async function createDungeon()

{


generateMaze();



console.log(

"===================="

);


console.log(

"BUILDING RETRO VOXEL DUNGEON"

);


console.log(

"===================="

);






let offsetX =

-(mazeWidth * blockSize) / 2;



let offsetZ =

-(mazeHeight * blockSize) / 2;








for(let x=0;x<mazeWidth;x++)

{


for(let z=0;z<mazeHeight;z++)

{


let worldX =

(x * blockSize) + offsetX;



let worldZ =

(z * blockSize) + offsetZ;







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


wallColor(

x,

z

)


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

0.2,

blockSize

),


floorColor(

x,

z

)


);







// keep starting room empty

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

"DUNGEON READY"

);


console.log(

"PLAYER SPAWNED"

);


console.log(

"CHEST LOOT SYSTEM ONLINE"

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


let chance = Math.random();






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

()=>{


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


console.log(

"ROLLING LOOT..."

);


console.log(

"===================="

);







// Gives 1-5 items

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

"+ ITEM FOUND"

);


console.log(

"NAME: "

+

item.name

);


console.log(

"RARITY: "

+

item.rarity

);



console.log(

"--------------------"

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
// SHOW INVENTORY
// =====================================


export function showLootInventory()

{


console.log(

"===================="

);


console.log(

" PLAYER INVENTORY "

);


console.log(

"===================="

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

"--------------------"

);


console.log(

"TOTAL ITEMS: "

+

collectedItems.length

);


console.log(

"===================="

);



}

// =====================================
// ENEMY DEATH CHECK
// =====================================


function checkEnemyDeaths()

{


for(let enemy of enemies)

{


if(

enemy.alive &&

enemy.hp <= 0

)

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






// Optional future enemy drops

dropEnemyLoot(enemy);







enemy.entity.destroy();




}



}



}








// =====================================
// OPTIONAL ENEMY DROP SYSTEM
// =====================================


function dropEnemyLoot(

enemy:any

)

{


let chance=Math.random();





// 50% chance no loot

if(chance > 0.5)

{


console.log(

"No enemy loot dropped"

);


return;


}







let item = lootTable[

Math.floor(

Math.random()*lootTable.length

)

];







console.log(

"Enemy dropped: "

+

item.name

+

" | "

+

item.rarity

);



}








// =====================================
// GAME UPDATE LOOP
// =====================================


Events.onPhysicsUpdate(

()=>{


checkEnemyDeaths();



});








// =====================================
// SCRIPT READY
// =====================================


console.log(

"=============================="

);


console.log(

" RETRO DUNGEON LOADED "

);


console.log(

" 120 CHEST ITEMS ACTIVE "

);


console.log(

" ENEMY SYSTEM ACTIVE "

);


console.log(

" LOOT INVENTORY ACTIVE "

);


console.log(

"=============================="

);

