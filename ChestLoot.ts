import { Color } from "./Yuu API/Basic Types/Color";
import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { Player } from "./Yuu API/Player";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";




// =====================================
// LOOT DATABASE
// PUT YOUR 120 ITEMS HERE
// =====================================


export const lootItems:any[] = [


// =====================================
// WEAPONS
// 1-20
// =====================================


{
name:"Rusty Sword",
rarity:"Common",
value:30,
color:new Color(.5,.4,.3)
},


{
name:"Iron Blade",
rarity:"Common",
value:60,
color:new Color(.6,.6,.6)
},


{
name:"Steel Sword",
rarity:"Uncommon",
value:120,
color:new Color(.7,.7,.8)
},


{
name:"Knight Saber",
rarity:"Rare",
value:300,
color:new Color(.8,.8,1)
},


{
name:"Flame Sword",
rarity:"Epic",
value:800,
color:new Color(1,.2,.05)
},


{
name:"Ice Blade",
rarity:"Epic",
value:800,
color:new Color(.2,.8,1)
},


{
name:"Thunder Axe",
rarity:"Legendary",
value:1500,
color:new Color(1,1,.1)
},


{
name:"Shadow Dagger",
rarity:"Rare",
value:350,
color:new Color(.1,.1,.2)
},


{
name:"Dragon Slayer",
rarity:"Mythic",
value:5000,
color:new Color(1,.1,.05)
},


{
name:"Ancient Spear",
rarity:"Rare",
value:400,
color:new Color(.6,.4,.2)
},


{
name:"Crystal Staff",
rarity:"Epic",
value:900,
color:new Color(.5,.1,1)
},


{
name:"Wizard Wand",
rarity:"Rare",
value:300,
color:new Color(.8,.2,1)
},


{
name:"Golden Hammer",
rarity:"Legendary",
value:2000,
color:new Color(1,.8,.1)
},


{
name:"Bone Sword",
rarity:"Uncommon",
value:100,
color:new Color(.8,.8,.7)
},


{
name:"Demon Blade",
rarity:"Mythic",
value:6000,
color:new Color(1,0,0)
},


{
name:"Void Knife",
rarity:"Legendary",
value:2500,
color:new Color(.3,0,.5)
},


{
name:"War Axe",
rarity:"Uncommon",
value:180,
color:new Color(.4,.3,.2)
},


{
name:"Royal Sword",
rarity:"Legendary",
value:3000,
color:new Color(1,.7,.1)
},


{
name:"Lost Champion Blade",
rarity:"Mythic",
value:7000,
color:new Color(.8,.8,1)
},


{
name:"Dungeon Fork",
rarity:"Common",
value:10,
color:new Color(.4,.4,.4)
},




// =====================================
// ARMOR
// 21-40
// =====================================


{
name:"Leather Helmet",
rarity:"Common",
value:40,
color:new Color(.4,.25,.1)
},


{
name:"Iron Helmet",
rarity:"Uncommon",
value:100,
color:new Color(.6,.6,.6)
},


{
name:"Steel Armor",
rarity:"Rare",
value:400,
color:new Color(.7,.7,.8)
},


{
name:"Golden Armor",
rarity:"Legendary",
value:2000,
color:new Color(1,.8,.1)
},


{
name:"Dragon Armor",
rarity:"Mythic",
value:8000,
color:new Color(1,.2,.05)
},


{
name:"Shadow Cloak",
rarity:"Epic",
value:900,
color:new Color(.1,.05,.2)
},


{
name:"Wizard Robe",
rarity:"Rare",
value:500,
color:new Color(.4,.1,.8)
},


{
name:"Knight Shield",
rarity:"Uncommon",
value:200,
color:new Color(.5,.5,.6)
},


{
name:"Crystal Shield",
rarity:"Legendary",
value:2500,
color:new Color(.3,.8,1)
},


{
name:"Bone Armor",
rarity:"Epic",
value:700,
color:new Color(.8,.8,.7)
},


{
name:"Orc Helmet",
rarity:"Rare",
value:350,
color:new Color(.2,.8,.2)
},


{
name:"Cyber Armor",
rarity:"Legendary",
value:3000,
color:new Color(.1,.5,1)
},


{
name:"Ancient Plate",
rarity:"Epic",
value:1200,
color:new Color(.5,.4,.3)
},


{
name:"Phoenix Armor",
rarity:"Mythic",
value:9000,
color:new Color(1,.4,.1)
},


{
name:"Frozen Suit",
rarity:"Epic",
value:1500,
color:new Color(.2,.8,1)
},


{
name:"Dark Knight Armor",
rarity:"Legendary",
value:3500,
color:new Color(.05,.05,.05)
},


{
name:"Royal Crown",
rarity:"Rare",
value:700,
color:new Color(1,.7,.1)
},


{
name:"Explorer Boots",
rarity:"Common",
value:50,
color:new Color(.3,.2,.1)
},


{
name:"Magic Gloves",
rarity:"Rare",
value:400,
color:new Color(.7,.2,1)
},


{
name:"Ancient Warrior Set",
rarity:"Mythic",
value:10000,
color:new Color(.8,.5,.1)
},



{
name:"Blood Ruby",
rarity:"Rare",
value:150,
color:new Color(1,0,0)
},


{
name:"Ancient Coin",
rarity:"Common",
value:25,
color:new Color(1,.8,.1)
},


{
name:"Dragon Egg",
rarity:"Mythic",
value:5000,
color:new Color(1,.2,.05)
},


{
name:"Void Crystal",
rarity:"Legendary",
value:700,
color:new Color(.4,.1,1)
},


{
name:"Healing Potion",
rarity:"Common",
value:20,
color:new Color(.1,1,.2)
},


{
name:"Cyber Core",
rarity:"Epic",
value:600,
color:new Color(.1,.8,1)
},


{
name:"Lost Crown",
rarity:"Legendary",
value:1500,
color:new Color(1,.7,.1)
},


{
name:"Soul Orb",
rarity:"Mythic",
value:3000,
color:new Color(.8,.1,1)
},


{
name:"Ancient Warrior Set",
rarity:"Mythic",
value:10000,
color:new Color(.8,.5,.1)
},


// =====================================
// GEMS + TREASURES
// 41-60
// =====================================


{
name:"Ruby",
rarity:"Rare",
value:200,
color:new Color(1,0,0)
},


{
name:"Sapphire",
rarity:"Rare",
value:200,
color:new Color(0,.3,1)
},


{
name:"Emerald",
rarity:"Rare",
value:200,
color:new Color(0,1,.2)
},


{
name:"Diamond",
rarity:"Legendary",
value:1000,
color:new Color(1,1,1)
},


{
name:"Black Pearl",
rarity:"Epic",
value:800,
color:new Color(.05,.05,.1)
},


{
name:"Golden Coin",
rarity:"Common",
value:20,
color:new Color(1,.8,.1)
},


{
name:"Ancient Coin Stack",
rarity:"Uncommon",
value:120,
color:new Color(.9,.7,.1)
},


{
name:"Lost Treasure Map",
rarity:"Rare",
value:500,
color:new Color(.7,.5,.2)
},


{
name:"Crystal Skull",
rarity:"Legendary",
value:2000,
color:new Color(.6,.9,1)
},


{
name:"Dragon Scale",
rarity:"Epic",
value:900,
color:new Color(1,.3,.1)
},


{
name:"Phoenix Feather",
rarity:"Legendary",
value:2500,
color:new Color(1,.5,.1)
},


{
name:"Moon Stone",
rarity:"Rare",
value:400,
color:new Color(.6,.6,1)
},


{
name:"Sun Crystal",
rarity:"Epic",
value:1200,
color:new Color(1,.9,.2)
},


{
name:"Void Gem",
rarity:"Mythic",
value:5000,
color:new Color(.4,0,1)
},


{
name:"Ancient Relic",
rarity:"Legendary",
value:3000,
color:new Color(.8,.6,.2)
},


{
name:"Forgotten Idol",
rarity:"Epic",
value:1500,
color:new Color(.5,.3,.1)
},


{
name:"Golden Skull",
rarity:"Legendary",
value:3500,
color:new Color(1,.7,.1)
},


{
name:"Dark Crystal",
rarity:"Epic",
value:1000,
color:new Color(.2,0,.4)
},


{
name:"King's Jewel",
rarity:"Mythic",
value:8000,
color:new Color(1,.2,.8)
},


{
name:"Dungeon Heart",
rarity:"Mythic",
value:10000,
color:new Color(1,0,0)
},





// =====================================
// MACHINE / CYBER LOOT
// 61-80
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
value:1200,
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
value:1500,
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


];





// =====================================
// INVENTORY STORAGE
// =====================================


export let inventory:any[]=[];





// =====================================
// CREATE CHEST
// =====================================


export function createLootChest(

x:number,

z:number

):Entity

{


let chest = spawnPrimitive.cube(

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


Quaternion.one,


new Color(

1,

.8,

0

),


1,


false,


"Animated",


undefined

);






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

return;



let distance=

Player.position.distanceTo(

chest.pos

);



if(distance<3)

{


opened=true;


openChest(

chest

);


}



}

);




return chest;


}






// =====================================
// OPEN CHEST
// =====================================


function openChest(

chest:Entity

)

{


let item =

lootItems[

Math.floor(

Math.random()*lootItems.length

)

];




inventory.push(item);




console.log(

"===================="

);


console.log(

"CHEST OPENED"

);


console.log(

"FOUND: "

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

item.value

);


console.log(

"===================="

);




chest.destroy();


}