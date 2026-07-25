import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { Events } from "./Yuu API/Events";
import { Player } from "./Yuu API/Player";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";





// =====================================
// COLLECTABLE STORAGE
// =====================================


export let collectibles:Entity[]=[];


export let collectedItems:string[]=[];


let totalCollected=0;






// =====================================
// ITEM DATA
// =====================================


interface ItemData

{

name:string;

rarity:string;

value:number;

color:Color;

}







// =====================================
// 120 UNIQUE ITEMS
// =====================================


const itemDatabase:ItemData[] = [





// =====================================
// WEAPONS 1-20
// =====================================


{
name:"Rust Sword",
rarity:"Common",
value:10,
color:new Color(.5,.3,.2)
},


{
name:"Iron Blade",
rarity:"Common",
value:20,
color:new Color(.6,.6,.6)
},


{
name:"Crystal Dagger",
rarity:"Rare",
value:80,
color:new Color(.1,.8,1)
},


{
name:"Demon Axe",
rarity:"Epic",
value:200,
color:new Color(1,.1,.05)
},


{
name:"Void Hammer",
rarity:"Legendary",
value:500,
color:new Color(.3,.1,.6)
},


{
name:"Plasma Sword",
rarity:"Legendary",
value:600,
color:new Color(0,1,1)
},


{
name:"Shadow Knife",
rarity:"Rare",
value:120,
color:new Color(.1,.1,.15)
},


{
name:"Bone Spear",
rarity:"Uncommon",
value:50,
color:new Color(.8,.8,.6)
},


{
name:"Golden Mace",
rarity:"Epic",
value:300,
color:new Color(1,.8,.1)
},


{
name:"Dragon Fang",
rarity:"Legendary",
value:900,
color:new Color(1,.2,.1)
},


{
name:"Steel Hammer",
rarity:"Common",
value:30,
color:new Color(.4,.4,.4)
},


{
name:"War Axe",
rarity:"Uncommon",
value:60,
color:new Color(.7,.2,.1)
},


{
name:"Laser Rifle",
rarity:"Legendary",
value:1000,
color:new Color(.1,.9,1)
},


{
name:"Energy Blade",
rarity:"Epic",
value:400,
color:new Color(.4,1,.5)
},


{
name:"Ancient Spear",
rarity:"Rare",
value:150,
color:new Color(.8,.5,.2)
},


{
name:"Shadow Sword",
rarity:"Epic",
value:350,
color:new Color(.2,.05,.3)
},


{
name:"Knight Sword",
rarity:"Uncommon",
value:70,
color:new Color(.7,.7,.8)
},


{
name:"Orc Cleaver",
rarity:"Rare",
value:130,
color:new Color(.2,.7,.2)
},


{
name:"Cyber Blade",
rarity:"Legendary",
value:800,
color:new Color(.1,.5,1)
},


{
name:"Forgotten Blade",
rarity:"Mythic",
value:1500,
color:new Color(1,.1,.8)
},






// =====================================
// ARMOR 21-40
// =====================================


{
name:"Iron Helmet",
rarity:"Common",
value:25,
color:new Color(.4,.4,.45)
},


{
name:"Steel Chestplate",
rarity:"Uncommon",
value:75,
color:new Color(.5,.5,.6)
},


{
name:"Dragon Armor",
rarity:"Legendary",
value:1200,
color:new Color(1,.3,.05)
},


{
name:"Shadow Cloak",
rarity:"Epic",
value:300,
color:new Color(.1,.05,.2)
},


{
name:"Cyber Armor",
rarity:"Legendary",
value:900,
color:new Color(.1,.5,1)
},


{
name:"Bone Armor",
rarity:"Rare",
value:200,
color:new Color(.8,.8,.7)
},


{
name:"Knight Shield",
rarity:"Uncommon",
value:80,
color:new Color(.7,.7,.7)
},


{
name:"Demon Plate",
rarity:"Epic",
value:450,
color:new Color(.8,.05,.05)
},


{
name:"Crystal Armor",
rarity:"Legendary",
value:1000,
color:new Color(.2,.9,1)
},


{
name:"Ancient Robe",
rarity:"Rare",
value:250,
color:new Color(.5,.1,.8)
},


{
name:"Hunter Boots",
rarity:"Common",
value:20,
color:new Color(.3,.2,.1)
},


{
name:"Titan Gloves",
rarity:"Epic",
value:350,
color:new Color(.6,.5,.4)
},


{
name:"Void Helmet",
rarity:"Mythic",
value:1300,
color:new Color(.1,.01,.2)
},


{
name:"Fire Armor",
rarity:"Epic",
value:500,
color:new Color(1,.2,.05)
},


{
name:"Ice Armor",
rarity:"Rare",
value:250,
color:new Color(.2,.8,1)
},


{
name:"Royal Crown",
rarity:"Legendary",
value:1500,
color:new Color(1,.8,.1)
},


{
name:"Lost Soldier Armor",
rarity:"Rare",
value:300,
color:new Color(.4,.5,.4)
},


{
name:"Robot Shell",
rarity:"Epic",
value:600,
color:new Color(.3,.7,.8)
},


{
name:"Dark Knight Armor",
rarity:"Legendary",
value:1000,
color:new Color(.05,.05,.05)
},


{
name:"Ancient Guardian Suit",
rarity:"Mythic",
value:2000,
color:new Color(1,.5,.2)
},



];


// =====================================
// GEMS + CRYSTALS 41-60
// =====================================


{
name:"Blood Ruby",
rarity:"Rare",
value:150,
color:new Color(1,0.05,0.05)
},


{
name:"Blue Sapphire",
rarity:"Rare",
value:140,
color:new Color(0.05,0.3,1)
},


{
name:"Emerald Shard",
rarity:"Rare",
value:160,
color:new Color(0.1,1,0.2)
},


{
name:"Void Crystal",
rarity:"Legendary",
value:700,
color:new Color(0.3,0.05,0.8)
},


{
name:"Star Diamond",
rarity:"Mythic",
value:2000,
color:new Color(0.9,0.9,1)
},


{
name:"Fire Gem",
rarity:"Epic",
value:400,
color:new Color(1,0.2,0.05)
},


{
name:"Ice Crystal",
rarity:"Rare",
value:220,
color:new Color(0.2,0.8,1)
},


{
name:"Thunder Stone",
rarity:"Epic",
value:500,
color:new Color(1,1,0.1)
},


{
name:"Dark Obsidian",
rarity:"Uncommon",
value:90,
color:new Color(0.05,0.05,0.08)
},


{
name:"Moon Crystal",
rarity:"Legendary",
value:900,
color:new Color(0.6,0.6,1)
},


{
name:"Sun Fragment",
rarity:"Legendary",
value:950,
color:new Color(1,0.8,0.1)
},


{
name:"Green Prism",
rarity:"Rare",
value:180,
color:new Color(0.1,1,0.5)
},


{
name:"Ancient Crystal",
rarity:"Mythic",
value:2500,
color:new Color(0.8,0.2,1)
},


{
name:"Poison Gem",
rarity:"Epic",
value:350,
color:new Color(0.3,1,0.1)
},


{
name:"Frozen Diamond",
rarity:"Legendary",
value:1200,
color:new Color(0.5,0.9,1)
},


{
name:"Soul Crystal",
rarity:"Mythic",
value:3000,
color:new Color(0.8,0.1,1)
},


{
name:"Chaos Stone",
rarity:"Legendary",
value:1500,
color:new Color(1,0.1,0.6)
},


{
name:"Earth Core",
rarity:"Rare",
value:300,
color:new Color(0.5,0.3,0.1)
},


{
name:"Ocean Pearl",
rarity:"Rare",
value:200,
color:new Color(0.1,0.7,1)
},


{
name:"Galaxy Crystal",
rarity:"Mythic",
value:5000,
color:new Color(0.5,0.2,1)
},







// =====================================
// DUNGEON RELICS 61-80
// =====================================


{
name:"Ancient Coin",
rarity:"Common",
value:25,
color:new Color(1,0.7,0.1)
},


{
name:"Lost Crown",
rarity:"Legendary",
value:1500,
color:new Color(1,0.8,0.1)
},


{
name:"Broken Idol",
rarity:"Rare",
value:250,
color:new Color(0.4,0.3,0.2)
},


{
name:"Pharaoh Mask",
rarity:"Epic",
value:700,
color:new Color(0.9,0.5,0.1)
},


{
name:"Old Map Fragment",
rarity:"Uncommon",
value:50,
color:new Color(0.8,0.7,0.5)
},


{
name:"Dungeon Key",
rarity:"Rare",
value:120,
color:new Color(0.7,0.7,0.2)
},


{
name:"Golden Skull",
rarity:"Legendary",
value:1200,
color:new Color(1,0.8,0.2)
},


{
name:"Dragon Statue",
rarity:"Epic",
value:900,
color:new Color(0.8,0.2,0.05)
},


{
name:"Ancient Scroll",
rarity:"Rare",
value:300,
color:new Color(0.9,0.8,0.5)
},


{
name:"Wizard Book",
rarity:"Epic",
value:600,
color:new Color(0.4,0.1,0.8)
},


{
name:"Forgotten Diary",
rarity:"Common",
value:20,
color:new Color(0.4,0.2,0.1)
},


{
name:"Crystal Skull",
rarity:"Legendary",
value:1800,
color:new Color(0.4,0.9,1)
},


{
name:"Royal Ring",
rarity:"Epic",
value:750,
color:new Color(1,0.8,0.1)
},


{
name:"Ancient Compass",
rarity:"Rare",
value:250,
color:new Color(0.3,0.5,0.8)
},


{
name:"Cursed Mirror",
rarity:"Legendary",
value:1000,
color:new Color(0.1,0.1,0.2)
},


{
name:"Hero Medal",
rarity:"Rare",
value:400,
color:new Color(1,0.6,0.1)
},


{
name:"Goblin Treasure Bag",
rarity:"Uncommon",
value:80,
color:new Color(0.2,0.8,0.2)
},


{
name:"Ancient Bell",
rarity:"Rare",
value:350,
color:new Color(0.8,0.7,0.3)
},


{
name:"Shadow Relic",
rarity:"Epic",
value:800,
color:new Color(0.1,0.05,0.3)
},


{
name:"Dungeon Heart",
rarity:"Mythic",
value:5000,
color:new Color(1,0.05,0.2)
},


// =====================================
// TECHNOLOGY ITEMS 81-100
// =====================================


{
name:"Broken Robot Core",
rarity:"Rare",
value:300,
color:new Color(.2,.6,.8)
},


{
name:"Power Cell",
rarity:"Uncommon",
value:100,
color:new Color(1,.9,.1)
},


{
name:"Cyber Chip",
rarity:"Rare",
value:250,
color:new Color(.1,1,1)
},


{
name:"AI Memory Drive",
rarity:"Legendary",
value:900,
color:new Color(.3,.5,1)
},


{
name:"Laser Module",
rarity:"Epic",
value:600,
color:new Color(1,.2,.2)
},


{
name:"Robot Eye",
rarity:"Rare",
value:220,
color:new Color(.8,.1,1)
},


{
name:"Quantum Battery",
rarity:"Mythic",
value:2500,
color:new Color(.1,1,.8)
},


{
name:"Nano Processor",
rarity:"Legendary",
value:1200,
color:new Color(.5,.8,1)
},


{
name:"Plasma Core",
rarity:"Epic",
value:700,
color:new Color(0,.8,1)
},


{
name:"Mechanical Gear",
rarity:"Common",
value:30,
color:new Color(.5,.4,.3)
},


{
name:"Ancient Machine Part",
rarity:"Rare",
value:350,
color:new Color(.6,.5,.2)
},


{
name:"Security Keycard",
rarity:"Uncommon",
value:80,
color:new Color(.2,.8,.8)
},


{
name:"Hologram Projector",
rarity:"Epic",
value:800,
color:new Color(.8,.2,1)
},


{
name:"Cyber Battery",
rarity:"Rare",
value:300,
color:new Color(.1,.9,.2)
},


{
name:"Robot Arm",
rarity:"Rare",
value:400,
color:new Color(.4,.4,.5)
},


{
name:"Titan Circuit",
rarity:"Legendary",
value:1500,
color:new Color(.8,.8,.1)
},


{
name:"Alien Device",
rarity:"Mythic",
value:3000,
color:new Color(.5,1,.5)
},


{
name:"Warp Crystal",
rarity:"Legendary",
value:2000,
color:new Color(.5,.1,1)
},


{
name:"Energy Injector",
rarity:"Epic",
value:650,
color:new Color(1,.3,.6)
},


{
name:"Unknown Machine",
rarity:"Mythic",
value:5000,
color:new Color(.1,.1,.1)
},







// =====================================
// MAGIC ITEMS 101-120
// =====================================


{
name:"Fire Wand",
rarity:"Rare",
value:300,
color:new Color(1,.2,.05)
},


{
name:"Ice Wand",
rarity:"Rare",
value:300,
color:new Color(.2,.8,1)
},


{
name:"Lightning Staff",
rarity:"Epic",
value:700,
color:new Color(1,1,.1)
},


{
name:"Shadow Orb",
rarity:"Epic",
value:800,
color:new Color(.1,.05,.2)
},


{
name:"Healing Potion",
rarity:"Common",
value:25,
color:new Color(.2,1,.2)
},


{
name:"Mana Potion",
rarity:"Common",
value:25,
color:new Color(.2,.3,1)
},


{
name:"Phoenix Feather",
rarity:"Legendary",
value:2000,
color:new Color(1,.5,.1)
},


{
name:"Dragon Egg",
rarity:"Mythic",
value:5000,
color:new Color(1,.2,.1)
},


{
name:"Wizard Crystal",
rarity:"Epic",
value:900,
color:new Color(.7,.2,1)
},


{
name:"Magic Rune",
rarity:"Rare",
value:450,
color:new Color(.2,1,.8)
},


{
name:"Teleport Stone",
rarity:"Legendary",
value:1800,
color:new Color(.4,.8,1)
},


{
name:"Time Fragment",
rarity:"Mythic",
value:4000,
color:new Color(1,.8,.4)
},


{
name:"Gravity Orb",
rarity:"Legendary",
value:2500,
color:new Color(.1,.1,1)
},


{
name:"Necromancer Skull",
rarity:"Epic",
value:1000,
color:new Color(.2,.1,.3)
},


{
name:"Soul Bottle",
rarity:"Rare",
value:500,
color:new Color(.6,.1,1)
},


{
name:"Magic Mirror",
rarity:"Legendary",
value:2200,
color:new Color(.5,.5,1)
},


{
name:"Enchanted Ring",
rarity:"Epic",
value:800,
color:new Color(1,.7,.1)
},


{
name:"Moon Staff",
rarity:"Legendary",
value:3000,
color:new Color(.6,.6,1)
},


{
name:"Ancient Spell Book",
rarity:"Mythic",
value:6000,
color:new Color(.8,.1,.8)
},


{
name:"Dungeon Master Relic",
rarity:"???",
value:10000,
color:new Color(1,0,0)
},



];


import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { Events } from "./Yuu API/Events";
import { Player } from "./Yuu API/Player";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";





// =====================================
// ACTIVE COLLECTABLE STORAGE
// =====================================


let activeItems:Entity[] = [];

let collectedItems:string[] = [];

let floatTimer = 0;





// =====================================
// SPAWN COLLECTABLES
// CALLED FROM DUNGEON
// =====================================


export function spawnDungeonCollectibles(

maze:number[][],

width:number,

height:number,

blockSize:number

)

{


console.log(

"Generating dungeon collectibles..."

);



let amount = 120;



for(let i=0;i<amount;i++)

{


let x;

let z;



// find open floor


do

{


x=Math.floor(Math.random()*width);

z=Math.floor(Math.random()*height);


}

while(

maze[x][z]!==0

);





let worldX =

(x*blockSize)

-

(width*blockSize)/2;



let worldZ =

(z*blockSize)

-

(height*blockSize)/2;




spawnItem(

worldX,

worldZ

);



}



console.log(

"120 collectible objects placed"

);



}








// =====================================
// CREATE ITEM
// =====================================


function spawnItem(

x:number,

z:number

)

{


let item =

itemDatabase[

Math.floor(

Math.random()*itemDatabase.length

)

];





let cube = spawnPrimitive.cube(

new Vector3(

x,

1,

z

),


new Vector3(

0.35,

0.35,

0.35

),


Quaternion.fromEuler(

new Vector3(

0,

Math.random()*3,

0

)

),


item.color,


0.8,


false,


"Animated",


undefined


);





activeItems.push(cube);





// CLICK / TOUCH PICKUP


cube.trigger.initialize(

0.5,

1,


[

"Left Hand",

"Right Hand"

],


undefined

);





cube.trigger.setOccupiedFunction(

(payload)=>{


let distance =

Player.position.distanceTo(

cube.pos

);





if(distance < 3)

{


collectItem(

cube,

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

item:any

)

{


console.log(

"=============================="

);


console.log(

" ITEM COLLECTED "

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




collectedItems.push(

item.name

);





let index =

activeItems.indexOf(

entity

);



if(index!=-1)

{

activeItems.splice(

index,

1

);

}





entity.destroy();





}









// =====================================
// FLOATING ITEM ANIMATION
// OLD SCHOOL RPG STYLE
// =====================================


Events.onPhysicsUpdate(

()=>{


floatTimer +=0.05;




for(let item of activeItems)

{


if(!item)

continue;



let y =

Math.sin(

floatTimer+

item.pos.x

)

*

0.15;



item.pos.y =

1+y;



}




});









// =====================================
// INVENTORY DEBUG
// =====================================


export function showCollectedItems()

{


console.log(

"========= INVENTORY ========="

);



for(let item of collectedItems)

{


console.log(

item

);


}



console.log(

"TOTAL ITEMS FOUND: "

+

collectedItems.length

);



console.log(

"============================"

);



}
