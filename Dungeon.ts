// =====================================
// RETRO VOXEL DUNGEON RPG
// MEGA SCRIPT
// PART 1
// =====================================


// =====================================
// IMPORTS
// =====================================

import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { Player } from "./Yuu API/Player";
import { Events } from "./Yuu API/Events";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";




// =====================================
// GAME STATUS
// =====================================

let gameStarted = false;

let gameTime = 0;






// =====================================
// DEBUG CONSOLE SYSTEM
// =====================================


export let gameConsole:string[] = [];



function log(message:string)

{

    let entry =

    "[GAME] " + message;


    gameConsole.push(entry);



    console.log(entry);



    // keep console from growing forever

    if(gameConsole.length > 200)

    {

        gameConsole.shift();

    }


}





export function showConsole()

{

    console.log("======================");

    console.log("RETRO DUNGEON CONSOLE");

    console.log("======================");



    for(let msg of gameConsole)

    {

        console.log(msg);

    }


    console.log("======================");


}







export function clearConsole()

{

    gameConsole=[];


    log("Console cleared");


}







// =====================================
// PLAYER DATA
// =====================================


export let playerData =

{


    name:"Hero",


    level:1,


    xp:0,


    xpNeeded:100,



    hp:100,


    maxHP:100,



    damage:10,


    defense:0,


    speed:1,



    coins:0,



    alive:true



};







// =====================================
// PLAYER FUNCTIONS
// =====================================



export function healPlayer(amount:number)

{


    playerData.hp += amount;



    if(playerData.hp > playerData.maxHP)

    {

        playerData.hp = playerData.maxHP;

    }



    log(

        "Player healed +" + amount

    );



}








export function damagePlayer(amount:number)

{


    let damage =

    amount - playerData.defense;



    if(damage < 1)

    {

        damage = 1;

    }





    playerData.hp -= damage;



    log(

        "Player took " + damage + " damage"

    );





    if(playerData.hp <=0)

    {

        playerDeath();

    }



}








function playerDeath()

{


    playerData.hp = 0;


    playerData.alive=false;



    log(

        "PLAYER HAS DIED"

    );


}








export function addXP(amount:number)

{


    playerData.xp += amount;



    log(

        "+" + amount + " XP"

    );




    if(playerData.xp >= playerData.xpNeeded)

    {

        levelUp();

    }



}







function levelUp()

{


    playerData.level++;


    playerData.xp=0;



    playerData.xpNeeded +=100;



    playerData.maxHP +=20;


    playerData.damage +=5;



    playerData.hp = playerData.maxHP;



    log(

        "LEVEL UP! Level "

        +

        playerData.level

    );



}








export function addCoins(amount:number)

{


    playerData.coins += amount;



    log(

        "+" + amount + " coins"

    );



}








export function removeCoins(amount:number)

{


    playerData.coins -= amount;



    if(playerData.coins <0)

    {

        playerData.coins=0;

    }



}









// =====================================
// PLAYER DEBUG
// =====================================


export function showPlayerStats()

{


    console.log("===================");


    console.log("PLAYER STATS");


    console.log("===================");



    console.log(

    "Level: "

    +

    playerData.level

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

    "Damage: "

    +

    playerData.damage

    );



    console.log(

    "Defense: "

    +

    playerData.defense

    );



    console.log(

    "Coins: "

    +

    playerData.coins

    );



    console.log("===================");



}








// =====================================
// GAME START
// =====================================


export function startGame()

{


    if(gameStarted)

    {

        log("Game already running");

        return;

    }



    gameStarted=true;



    log(

    "RETRO VOXEL DUNGEON RPG STARTED"

    );



    log(

    "Player created"

    );



    log(

    "HP: 100"

    );



    log(

    "Inventory loading..."

    );



    log(

    "World loading..."

    );



}







// =====================================
// MAIN UPDATE LOOP
// =====================================


Events.onPhysicsUpdate(()=>{


    if(!gameStarted)

    {

        return;

    }



    gameTime++;



});




// =====================================
// END PART 1
// NEXT:
// ITEM DATABASE + 120 ITEM INVENTORY SYSTEM
// =====================================

// =====================================
// ITEM DATABASE SYSTEM
// PART 2
// =====================================



// =====================================
// ITEM TYPES
// =====================================


interface Item

{

    id:number;


    name:string;


    type:string;


    rarity:string;


    value:number;


    damage:number;


    defense:number;


    description:string;


}








// =====================================
// INVENTORY STORAGE
// =====================================


export let inventory:Item[]=[];



export let equipped =

{


    weapon:null as Item|null,


    armor:null as Item|null



};








// =====================================
// ITEM DATABASE
// 120 ITEMS
// =====================================


export const itemDatabase:Item[] = [



// =================
// COMMON WEAPONS
// =================


{
id:1,
name:"Rusty Sword",
type:"Weapon",
rarity:"Common",
value:25,
damage:5,
defense:0,
description:"An old damaged sword"
},


{
id:2,
name:"Iron Sword",
type:"Weapon",
rarity:"Common",
value:100,
damage:10,
defense:0,
description:"A basic iron blade"
},


{
id:3,
name:"Steel Sword",
type:"Weapon",
rarity:"Common",
value:200,
damage:15,
defense:0,
description:"Reliable steel weapon"
},


{
id:4,
name:"Bronze Axe",
type:"Weapon",
rarity:"Common",
value:150,
damage:13,
defense:0,
description:"A heavy bronze axe"
},


{
id:5,
name:"Hunter Bow",
type:"Weapon",
rarity:"Common",
value:175,
damage:12,
defense:0,
description:"A wooden hunting bow"
},


// =================
// ARMOR
// =================


{
id:6,
name:"Leather Armor",
type:"Armor",
rarity:"Common",
value:120,
damage:0,
defense:5,
description:"Light protection"
},


{
id:7,
name:"Iron Chestplate",
type:"Armor",
rarity:"Common",
value:250,
damage:0,
defense:10,
description:"Iron body armor"
},


{
id:8,
name:"Knight Boots",
type:"Armor",
rarity:"Common",
value:150,
damage:0,
defense:4,
description:"Old knight boots"
},


{
id:9,
name:"Wooden Shield",
type:"Armor",
rarity:"Common",
value:100,
damage:0,
defense:8,
description:"Basic shield"
},


{
id:10,
name:"Chain Armor",
type:"Armor",
rarity:"Common",
value:300,
damage:0,
defense:15,
description:"Chain protection"
},



// =================
// POTIONS
// =================


{
id:11,
name:"Small Health Potion",
type:"Potion",
rarity:"Common",
value:30,
damage:0,
defense:0,
description:"Restores 25 HP"
},


{
id:12,
name:"Large Health Potion",
type:"Potion",
rarity:"Uncommon",
value:100,
damage:0,
defense:0,
description:"Restores 75 HP"
},


{
id:13,
name:"Energy Potion",
type:"Potion",
rarity:"Rare",
value:250,
damage:0,
defense:0,
description:"Restores energy"
},


// =================
// MATERIALS
// =================


{
id:14,
name:"Ancient Coin",
type:"Material",
rarity:"Common",
value:10,
damage:0,
defense:0,
description:"Old dungeon currency"
},


{
id:15,
name:"Iron Ore",
type:"Material",
rarity:"Common",
value:20,
damage:0,
defense:0,
description:"Used for crafting"
},


{
id:16,
name:"Crystal Fragment",
type:"Material",
rarity:"Uncommon",
value:100,
damage:0,
defense:0,
description:"A magical crystal"
},


// =================
// RARE ITEMS
// =================


{
id:17,
name:"Shadow Blade",
type:"Weapon",
rarity:"Rare",
value:800,
damage:40,
defense:0,
description:"Dark enchanted sword"
},


{
id:18,
name:"Flame Sword",
type:"Weapon",
rarity:"Rare",
value:900,
damage:45,
defense:0,
description:"Burning sword"
},


{
id:19,
name:"Ice Spear",
type:"Weapon",
rarity:"Rare",
value:950,
damage:50,
defense:0,
description:"Frozen weapon"
},


{
id:20,
name:"Thunder Hammer",
type:"Weapon",
rarity:"Rare",
value:1200,
damage:60,
defense:0,
description:"Electric hammer"
},



// =================
// EPIC ITEMS
// =================


{
id:21,
name:"Dragon Slayer",
type:"Weapon",
rarity:"Epic",
value:5000,
damage:120,
defense:0,
description:"Legendary dragon weapon"
},


{
id:22,
name:"Void Armor",
type:"Armor",
rarity:"Epic",
value:6000,
damage:0,
defense:80,
description:"Armor from the void"
},


{
id:23,
name:"Phoenix Blade",
type:"Weapon",
rarity:"Epic",
value:7000,
damage:150,
defense:0,
description:"Reborn flame weapon"
},



// =================
// LEGENDARY
// =================


{
id:24,
name:"God Sword",
type:"Weapon",
rarity:"Legendary",
value:10000,
damage:300,
defense:0,
description:"Ultimate sword"
},


{
id:25,
name:"Ancient Crown",
type:"Artifact",
rarity:"Legendary",
value:15000,
damage:0,
defense:100,
description:"Lost king crown"
}



];




// =====================================
// GENERATE EXTRA ITEMS TO 120
// =====================================


for(let i=itemDatabase.length+1;i<=120;i++)

{


    itemDatabase.push(

    {

        id:i,

        name:"Dungeon Item "+i,

        type:"Artifact",

        rarity:

        i>100 ?

        "Legendary"

        :

        i>70 ?

        "Epic"

        :

        i>40 ?

        "Rare"

        :

        "Common",


        value:i*50,


        damage:

        i%5==0 ?

        i :

        0,


        defense:

        i%7==0 ?

        i :

        0,


        description:

        "Mysterious dungeon treasure"

    });


}




log(

"120 ITEM DATABASE LOADED"

);







// =====================================
// INVENTORY FUNCTIONS
// =====================================



export function addItem(item:Item)

{


    inventory.push(item);



    log(

    "ITEM FOUND: "

    +

    item.name

    );



}








export function removeItem(id:number)

{


    let index =

    inventory.findIndex(

    item=>item.id==id

    );




    if(index>=0)

    {


        let removed = inventory[index];


        inventory.splice(index,1);



        log(

        "REMOVED: "

        +

        removed.name

        );



    }



}








export function showInventory()

{


    console.log("================");


    console.log("INVENTORY");

    console.log("================");




    for(let item of inventory)

    {


        console.log(

        item.name

        +

        " | "

        +

        item.rarity

        );


    }



    console.log("================");



}







// =====================================
// EQUIP SYSTEM
// =====================================



export function equipItem(id:number)

{


    let item =

    inventory.find(

    x=>x.id==id

    );




    if(!item)

    {

        log("Item not found");

        return;

    }




    if(item.type=="Weapon")

    {


        equipped.weapon=item;


        playerData.damage += item.damage;


    }




    if(item.type=="Armor")

    {


        equipped.armor=item;


        playerData.defense += item.defense;


    }



    log(

    "EQUIPPED: "

    +

    item.name

    );



}







// =====================================
// END PART 2
// NEXT:
// SHOP SYSTEM + BUY/SELL
// =====================================

// =====================================
// SHOP SYSTEM
// PART 3
// =====================================



// =====================================
// SHOP STORAGE
// =====================================


export let shopInventory:Item[]=[];



let shopOpen=false;







// =====================================
// CREATE SHOP
// =====================================


export function createShop()

{


    shopInventory=[];



    // Add random items from database


    for(let i=0;i<15;i++)

    {


        let item =

        itemDatabase[

            Math.floor(

                Math.random()

                *

                itemDatabase.length

            )

        ];



        shopInventory.push(item);



    }



    log(

    "SHOP CREATED"

    );


}







// =====================================
// OPEN SHOP
// =====================================


export function openShop()

{


    shopOpen=true;



    log(

    "SHOP OPENED"

    );



    showShop();



}







// =====================================
// CLOSE SHOP
// =====================================


export function closeShop()

{


    shopOpen=false;



    log(

    "SHOP CLOSED"

    );



}








// =====================================
// DISPLAY SHOP
// =====================================


export function showShop()

{


    console.log("====================");


    console.log("DUNGEON SHOP");


    console.log("====================");



    for(let i=0;i<shopInventory.length;i++)

    {


        let item = shopInventory[i];



        console.log(

        "["

        +

        i

        +

        "] "

        +

        item.name

        +

        " $"

        +

        item.value

        );



    }



    console.log("====================");



}









// =====================================
// BUY ITEM
// =====================================


export function buyItem(index:number)

{


    if(!shopOpen)

    {


        log(

        "Shop is closed"

        );


        return;


    }





    let item =

    shopInventory[index];





    if(!item)

    {

        log(

        "Invalid shop item"

        );


        return;

    }





    if(playerData.coins < item.value)

    {


        log(

        "Not enough coins"

        );


        return;


    }







    removeCoins(

        item.value

    );




    addItem(

        item

    );





    log(

    "BOUGHT: "

    +

    item.name

    );



}









// =====================================
// SELL ITEM
// =====================================


export function sellItem(id:number)

{


    let itemIndex =

    inventory.findIndex(

        x=>x.id==id

    );




    if(itemIndex <0)

    {


        log(

        "Item not found"

        );


        return;


    }






    let item =

    inventory[itemIndex];






    inventory.splice(

        itemIndex,

        1

    );






    let money =

    Math.floor(

        item.value * 0.5

    );






    addCoins(

        money

    );





    log(

    "SOLD "

    +

    item.name

    +

    " for "

    +

    money

    +

    " coins"

    );



}








// =====================================
// BLACKSMITH UPGRADES
// =====================================



export function upgradeWeapon()

{


    if(!equipped.weapon)

    {


        log(

        "No weapon equipped"

        );


        return;


    }






    let cost =

    500;



    if(playerData.coins < cost)

    {


        log(

        "Need 500 coins"

        );


        return;


    }






    removeCoins(cost);





    equipped.weapon.damage +=10;



    playerData.damage +=10;






    log(

    "Weapon upgraded +10 damage"

    );



}








export function upgradeArmor()

{


    if(!equipped.armor)

    {


        log(

        "No armor equipped"

        );


        return;


    }





    let cost =

    500;




    if(playerData.coins < cost)

    {


        log(

        "Need 500 coins"

        );


        return;


    }







    removeCoins(cost);




    equipped.armor.defense +=10;



    playerData.defense +=10;






    log(

    "Armor upgraded +10 defense"

    );



}








// =====================================
// RANDOM SHOP REFRESH
// =====================================



export function refreshShop()

{


    createShop();



    log(

    "SHOP INVENTORY REFRESHED"

    );


}








// =====================================
// SHOP DEBUG
// =====================================



export function shopInfo()

{


    console.log("================");


    console.log("SHOP STATUS");


    console.log("================");



    console.log(

    "Items: "

    +

    shopInventory.length

    );



    console.log(

    "Open: "

    +

    shopOpen

    );



    console.log("================");



}







// =====================================
// INITIAL SHOP LOAD
// =====================================


createShop();





log(

"SHOP SYSTEM READY"

);




// =====================================
// END PART 3
// NEXT:
// VOXEL WORLD GENERATOR + MAZE + BUILDING SYSTEM
// =====================================

// =====================================
// VOXEL DUNGEON WORLD SYSTEM
// PART 4
// =====================================





// =====================================
// DUNGEON SETTINGS
// =====================================


const mazeWidth = 31;

const mazeHeight = 31;

const blockSize = 8;



let maze:number[][]=[];





// =====================================
// WORLD STORAGE
// =====================================


export let worldBlocks:Entity[]=[];



export let dungeonObjects:Entity[]=[];







// =====================================
// CREATE VOXEL CUBE
// =====================================


function createVoxel(

position:Vector3,

scale:Vector3,

color:Color,

body:string="Static"

):Entity

{


    let block =

    spawnPrimitive.cube(

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



        body,



        undefined

    );



    worldBlocks.push(block);



    return block;


}









// =====================================
// WALL COLOR
// =====================================


function getWallColor(

x:number,

z:number

):Color

{


    let pattern =

    (x+z)%5;



    if(pattern==0)

    {

        return new Color(

        0.45,

        0.35,

        0.25

        );

    }




    if(pattern==1)

    {

        return new Color(

        0.35,

        0.28,

        0.20

        );

    }




    if(pattern==2)

    {

        return new Color(

        0.25,

        0.25,

        0.25

        );

    }




    if(pattern==3)

    {

        return new Color(

        0.15,

        0.12,

        0.10

        );

    }




    return new Color(

    0.55,

    0.40,

    0.30

    );



}








// =====================================
// FLOOR COLOR
// =====================================


function getFloorColor(

x:number,

z:number

):Color

{


    if((x+z)%2==0)

    {

        return new Color(

        0.15,

        0.12,

        0.10

        );


    }



    return new Color(

    0.08,

    0.08,

    0.08

    );



}








// =====================================
// GENERATE RANDOM MAZE
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







    for(let x=1;x<mazeWidth-1;x+=2)

    {


        for(let z=1;z<mazeHeight-1;z+=2)

        {


            maze[x][z]=0;




            // open paths


            if(x<mazeWidth-2)

            {

                maze[x+1][z]=0;

            }



            if(z<mazeHeight-2)

            {

                maze[x][z+1]=0;

            }



            if(Math.random()<0.5)

            {

                maze[x-1][z]=0;

            }



            if(Math.random()<0.5)

            {

                maze[x][z-1]=0;

            }



        }


    }







    // player starting room


    maze[1][1]=0;

    maze[2][1]=0;

    maze[1][2]=0;







    // boss room


    maze[mazeWidth-2][mazeHeight-2]=0;

    maze[mazeWidth-3][mazeHeight-2]=0;






    log(

    "MAZE GENERATED"

    );


}









// =====================================
// BUILD WORLD
// =====================================


export async function createDungeon()

{


    generateMaze();



    log(

    "BUILDING VOXEL DUNGEON"

    );





    let offsetX =

    -(mazeWidth*blockSize)/2;




    let offsetZ =

    -(mazeHeight*blockSize)/2;








    for(let x=0;x<mazeWidth;x++)

    {


        for(let z=0;z<mazeHeight;z++)

        {



            let worldX =

            x*blockSize+offsetX;



            let worldZ =

            z*blockSize+offsetZ;








            // WALL


            if(maze[x][z]==1)

            {



                createVoxel(

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



                    getWallColor(

                    x,

                    z

                    ),



                    "Static"

                );




            }









            // FLOOR


            else

            {



                createVoxel(

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



                    getFloorColor(

                    x,

                    z

                    ),



                    "Static"

                );






                // spawn things


                if(

                !(x==1 && z==1)

                )

                {


                    spawnDungeonObjects(

                    worldX,

                    worldZ

                    );


                }





            }






        }


    }









    Player.position.set(

        new Vector3(

        offsetX+blockSize,

        2,

        offsetZ+blockSize

        )

    );






    log(

    "DUNGEON CREATED"

    );



    log(

    "PLAYER SPAWNED"

    );



}









// =====================================
// RANDOM DUNGEON OBJECTS
// =====================================


function spawnDungeonObjects(

x:number,

z:number

)

{


    let chance =

    Math.random();





    if(chance < 0.12)

    {


        createEnemy(

            new Vector3(

            x,

            2,

            z

            )

        );


    }




    else if(chance < 0.20)

    {


        createChest(

            new Vector3(

            x,

            1,

            z

            )

        );


    }




}






// =====================================
// END PART 4
// NEXT:
// ENEMY SYSTEM + DYNAMIC AI + COMBAT
// =====================================

// =====================================
// ENEMY SYSTEM
// PART 5
// =====================================





// =====================================
// ENEMY STORAGE
// =====================================


export let enemies:any[]=[];






// =====================================
// ENEMY SETTINGS
// =====================================


const enemySpeed = 1.5;


const enemyDetectRange = 40;


const enemyAttackRange = 3;


const enemyAttackDelay = 120;









// =====================================
// ENEMY DATABASE
// =====================================


const enemyTypes =

[


{

name:"Goblin",

hp:50,

damage:8,

color:new Color(

0,

1,

0

)

},



{

name:"Skeleton",

hp:80,

damage:12,

color:new Color(

0.8,

0.8,

0.8

)

},




{

name:"Orc",

hp:150,

damage:20,

color:new Color(

0.3,

0.8,

0.2

)

},





{

name:"Shadow Beast",

hp:250,

damage:35,

color:new Color(

0.2,

0,

0.4

)

},






{

name:"Cyber Demon",

hp:500,

damage:50,

color:new Color(

1,

0,

0

)

}




];









// =====================================
// CREATE ENEMY
// =====================================


export function createEnemy(

position:Vector3

)

{


    let type =

    enemyTypes[

        Math.floor(

            Math.random()

            *

            enemyTypes.length

        )

    ];






    let enemy =

    spawnPrimitive.cube(

        position,



        new Vector3(

            1,

            2,

            1

        ),




        Quaternion.fromEuler(

            new Vector3(

            0,

            0,

            0

            )

        ),





        type.color,




        1,




        true,




        "Dynamic",




        undefined

    );









    let data =

    {


        entity:enemy,


        name:type.name,


        hp:type.hp,


        maxHP:type.hp,


        damage:type.damage,


        speed:enemySpeed,


        attackTimer:0,


        alive:true



    };






    enemies.push(data);






    log(

    "ENEMY SPAWNED: "

    +

    data.name

    );




    return enemy;


}









// =====================================
// DAMAGE ENEMY
// =====================================


export function damageEnemy(

enemy:any,

amount:number

)

{


    enemy.hp -= amount;



    log(

    enemy.name

    +

    " took "

    +

    amount

    +

    " damage"

    );





    if(enemy.hp<=0)

    {


        killEnemy(enemy);


    }



}







// =====================================
// KILL ENEMY
// =====================================


function killEnemy(

enemy:any

)

{


    enemy.alive=false;



    if(enemy.entity)

    {

        enemy.entity.destroy();

    }







    log(

    enemy.name

    +

    " defeated!"

    );






    // XP DROP


    addXP(

        25 +

        Math.floor(

        Math.random()*50

        )

    );







    // COIN DROP


    let coins =

    5 +

    Math.floor(

    Math.random()*100

    );



    addCoins(coins);







    // ITEM DROP


    if(Math.random()<0.25)

    {


        let item =

        itemDatabase[

            Math.floor(

            Math.random()

            *

            itemDatabase.length

            )

        ];




        addItem(item);




        log(

        "ENEMY DROPPED "

        +

        item.name

        );



    }




}











// =====================================
// ENEMY AI UPDATE
// =====================================


function updateEnemies()

{


    if(!playerData.alive)

    {

        return;

    }







    let playerPos =

    Player.position;









    for(let enemy of enemies)

    {


        if(!enemy.alive)

        {

            continue;

        }







        let entity =

        enemy.entity;






        if(!entity)

        {

            continue;

        }







        let pos =

        entity.pos;








        let dx =

        playerPos.x - pos.x;





        let dz =

        playerPos.z - pos.z;






        let distance =

        Math.sqrt(

            dx*dx +

            dz*dz

        );









        // CHASE PLAYER


        if(distance < enemyDetectRange)

        {


            let dirX =

            dx / distance;



            let dirZ =

            dz / distance;








            if(distance > enemyAttackRange)

            {



                entity.velocity =

                new Vector3(


                    dirX *

                    enemy.speed,



                    entity.velocity.y,



                    dirZ *

                    enemy.speed


                );



            }



            else

            {


                entity.velocity =

                new Vector3(

                0,

                entity.velocity.y,

                0

                );





                attackPlayer(enemy);



            }





        }



        else

        {


            entity.velocity =

            new Vector3(

            0,

            entity.velocity.y,

            0

            );



        }







    }



}









// =====================================
// ENEMY ATTACK
// =====================================


function attackPlayer(

enemy:any

)

{


    if(enemy.attackTimer>0)

    {


        enemy.attackTimer--;

        return;


    }





    log(

    enemy.name

    +

    " attacks player!"

    );






    damagePlayer(

    enemy.damage

    );







    enemy.attackTimer=

    enemyAttackDelay;



}









// =====================================
// ENEMY GAME LOOP
// =====================================


Events.onPhysicsUpdate(()=>{


    updateEnemies();



});







// =====================================
// DEBUG
// =====================================


export function showEnemies()

{


    console.log("================");


    console.log("ENEMIES");

    console.log("================");




    for(let e of enemies)

    {


        console.log(

        e.name

        +

        " HP: "

        +

        e.hp

        );


    }




}






// =====================================
// END PART 5
// NEXT:
// CHEST SYSTEM + LOOT + B BUTTON INVENTORY
// =====================================

// =====================================
// CHEST + LOOT SYSTEM
// PART 6
// =====================================







// =====================================
// CHEST STORAGE
// =====================================


export let chests:Entity[]=[];





// =====================================
// CHEST SETTINGS
// =====================================


const chestOpenDistance = 3;









// =====================================
// CREATE CHEST
// =====================================


export function createChest(

position:Vector3

)

{


    let chest =

    spawnPrimitive.cube(

        position,



        new Vector3(

        1.5,

        1,

        1.5

        ),




        Quaternion.fromEuler(

            new Vector3(

            0,

            0,

            0

            )

        ),





        new Color(

        1,

        0.8,

        0

        ),




        1,




        true,




        "Static",




        undefined

    );






    chests.push(chest);






    attachChestInteraction(chest);






    log(

    "TREASURE CHEST CREATED"

    );






    return chest;



}









// =====================================
// CHEST INTERACTION
// =====================================


function attachChestInteraction(

chest:Entity

)

{


    if(!chest.trigger)

    {


        log(

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

        {

            return;

        }






        let distance =

        Player.position.distanceTo(

            chest.pos

        );








        if(distance <= chestOpenDistance)

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


    log(

    "================"

    );



    log(

    "CHEST OPENED"

    );



    log(

    "================"

    );









    let amount =

    1 +

    Math.floor(

    Math.random()*5

    );








    for(let i=0;i<amount;i++)

    {



        let item =

        itemDatabase[

            Math.floor(

            Math.random()

            *

            itemDatabase.length

            )

        ];






        addItem(item);





        log(

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









    let coins =

    50 +

    Math.floor(

    Math.random()*500

    );





    addCoins(coins);






    log(

    "CHEST GAVE "

    +

    coins

    +

    " COINS"

    );









    chest.destroy();






}









// =====================================
// RANDOM LOOT CHEST
// =====================================


export function spawnRandomChest()

{


    let x =

    Math.random()*100-50;



    let z =

    Math.random()*100-50;





    createChest(

        new Vector3(

        x,

        1,

        z

        )

    );



}









// =====================================
// ITEM PICKUP SYSTEM
// =====================================


export function pickupItem(

item:Item

)

{


    addItem(item);



    log(

    "PICKED UP "

    +

    item.name

    );



}









// =====================================
// INVENTORY UI STATE
// =====================================


let inventoryMenuOpen=false;









// =====================================
// OPEN INVENTORY
// =====================================


export function openInventory()

{


    inventoryMenuOpen=true;



    console.log("====================");


    console.log("INVENTORY MENU");


    console.log("====================");




    for(let i=0;i<inventory.length;i++)

    {



        console.log(

        "["

        +

        i

        +

        "] "

        +

        inventory[i].name

        +

        " | "

        +

        inventory[i].rarity

        );



    }





    console.log("====================");



}









// =====================================
// CLOSE INVENTORY
// =====================================


export function closeInventory()

{


    inventoryMenuOpen=false;



    log(

    "INVENTORY CLOSED"

    );



}








// =====================================
// TOGGLE INVENTORY
// B BUTTON
// =====================================


export function toggleInventory()

{


    if(inventoryMenuOpen)

    {


        closeInventory();


    }

    else

    {


        openInventory();


    }



}









// =====================================
// INVENTORY CONTROLLER
// =====================================



export function useInventoryItem(

index:number

)

{


    let item =

    inventory[index];




    if(!item)

    {

        log(

        "NO ITEM"

        );

        return;

    }







    if(item.type=="Potion")

    {


        playerData.hp += 50;



        if(playerData.hp > playerData.maxHP)

        {

            playerData.hp=

            playerData.maxHP;

        }





        removeItem(

        item.id

        );






        log(

        "USED "

        +

        item.name

        );



    }







}









// =====================================
// B BUTTON INPUT
// =====================================


Events.onKeyDown(()=>{


    toggleInventory();



});









// =====================================
// CHEST DEBUG
// =====================================


export function showChests()

{


    console.log(

    "CHESTS: "

    +

    chests.length

    );



}









// =====================================
// END PART 6
// NEXT:
// PLAYER SYSTEM + HP + XP + LEVELS + COINS + SAVE DATA
// =====================================

// =====================================
// PLAYER RPG SYSTEM
// PART 7
// =====================================







// =====================================
// PLAYER DATA
// =====================================


export let playerData =

{


    name:"Hero",



    level:1,


    xp:0,


    xpNeeded:100,



    hp:100,


    maxHP:100,



    mana:50,


    maxMana:50,



    damage:10,


    defense:5,



    coins:100,



    alive:true



};









// =====================================
// EQUIPMENT
// =====================================


export let equipped =

{


    weapon:null as any,


    armor:null as any,


    helmet:null as any


};









// =====================================
// XP SYSTEM
// =====================================


export function addXP(

amount:number

)

{


    if(!playerData.alive)

    {

        return;

    }







    playerData.xp += amount;







    log(

    "+"

    +

    amount

    +

    " XP"

    );









    if(playerData.xp >= playerData.xpNeeded)

    {


        levelUp();


    }



}









// =====================================
// LEVEL UP
// =====================================


function levelUp()

{


    playerData.level++;




    playerData.xp=0;



    playerData.xpNeeded +=100;







    playerData.maxHP +=25;



    playerData.hp=

    playerData.maxHP;







    playerData.damage +=5;



    playerData.defense +=3;






    log(

    "================"

    );



    log(

    "LEVEL UP!"

    );



    log(

    "LEVEL "

    +

    playerData.level

    );



    log(

    "================"

    );



}









// =====================================
// COIN SYSTEM
// =====================================


export function addCoins(

amount:number

)

{


    playerData.coins += amount;



    log(

    "+"

    +

    amount

    +

    " coins"

    );



}









export function removeCoins(

amount:number

)

{


    playerData.coins -= amount;



    if(playerData.coins < 0)

    {

        playerData.coins=0;

    }



}









// =====================================
// PLAYER DAMAGE
// =====================================


export function damagePlayer(

amount:number

)

{


    if(!playerData.alive)

    {

        return;

    }






    let damage =

    amount -

    playerData.defense;






    if(damage < 1)

    {

        damage=1;

    }







    playerData.hp -= damage;







    log(

    "PLAYER TAKES "

    +

    damage

    +

    " DAMAGE"

    );






    log(

    "HP "

    +

    playerData.hp

    +

    "/"

    +

    playerData.maxHP

    );








    if(playerData.hp<=0)

    {


        playerDeath();


    }



}









// =====================================
// HEAL PLAYER
// =====================================


export function healPlayer(

amount:number

)

{


    playerData.hp += amount;





    if(playerData.hp >

    playerData.maxHP)

    {


        playerData.hp=

        playerData.maxHP;


    }







    log(

    "HEALED "

    +

    amount

    );



}









// =====================================
// PLAYER ATTACK
// =====================================


export function playerAttack(

enemy:any

)

{


    if(!enemy)

    {

        return;

    }







    let damage =

    playerData.damage;








    if(equipped.weapon)

    {

        damage +=

        equipped.weapon.damage;

    }








    damageEnemy(

        enemy,

        damage

    );








    log(

    "ATTACK DEALT "

    +

    damage

    );



}









// =====================================
// PLAYER DEATH
// =====================================


function playerDeath()

{


    playerData.alive=false;



    log(

    "================"

    );



    log(

    "YOU DIED"

    );



    log(

    "================"

    );







    // lose coins


    playerData.coins =

    Math.floor(

    playerData.coins*0.5

    );





}









// =====================================
// RESPAWN PLAYER
// =====================================


export function respawnPlayer()

{


    playerData.alive=true;



    playerData.hp=

    playerData.maxHP;



    Player.position.set(

        new Vector3(

        0,

        3,

        0

        )

    );





    log(

    "PLAYER RESPAWNED"

    );



}









// =====================================
// PLAYER STATUS
// =====================================


export function showPlayerStats()

{


    console.log("===================");


    console.log("PLAYER STATUS");


    console.log("===================");



    console.log(

    "Level: "

    +

    playerData.level

    );



    console.log(

    "XP: "

    +

    playerData.xp

    +

    "/"

    +

    playerData.xpNeeded

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

    "Damage: "

    +

    playerData.damage

    );



    console.log(

    "Defense: "

    +

    playerData.defense

    );



    console.log(

    "Coins: "

    +

    playerData.coins

    );



    console.log("===================");



}









// =====================================
// SAVE DATA
// =====================================


let saveData:any={};







export function saveGame()

{


    saveData =

    {


        player:

        playerData,



        inventory:

        inventory,



        equipment:

        equipped



    };





    log(

    "GAME SAVED"

    );



}








// =====================================
// LOAD DATA
// =====================================


export function loadGame()

{


    if(!saveData.player)

    {


        log(

        "NO SAVE FOUND"

        );


        return;


    }






    playerData=

    saveData.player;




    inventory=

    saveData.inventory;




    equipped=

    saveData.equipment;






    log(

    "GAME LOADED"

    );



}









// =====================================
// AUTO SAVE TIMER
// =====================================


let saveTimer=0;



Events.onPhysicsUpdate(()=>{


    saveTimer++;



    if(saveTimer>3600)

    {


        saveGame();



        saveTimer=0;


    }



});









// =====================================
// END PART 7
// NEXT:
// FINAL PART — GAME STARTUP + FULL DEBUG CONSOLE + CONTROLS
// =====================================

// =====================================
// GAME STARTUP SYSTEM
// PART 8 FINAL
// =====================================







// =====================================
// GAME STATE
// =====================================


let gameStarted=false;


let gameLoaded=false;








// =====================================
// DEBUG CONSOLE
// =====================================


export function gameConsole(

command:string

)

{


    console.log(

    "COMMAND: "

    +

    command

    );







    switch(command)

    {




        case "stats":


            showPlayerStats();

        break;





        case "inventory":


            openInventory();

        break;





        case "shop":


            openShop();

        break;





        case "save":


            saveGame();

        break;





        case "load":


            loadGame();

        break;





        case "enemies":


            showEnemies();

        break;





        case "chests":


            showChests();

        break;





        case "refreshshop":


            refreshShop();

        break;





        case "spawnchest":


            spawnRandomChest();

        break;





        case "help":


            console.log("===================");


            console.log("COMMAND LIST");


            console.log("===================");


            console.log(
            "stats"
            );


            console.log(
            "inventory"
            );


            console.log(
            "shop"
            );


            console.log(
            "save"
            );


            console.log(
            "load"
            );


            console.log(
            "enemies"
            );


            console.log(
            "chests"
            );


            console.log(
            "spawnchest"
            );


            console.log(
            "refreshshop"
            );


            console.log("===================");


        break;





        default:


            console.log(

            "UNKNOWN COMMAND"

            );


        break;



    }



}









// =====================================
// GAME INITIALIZATION
// =====================================


export async function startGame()

{


    if(gameStarted)

    {


        log(

        "GAME ALREADY RUNNING"

        );


        return;


    }






    gameStarted=true;






    console.log("==============================");


    console.log(" RETRO VOXEL DUNGEON RPG ");


    console.log("==============================");






    log(

    "BOOTING SYSTEM..."

    );







    // create world


    await createDungeon();








    // create shop


    createShop();







    // starter items


    addItem(

        itemDatabase[0]

    );



    addItem(

        itemDatabase[5]

    );






    addCoins(

    500

    );







    gameLoaded=true;






    console.log("==============================");


    console.log(" GAME READY ");


    console.log("==============================");







    showPlayerStats();





}









// =====================================
// GAME LOOP MANAGER
// =====================================


Events.onPhysicsUpdate(()=>{


    if(!gameLoaded)

    {

        return;

    }






    // future systems


});









// =====================================
// RESET EVERYTHING
// =====================================


export function resetGame()

{


    enemies=[];


    chests=[];


    inventory=[];


    worldBlocks=[];


    dungeonObjects=[];





    playerData.level=1;


    playerData.xp=0;


    playerData.hp=100;


    playerData.maxHP=100;


    playerData.coins=100;







    log(

    "GAME RESET"

    );



}









// =====================================
// FINAL DEBUG
// =====================================


export function fullGameStatus()

{


    console.log("============================");


    console.log("RETRO VOXEL STATUS");


    console.log("============================");




    console.log(

    "World Blocks: "

    +

    worldBlocks.length

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

    "Inventory: "

    +

    inventory.length

    );





    console.log(

    "Coins: "

    +

    playerData.coins

    );





    console.log("============================");



}









// =====================================
// START MESSAGE
// =====================================


console.log(

"================================"

);



console.log(

" RETRO VOXEL DUNGEON RPG LOADED "

);



console.log(

" Type help for commands "

);



console.log(

"================================"

);



// =====================================
// END OF MEGA SCRIPT
// =====================================