import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { Player } from "./Yuu API/Player";
import { Events } from "./Yuu API/Events";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";



// =====================================
// INVENTORY STORAGE
// =====================================


export let collectedItems:any[] = [];

export let totalValue:number = 0;



// =====================================
// ITEM DATA TYPE
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
// 120 UNIQUE ITEMS
// =====================================


export const collectibleItems:CollectibleItem[] = [


// COMMON ITEMS


{
name:"Ancient Bronze Coin",
rarity:"Common",
value:10,
color:new Color(1,.7,.1)
},


{
name:"Rusty Key",
rarity:"Common",
value:15,
color:new Color(.5,.4,.2)
},


{
name:"Broken Sword",
rarity:"Common",
value:20,
color:new Color(.4,.4,.4)
},


{
name:"Old Dungeon Map",
rarity:"Common",
value:25,
color:new Color(.7,.5,.2)
},


{
name:"Small Healing Potion",
rarity:"Common",
value:30,
color:new Color(.1,1,.1)
},


{
name:"Torch Oil",
rarity:"Common",
value:12,
color:new Color(1,.5,.1)
},


{
name:"Iron Scrap",
rarity:"Common",
value:18,
color:new Color(.3,.3,.3)
},


{
name:"Leather Strip",
rarity:"Common",
value:8,
color:new Color(.4,.2,.1)
},


{
name:"Old Helmet",
rarity:"Common",
value:35,
color:new Color(.5,.5,.5)
},


{
name:"Dungeon Bread",
rarity:"Common",
value:5,
color:new Color(.8,.6,.3)
},



// UNCOMMON


{
name:"Silver Coin Pouch",
rarity:"Uncommon",
value:75,
color:new Color(.8,.8,.8)
},


{
name:"Magic Herb",
rarity:"Uncommon",
value:90,
color:new Color(.2,1,.2)
},


{
name:"Crystal Fragment",
rarity:"Uncommon",
value:100,
color:new Color(.2,.8,1)
},


{
name:"Ancient Scroll",
rarity:"Uncommon",
value:120,
color:new Color(1,.9,.5)
},


{
name:"Warrior Badge",
rarity:"Uncommon",
value:150,
color:new Color(.8,.2,.1)
},


{
name:"Machine Gear",
rarity:"Uncommon",
value:110,
color:new Color(.5,.5,.6)
},


{
name:"Power Cell",
rarity:"Uncommon",
value:130,
color:new Color(.1,.8,1)
},


{
name:"Bone Charm",
rarity:"Uncommon",
value:140,
color:new Color(.8,.8,.7)
},


{
name:"Lost Ring",
rarity:"Uncommon",
value:160,
color:new Color(1,.8,.2)
},


{
name:"Explorer Badge",
rarity:"Uncommon",
value:125,
color:new Color(.2,.6,1)
},



// MORE ITEMS CONTINUE PART 2

{
name:"Golden Goblet",
rarity:"Rare",
value:250,
color:new Color(1,.65,.05)
},


{
name:"Dragon Scale",
rarity:"Rare",
value:300,
color:new Color(.8,.2,.05)
},


{
name:"Shadow Crystal",
rarity:"Rare",
value:350,
color:new Color(.3,.05,.8)
},


{
name:"Ancient Gear Core",
rarity:"Rare",
value:400,
color:new Color(.5,.7,1)
},


{
name:"Royal Seal",
rarity:"Rare",
value:450,
color:new Color(1,.8,.2)
},


{
name:"Demon Horn",
rarity:"Rare",
value:375,
color:new Color(.4,.1,.05)
},


{
name:"Frozen Gem",
rarity:"Rare",
value:330,
color:new Color(.2,.8,1)
},


{
name:"Fire Ruby",
rarity:"Rare",
value:360,
color:new Color(1,.1,.05)
},


{
name:"Ancient Machine Part",
rarity:"Rare",
value:420,
color:new Color(.4,.5,.6)
},


{
name:"Lost Knight Badge",
rarity:"Rare",
value:280,
color:new Color(.8,.8,.9)
},



// EPIC ITEMS


{
name:"Phoenix Feather",
rarity:"Epic",
value:700,
color:new Color(1,.3,.05)
},


{
name:"Void Crystal",
rarity:"Epic",
value:900,
color:new Color(.2,0,1)
},


{
name:"Titanium Core",
rarity:"Epic",
value:850,
color:new Color(.4,.8,1)
},


{
name:"Ancient Power Stone",
rarity:"Epic",
value:1000,
color:new Color(1,.9,.1)
},


{
name:"Cyber Reactor",
rarity:"Epic",
value:1200,
color:new Color(.1,1,1)
},


{
name:"Shadow Blade Fragment",
rarity:"Epic",
value:950,
color:new Color(.1,.05,.2)
},


{
name:"Dragon Eye",
rarity:"Epic",
value:1500,
color:new Color(1,.2,.2)
},


{
name:"Lost Wizard Orb",
rarity:"Epic",
value:1100,
color:new Color(.5,.1,1)
},


{
name:"Ancient AI Chip",
rarity:"Epic",
value:1300,
color:new Color(.1,.7,1)
},


{
name:"Royal Energy Core",
rarity:"Epic",
value:1400,
color:new Color(1,.7,.1)
},



// LEGENDARY ITEMS


{
name:"Crown of the Forgotten King",
rarity:"Legendary",
value:5000,
color:new Color(1,.85,0)
},


{
name:"Sword of the Dungeon Lord",
rarity:"Legendary",
value:6000,
color:new Color(.8,.8,1)
},


{
name:"Ancient Dragon Heart",
rarity:"Legendary",
value:7500,
color:new Color(1,.1,.05)
},


{
name:"Galaxy Core",
rarity:"Legendary",
value:9000,
color:new Color(.2,.3,1)
},


{
name:"Time Machine Fragment",
rarity:"Legendary",
value:10000,
color:new Color(.1,1,.8)
},


{
name:"Void Portal Key",
rarity:"Legendary",
value:12000,
color:new Color(.4,0,1)
},


{
name:"Master Dungeon Key",
rarity:"Legendary",
value:15000,
color:new Color(1,.9,.2)
},


{
name:"Ancient Civilization Chip",
rarity:"Legendary",
value:13000,
color:new Color(.5,1,.5)
},


{
name:"Immortal Stone",
rarity:"Legendary",
value:20000,
color:new Color(1,1,1)
},


{
name:"The Final Relic",
rarity:"Legendary",
value:50000,
color:new Color(1,.2,.8)
}



];





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
// CREATE ITEM OBJECT
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
// RANDOM ITEM SELECTOR
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



// CONTINUE PART 3...


// =====================================
// REGISTER FLOATING ANIMATION
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
// SPAWN LOOSE ITEMS
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

"SPAWNING 120+ DUNGEON COLLECTIBLES"

);


console.log(

"=============================="

);



let amount = 120;



let offsetX =

-(mazeWidth * blockSize)/2;



let offsetZ =

-(mazeHeight * blockSize)/2;



let spawned = 0;




while(spawned < amount)

{


let x = Math.floor(

Math.random()*mazeWidth

);



let z = Math.floor(

Math.random()*mazeHeight

);





if(maze[x][z] != 0)

{

continue;

}





// keep spawn room safe

if(

(x==1 && z==1) ||

(x==2 && z==1) ||

(x==1 && z==2)

)

{

continue;

}




let worldX =

(x*blockSize)+offsetX;



let worldZ =

(z*blockSize)+offsetZ;





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

"Placed item: "

+

item.name

+

" | "

+

item.rarity

);



}




console.log(

"TOTAL WORLD ITEMS: "

+

spawned

);


}







// =====================================
// ITEM PICKUP SYSTEM
// CLICK / TOUCH / GRAB
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

(payload)=>{


if(collected)

{

return;

}




let playerDistance =

Player.position.distanceTo(

entity.pos

);





if(playerDistance < 4)

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

"================================"

);


console.log(

" ITEM FOUND "

);


console.log(

" NAME: "

+

item.name

);


console.log(

" RARITY: "

+

item.rarity

);


console.log(

" VALUE: "

+

item.value

);


console.log(

"================================"

);





collectedItems.push(item);





entity.destroy();





}







// =====================================
// INVENTORY DISPLAY
// =====================================


export function showInventory()

{


console.log(

"========== PLAYER INVENTORY =========="

);



let totalValue=0;




if(collectedItems.length==0)

{

console.log(

"EMPTY"

);

return;

}





for(let item of collectedItems)

{


console.log(

item.name

+

" ["

+

item.rarity

+

"]"

);



totalValue += item.value;


}





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

"======================================"

);



}








// =====================================
// ITEM FLOAT + ROTATION EFFECT
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



});






// =====================================
// RESET WORLD ITEMS
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

"All loose collectibles removed"

);



}







// =====================================
// CHEST ITEM REWARD SYSTEM
// =====================================


export function openChestReward()

{


let rewardCount =

3 + Math.floor(Math.random()*5);



console.log(

"=============================="

);


console.log(

"CHEST OPENED"

);


console.log(

"ITEMS INSIDE: "

+

rewardCount

);


console.log(

"=============================="

);





for(let i=0;i<rewardCount;i++)

{


let item=getRandomItem();



collectedItems.push(item);





console.log(

"CHEST ITEM: "

+

item.name

+

" | "

+

item.rarity

);



}




}


// =====================================
// RARITY SYSTEM
// =====================================


function getRarityMultiplier(

rarity:string

)

{


if(rarity=="Common")

{

return 1;

}



if(rarity=="Uncommon")

{

return 2;

}



if(rarity=="Rare")

{

return 5;

}



if(rarity=="Epic")

{

return 10;

}



if(rarity=="Legendary")

{

return 25;

}




return 1;


}








// =====================================
// ADVANCED RANDOM ITEM PICK
// =====================================


function getRandomItemAdvanced()

:CollectibleItem

{


let roll=Math.random();



let pool:CollectibleItem[]=[];



for(let item of collectibleItems)

{


let chance=1;



if(item.rarity=="Common")

{

chance=.60;

}



if(item.rarity=="Uncommon")

{

chance=.25;

}



if(item.rarity=="Rare")

{

chance=.10;

}



if(item.rarity=="Epic")

{

chance=.04;

}



if(item.rarity=="Legendary")

{

chance=.01;

}





if(Math.random()<chance)

{

pool.push(item);

}



}




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
// ITEM COUNTER
// =====================================


export function countItem(

name:string

)

{


let amount=0;



for(let item of collectedItems)

{


if(item.name==name)

{

amount++;

}


}



return amount;


}








// =====================================
// FULL INVENTORY REPORT
// =====================================


export function detailedInventory()

{


console.log(

"================================"

);


console.log(

" DUNGEON TREASURE REPORT "

);


console.log(

"================================"

);




let total=0;




let itemMap:any={};




for(let item of collectedItems)

{


total += item.value;



if(!itemMap[item.name])

{

itemMap[item.name]=0;

}



itemMap[item.name]++;


}





for(let key in itemMap)

{


console.log(

key

+

" x"

+

itemMap[key]

);


}





console.log(

"--------------------------------"

);



console.log(

"ITEMS FOUND: "

+

collectedItems.length

);



console.log(

"TOTAL GOLD VALUE: "

+

total

);



console.log(

"================================"

);



}









// =====================================
// RARE ITEM GLOW
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

0.6,

0.6,

0.6

);



console.log(

"Epic item spawned"

);



}




if(item.rarity=="Legendary")

{


entity.scale = new Vector3(

0.75,

0.75,

0.75

);



console.log(

"!!! LEGENDARY ITEM SPAWNED !!!"

);



}



}









// =====================================
// ITEM COLLECTION EFFECT
// =====================================


function collectionMessage(

item:CollectibleItem

)

{


if(item.rarity=="Legendary")

{


console.log(

"***********************"

);


console.log(

" LEGENDARY FIND!!! "

);


console.log(

item.name

);


console.log(

"***********************"

);


}

else

{


console.log(

"Collected "

+

item.name

+

"!"

);


}



}









// =====================================
// IMPROVED COLLECT FUNCTION
// =====================================


export function collectAdvancedItem(

entity:Entity,

item:CollectibleItem

)

{


collectedItems.push(item);



collectionMessage(item);



console.log(

"Value +"

+

item.value

);



entity.destroy();



}









// =====================================
// DEBUG GIVE ITEMS
// =====================================


export function giveTestItems()

{


console.log(

"Giving test treasure..."

);



for(let i=0;i<10;i++)

{


let item=getRandomItemAdvanced();



collectedItems.push(item);



console.log(

"Added "

+

item.name

);



}



}









// =====================================
// CHEST LOOT GENERATOR
// =====================================


export function generateChestLoot()

:CollectibleItem[]

{


let loot:CollectibleItem[]=[];



let amount=

3+

Math.floor(

Math.random()*7

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
// DISPLAY CHEST CONTENTS
// =====================================


export function showChestLoot()

{


let loot=

generateChestLoot();



console.log(

"============================"

);



console.log(

" CHEST CONTENTS "

);



for(let item of loot)

{


console.log(

item.name

+

" "

+

item.rarity

+

" VALUE "

+

item.value

);



}




console.log(

"============================"

);



}


// =====================================
// RARE ITEMS
// =====================================


{

name:"Ruby Dungeon Gem",

rarity:"Rare",

value:250,

color:new Color(1,0.05,0.05)

},


{

name:"Sapphire Crystal",

rarity:"Rare",

value:275,

color:new Color(0.05,0.2,1)

},


{

name:"Emerald Relic",

rarity:"Rare",

value:300,

color:new Color(0.05,1,0.2)

},


{

name:"Golden Ancient Idol",

rarity:"Rare",

value:350,

color:new Color(1,0.8,0.1)

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

color:new Color(0.2,0.05,0.5)

},


{

name:"Frozen Heart",

rarity:"Rare",

value:425,

color:new Color(0.3,0.8,1)

},


{

name:"Demon Horn",

rarity:"Rare",

value:500,

color:new Color(0.4,0.1,0.05)

},


{

name:"Ancient Warrior Medal",

rarity:"Rare",

value:325,

color:new Color(0.7,0.7,0.4)

},


{

name:"Lost King's Crown",

rarity:"Rare",

value:600,

color:new Color(1,0.9,0.2)

},







// =====================================
// EPIC ITEMS
// =====================================


{

name:"Void Blade Fragment",

rarity:"Epic",

value:900,

color:new Color(0.3,0,1)

},


{

name:"Phoenix Feather",

rarity:"Epic",

value:850,

color:new Color(1,0.4,0.05)

},


{

name:"Titan Core",

rarity:"Epic",

value:1000,

color:new Color(0.5,0.5,0.6)

},


{

name:"Cyber Reactor",

rarity:"Epic",

value:1200,

color:new Color(0,1,1)

},


{

name:"Ancient Machine Brain",

rarity:"Epic",

value:1300,

color:new Color(0.8,0.8,0.9)

},


{

name:"Crystal Power Matrix",

rarity:"Epic",

value:1500,

color:new Color(0.4,1,0.8)

},


{

name:"Demon Energy Core",

rarity:"Epic",

value:1700,

color:new Color(1,0,0.2)

},


{

name:"Quantum Gear",

rarity:"Epic",

value:1400,

color:new Color(0.2,0.7,1)

},


{

name:"Alien Technology Chip",

rarity:"Epic",

value:1600,

color:new Color(0.1,1,0.6)

},


{

name:"Royal Wizard Staff",

rarity:"Epic",

value:1800,

color:new Color(0.8,0.2,1)

},







// =====================================
// LEGENDARY ITEMS
// =====================================


{

name:"Sword of the Forgotten Hero",

rarity:"Legendary",

value:5000,

color:new Color(1,0.85,0)

},


{

name:"Dragon Eye Artifact",

rarity:"Legendary",

value:6000,

color:new Color(1,0.2,0.05)

},


{

name:"The Golden Skull",

rarity:"Legendary",

value:7500,

color:new Color(1,0.9,0.4)

},


{

name:"Ancient Alien Core",

rarity:"Legendary",

value:9000,

color:new Color(0,1,1)

},


{

name:"Time Crystal",

rarity:"Legendary",

value:10000,

color:new Color(0.7,0.2,1)

},


{

name:"Soul Collector Gem",

rarity:"Legendary",

value:11000,

color:new Color(0.1,0,0.3)

},


{

name:"God Machine Component",

rarity:"Legendary",

value:15000,

color:new Color(0.8,0.8,1)

},


{

name:"Lost Civilization Key",

rarity:"Legendary",

value:12500,

color:new Color(1,0.6,0.1)

},


{

name:"Infinity Power Cell",

rarity:"Legendary",

value:20000,

color:new Color(0,1,0.8)

},


{

name:"Dungeon Master Relic",

rarity:"Legendary",

value:25000,

color:new Color(1,1,1)

},

// =====================================
// CURSED ITEMS
// =====================================


{

name:"Cursed Bone Necklace",

rarity:"Cursed",

value:650,

color:new Color(0.4,0.1,0.2)

},


{

name:"Haunted Doll",

rarity:"Cursed",

value:700,

color:new Color(0.2,0.05,0.05)

},


{

name:"Blood Crystal",

rarity:"Cursed",

value:900,

color:new Color(0.8,0,0)

},


{

name:"Shadow Orb",

rarity:"Cursed",

value:1200,

color:new Color(0.05,0,0.1)

},


{

name:"Demon Contract",

rarity:"Cursed",

value:1500,

color:new Color(0.3,0,0)

},


{

name:"Forbidden Spell Book",

rarity:"Cursed",

value:1800,

color:new Color(0.2,0.1,0.4)

},


{

name:"Ghost Lantern",

rarity:"Cursed",

value:2200,

color:new Color(0.4,0.8,1)

},


{

name:"Dead King's Ring",

rarity:"Cursed",

value:2500,

color:new Color(0.6,0.5,0.1)

},


{

name:"Corrupted Crystal",

rarity:"Cursed",

value:3000,

color:new Color(0.5,0,0.8)

},


{

name:"Soul Prison",

rarity:"Cursed",

value:3500,

color:new Color(0.1,0.1,0.1)

},







// =====================================
// MACHINE / STEAM DUNGEON ITEMS
// =====================================


{

name:"Rusty Gear",

rarity:"Mechanical",

value:100,

color:new Color(.35,.35,.35)

},


{

name:"Copper Valve",

rarity:"Mechanical",

value:150,

color:new Color(.8,.45,.15)

},


{

name:"Steam Pressure Gauge",

rarity:"Mechanical",

value:250,

color:new Color(.7,.7,.7)

},


{

name:"Broken Robot Arm",

rarity:"Mechanical",

value:400,

color:new Color(.4,.5,.6)

},


{

name:"Ancient Circuit Board",

rarity:"Mechanical",

value:650,

color:new Color(0,.8,.4)

},


{

name:"Power Generator Coil",

rarity:"Mechanical",

value:800,

color:new Color(1,.7,.1)

},


{

name:"Mini Reactor",

rarity:"Mechanical",

value:1200,

color:new Color(0,1,1)

},


{

name:"Mechanical Heart",

rarity:"Mechanical",

value:2000,

color:new Color(.8,.2,.2)

},


{

name:"Clockwork Brain",

rarity:"Mechanical",

value:3000,

color:new Color(.5,.7,1)

},


{

name:"Ancient War Machine Core",

rarity:"Mechanical",

value:5000,

color:new Color(1,.5,0)

},







// =====================================
// QUEST ITEMS
// =====================================


{

name:"Lost Explorer Journal",

rarity:"Quest",

value:300,

color:new Color(.7,.5,.3)

},


{

name:"Royal Seal",

rarity:"Quest",

value:900,

color:new Color(1,.8,.2)

},


{

name:"Dungeon Gate Key",

rarity:"Quest",

value:1000,

color:new Color(.6,.6,.6)

},


{

name:"Crystal Temple Key",

rarity:"Quest",

value:1500,

color:new Color(.2,.8,1)

},


{

name:"Ancient Map Fragment",

rarity:"Quest",

value:500,

color:new Color(.8,.7,.4)

},


{

name:"Wizard Tower Pass",

rarity:"Quest",

value:1200,

color:new Color(.5,.1,1)

},


{

name:"Dragon Tomb Key",

rarity:"Quest",

value:2500,

color:new Color(1,.2,.1)

},


{

name:"Lost Civilization Tablet",

rarity:"Quest",

value:4000,

color:new Color(.6,.4,.2)

},


{

name:"Portal Activation Crystal",

rarity:"Quest",

value:6000,

color:new Color(.2,1,.8)

},


{

name:"Final Dungeon Artifact",

rarity:"Quest",

value:10000,

color:new Color(1,1,.5)

},







// =====================================
// TROPHIES
// =====================================


{

name:"Goblin Trophy",

rarity:"Trophy",

value:250,

color:new Color(.2,.8,.2)

},


{

name:"Skeleton Skull",

rarity:"Trophy",

value:350,

color:new Color(.9,.9,.8)

},


{

name:"Orc War Banner",

rarity:"Trophy",

value:600,

color:new Color(.1,.5,.1)

},


{

name:"Demon Horn Trophy",

rarity:"Trophy",

value:1000,

color:new Color(.8,.1,.05)

},


{

name:"Cyber Demon Chip",

rarity:"Trophy",

value:2000,

color:new Color(.1,.5,1)

},


{

name:"Ancient Knight Helmet",

rarity:"Trophy",

value:3000,

color:new Color(.7,.7,.7)

},


{

name:"Shadow Beast Claw",

rarity:"Trophy",

value:4000,

color:new Color(.1,.05,.2)

},


{

name:"Dungeon Champion Medal",

rarity:"Trophy",

value:5000,

color:new Color(1,.8,.1)

},


{

name:"Monster Hunter Badge",

rarity:"Trophy",

value:7000,

color:new Color(.8,.3,.1)

},


{

name:"Ultimate Dungeon Trophy",

rarity:"Trophy",

value:15000,

color:new Color(1,1,1)

}
