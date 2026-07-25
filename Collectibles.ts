import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { Events } from "./Yuu API/Events";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";


// =====================================
// COLLECTIBLE SYSTEM
// RETRO DUNGEON ITEMS
// =====================================


// storage

export let collectedItems:string[] = [];

export let collectibles:Entity[] = [];



// =====================================
// ITEM LIST
// 20 DIFFERENT TYPES
// =====================================


const itemTypes = [

{
name:"Ancient Coin",
color:new Color(1,0.8,0.1)
},

{
name:"Ruby Gem",
color:new Color(1,0.1,0.1)
},

{
name:"Blue Crystal",
color:new Color(0.1,0.4,1)
},

{
name:"Green Emerald",
color:new Color(0.1,1,0.3)
},

{
name:"Golden Key",
color:new Color(1,0.9,0.2)
},

{
name:"Silver Key",
color:new Color(0.7,0.7,0.8)
},

{
name:"Health Potion",
color:new Color(1,0.1,0.5)
},

{
name:"Mana Potion",
color:new Color(0.2,0.2,1)
},

{
name:"Ancient Scroll",
color:new Color(0.8,0.7,0.4)
},

{
name:"Lost Artifact",
color:new Color(0.5,0.2,0.8)
},

{
name:"Demon Skull",
color:new Color(0.9,0.8,0.6)
},

{
name:"Robot Chip",
color:new Color(0.1,1,1)
},

{
name:"Power Cell",
color:new Color(1,0.5,0.1)
},

{
name:"Crystal Shard",
color:new Color(0.3,0.8,1)
},

{
name:"Dungeon Map",
color:new Color(0.4,0.3,0.2)
},

{
name:"Magic Rune",
color:new Color(0.8,0.1,1)
},

{
name:"Warrior Medal",
color:new Color(1,0.6,0.2)
},

{
name:"Dragon Scale",
color:new Color(0.8,0.2,0.1)
},

{
name:"Frozen Heart",
color:new Color(0.4,0.8,1)
},

{
name:"Ancient Relic",
color:new Color(0.9,0.9,0.4)
}


];





// =====================================
// CREATE ITEM CUBE
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
// CREATE COLLECTIBLE
// =====================================


function createItem(

x:number,

z:number,

item:any

)

{


let entity = cube(

new Vector3(

x,

0.8,

z

),


new Vector3(

0.5,

0.5,

0.5

),


item.color

);





collectibles.push(entity);





// store data

(entity as any).collectibleData =

{

name:item.name,

collected:false

};





console.log(

"Spawned collectible: "

+

item.name

);





}








// =====================================
// SPAWN RANDOM ITEMS
// CALL AFTER DUNGEON CREATION
// =====================================


export function spawnCollectibles()

{


console.log(

"Spawning dungeon collectibles..."

);





for(let i=0;i<60;i++)

{


let x =

(Math.random()*200)-100;



let z =

(Math.random()*200)-100;





let item =

itemTypes[

Math.floor(

Math.random()*itemTypes.length

)

];





createItem(

x,

z,

item

);


}






console.log(

"60 collectible items placed"

);


}








// =====================================
// CLICK COLLECTION
// =====================================


export function clickCollectible(

entity:Entity

)

{


let data=(entity as any).collectibleData;



if(!data)

{

return;

}




if(data.collected)

{

return;

}





data.collected=true;





collectedItems.push(

data.name

);





console.log(

"======================"

);


console.log(

"ITEM COLLECTED: "

+

data.name

);


console.log(

"TOTAL ITEMS: "

+

collectedItems.length

);


console.log(

"======================"

);





// remove object


let index = collectibles.indexOf(entity);



if(index!=-1)

{

collectibles.splice(

index,

1

);

}





// hide object

entity.scale = new Vector3(

0,

0,

0

);



}








// =====================================
// SIMPLE CLICK CHECK
// CONNECT THIS TO YOUR INPUT SYSTEM
// =====================================


Events.onPhysicsUpdate(

()=>{


for(let item of collectibles)

{


if(!item)

{

continue;

}




// placeholder click detection
// connect your Yuu click event here


}



});









// =====================================
// INVENTORY DEBUG
// =====================================


export function showInventory()

{


console.log(

"===== INVENTORY ====="

);



for(let item of collectedItems)

{

console.log(

"- "

+

item

);

}



console.log(

"====================="

);


}