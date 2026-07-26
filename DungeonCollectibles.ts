// =====================================
// DUNGEON COLLECTABLE SYSTEM
// CLEAN STABLE VERSION
// CONNECTED TO INVENTORY SYSTEM
// =====================================


import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { Player } from "./Yuu API/Player";
import { Events } from "./Yuu API/Events";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";

import { addItemToInventory } from "./InventorySystem";



// =====================================
// PLAYER COLLECTION STORAGE
// =====================================


export let collectedItems:any[] = [];

export let totalValue:number = 0;



// =====================================
// ITEM DATA
// =====================================


export interface CollectibleItem

{

    name:string;

    rarity:string;

    value:number;

    color:Color;

}



// =====================================
// ITEM DATABASE
// =====================================


export const collectibleItems:CollectibleItem[] =

[



// COMMON

{
name:"Ancient Bronze Coin",
rarity:"Common",
value:10,
color:new Color(1,0.7,0.1)
},


{
name:"Rusty Dungeon Key",
rarity:"Common",
value:15,
color:new Color(0.5,0.4,0.2)
},


{
name:"Broken Sword",
rarity:"Common",
value:20,
color:new Color(0.4,0.4,0.4)
},


{
name:"Old Dungeon Map",
rarity:"Common",
value:25,
color:new Color(0.7,0.5,0.2)
},


{
name:"Small Healing Potion",
rarity:"Common",
value:30,
color:new Color(0.1,1,0.1)
},


{
name:"Torch Oil",
rarity:"Common",
value:12,
color:new Color(1,0.5,0.1)
},


{
name:"Iron Scrap",
rarity:"Common",
value:18,
color:new Color(0.3,0.3,0.3)
},


{
name:"Old Helmet",
rarity:"Common",
value:35,
color:new Color(0.5,0.5,0.5)
},


{
name:"Dungeon Bread",
rarity:"Common",
value:5,
color:new Color(0.8,0.6,0.3)
},



// UNCOMMON


{
name:"Silver Coin Pouch",
rarity:"Uncommon",
value:75,
color:new Color(0.8,0.8,0.8)
},


{
name:"Magic Herb",
rarity:"Uncommon",
value:90,
color:new Color(0.2,1,0.2)
},


{
name:"Crystal Fragment",
rarity:"Uncommon",
value:100,
color:new Color(0.2,0.8,1)
},


{
name:"Ancient Scroll",
rarity:"Uncommon",
value:120,
color:new Color(1,0.9,0.5)
},


{
name:"Warrior Badge",
rarity:"Uncommon",
value:150,
color:new Color(0.8,0.2,0.1)
},



// RARE


{
name:"Golden Goblet",
rarity:"Rare",
value:250,
color:new Color(1,0.65,0.05)
},


{
name:"Dragon Scale",
rarity:"Rare",
value:400,
color:new Color(0.8,0.2,0.05)
},


{
name:"Shadow Crystal",
rarity:"Rare",
value:450,
color:new Color(0.3,0.05,0.8)
},


{
name:"Ancient Gear Core",
rarity:"Rare",
value:500,
color:new Color(0.5,0.7,1)
},



// EPIC


{
name:"Phoenix Feather",
rarity:"Epic",
value:850,
color:new Color(1,0.3,0.05)
},


{
name:"Void Crystal",
rarity:"Epic",
value:1200,
color:new Color(0.2,0,1)
},


{
name:"Cyber Reactor",
rarity:"Epic",
value:1500,
color:new Color(0,1,1)
},



// LEGENDARY


{
name:"Crown of the Forgotten King",
rarity:"Legendary",
value:5000,
color:new Color(1,0.85,0)
},


{
name:"Sword of the Dungeon Lord",
rarity:"Legendary",
value:6000,
color:new Color(0.8,0.8,1)
},


{
name:"Ancient Dragon Heart",
rarity:"Legendary",
value:7500,
color:new Color(1,0.1,0.05)
},


{
name:"Galaxy Core",
rarity:"Legendary",
value:9000,
color:new Color(0.2,0.3,1)
},


{
name:"The Final Relic",
rarity:"Legendary",
value:50000,
color:new Color(1,0.2,0.8)
}


];



console.log(
"DUNGEON COLLECTABLE DATABASE LOADED:"
+
collectibleItems.length
+
" ITEMS"
);

// =====================================
// ACTIVE WORLD ITEMS
// =====================================


let activeCollectibles:Entity[]=[];



// =====================================
// FLOATING ITEM DATA
// =====================================


interface FloatingItem

{

    entity:Entity;

    baseY:number;

    offset:number;

    speed:number;

}



let floatingItems:FloatingItem[]=[];




// =====================================
// CREATE WORLD ITEM OBJECT
// =====================================


function createItemCube(

pos:Vector3,

item:CollectibleItem

):Entity

{


let entity = spawnPrimitive.cube(

pos,


new Vector3(

0.35,

0.35,

0.35

),


Quaternion.fromEuler(

new Vector3(

0,

Math.random()*6,

0

)

),


item.color,


0.8,


false,


"Animated",


undefined


);



registerFloatingItem(entity);



return entity;


}





// =====================================
// REGISTER FLOATING EFFECT
// =====================================


function registerFloatingItem(

entity:Entity

)

{


floatingItems.push(

{


entity:entity,


baseY:entity.pos.y,


offset:Math.random()*Math.PI*2,


speed:0.04 + Math.random()*0.05


}


);



}





// =====================================
// RANDOM ITEM PICK
// =====================================


function getRandomItem()

:CollectibleItem

{


return collectibleItems[

Math.floor(

Math.random()*collectibleItems.length

)

];


}






// =====================================
// SPAWN DUNGEON COLLECTIBLES
// =====================================


export function spawnDungeonCollectibles(

maze:number[][],

mazeWidth:number,

mazeHeight:number,

blockSize:number

)

{


console.log(

"=============================="

);


console.log(

"SPAWNING DUNGEON TREASURES"

);


console.log(

"=============================="

);



let amount = 120;


let offsetX =

-(mazeWidth * blockSize) / 2;


let offsetZ =

-(mazeHeight * blockSize) / 2;



let spawned = 0;




while(spawned < amount)

{


let x = Math.floor(

Math.random()*mazeWidth

);



let z = Math.floor(

Math.random()*mazeHeight

);





// only spawn inside rooms

if(maze[x][z] != 0)

{

continue;

}





// protect player starting room

if(

(x==1 && z==1)

||

(x==2 && z==1)

||

(x==1 && z==2)

)

{

continue;

}





let worldX =

(x * blockSize)+offsetX;



let worldZ =

(z * blockSize)+offsetZ;






let item = getRandomItem();




let entity = createItemCube(

new Vector3(

worldX,

1,

worldZ

),


item

);





attachPickup(

entity,

item

);





activeCollectibles.push(entity);



spawned++;





console.log(

"ITEM SPAWNED: "

+

item.name

+

" ["

+

item.rarity

+

"]"

);



}



console.log(

"TOTAL ITEMS SPAWNED: "

+

spawned

);



}

// =====================================
// ITEM PICKUP SYSTEM
// =====================================


function attachPickup(

entity:Entity,

item:CollectibleItem

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





if(distance < 4)

{


collected=true;



collectItem(

entity,

item

);



}



}


);



}







// =====================================
// COLLECT ITEM
// =====================================


function collectItem(

entity:Entity,

item:CollectibleItem

)

{


console.log(

"=============================="

);


console.log(

"ITEM COLLECTED"

);


console.log(

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

item.value

);



console.log(

"=============================="

);






// local storage

collectedItems.push(item);



totalValue += item.value;







// send to inventory system

addItemToInventory(

{


name:item.name,


rarity:item.rarity,


amount:1,


sellPrice:item.value


}


);






entity.destroy();





}






// =====================================
// ITEM FLOAT ANIMATION
// =====================================


Events.onPhysicsUpdate(

()=>{


for(let item of floatingItems)

{


if(!item.entity)

{

continue;

}





item.offset += item.speed;





item.entity.pos.y =

item.baseY +

Math.sin(item.offset)*0.15;





item.entity.rotation =

Quaternion.fromEuler(

new Vector3(

0,

item.offset,

0

)

);



}



}

);







// =====================================
// INVENTORY DISPLAY
// =====================================


export function showInventory()

{


console.log(

"=============================="

);


console.log(

"DUNGEON INVENTORY"

);


console.log(

"=============================="

);



if(collectedItems.length==0)

{


console.log(

"EMPTY"

);


return;


}




let value = 0;




for(let item of collectedItems)

{


console.log(

item.name

+

" | "

+

item.rarity

);



value += item.value;



}




console.log(

"------------------------------"

);


console.log(

"ITEM COUNT: "

+

collectedItems.length

);



console.log(

"TOTAL VALUE: "

+

value

);



console.log(

"=============================="

);



}







// =====================================
// COUNT ITEM
// =====================================


export function countItem(

name:string

)

{


let count = 0;




for(let item of collectedItems)

{


if(item.name == name)

{

count++;

}



}




return count;


}

// =====================================
// CHEST LOOT GENERATOR
// =====================================


export function generateChestLoot()

:CollectibleItem[]

{


let loot:CollectibleItem[]=[];



let amount =

3 +

Math.floor(

Math.random()*5

);





for(let i=0;i<amount;i++)

{


loot.push(

getRandomItemAdvanced()

);



}




return loot;



}







// =====================================
// ADVANCED RANDOM LOOT
// =====================================


function getRandomItemAdvanced()

:CollectibleItem

{


let roll=Math.random();



let rarity:string;



if(roll < 0.60)

{


rarity="Common";


}

else if(roll < 0.85)

{


rarity="Uncommon";


}

else if(roll < 0.95)

{


rarity="Rare";


}

else if(roll < 0.99)

{


rarity="Epic";


}

else

{


rarity="Legendary";


}





let pool = collectibleItems.filter(

(item)=>

item.rarity == rarity

);






if(pool.length==0)

{

return collectibleItems[0];

}





return pool[

Math.floor(

Math.random()*pool.length

)

];



}







// =====================================
// OPEN CHEST REWARD
// =====================================


export function openChestReward()

{


console.log(

"=============================="

);


console.log(

"CHEST OPENED"

);


console.log(

"=============================="

);





let rewards = generateChestLoot();






for(let item of rewards)

{


collectedItems.push(item);



totalValue += item.value;





addItemToInventory(

{


name:item.name,


rarity:item.rarity,


amount:1,


sellPrice:item.value


}


);







console.log(

"FOUND: "

+

item.name

+

" ["

+

item.rarity

+

"]"

);



}





console.log(

"TOTAL CHEST ITEMS: "

+

rewards.length

);





}








// =====================================
// SHOW CHEST PREVIEW
// =====================================


export function showChestLoot()

{


let loot = generateChestLoot();





console.log(

"=============================="

);


console.log(

"CHEST CONTENTS"

);


console.log(

"=============================="

);






for(let item of loot)

{


console.log(

item.name

+

" | "

+

item.rarity

+

" | "

+

item.value

+

" gold"

);



}





console.log(

"=============================="

);



}







// =====================================
// GIVE TEST ITEMS
// =====================================


export function giveTestItems()

{


console.log(

"GIVING TEST TREASURE"

);





for(let i=0;i<10;i++)

{


let item=getRandomItemAdvanced();




collectedItems.push(item);



totalValue += item.value;





console.log(

"ADDED: "

+

item.name

);



}



}







// =====================================
// FULL INVENTORY REPORT
// =====================================


export function detailedInventory()

{


console.log(

"=============================="

);


console.log(

"DUNGEON TREASURE REPORT"

);


console.log(

"=============================="

);



let map:any={};




for(let item of collectedItems)

{


if(!map[item.name])

{


map[item.name]=0;


}



map[item.name]++;



}





for(let name in map)

{


console.log(

name

+

" x"

+

map[name]

);



}





console.log(

"------------------------------"

);


console.log(

"ITEM COUNT: "

+

collectedItems.length

);


console.log(

"TOTAL VALUE: "

+

totalValue

);


console.log(

"=============================="

);



}

// =====================================
// ITEM RARITY EFFECTS
// =====================================


function applyItemEffect(

entity:Entity,

item:CollectibleItem

)

{


if(item.rarity=="Rare")

{


entity.scale = new Vector3(

0.5,

0.5,

0.5

);



}



if(item.rarity=="Epic")

{


entity.scale = new Vector3(

0.65,

0.65,

0.65

);



console.log(

"EPIC ITEM SPAWNED"

);



}



if(item.rarity=="Legendary")

{


entity.scale = new Vector3(

0.8,

0.8,

0.8

);



console.log(

"!!! LEGENDARY ITEM !!!"

);



}



}








// =====================================
// COLLECTION MESSAGE
// =====================================


function collectionMessage(

item:CollectibleItem

)

{


if(item.rarity=="Legendary")

{


console.log(

"********************************"

);


console.log(

" LEGENDARY TREASURE FOUND "

);


console.log(

item.name

);


console.log(

"********************************"

);



}

else

{


console.log(

"Collected "

+

item.name

);



}



}







// =====================================
// ADVANCED COLLECT FUNCTION
// =====================================


export function collectAdvancedItem(

entity:Entity,

item:CollectibleItem

)

{


if(!entity)

{

return;

}





collectedItems.push(item);



totalValue += item.value;





collectionMessage(item);





addItemToInventory(

{


name:item.name,


rarity:item.rarity,


amount:1,


sellPrice:item.value


}


);






entity.destroy();





}







// =====================================
// CLEAR WORLD ITEMS
// =====================================


export function clearCollectibles()

{


for(let item of activeCollectibles)

{


if(item)

{


item.destroy();


}



}





activeCollectibles=[];



floatingItems=[];





console.log(

"ALL DUNGEON ITEMS CLEARED"

);



}







// =====================================
// RESET PLAYER TREASURE
// =====================================


export function resetInventory()

{


collectedItems=[];



totalValue=0;





console.log(

"DUNGEON INVENTORY RESET"

);



}







// =====================================
// SAVE DATA DEBUG
// =====================================


export function getCollectibleStats()

{


return {


itemsFound:

collectedItems.length,


worldItems:

activeCollectibles.length,


totalGold:

totalValue



};



}







// =====================================
// DEBUG DISPLAY
// =====================================


export function showCollectibleStats()

{


let stats=getCollectibleStats();





console.log(

"=============================="

);


console.log(

"DUNGEON COLLECTIBLE STATUS"

);


console.log(

"=============================="

);



console.log(

"Collected Items: "

+

stats.itemsFound

);



console.log(

"World Items: "

+

stats.worldItems

);



console.log(

"Total Gold: "

+

stats.totalGold

);



console.log(

"=============================="

);



}








// =====================================
// REMOVE SINGLE WORLD ITEM
// =====================================


export function removeWorldItem(

entity:Entity

)

{


let index=

activeCollectibles.indexOf(entity);




if(index!=-1)

{


activeCollectibles.splice(

index,

1

);



}




if(entity)

{


entity.destroy();


}




}

// =====================================
// SPAWN SINGLE RANDOM COLLECTIBLE
// =====================================


export function spawnSingleCollectible(

position:Vector3

)

{


let item=getRandomItemAdvanced();





let entity=createItemCube(

position,

item

);





attachPickup(

entity,

item

);





activeCollectibles.push(entity);





applyItemEffect(

entity,

item

);





return entity;



}







// =====================================
// GIVE SPECIFIC ITEM DEBUG
// =====================================


export function giveItem(

name:string

)

{


let item = collectibleItems.find(

(x)=>

x.name==name

);





if(!item)

{


console.log(

"ITEM NOT FOUND: "

+

name

);



return;



}





collectedItems.push(item);



totalValue += item.value;






addItemToInventory(

{


name:item.name,


rarity:item.rarity,


amount:1,


sellPrice:item.value


}


);






console.log(

"GIVEN ITEM: "

+

item.name

);



}







// =====================================
// FIND ITEM DATABASE
// =====================================


export function getItemDatabase()

{


return collectibleItems;



}







// =====================================
// START COLLECTIBLE SYSTEM
// =====================================


let systemStarted=false;






export function startCollectibleSystem()

{


if(systemStarted)

{

return;

}





systemStarted=true;





console.log(

"=============================="

);


console.log(

"DUNGEON COLLECTIBLE SYSTEM ONLINE"

);


console.log(

"ITEM DATABASE: "

+

collectibleItems.length

);


console.log(

"=============================="

);



}








// =====================================
// COMPLETE SYSTEM RESET
// =====================================


export function resetCollectibleSystem()

{


clearCollectibles();



collectedItems=[];



totalValue=0;





systemStarted=false;






console.log(

"COLLECTIBLE SYSTEM RESET"

);



}








// =====================================
// INITIAL TEST
// =====================================


export function testCollectibleSystem()

{


console.log(

"=============================="

);


console.log(

"COLLECTIBLE TEST"

);


console.log(

"Items Database: "

+

collectibleItems.length

);



console.log(

"Collected: "

+

collectedItems.length

);



console.log(

"World Items: "

+

activeCollectibles.length

);



console.log(

"=============================="

);



}





// =====================================
// END OF DUNGEON COLLECTABLES SYSTEM
// =====================================