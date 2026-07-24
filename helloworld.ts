import { Async } from "./Yuu API/Async";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { inWorldConsole } from "./Yuu API/Console";
import { registerStart } from "./Yuu API/RegisterStart";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";
import { Controller } from "./Yuu API/Controller";
import { Entity } from "./Yuu API/Entity";
import { Player } from "./Yuu API/Player";
import { Raycast } from "./Yuu API/Raycast";
import { Events } from "./Yuu API/Events";


registerStart(start);



// =====================================
// GAME DATA
// =====================================

const locations = [

    "Dark Cave",
    "Ancient Temple",
    "Crystal Cavern",
    "Lost Library",
    "Forgotten Armory",
    "Frozen Chamber"

];



const enemyTypes = [

    {
        name:"Goblin",
        hp:40,
        damage:8
    },

    {
        name:"Skeleton",
        hp:60,
        damage:12
    },

    {
        name:"Orc",
        hp:100,
        damage:20
    },

    {
        name:"Shadow Beast",
        hp:150,
        damage:25
    }

];



const weaponDrops = [

    {
        name:"Iron Sword",
        damage:10
    },

    {
        name:"Flame Blade",
        damage:20
    },

    {
        name:"Crystal Axe",
        damage:35
    },

    {
        name:"Dragon Slayer",
        damage:50
    }

];



const bosses = [

    {
        name:"Dragon",
        hp:300,
        damage:35
    },

    {
        name:"Demon Lord",
        hp:450,
        damage:45
    },

    {
        name:"Ancient Golem",
        hp:500,
        damage:30
    }

];




// =====================================
// PLAYER
// =====================================

let player = {

    level:1,

    hp:100,

    maxHp:100,

    damage:10,

    xp:0,

    gold:0,


    weapon:
    {
        name:"Rusty Sword",
        damage:10
    },


    inventory:
    [
        "Health Potion",
        "Health Potion"
    ],


    position:
    new Vector3(
        0,
        1,
        0
    )

};




// =====================================
// HELPERS
// =====================================

function random(list:any[])
{

    return list[
        Math.floor(
            Math.random()*list.length
        )
    ];

}




// =====================================
// 3D SPAWN SYSTEM
// =====================================

function spawnCube(

    position:Vector3,

    scale:Vector3,

    color:Color

): Entity
{

    return spawnPrimitive.cube(

        position,

        scale,

        Quaternion.fromEuler(

            new Vector3(

                0,

                Math.random()*Math.PI,

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
// INTERACTION OBJECT STORAGE
// =====================================

let treasureEntities: Entity[] = [];

let enemyEntities: Entity[] = [];

let weaponEntities: Entity[] = [];

let doorEntities: Entity[] = [];




// =====================================
// ENEMY AI STORAGE
// =====================================

let enemyAI:any[] = [];




// =====================================
// REGISTER OBJECTS
// =====================================


function registerTreasure(entity:Entity)
{
    treasureEntities.push(entity);
}




function registerEnemy(entity:Entity)
{

    enemyEntities.push(entity);



    enemyAI.push({

        entity:entity,


        speed:0.025,


        direction:
        new Vector3(

            Math.random()-0.5,

            0,

            Math.random()-0.5

        ),


        chase:false,


        attackTimer:0,


        home:
        entity.pos

    });


}





function registerWeapon(entity:Entity)
{
    weaponEntities.push(entity);
}





function registerDoor(entity:Entity)
{
    doorEntities.push(entity);
}






// =====================================
// SPAWN PAD
// =====================================

function createSpawnPoint()
{

    spawnCube(

        new Vector3(

            0,

            0.1,

            0

        ),


        new Vector3(

            3,

            .2,

            3

        ),


        new Color(

            0,

            1,

            0

        )

    );



    console.log(

        "Spawn point created"

    );

}

// =====================================
// DUNGEON ROOM BUILDER
// =====================================

async function createRoom(room:number)
{

    let offset =
    room * 14;



    console.log(
        "Building room "
        +
        room
    );




    // FLOOR

    for(
        let x=-6;
        x<=6;
        x++
    )
    {

        for(
            let z=-6;
            z<=6;
            z++
        )
        {

            spawnCube(

                new Vector3(

                    offset+x,

                    0,

                    z

                ),


                new Vector3(

                    1,

                    .2,

                    1

                ),


                new Color(

                    .25,

                    .25,

                    .25

                )

            );

        }

    }






    // WALLS

    for(
        let x=-6;
        x<=6;
        x++
    )
    {

        spawnCube(

            new Vector3(

                offset+x,

                3,

                -6

            ),


            new Vector3(

                1,

                6,

                1

            ),


            new Color(

                .5,

                .5,

                .5

            )

        );




        spawnCube(

            new Vector3(

                offset+x,

                3,

                6

            ),


            new Vector3(

                1,

                6,

                1

            ),


            new Color(

                .5,

                .5,

                .5

            )

        );

    }





    // =================================
    // DOOR INSIDE ROOM
    // =================================


    let door =

    spawnCube(

        new Vector3(

            offset+5,

            1.5,

            0

        ),


        new Vector3(

            2,

            3,

            .5

        ),


        new Color(

            .4,

            .2,

            0

        )

    );



    registerDoor(door);





    // =================================
    // TREASURE CHEST
    // =================================


    if(Math.random()<0.5)
    {

        let chest =

        spawnCube(

            new Vector3(

                offset-3,

                1,

                0

            ),


            new Vector3(

                1,

                1,

                1

            ),


            new Color(

                1,

                .8,

                0

            )

        );


        registerTreasure(chest);

    }






    // =================================
    // MOVING ENEMY SPAWN
    // =================================


    if(Math.random()<0.7)
    {

        let enemy =

        spawnCube(

            new Vector3(

                offset+3,

                1,

                2

            ),


            new Vector3(

                1,

                2,

                1

            ),


            new Color(

                1,

                0,

                0

            )

        );



        registerEnemy(enemy);



        console.log(

            "Enemy AI activated"

        );

    }




    await Async.wait(50);

}

// =====================================
// ENEMY AI SYSTEM
// =====================================


function updateEnemyAI()
{

    let playerPos =

    Player.position.get()

    ??

    Vector3.zero;



    for(
        let ai of enemyAI
    )
    {

        let enemy =
        ai.entity;



        if(!enemy)
        {
            continue;
        }




        let enemyPos =
        enemy.pos;



        let distance =

        enemyPos.distanceTo(

            playerPos

        );





        // =============================
        // DETECT PLAYER
        // =============================


        if(
            distance < 8
        )
        {

            ai.chase = true;


        }
        else
        {

            ai.chase = false;

        }






        // =============================
        // CHASE PLAYER
        // =============================


        if(
            ai.chase
        )
        {

            let direction =

            new Vector3(

                playerPos.x - enemyPos.x,

                0,

                playerPos.z - enemyPos.z

            );



            let length =

            Math.sqrt(

                direction.x * direction.x

                +

                direction.z * direction.z

            );



            if(length > 0)
            {

                direction.x /= length;

                direction.z /= length;


                enemy.pos =

                new Vector3(

                    enemyPos.x +

                    direction.x *

                    ai.speed,


                    enemyPos.y,


                    enemyPos.z +

                    direction.z *

                    ai.speed

                );

            }



            console.log(

                "⚔ Enemy chasing player"

            );

        }







        // =============================
        // RANDOM PATROL
        // =============================


        else
        {

            if(
                Math.random()<0.01
            )
            {

                ai.direction =

                new Vector3(

                    Math.random()-0.5,

                    0,

                    Math.random()-0.5

                );

            }



            enemy.pos =

            new Vector3(

                enemyPos.x +

                ai.direction.x *

                ai.speed,


                enemyPos.y,


                enemyPos.z +

                ai.direction.z *

                ai.speed

            );

        }







        // =============================
        // ATTACK PLAYER
        // =============================


        if(
            distance < 2
        )
        {

            if(
                ai.attackTimer <= 0
            )
            {

                player.hp -= 5;



                console.log(

                    "👹 Enemy attacks! HP: "

                    +

                    player.hp

                );



                ai.attackTimer = 60;

            }

        }




        if(
            ai.attackTimer > 0
        )
        {

            ai.attackTimer--;

        }


    }

}

// =====================================
// VR INTERACTION SYSTEM
// =====================================


// =====================================
// FIND OBJECT PLAYER IS AIMING AT
// =====================================

function getLookedAtEntity(): Entity | undefined
{

    let handPosition =

    Player.rightHand.position.get()

    ??

    Vector3.zero;



    let handDirection =

    Player.rightHand.forward.get()

    ??

    Vector3.zero;





    let hit =

    Raycast.directional(

        handPosition,

        handDirection,

        5,

        {
            getEntity:true
        }

    );



    return hit?.entity;

}





// =====================================
// CHEST INTERACTION
// =====================================

function openChest(entity:Entity)
{

    let index =

    treasureEntities.indexOf(entity);



    if(index >= 0)
    {

        treasureEntities.splice(

            index,

            1

        );



        player.gold += 50;



        player.inventory.push(

            "Health Potion"

        );



        console.log(

            "💰 Chest opened!"

        );



        console.log(

            "+50 Gold"

        );



        entity.destroy();

    }

}







// =====================================
// ENEMY INTERACTION
// =====================================

function attackEnemy(entity:Entity)
{

    let index =

    enemyEntities.indexOf(entity);



    if(index >= 0)
    {


        enemyEntities.splice(

            index,

            1

        );



        enemyAI = enemyAI.filter(

            ai => ai.entity != entity

        );



        console.log(

            "⚔ Enemy encountered!"

        );



        let enemy =

        random(enemyTypes);



        battle({

            name:enemy.name,

            hp:enemy.hp,

            damage:enemy.damage

        });



        entity.destroy();

    }

}






// =====================================
// WEAPON PICKUP
// =====================================

function pickupWeapon(entity:Entity)
{

    let index =

    weaponEntities.indexOf(entity);



    if(index >= 0)
    {


        weaponEntities.splice(

            index,

            1

        );



        let weapon =

        random(weaponDrops);



        player.weapon =

        weapon;



        console.log(

            "🗡 Equipped "

            +

            weapon.name

        );



        entity.destroy();

    }

}

// =====================================
// DOOR INTERACTION
// =====================================

function openDoor(entity:Entity)
{

    let index =

    doorEntities.indexOf(entity);



    if(index >= 0)
    {

        console.log(

            "🚪 Door opened!"

        );


        enterNextRoom(entity);

    }

}







// =====================================
// MAIN INTERACTION
// =====================================

function interact()
{

    let target =

    getLookedAtEntity();



    if(!target)
    {
        return;
    }





    if(

        treasureEntities.includes(target)

    )
    {

        openChest(target);

    }





    else if(

        enemyEntities.includes(target)

    )
    {

        attackEnemy(target);

    }





    else if(

        weaponEntities.includes(target)

    )
    {

        pickupWeapon(target);

    }





    else if(

        doorEntities.includes(target)

    )
    {

        openDoor(target);

    }

}








// =====================================
// CONTROLLER SETUP
// =====================================

function setupInteractions()
{

    Controller.subscribe(

        "rightTrigger",

        "Pressed",

        interact

    );



    console.log(

        "VR interactions ready!"

    );

}






// =====================================
// MOVING WORLD CONSOLE
// ALWAYS IN FRONT OF PLAYER
// =====================================

function updateConsolePosition()
{

    let headPosition =

    Player.position.get()

    ??

    Vector3.zero;



    let forward =

    Player.forward.get()

    ??

    new Vector3(

        0,

        0,

        -1

    );



    let consolePosition =

    headPosition.add(

        forward.multiply(2)

    );



    consolePosition.y += 1.2;



    inWorldConsole.visible(

        true,

        consolePosition

    );

}

// =====================================
// PROXIMITY ADVENTURE SYSTEM
// =====================================


let discoveredRooms:number[] = [];

let currentRoom = 0;





function checkExploration()
{

    let playerPos =

    Player.position.get()

    ??

    Vector3.zero;





    // CHESTS

    for(

        let chest of treasureEntities

    )
    {

        if(

            playerPos.distanceTo(

                chest.pos

            )

            < 2

        )
        {

            console.log(

                "💰 Chest nearby! Press trigger."

            );

        }

    }








    // ENEMIES

    for(

        let enemy of enemyEntities

    )
    {

        if(

            playerPos.distanceTo(

                enemy.pos

            )

            < 3

        )
        {

            console.log(

                "⚔ Enemy nearby!"

            );

        }

    }


}








// =====================================
// ROOM DISCOVERY
// =====================================


function discoverRoom(room:number)
{

    if(

        !discoveredRooms.includes(room)

    )
    {

        discoveredRooms.push(room);



        console.log(

            "🗺 Discovered Room "

            +

            room

        );

    }

}







// =====================================
// DOOR SYSTEM
// =====================================


async function enterNextRoom(

    door:Entity

)
{

    console.log(

        "🚪 Entering new room..."

    );



    door.destroy();



    let index =

    doorEntities.indexOf(

        door

    );



    if(index >= 0)
    {

        doorEntities.splice(

            index,

            1

        );

    }



    currentRoom++;




    if(

        currentRoom < 10

    )
    {

        discoverRoom(

            currentRoom

        );



        await createRoom(

            currentRoom

        );



        console.log(

            "🗺 New room created!"

        );

    }

    else

    {

        console.log(

            "👑 Boss chamber unlocked!"

        );

        bossFight();

    }

}

// =====================================
// START GAME
// =====================================

async function start()
{

    setupInteractions();



    inWorldConsole.visible(

        true,

        new Vector3(

            0,

            1.5,

            -1.5

        )

    );



    console.log(
        "===================="
    );


    console.log(
        " THE LOST DUNGEON VR "
    );


    console.log(
        "===================="
    );



    console.log(
        "Generating dungeon..."
    );



    createSpawnPoint();





    for(

        let room = 0;

        room < 10;

        room++

    )
    {

        await createRoom(room);

    }





    console.log(
        "Dungeon ready!"
    );


    console.log(
        "Explore the dungeon!"
    );



    showInventory();

}









// =====================================
// CHECK DOORS NEAR PLAYER
// =====================================


function checkDoors()
{

    let playerPos =

    Player.position.get()

    ??

    Vector3.zero;





    for(

        let door of doorEntities

    )
    {


        if(

            playerPos.distanceTo(

                door.pos

            )

            < 2

        )
        {

            console.log(

                "🚪 Door nearby - press trigger"

            );

        }


    }


}









// =====================================
// FINAL WORLD UPDATE LOOP
// =====================================


Events.onPhysicsUpdate(

    () =>

    {

        // treasure/enemy proximity

        checkExploration();



        // door checks

        checkDoors();



        // keep console in front of player

        updateConsolePosition();



        // NEW ENEMY AI

        updateEnemyAI();


    }

);