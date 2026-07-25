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

