import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Entity } from "./Yuu API/Entity";
import { Events } from "./Yuu API/Events";
import { Player } from "./Yuu API/Player";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";




// =====================================
// DUNGEON COLLECTIBLE SYSTEM
// RETRO ITEM PICKUPS
// =====================================



export let collectedItems:string[] = [];

export let activeCollectibles:Entity[] = [];






// =====================================
// ITEM DATABASE
// 20 DIFFERENT TYPES
// =====================================


interface CollectibleType

{

name:string;

color:Color;

}





const collectibleTypes:CollectibleType[] =


[


{

name:"Ancient Coin",

color:new Color(

1,

0.8,

0.1

)

},



{

name:"Ruby Gem",

color:new Color(

1,

0.05,

0.05

)

},



{

name:"Sapphire Crystal",

color:new Color(

0.05,

0.3,

1

)

},



{

name:"Emerald Stone",

color:new Color(

0.1,

1,

0.2

)

},



{

name:"Golden Key",

color:new Color(

1,

0.9,

0.2

)

},



{

name:"Rusty Key",

color:new Color(

0.4,

0.3,

0.2

)

},



{

name:"Health Potion",

color:new Color(

1,

0.1,

0.3

)

},



{

name:"Mana Crystal",

color:new Color(

0.2,

0.2,

1

)

},



{

name:"Ancient Scroll",

color:new Color(

0.8,

0.7,

0.4

)

},



{

name:"Dragon Scale",

color:new Color(

0.9,

0.3,

0.1

)

},



{

name:"Cyber Chip",

color:new Color(

0,

1,

1

)

},



{

name:"Power Cell",

color:new Color(

1,

0.5,

0

)

},



{

name:"Robot Gear",

color:new Color(

0.5,

0.5,

0.5

)

},



{

name:"Monster Eye",

color:new Color(

0.2,

1,

0.1

)

},



{

name:"Dungeon Map",

color:new Color(

0.7,

0.6,

0.4

)

},



{

name:"Magic Rune",

color:new Color(

0.8,

0,

1

)

},



{

name:"Wolfen Medal",

color:new Color(

1,

0.6,

0.1

)

},



{

name:"Void Crystal",

color:new Color(

0.4,

0,

0.8

)

},



{

name:"Ancient Relic",

color:new Color(

0.9,

0.9,

0.3

)

},



{

name:"Crown Fragment",

color:new Color(

1,

0.8,

0.2

)

}


];









// =====================================
// CREATE CUBE HELPER
// =====================================


function cube(

position:Vector3,

scale:Vector3,

color:Color

):Entity

{


return spawnPrimitive.cube(

position,

scale,


Quaternion.fromEuler(

new Vector3(

0,

0,

0

)

),


color,

0.8,

false,

"Animated",

undefined


);


}









// =====================================
// RANDOM ITEM SELECTOR
// =====================================


function randomCollectible()

:CollectibleType

{


return collectibleTypes[

Math.floor(

Math.random()

*

collectibleTypes.length

)

];


}









// =====================================
// END PART 1
// =====================================

// =====================================
// COLLECTIBLE STORAGE DATA
// =====================================


interface ItemData

{

entity:Entity;

name:string;

baseY:number;

time:number;

collected:boolean;

}





let itemData:ItemData[] = [];









// =====================================
// CREATE COLLECTIBLE ITEM
// =====================================


function createCollectible(

x:number,

z:number

)

{


let item = randomCollectible();





let entity = cube(

new Vector3(

x,

1,

z

),


new Vector3(

0.45,

0.45,

0.45

),


item.color

);






let data:ItemData =

{

entity:entity,

name:item.name,

baseY:1,

time:Math.random()*10,

collected:false

};






itemData.push(data);



activeCollectibles.push(entity);





// make item interactable


entity.trigger.initialize(

0.5,

1,

[

"Left Hand",

"Right Hand"

],

undefined

);








entity.trigger.setOccupiedFunction(

()=>{


collectItem(

data

);


}

);







console.log(

"Spawned item:",

item.name

);




}









// =====================================
// SPAWN MANY ITEMS
// CALL AFTER DUNGEON CREATION
// =====================================


export function spawnCollectibles()

{


console.log(

"Creating dungeon treasure..."

);





// 60 pickups around map


for(

let i=0;

i<60;

i++

)

{


let x =

(Math.random()*240)-120;



let z =

(Math.random()*240)-120;






createCollectible(

x,

z

);



}





console.log(

"60 collectibles created"

);



}









// =====================================
// ITEM COLLECTION
// =====================================


function collectItem(

data:ItemData

)

{


if(data.collected)

{

return;

}



data.collected=true;





collectedItems.push(

data.name

);







console.log(

"=============================="

);



console.log(

"COLLECTED ITEM:"

);



console.log(

data.name

);



console.log(

"TOTAL FOUND:",

collectedItems.length

);



console.log(

"=============================="

);






// remove from world


data.entity.trigger.delete();



data.entity.destroy();






let index =

activeCollectibles.indexOf(

data.entity

);



if(index!=-1)

{

activeCollectibles.splice(

index,

1

);

}




}









// =====================================
// ITEM ANIMATION
// FLOAT + ROTATE
// =====================================


let animationTime = 0;





function updateCollectibles()

{


animationTime += 0.05;






for(let data of itemData)

{


if(data.collected)

{

continue;

}




let entity=data.entity;





let height =

Math.sin(

animationTime + data.time

)

*

0.15;






entity.pos = new Vector3(

entity.pos.x,

data.baseY + height,

entity.pos.z

);






}




}








// =====================================
// UPDATE LOOP
// =====================================


Events.onPhysicsUpdate(

()=>{


updateCollectibles();



});

// =====================================
// RARITY SYSTEM
// =====================================


interface Rarity

{

name:string;

chance:number;

multiplier:number;

}





const rarities:Rarity[] =

[


{

name:"Common",

chance:0.65,

multiplier:1

},



{

name:"Rare",

chance:0.25,

multiplier:2

},



{

name:"Epic",

chance:0.08,

multiplier:5

},



{

name:"Legendary",

chance:0.02,

multiplier:10

}


];









function getRarity()

:Rarity

{


let roll=Math.random();



let total=0;



for(let rarity of rarities)

{


total += rarity.chance;



if(roll <= total)

{


return rarity;


}


}




return rarities[0];


}









// =====================================
// SAFE FLOOR CHECK
// CONNECT TO YOUR MAZE
// =====================================


export function spawnDungeonCollectibles(

maze:number[][],

mazeWidth:number,

mazeHeight:number,

blockSize:number

)

{


console.log(

"Spawning dungeon collectibles..."

);







let placed=0;



while(placed < 60)

{


let gridX=Math.floor(

Math.random()

*

mazeWidth

);



let gridZ=Math.floor(

Math.random()

*

mazeHeight

);







// only spawn on floor


if(

maze[gridX]

&&

maze[gridX][gridZ] == 0

)

{


let worldX =

(gridX * blockSize)

-

(

mazeWidth *

blockSize

)/2;





let worldZ =

(gridZ * blockSize)

-

(

mazeHeight *

blockSize

)/2;







createCollectible(

worldX,

worldZ

);




placed++;



}



}







console.log(

"Collectibles placed:",

placed

);



}









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

"No items collected"

);



return;


}





for(let item of collectedItems)

{


console.log(

"-",

item

);


}





console.log(

"TOTAL:",

collectedItems.length

);



console.log(

"=============================="

);



}









// =====================================
// CHECK IF PLAYER FOUND ITEM
// =====================================


export function hasCollected(

itemName:string

)

{


return collectedItems.includes(

itemName

);


}









// =====================================
// CLEAR INVENTORY
// =====================================


export function clearInventory()

{


collectedItems.length=0;



console.log(

"Inventory cleared"

);



}









// =====================================
// AUTO DEBUG
// =====================================


export function collectibleStats()

{


console.log(

"=============================="

);



console.log(

"ACTIVE ITEMS:",

activeCollectibles.length

);



console.log(

"FOUND ITEMS:",

collectedItems.length

);



console.log(

"=============================="

);



}








// =====================================
// END COLLECTIBLE SYSTEM
// =====================================