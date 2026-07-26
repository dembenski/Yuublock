// =====================================
// RETRO VOXEL DUNGEON SYSTEM
// FIXED ENEMY MOVEMENT VERSION
// =====================================


import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { Player } from "./Yuu API/Player";
import { Events } from "./Yuu API/Events";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";





// =====================================
// SAFE INVENTORY CONNECTOR
// =====================================


let inventoryReady=false;


let inventoryFunction:any=null;



export function connectInventory(

func:any

)

{

inventoryFunction=func;

inventoryReady=true;


console.log(

"Inventory connected"

);


}







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





// =====================================
// ENEMY SETTINGS
// =====================================


const enemySpeed = 2.5;


const enemyAttackDistance = 2.5;






// =====================================
// LOOT TYPE
// =====================================


interface LootItem

{

name:string;

rarity:string;

sellValue:number;

}








// =====================================
// LOOT TABLE
// =====================================


const lootTable:LootItem[] =

[


{
name:"Ancient Bronze Coin",
rarity:"Common",
sellValue:10
},


{
name:"Rusty Iron Key",
rarity:"Common",
sellValue:15
},


{
name:"Broken Sword",
rarity:"Common",
sellValue:20
},


{
name:"Old Dungeon Map",
rarity:"Common",
sellValue:25
},


{
name:"Leather Armor Piece",
rarity:"Common",
sellValue:30
},


{
name:"Small Healing Potion",
rarity:"Common",
sellValue:30
},


{
name:"Silver Coin Pouch",
rarity:"Uncommon",
sellValue:75
},


{
name:"Magic Herb",
rarity:"Uncommon",
sellValue:90
},


{
name:"Crystal Fragment",
rarity:"Uncommon",
sellValue:100
},


{
name:"Ancient Scroll",
rarity:"Uncommon",
sellValue:120
},


{
name:"Cyber Circuit",
rarity:"Rare",
sellValue:300
},


{
name:"Golden Gear",
rarity:"Rare",
sellValue:350
},


{
name:"Ancient Rune Stone",
rarity:"Rare",
sellValue:400
},


{
name:"Shadow Crystal",
rarity:"Rare",
sellValue:450
},


{
name:"Knight Helmet",
rarity:"Epic",
sellValue:1000
},


{
name:"Dragon Scale",
rarity:"Epic",
sellValue:1200
},


{
name:"Void Crystal",
rarity:"Epic",
sellValue:1400
},


{
name:"Ancient Dungeon Crown",
rarity:"Legendary",
sellValue:5000
},


{
name:"Dragon Heart",
rarity:"Legendary",
sellValue:7500
},


{
name:"God Core",
rarity:"Legendary",
sellValue:10000
}


];





console.log(

"FIXED RETRO DUNGEON LOADED"

);





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

return new Color(

0.55,

0.45,

0.35

);




if(pattern==1)

return new Color(

0.42,

0.35,

0.28

);




if(pattern==2)

return new Color(

0.32,

0.30,

0.28

);




if(pattern==3)

return new Color(

0.25,

0.22,

0.18

);





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







if(x<mazeWidth-2)

{


maze[x+1][z]=0;


exits++;



}









if(

x>1 &&

Math.random()<0.75

)

{


maze[x-1][z]=0;


exits++;



}









if(z<mazeHeight-2)

{


maze[x][z+1]=0;


exits++;



}









if(

z>1 &&

Math.random()<0.75

)

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









maze[1][1]=0;

maze[2][1]=0;

maze[1][2]=0;







maze[mazeWidth-2][mazeHeight-2]=0;

maze[mazeWidth-3][mazeHeight-2]=0;







console.log(

"MAZE GENERATED"

);



}









// =====================================
// BUILD DUNGEON WORLD
// =====================================


export async function createDungeon()

{


generateMaze();





console.log(

"GENERATING RETRO VOXEL DUNGEON..."

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


alive:true,


attacking:false



};







enemies.push(data);






console.log(

"ENEMY SPAWNED: "

+

data.name

);



}









// =====================================
// CHEST SPAWN
// =====================================


else if(chance < 0.20)

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






attachChestLoot(chest);







console.log(

"TREASURE CHEST SPAWNED"

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
// ENEMY MOVEMENT AI
// =====================================


function updateEnemies()

{


for(let i=0;i<enemies.length;i++)

{


let enemyData=enemies[i];




if(!enemyData.alive)

continue;





let enemy=enemyData.entity;




if(!enemy)

continue;







let enemyPos=enemy.pos;


let playerPos=Player.position;







let dx =

playerPos.x -

enemyPos.x;



let dz =

playerPos.z -

enemyPos.z;







let distance = Math.sqrt(

(dx*dx)

+

(dz*dz)

);









if(distance > enemyAttackDistance)

{



let moveX =

dx / distance;



let moveZ =

dz / distance;







enemy.pos = new Vector3(

enemyPos.x +

(moveX * enemySpeed * 0.016),



enemyPos.y,



enemyPos.z +

(moveZ * enemySpeed * 0.016)



);



}







else

{


if(!enemyData.attacking)

{


enemyData.attacking=true;



console.log(

enemyData.name +

" attacking player"

);



}



}



}



}









// =====================================
// ENEMY UPDATE LOOP
// =====================================


Events.onPhysicsUpdate(

()=>{


updateEnemies();



});

// =====================================
// CHEST INTERACTION
// =====================================


function attachChestLoot(

chest:Entity

)

{


if(!chest.trigger)

{


console.log(

"Chest trigger unavailable"

);


return;



}








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








for(let i=0;i<amount;i++)

{


let item = lootTable[

Math.floor(

Math.random()*lootTable.length

)

];









let reward =

{


name:item.name,


rarity:item.rarity,


amount:1,


sellPrice:item.sellValue



};









if(inventoryReady && inventoryFunction)

{


inventoryFunction(

reward

);



}

else

{


console.log(

"Inventory not connected yet"

);



}









console.log(

"+ FOUND "

+

item.name

);



console.log(

"RARITY: "

+

item.rarity

);



console.log(

"VALUE: "

+

item.sellValue

+

" coins"

);



}









console.log(

"CHEST LOOT COMPLETE"

);


console.log(

"===================="

);







chest.destroy();



}











// =====================================
// LOOT DATABASE EXPORT
// =====================================


export function getLootTable()

{


return lootTable;



}











// =====================================
// CONNECT INVENTORY SYSTEM
// =====================================


export function connectInventorySystem(

inventoryAddFunction:any

)

{


inventoryFunction = inventoryAddFunction;


inventoryReady = true;





console.log(

"INVENTORY SYSTEM CONNECTED"

);



}









// =====================================
// DUNGEON STATUS
// =====================================


export function getDungeonStats()

{


return {


enemies:

enemies.length,



chests:

chests.length,



loot:

lootTable.length



};



}









// =====================================
// DEBUG INFO
// =====================================


export function showDungeonInfo()

{


let stats=getDungeonStats();








console.log(

"===================="

);



console.log(

"RETRO DUNGEON STATUS"

);







console.log(

"Enemies: "

+

stats.enemies

);







console.log(

"Chests: "

+

stats.chests

);







console.log(

"Loot Database: "

+

stats.loot

);







console.log(

"===================="

);



}