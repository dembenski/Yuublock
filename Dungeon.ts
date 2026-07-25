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

export let chests:any[] = [];




// =====================================
// CHEST ITEM STORAGE
// =====================================


export let collectedItems:string[] = [];



interface LootItem
{

name:string;

rarity:string;

}



let lootTable:LootItem[] = [

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
},

];