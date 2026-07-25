import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { Player } from "./Yuu API/Player";
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




// =====================================
// GAME STORAGE
// =====================================


export let enemies:any[] = [];

export let chests:Entity[] = [];




// =====================================
// CHEST LOOT STORAGE
// =====================================


export let collectedItems:string[] = [];



interface LootItem

{

name:string;

rarity:string;

}




// =====================================
// 120 CHEST ITEMS
// =====================================


const lootTable:LootItem[] =

[


// COMMON

{name:"Ancient Bronze Coin",rarity:"Common"},
{name:"Rusty Iron Key",rarity:"Common"},
{name:"Broken Sword",rarity:"Common"},
{name:"Old Dungeon Map",rarity:"Common"},
{name:"Leather Armor Piece",rarity:"Common"},
{name:"Torch Oil",rarity:"Common"},
{name:"Iron Scrap",rarity:"Common"},
{name:"Old Helmet",rarity:"Common"},
{name:"Dungeon Bread",rarity:"Common"},
{name:"Small Healing Potion",rarity:"Common"},



// UNCOMMON

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



// RARE

{name:"Cyber Circuit",rarity:"Rare"},
{name:"Golden Gear",rarity:"Rare"},
{name:"Ancient Rune Stone",rarity:"Rare"},
{name:"Shadow Crystal",rarity:"Rare"},
{name:"Demon Core Fragment",rarity:"Rare"},
{name:"Void Battery",rarity:"Rare"},
{name:"Titan Alloy",rarity:"Rare"},
{name:"Dragon Bone",rarity:"Rare"},
{name:"Quantum Chip",rarity:"Rare"},
{name:"Energy Core",rarity:"Rare"},



// EPIC

{name:"Knight Helmet",rarity:"Epic"},
{name:"Dragon Scale",rarity:"Epic"},
{name:"Void Crystal",rarity:"Epic"},
{name:"Power Generator Core",rarity:"Epic"},
{name:"Ancient Armor Plate",rarity:"Epic"},
{name:"Demon Horn",rarity:"Epic"},
{name:"Phoenix Feather",rarity:"Epic"},
{name:"Star Fragment",rarity:"Epic"},
{name:"Time Crystal",rarity:"Epic"},
{name:"Legend Blade Shard",rarity:"Epic"},



// LEGENDARY

{name:"Ancient Dungeon Crown",rarity:"Legendary"},
{name:"King Slayer Sword",rarity:"Legendary"},
{name:"Dragon Heart",rarity:"Legendary"},
{name:"Infinity Crystal",rarity:"Legendary"},
{name:"God Core",rarity:"Legendary"}

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
// RETRO WALL COLORS
// =====================================

function wallColor(x:number,z:number):Color

{

let pattern=(x+z)%5;


if(pattern==0)

return new Color(.55,.45,.35);


if(pattern==1)

return new Color(.42,.35,.28);


if(pattern==2)

return new Color(.32,.30,.28);


if(pattern==3)

return new Color(.25,.22,.18);



return new Color(.48,.38,.30);


}




// =====================================
// RETRO FLOOR COLORS
// =====================================

function floorColor(x:number,z:number):Color

{

if((x+z)%2==0)

return new Color(.18,.15,.12);


return new Color(.10,.10,.08);

}





// =====================================
// GENERATE OPEN ROOM MAZE
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



if(x<mazeWidth-2)

{

maze[x+1][z]=0;

exits++;

}




if(x>1 && Math.random()<0.75)

{

maze[x-1][z]=0;

exits++;

}




if(z<mazeHeight-2)

{

maze[x][z+1]=0;

exits++;

}




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




// start room

maze[1][1]=0;

maze[2][1]=0;

maze[1][2]=0;




// final room

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


floorColor(x,z)

);





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



console.log("====================");
console.log(" DUNGEON READY ");
console.log(" PLAYER SPAWNED ");
console.log("====================");

}

// =====================================
// SPAWN ENEMIES + CHESTS
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

"Enemy spawned: "

+

data.name

);



}






// =====================================
// CHEST SPAWN
// =====================================

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



// ENABLE CHEST LOOT

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

let list=

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
// CHEST LOOT INTERACTION
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





chest.trigger.setOccupiedFunction(()=>{


if(opened)

return;




let distance =

Player.position.distanceTo(

chest.pos

);





if(distance < 3)

{


opened=true;


openChest(chest);



}



});



}






// =====================================
// OPEN CHEST
// =====================================


function openChest(

chest:Entity

)

{


console.log("====================");

console.log("CHEST OPENED");



let amount =

1 +

Math.floor(

Math.random()*5

);





for(let i=0;i<amount;i++)

{


let item =

lootTable[

Math.floor(

Math.random()*lootTable.length

)

];





collectedItems.push(item.name);




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



console.log("====================");





chest.destroy();



}

// =====================================
// SHOW LOOT INVENTORY
// =====================================


export function showLootInventory()

{


console.log(

"========== INVENTORY =========="

);



if(collectedItems.length==0)

{


console.log(

"No items collected"

);


console.log(

"=============================="

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

"TOTAL ITEMS: "

+

collectedItems.length

);



console.log(

"=============================="

);



}