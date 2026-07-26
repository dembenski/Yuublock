// ============================================
// RETRO VOXEL RPG DUNGEON
// SINGLE FILE GAME SYSTEM
// dungeon.ts
// PART 1
// ============================================


import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { Player } from "./Yuu API/Player";
import { Events } from "./Yuu API/Events";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";



// ============================================
// GAME BOOT
// ============================================


console.log(
"================================"
);

console.log(
" RETRO VOXEL RPG STARTING "
);

console.log(
"================================"
);




// ============================================
// WORLD SETTINGS
// ============================================


const WORLD_SIZE = 31;

const BLOCK_SIZE = 8;


const WALL_HEIGHT = 6;


const PLAYER_START_X = 1;

const PLAYER_START_Z = 1;





// ============================================
// GAME STATE
// ============================================


let gameStarted = false;


let gameTime = 0;



export let enemies:any[] = [];


export let chests:Entity[] = [];


export let inventory:any[] = [];





// ============================================
// PLAYER RPG DATA
// ============================================


export let playerData = {


    name:"Hero",


    level:1,


    xp:0,


    hp:100,


    maxHP:100,


    mana:50,


    maxMana:50,


    gold:100,


    attack:10,


    defense:5,


    weapon:"Rusty Sword",


    armor:"Cloth Armor"



};







// ============================================
// INVENTORY SETTINGS
// ============================================


const INVENTORY_LIMIT = 120;


function addItem(item:any)

{


    if(inventory.length >= INVENTORY_LIMIT)

    {


        console.log(
        "INVENTORY FULL"
        );


        return false;


    }




    inventory.push(item);



    console.log(
    "ITEM ADDED: "
    +
    item.name
    );



    return true;


}






function removeItem(index:number)

{


    if(inventory[index])

    {


        console.log(
        "REMOVED: "
        +
        inventory[index].name
        );


        inventory.splice(index,1);


    }



}







// ============================================
// ITEM DATABASE
// ============================================


export const items = [



{
name:"Rusty Sword",
type:"Weapon",
rarity:"Common",
damage:5,
value:20
},


{
name:"Iron Sword",
type:"Weapon",
rarity:"Common",
damage:10,
value:50
},


{
name:"Steel Sword",
type:"Weapon",
rarity:"Uncommon",
damage:20,
value:150
},


{
name:"Golden Sword",
type:"Weapon",
rarity:"Rare",
damage:40,
value:500
},


{
name:"Dragon Blade",
type:"Weapon",
rarity:"Legendary",
damage:100,
value:5000
},



{
name:"Cloth Armor",
type:"Armor",
rarity:"Common",
defense:2,
value:20
},


{
name:"Leather Armor",
type:"Armor",
rarity:"Common",
defense:5,
value:80
},


{
name:"Iron Armor",
type:"Armor",
rarity:"Uncommon",
defense:15,
value:250
},


{
name:"Knight Armor",
type:"Armor",
rarity:"Epic",
defense:40,
value:1500
},


{
name:"Dragon Armor",
type:"Armor",
rarity:"Legendary",
defense:100,
value:10000
},



{
name:"Small Potion",
type:"Consumable",
heal:25,
value:20
},


{
name:"Large Potion",
type:"Consumable",
heal:100,
value:100
},


{
name:"Mana Crystal",
type:"Consumable",
mana:50,
value:150
},



{
name:"Ancient Coin",
type:"Treasure",
value:10
},


{
name:"Silver Coin",
type:"Treasure",
value:50
},


{
name:"Gold Coin",
type:"Treasure",
value:200
},


{
name:"Diamond",
type:"Treasure",
value:1000
}



];





// More items will be generated in PART 2
// until database reaches 120 items







// ============================================
// CONSOLE SYSTEM
// ============================================


export function gameLog(message:string)

{


console.log(

"[RPG] "

+

message

);


}







// ============================================
// BASIC CUBE CREATOR
// ============================================


function createCube(

position:Vector3,

scale:Vector3,

color:Color,

type:any="Static"

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


1,


true,


type,


undefined


);


}





console.log(
"DUNGEON CORE LOADED"
);

// ============================================
// ITEM DATABASE GENERATOR
// 120 ITEMS TOTAL
// ============================================


function generateItems()

{


let prefixes =

[

"Ancient",

"Rusty",

"Shadow",

"Golden",

"Crystal",

"Dragon",

"Void",

"Cyber",

"Frozen",

"Dark",

"Royal",

"Mystic",

"Legendary",

"Forgotten"

];




let names =

[

"Sword",

"Axe",

"Dagger",

"Staff",

"Helmet",

"Armor",

"Boots",

"Ring",

"Amulet",

"Shield",

"Potion",

"Crystal",

"Rune",

"Scroll",

"Gem"

];




let rarities =

[

"Common",

"Uncommon",

"Rare",

"Epic",

"Legendary"

];






while(items.length < 120)

{


let prefix =

prefixes[

Math.floor(

Math.random()*prefixes.length

)

];




let name =

names[

Math.floor(

Math.random()*names.length

)

];





let rarity =

rarities[

Math.floor(

Math.random()*rarities.length

)

];





let value =

Math.floor(

Math.random()*5000

)+10;






let damage =

Math.floor(

Math.random()*100

)+1;






items.push(

{


name:

prefix

+

" "

+

name,


type:

name,


rarity:rarity,


damage:damage,


defense:

Math.floor(

Math.random()*100

),


value:value



}

);



}



console.log(

"ITEM DATABASE CREATED: "

+

items.length

+

" ITEMS"

);



}




generateItems();







// ============================================
// SHOP SYSTEM
// ============================================



export let shopItems:any[]=[];



function generateShop()

{


shopItems=[];




for(let i=0;i<20;i++)

{


let item =

items[

Math.floor(

Math.random()*items.length

)

];





shopItems.push(

{


name:item.name,


price:item.value,


data:item



}

);



}



console.log(

"SHOP READY"

);



}





export function openShop()

{


generateShop();



console.log(

"==================="

);


console.log(

" VOXEL SHOP OPEN "

);


console.log(

"==================="

);



for(let item of shopItems)

{


console.log(

item.name

+

" - "

+

item.price

+

" gold"

);



}



}







export function buyItem(index:number)

{


let shopItem = shopItems[index];



if(!shopItem)

{


console.log(

"INVALID SHOP ITEM"

);


return;



}






if(playerData.gold < shopItem.price)

{


console.log(

"NOT ENOUGH GOLD"

);


return;



}







playerData.gold -= shopItem.price;



addItem(

shopItem.data

);





console.log(

"BOUGHT "

+

shopItem.name

);



}








export function sellItem(index:number)

{


let item = inventory[index];



if(!item)

{


console.log(

"NO ITEM"

);


return;


}







playerData.gold += item.value;



console.log(

"SOLD "

+

item.name

+

" FOR "

+

item.value

+

" GOLD"

);




removeItem(index);



}









// ============================================
// PLAYER DAMAGE SYSTEM
// ============================================



export function damagePlayer(amount:number)

{


let damage = amount - playerData.defense;



if(damage < 1)

damage = 1;





playerData.hp -= damage;



console.log(

"PLAYER TOOK "

+

damage

+

" DAMAGE"

);



console.log(

"HP: "

+

playerData.hp

+

"/"

+

playerData.maxHP

);







if(playerData.hp <=0)

{


playerDeath();


}



}





function playerDeath()

{


console.log(

"==================="

);


console.log(

" PLAYER DIED "

);


console.log(

"==================="

);



playerData.hp = playerData.maxHP;



Player.position.set(

new Vector3(

PLAYER_START_X * BLOCK_SIZE,

1,

PLAYER_START_Z * BLOCK_SIZE

)

);



}








// ============================================
// HEAL SYSTEM
// ============================================



export function healPlayer(amount:number)

{


playerData.hp += amount;



if(playerData.hp > playerData.maxHP)

{

playerData.hp = playerData.maxHP;

}



console.log(

"HEALED "

+

amount

);



console.log(

"HP "

+

playerData.hp

+

"/"

+

playerData.maxHP

);



}








// ============================================
// XP SYSTEM
// ============================================



export function addXP(amount:number)

{


playerData.xp += amount;



console.log(

"+"

+

amount

+

" XP"

);





if(playerData.xp >= playerData.level * 100)

{


playerData.xp = 0;


playerData.level++;


playerData.maxHP +=20;


playerData.hp = playerData.maxHP;



console.log(

"LEVEL UP!"

);



console.log(

"LEVEL "

+

playerData.level

);



}



}

// ============================================
// VOXEL MAZE SYSTEM
// ============================================


const MAZE_WIDTH = 31;

const MAZE_HEIGHT = 31;

const BLOCK_SIZE = 8;



let maze:number[][]=[];



const PLAYER_START_X = 1;

const PLAYER_START_Z = 1;





// ============================================
// COLORS
// ============================================


function wallColor(x:number,z:number)

{


let c=(x+z)%4;



if(c==0)

return new Color(
0.35,
0.25,
0.15
);



if(c==1)

return new Color(
0.25,
0.18,
0.12
);



if(c==2)

return new Color(
0.45,
0.32,
0.20
);



return new Color(
0.20,
0.20,
0.20
);



}





function floorColor(x:number,z:number)

{


if((x+z)%2==0)

return new Color(
0.15,
0.15,
0.15
);



return new Color(
0.10,
0.10,
0.10
);



}







// ============================================
// CREATE VOXEL BLOCK
// ============================================


function createBlock(

position:Vector3,

scale:Vector3,

color:Color,

physics="Static"

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

1,

true,

physics,

undefined

);



}








// ============================================
// GENERATE MAZE
// ============================================


function generateMaze()

{


maze=[];




for(let x=0;x<MAZE_WIDTH;x++)

{


maze[x]=[];



for(let z=0;z<MAZE_HEIGHT;z++)

{


maze[x][z]=1;


}



}







for(

let x=1;

x<MAZE_WIDTH-1;

x+=2

)

{


for(

let z=1;

z<MAZE_HEIGHT-1;

z+=2

)

{


maze[x][z]=0;




if(x<MAZE_WIDTH-2)

maze[x+1][z]=0;




if(z<MAZE_HEIGHT-2)

maze[x][z+1]=0;




if(Math.random()<0.5)

{


if(x>1)

maze[x-1][z]=0;


}





if(Math.random()<0.5)

{


if(z>1)

maze[x][z-1]=0;


}





}



}






// safe spawn

maze[1][1]=0;

maze[2][1]=0;

maze[1][2]=0;




console.log(

"MAZE GENERATED"

);



}











// ============================================
// BUILD WORLD
// ============================================


export async function createDungeon()

{


generateMaze();



enemies=[];

chests=[];



let offsetX =

-(MAZE_WIDTH * BLOCK_SIZE)/2;



let offsetZ =

-(MAZE_HEIGHT * BLOCK_SIZE)/2;







console.log(

"BUILDING VOXEL WORLD..."

);







for(let x=0;x<MAZE_WIDTH;x++)

{


for(let z=0;z<MAZE_HEIGHT;z++)

{


let worldX =

x * BLOCK_SIZE + offsetX;



let worldZ =

z * BLOCK_SIZE + offsetZ;







// WALL

if(maze[x][z]==1)

{


createBlock(

new Vector3(

worldX,

3,

worldZ

),

new Vector3(

BLOCK_SIZE,

6,

BLOCK_SIZE

),

wallColor(

x,

z

),

"Static"

);



}





// FLOOR

else

{


createBlock(

new Vector3(

worldX,

0,

worldZ

),

new Vector3(

BLOCK_SIZE,

0.2,

BLOCK_SIZE

),

floorColor(

x,

z

),

"Static"

);








// don't spawn at start

if(

!(x==1 && z==1)

)

{


spawnDungeonObject(

worldX,

worldZ

);



}




}



}



}







Player.position.set(

new Vector3(

offsetX + BLOCK_SIZE,

1,

offsetZ + BLOCK_SIZE

)

);





console.log(

"======================"

);


console.log(

"DUNGEON CREATED"

);


console.log(

"ENEMIES: "

+

enemies.length

);


console.log(

"CHESTS: "

+

chests.length

);


console.log(

"======================"

);



}









// ============================================
// SPAWN ENEMIES / CHESTS
// ============================================


function spawnDungeonObject(

x:number,

z:number

)

{


let chance=Math.random();





// enemy

if(chance < 0.15)

{


let enemy=createEnemy(

new Vector3(

x,

2,

z

)

);



enemies.push(enemy);



console.log(

"SPAWNED ENEMY: "

+

enemy.name

);



}





// chest

else if(chance < 0.25)

{


let chest=createChest(

new Vector3(

x,

1,

z

)

);



chests.push(chest);



console.log(

"SPAWNED CHEST"

);



}




}

// ============================================
// ENEMY SYSTEM
// ============================================


const ENEMY_SPEED = 1.5;

const ENEMY_DETECTION_RANGE = 45;

const ENEMY_ATTACK_RANGE = 3;






// ============================================
// CREATE ENEMY
// ============================================


function createEnemy(

pos:Vector3

):any

{


let entity = createBlock(

pos,

new Vector3(

1.5,

2.5,

1.5

),

new Color(

1,

0,

0

),

"Dynamic"

);





let enemy =

{


entity:entity,


name:getEnemyName(),


hp:100,


damage:10,


speed:ENEMY_SPEED,


attackCooldown:0,


alive:true


};





console.log(

"ENEMY CREATED "

+

enemy.name

);



return enemy;



}







function getEnemyName()

{


let names =

[

"Goblin",

"Skeleton",

"Orc",

"Shadow Beast",

"Cyber Demon",

"Dungeon Knight",

"Ancient Warrior",

"Void Monster"

];





return names[

Math.floor(

Math.random()*names.length

)

];



}









// ============================================
// ENEMY AI UPDATE
// ============================================


function updateEnemies()

{


let playerPos = Player.position;



for(let enemy of enemies)

{


if(!enemy.alive)

continue;






let entity = enemy.entity;



if(!entity)

continue;






let pos = entity.pos;





let dx =

playerPos.x - pos.x;



let dz =

playerPos.z - pos.z;





let distance = Math.sqrt(

dx*dx +

dz*dz

);







// CHASE PLAYER

if(distance < ENEMY_DETECTION_RANGE)

{


let moveX =

(dx / distance)

*

enemy.speed

*

0.016;



let moveZ =

(dz / distance)

*

enemy.speed

*

0.016;






entity.velocity = new Vector3(

moveX,

entity.velocity.y,

moveZ

);



}

else

{


entity.velocity = new Vector3(

0,

entity.velocity.y,

0

);



}









// ATTACK


if(distance < ENEMY_ATTACK_RANGE)

{


if(enemy.attackCooldown <=0)

{


console.log(

enemy.name

+

" ATTACKED PLAYER"

);



damagePlayer(

enemy.damage

);



enemy.attackCooldown=120;



}



}







if(enemy.attackCooldown>0)

{

enemy.attackCooldown--;

}



}





}








// ============================================
// PHYSICS LOOP
// ============================================


Events.onPhysicsUpdate(

()=>{


updateEnemies();



});










// ============================================
// CHEST SYSTEM
// ============================================



function createChest(

pos:Vector3

):Entity

{


let chest=createBlock(

pos,

new Vector3(

1.5,

1,

1.5

),

new Color(

1,

0.8,

0

),

"Static"

);






attachChestInteraction(

chest

);





return chest;



}









function attachChestInteraction(

chest:Entity

)

{


if(!chest.trigger)

{


console.log(

"CHEST HAS NO TRIGGER"

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








chest.trigger.setOccupiedFunction(

()=>{


if(opened)

return;





let distance =

Player.position.distanceTo(

chest.pos

);






if(distance < 3)

{


opened=true;



openChest(

chest

);



}



}



);




}











// ============================================
// OPEN CHEST
// ============================================


function openChest(

chest:Entity

)

{


console.log(

"==================="

);


console.log(

"CHEST OPENED"

);





let rolls =

Math.floor(

Math.random()*5

)+1;








for(let i=0;i<rolls;i++)

{


let item =

items[

Math.floor(

Math.random()*items.length

)

];






console.log(

"FOUND ITEM: "

+

item.name

);



console.log(

"RARITY: "

+

item.rarity

);






addItem(

item

);



}






chest.destroy();



}









// ============================================
// GAME CONSOLE
// ============================================



export function gameConsole(

message:string

)

{


console.log(

"===================="

);



console.log(

" VOXEL DUNGEON LOG "

);



console.log(

message

);



console.log(

"===================="

);



}







export function showStats()

{


console.log(

"========== PLAYER =========="

);



console.log(

"HP: "

+

playerData.hp

+

"/"

+

playerData.maxHP

);



console.log(

"GOLD: "

+

playerData.gold

);



console.log(

"LEVEL: "

+

playerData.level

);



console.log(

"XP: "

+

playerData.xp

);



console.log(

"============================"

);



}








// ============================================
// DEBUG COMMANDS
// ============================================


export function debugDungeon()

{


console.log(

"========= DUNGEON DEBUG ========="

);



console.log(

"Enemies: "

+

enemies.length

);



console.log(

"Chests: "

+

chests.length

);



console.log(

"Items: "

+

items.length

);



console.log(

"Inventory: "

+

inventory.length

);



console.log(

"================================="

);



}

// ============================================
// PLAYER DATA SYSTEM
// ============================================


let playerData =

{


hp:100,


maxHP:100,


gold:0,


level:1,


xp:0,


damage:10



};








// ============================================
// INVENTORY SYSTEM
// ============================================


export let inventory:any[]=[];



const MAX_INVENTORY = 120;







function addItem(

item:any

)

{


if(inventory.length >= MAX_INVENTORY)

{


console.log(

"INVENTORY FULL"

);



return;



}






inventory.push(

{


name:item.name,


rarity:item.rarity,


value:item.value,


amount:1



}

);






console.log(

"ITEM ADDED: "

+

item.name

);






}








// ============================================
// ITEM DATABASE
// ============================================


let items =

[


{

name:"Ancient Coin",

rarity:"Common",

value:10

},


{

name:"Iron Sword",

rarity:"Common",

value:50

},


{

name:"Healing Potion",

rarity:"Common",

value:30

},


{

name:"Magic Crystal",

rarity:"Rare",

value:250

},


{

name:"Dragon Scale",

rarity:"Epic",

value:1200

},


{

name:"Void Core",

rarity:"Legendary",

value:10000

}



];







// Generate 120 total items


for(let i=items.length;i<120;i++)

{


items.push(

{


name:

"Unknown Artifact #"

+

i,


rarity:

"Rare",


value:

100+i*10



}

);



}









// ============================================
// SHOP SYSTEM
// ============================================



let shopStock:any[]=[];




function generateShop()

{


shopStock=[];




for(let i=0;i<10;i++)

{


let item =

items[

Math.floor(

Math.random()*items.length

)

];





shopStock.push(item);



}





console.log(

"SHOP GENERATED"

);



}








export function openShop()

{


console.log(

"======================"

);


console.log(

" VOXEL SHOP "

);


console.log(

"Gold: "

+

playerData.gold

);





for(let i=0;i<shopStock.length;i++)

{


console.log(

i+

": "

+

shopStock[i].name

+

" $"

+

shopStock[i].value

);



}





console.log(

"======================"

);



}









export function buyItem(

index:number

)

{


let item = shopStock[index];



if(!item)

return;





if(playerData.gold >= item.value)

{


playerData.gold -= item.value;



addItem(item);



console.log(

"BOUGHT "

+

item.name

);



}

else

{


console.log(

"NOT ENOUGH GOLD"

);



}



}









export function sellItem(

index:number

)

{


let item = inventory[index];



if(!item)

return;





playerData.gold += item.value;



console.log(

"SOLD "

+

item.name

);



inventory.splice(

index,

1

);



}









// ============================================
// INVENTORY DISPLAY
// ============================================



export function showInventory()

{


console.log(

"======================"

);


console.log(

" INVENTORY "

);



console.log(

inventory.length

+

"/"

+

MAX_INVENTORY

);






for(let i=0;i<inventory.length;i++)

{


console.log(

i+

" "

+

inventory[i].name

+

" "

+

inventory[i].rarity

);



}





console.log(

"======================"

);



}








// ============================================
// PLAYER DAMAGE / HEAL
// ============================================



export function damagePlayer(

amount:number

)

{


playerData.hp -= amount;




console.log(

"PLAYER DAMAGE "

+

amount

);





if(playerData.hp <=0)

{


playerData.hp=0;



console.log(

"PLAYER DIED"

);



}



}








export function healPlayer(

amount:number

)

{


playerData.hp += amount;



if(playerData.hp > playerData.maxHP)

playerData.hp = playerData.maxHP;



console.log(

"HEALED "

+

amount

);



}









// ============================================
// B BUTTON COMMAND SYSTEM
// ============================================



let consoleOpen=false;





export function pressB()

{


consoleOpen=!consoleOpen;



if(consoleOpen)

{


console.log(

"===================="

);



console.log(

" VR CONSOLE OPEN "

);



console.log(

"B BUTTON MENU"

);



console.log(

"1 Inventory"

);



console.log(

"2 Shop"

);



console.log(

"3 Stats"

);



console.log(

"4 Dungeon Debug"

);



console.log(

"===================="

);



}

else

{


console.log(

"CONSOLE CLOSED"

);



}



}









// ============================================
// QUICK COMMANDS
// ============================================



export function consoleCommand(

command:string

)

{


switch(command)

{


case "inventory":

showInventory();

break;



case "shop":

openShop();

break;



case "stats":

showStats();

break;



case "debug":

debugDungeon();

break;



case "heal":

healPlayer(100);

break;



default:


console.log(

"UNKNOWN COMMAND"

);



}



}

// ============================================
// SAVE SYSTEM
// ============================================


let saveData:any = null;





export function saveGame()

{


saveData =

{


player:

{


hp:playerData.hp,


gold:playerData.gold,


level:playerData.level,


xp:playerData.xp



},



inventory:[...inventory]



};






console.log(

"===================="

);



console.log(

"GAME SAVED"

);



console.log(

"Items Saved: "

+

inventory.length

);



console.log(

"Gold Saved: "

+

playerData.gold

);



console.log(

"===================="

);



}









export function loadGame()

{


if(!saveData)

{


console.log(

"NO SAVE DATA"

);



return;

}



playerData.hp = saveData.player.hp;

playerData.gold = saveData.player.gold;

playerData.level = saveData.player.level;

playerData.xp = saveData.player.xp;



inventory = saveData.inventory;




console.log(

"===================="

);



console.log(

"GAME LOADED"

);



console.log(

"===================="

);



}









// ============================================
// EXPERIENCE SYSTEM
// ============================================



export function addXP(

amount:number

)

{


playerData.xp += amount;



console.log(

"+"

+

amount

+

" XP"

);





let needed =

playerData.level * 100;



if(playerData.xp >= needed)

{


playerData.level++;


playerData.xp=0;



playerData.maxHP +=20;


playerData.hp=playerData.maxHP;


playerData.damage+=5;





console.log(

"LEVEL UP!"

);



console.log(

"LEVEL "

+

playerData.level

);



}



}









// ============================================
// ENEMY DEATH SYSTEM
// ============================================



export function killEnemy(

enemy:any

)

{


enemy.alive=false;



enemy.entity.destroy();



addXP(50);



playerData.gold +=

Math.floor(

Math.random()*50

)+10;





console.log(

"ENEMY DEFEATED"

);



}









// ============================================
// B BUTTON VR EVENT
// ============================================



function setupControls()

{


console.log(

"SETTING UP CONTROLS"

);






// Universal fallback console command


Events.onButtonPressed?.(

(button:any)=>{


if(button=="B")

{


pressB();



}



}



);







}









// ============================================
// GAME START
// ============================================


let gameStarted=false;





export async function startGame()

{


if(gameStarted)

{


console.log(

"GAME ALREADY RUNNING"

);



return;



}





gameStarted=true;





console.log(

"================================"

);



console.log(

" RETRO VOXEL DUNGEON "

);



console.log(

" STARTING GAME "

);



console.log(

"================================"

);







generateShop();





await createDungeon();





setupControls();






console.log(

"================================"

);



console.log(

" GAME READY "

);



console.log(

"B BUTTON = CONSOLE"

);



console.log(

"INVENTORY = 120 SLOTS"

);



console.log(

"ITEM DATABASE = "

+

items.length

);



console.log(

"================================"

);



}









// ============================================
// AUTO START
// ============================================


startGame();









// ============================================
// FINAL DEBUG COMMANDS
// ============================================


export function gameStatus()

{


console.log(

"============== STATUS =============="

);



console.log(

"HP: "

+

playerData.hp

+

"/"

+

playerData.maxHP

);



console.log(

"LEVEL: "

+

playerData.level

);



console.log(

"GOLD: "

+

playerData.gold

);



console.log(

"INVENTORY: "

+

inventory.length

+

"/"

+

MAX_INVENTORY

);



console.log(

"ENEMIES: "

+

enemies.length

);



console.log(

"CHESTS: "

+

chests.length

);



console.log(

"===================================="

);



}









// ============================================
// END OF DUNGEON.TS
// ============================================


console.log(

"RETRO VOXEL DUNGEON ENGINE LOADED"

);