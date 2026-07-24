



// =====================================
// GAME DATA
// =====================================
@@ -115,9 +114,6 @@ const bosses = [






// =====================================
// PLAYER
// =====================================
@@ -130,13 +126,10 @@ let player = {

maxHp:100,


damage:10,


xp:0,


gold:0,


@@ -166,9 +159,6 @@ let player = {






// =====================================
// HELPERS
// =====================================
@@ -187,9 +177,6 @@ function random(list:any[])






// =====================================
// 3D SPAWN SYSTEM
// =====================================
@@ -209,10 +196,8 @@ function spawnCube(

position,


scale,


Quaternion.fromEuler(

new Vector3(
@@ -227,19 +212,14 @@ function spawnCube(

),


color,


1,


true,


"Static",


undefined

);
@@ -261,32 +241,82 @@ let doorEntities: Entity[] = [];



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
@@ -307,49 +337,56 @@ function createSpawnPoint()
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

    // FIXED ROOM DISTANCE

let offset =
room * 14;

@@ -364,9 +401,6 @@ async function createRoom(room:number)






// FLOOR

for(
@@ -428,7 +462,6 @@ async function createRoom(room:number)




// WALLS

for(
@@ -477,7 +510,6 @@ async function createRoom(room:number)




spawnCube(

new Vector3(
@@ -520,11 +552,8 @@ async function createRoom(room:number)





// =================================
    // FIXED DOOR
    // NOW INSIDE ROOM
    // DOOR INSIDE ROOM
// =================================


@@ -572,14 +601,6 @@ async function createRoom(room:number)



    console.log(
        "Door registered"
    );







// =================================
@@ -629,7 +650,6 @@ async function createRoom(room:number)
);



registerTreasure(chest);

}
@@ -639,9 +659,8 @@ async function createRoom(room:number)




// =================================
    // ENEMY
    // MOVING ENEMY SPAWN
// =================================


@@ -690,6 +709,14 @@ async function createRoom(room:number)

registerEnemy(enemy);



        console.log(

            "Enemy AI activated"

        );

}


@@ -700,477 +727,360 @@ async function createRoom(room:number)
}

// =====================================
// VR INTERACTION SYSTEM
// ENEMY AI SYSTEM
// =====================================


// =====================================
// FIND OBJECT PLAYER IS AIMING AT
// =====================================

function getLookedAtEntity(): Entity | undefined
function updateEnemyAI()
{

    let handPosition =
    let playerPos =

    Player.rightHand.position.get()
    Player.position.get()

??

Vector3.zero;



    let handDirection =
    for(
        let ai of enemyAI
    )
    {

    Player.rightHand.forward.get()
        let enemy =
        ai.entity;

    ??

    Vector3.zero;

        if(!enemy)
        {
            continue;
        }



    let hit =

    Raycast.directional(
        let enemyPos =
        enemy.pos;

        handPosition,

        handDirection,

        5,
        let distance =

        {
            getEntity:true
        }
        enemyPos.distanceTo(

    );
            playerPos

        );


    return hit?.entity;

}


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

// =====================================
// CHEST INTERACTION
// =====================================
            ai.chase = false;

function openChest(entity:Entity)
{
        }

    let index =

    treasureEntities.indexOf(entity);



    if(index >= 0)
    {

        treasureEntities.splice(
        // =============================
        // CHASE PLAYER
        // =============================

            index,

            1
        if(
            ai.chase
        )
        {

        );
            let direction =

            new Vector3(

                playerPos.x - enemyPos.x,

        player.gold += 50;
                0,

                playerPos.z - enemyPos.z

            );

        player.inventory.push(

            "Health Potion"

        );
            let length =

            Math.sqrt(

                direction.x * direction.x

        console.log(
                +

            "💰 Chest opened!"
                direction.z * direction.z

        );
            );


        console.log(

            "+50 Gold"
            if(length > 0)
            {

        );
                direction.x /= length;

                direction.z /= length;


        entity.destroy();
                enemy.pos =

    }
                new Vector3(

}
                    enemyPos.x +

                    direction.x *

                    ai.speed,


                    enemyPos.y,


                    enemyPos.z +

                    direction.z *

// =====================================
// ENEMY INTERACTION
// =====================================
                    ai.speed

function attackEnemy(entity:Entity)
{
                );

    let index =
            }

    enemyEntities.indexOf(entity);


            console.log(

    if(index >= 0)
    {
                "⚔ Enemy chasing player"

            );

        enemyEntities.splice(
        }

            index,

            1

        );



        console.log(

            "⚔ Enemy encountered!"
        // =============================
        // RANDOM PATROL
        // =============================

        );

        else
        {

            if(
                Math.random()<0.01
            )
            {

        let enemy =
                ai.direction =

        random(enemyTypes);
                new Vector3(

                    Math.random()-0.5,

                    0,

        battle({
                    Math.random()-0.5

            name:enemy.name,
                );

            hp:enemy.hp,
            }

            damage:enemy.damage

        });

            enemy.pos =

            new Vector3(

        entity.destroy();
                enemyPos.x +

    }
                ai.direction.x *

}
                ai.speed,


                enemyPos.y,


                enemyPos.z +

                ai.direction.z *

                ai.speed

            );

// =====================================
// WEAPON PICKUP
// =====================================
        }

function pickupWeapon(entity:Entity)
{

    let index =

    weaponEntities.indexOf(entity);



    if(index >= 0)
    {

        // =============================
        // ATTACK PLAYER
        // =============================

        weaponEntities.splice(

            index,
        if(
            distance < 2
        )
        {

            1
            if(
                ai.attackTimer <= 0
            )
            {

        );
                player.hp -= 5;



        let weapon =
                console.log(

        random(weaponDrops);
                    "👹 Enemy attacks! HP: "

                    +

                    player.hp

        player.weapon =
                );

        weapon;


                ai.attackTimer = 60;

        console.log(
            }

            "🗡 Equipped "
        }

            +

            weapon.name

        );

        if(
            ai.attackTimer > 0
        )
        {

            ai.attackTimer--;

        }

        entity.destroy();

}

}






// =====================================
// VR INTERACTION SYSTEM
// =====================================


// =====================================
// DOOR INTERACTION
// FIND OBJECT PLAYER IS AIMING AT
// =====================================

function openDoor(entity:Entity)
function getLookedAtEntity(): Entity | undefined
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




    let handPosition =

    Player.rightHand.position.get()

    ??

    Vector3.zero;

// =====================================
// CONTROLLER SETUP
// =====================================

function setupInteractions()
{

    Controller.subscribe(
    let handDirection =

        "rightTrigger",
    Player.rightHand.forward.get()

        "Pressed",
    ??

        interact
    Vector3.zero;

    );



    console.log(

        "VR interactions ready!"
    let hit =

    );
    Raycast.directional(

}
        handPosition,

// =====================================
// INVENTORY SYSTEM
// =====================================
        handDirection,

function showInventory()
{
        5,

    console.log("");
        {
            getEntity:true
        }

    console.log(
        "🎒 INVENTORY"
);


    for(
        let item of player.inventory
    )
    {

        console.log(
            "- " + item
        );

    }



    console.log(

        "Weapon: "

        +

        player.weapon.name

    );
    return hit?.entity;

}








// =====================================
// POTIONS
// CHEST INTERACTION
// =====================================

function usePotion()
function openChest(entity:Entity)
{

let index =

    player.inventory.indexOf(

        "Health Potion"

    );
    treasureEntities.indexOf(entity);



if(index >= 0)
{

        player.inventory.splice(
        treasureEntities.splice(

index,

@@ -1180,33 +1090,36 @@ function usePotion()



        player.hp += 40;
        player.gold += 50;



        if(
        player.inventory.push(

            player.hp >
            "Health Potion"

            player.maxHp
        );

        )
        {

            player.hp =

            player.maxHp;
        console.log(

        }
            "💰 Chest opened!"

        );



console.log(

            "🧪 Health restored!"
            "+50 Gold"

);



        entity.destroy();

}

}
@@ -1217,447 +1130,348 @@ function usePotion()




// =====================================
// LEVEL SYSTEM
// ENEMY INTERACTION
// =====================================

function checkLevel()
function attackEnemy(entity:Entity)
{

    let needed =

    player.level * 50;

    let index =

    enemyEntities.indexOf(entity);

    if(

        player.xp >= needed

    )
    if(index >= 0)
{

        player.level++;


        player.xp = 0;


        player.maxHp += 25;


        player.hp =

        player.maxHp;
        enemyEntities.splice(

            index,

            1

        player.damage += 5;
        );



        console.log(
        enemyAI = enemyAI.filter(

            "⭐ LEVEL UP!"
            ai => ai.entity != entity

);



console.log(

            "Level "

            +

            player.level
            "⚔ Enemy encountered!"

);

    }

}





        let enemy =

        random(enemyTypes);


// =====================================
// COMBAT
// =====================================

function battle(enemy:any)
{
        battle({

    console.log("");
            name:enemy.name,

    console.log(
            hp:enemy.hp,

        "⚔ BATTLE!"
            damage:enemy.damage

    );
        });



    console.log(
        entity.destroy();

        enemy.name
    }

        +
}

        " appears!"

    );




// =====================================
// WEAPON PICKUP
// =====================================

function pickupWeapon(entity:Entity)
{

    let index =

    while(
    weaponEntities.indexOf(entity);

        enemy.hp > 0 &&

        player.hp > 0

    )
    if(index >= 0)
{


        let damage =

        player.weapon.damage;




        if(

            Math.random() < .2

        )
        {

            damage *= 2;
        weaponEntities.splice(

            index,

            1

            console.log(
        );

                "💥 CRITICAL HIT!"

            );

        }
        let weapon =

        random(weaponDrops);



        player.weapon =

        enemy.hp -= damage;
        weapon;



console.log(

            "You deal "

            +

            damage
            "🗡 Equipped "

+

            " damage"
            weapon.name

);



        entity.destroy();

    }

}

        if(

            enemy.hp <= 0

        )
        {

            break;

        }



// =====================================
// DOOR INTERACTION
// =====================================

function openDoor(entity:Entity)
{

    let index =

        player.hp -=
    doorEntities.indexOf(entity);

        enemy.damage;


    if(index >= 0)
    {

console.log(

            enemy.name

            +

            " hits for "

            +

            enemy.damage
            "🚪 Door opened!"

);


        enterNextRoom(entity);

        console.log(

            "HP: "

            +

            player.hp

        );

    }

}




        if(

            player.hp < 40 &&

            player.inventory.includes(

                "Health Potion"
// =====================================
// MAIN INTERACTION
// =====================================

            )
function interact()
{

        )
        {
    let target =

            usePotion();
    getLookedAtEntity();

        }


    if(!target)
    {
        return;
}







if(

        player.hp <= 0
        treasureEntities.includes(target)

)
{

        console.log(

            "☠ YOU DIED"

        );


        return false;
        openChest(target);

}





    else if(

        enemyEntities.includes(target)

    console.log(

        "🏆 Enemy defeated!"

    );



    player.xp += 25;


    player.gold += 20;



    console.log(

        "+20 Gold"

    );



    checkLevel();


    )
    {

    return true;
        attackEnemy(target);

}
    }





    else if(

        weaponEntities.includes(target)

    )
    {

// =====================================
// FINAL BOSS
// =====================================
        pickupWeapon(target);

function bossFight()
{
    }

    let boss =

    random(bosses);



    console.log(
    else if(

        "👑 BOSS: "
        doorEntities.includes(target)

        +
    )
    {

        boss.name
        openDoor(target);

    );
    }

}


    battle({

        name:boss.name,

        hp:boss.hp,

        damage:boss.damage

    });

}

// =====================================
// START GAME
// CONTROLLER SETUP
// =====================================

async function start()
function setupInteractions()
{

    setupInteractions();



    inWorldConsole.visible(

        true,

        new Vector3(

            0,
    Controller.subscribe(

            1.5,
        "rightTrigger",

            -1.5
        "Pressed",

        )
        interact

);



console.log(
        "===================="
    );

        "VR interactions ready!"

    console.log(
        " THE LOST DUNGEON VR "
);

}


    console.log(
        "===================="
    );



    console.log(
        "Generating dungeon..."
    );

// =====================================
// MOVING WORLD CONSOLE
// ALWAYS IN FRONT OF PLAYER
// =====================================

function updateConsolePosition()
{

    createSpawnPoint();
    let headPosition =

    Player.position.get()

    ??

    Vector3.zero;


    for(

        let room = 0;
    let forward =

        room < 10;
    Player.forward.get()

        room++
    ??

    )
    {
    new Vector3(

        await createRoom(room);
        0,

    }
        0,

        -1

    );



    let consolePosition =

    console.log(
        "Dungeon ready!"
    );
    headPosition.add(

        forward.multiply(2)

    console.log(
        "Explore the dungeon!"
);



    showInventory();

}
    consolePosition.y += 1.2;



    inWorldConsole.visible(

        true,

        consolePosition

    );

}

// =====================================
// PROXIMITY ADVENTURE SYSTEM
@@ -1666,15 +1480,12 @@ async function start()

let discoveredRooms:number[] = [];


let currentRoom = 0;







function checkExploration()
{

@@ -1690,8 +1501,6 @@ function checkExploration()





// CHESTS

for(
@@ -1731,7 +1540,6 @@ function checkExploration()




// ENEMIES

for(
@@ -1765,7 +1573,6 @@ function checkExploration()
}



}


@@ -1776,77 +1583,9 @@ function checkExploration()


// =====================================
// MOVING WORLD CONSOLE
// ALWAYS IN FRONT OF PLAYER
// ROOM DISCOVERY
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
// DISCOVER ROOMS
// =====================================

function discoverRoom(room:number)
{
@@ -1876,6 +1615,12 @@ function discoverRoom(room:number)

}







// =====================================
// DOOR SYSTEM
// =====================================
@@ -1925,34 +1670,18 @@ async function enterNextRoom(





currentRoom++;





if(

currentRoom < 10

)
{


        console.log(

            "Loading Room "

            +

            currentRoom

        );



discoverRoom(

currentRoom
@@ -1975,26 +1704,113 @@ async function enterNextRoom(

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


@@ -2003,10 +1819,13 @@ async function enterNextRoom(





// =====================================
// CHECK DOORS NEAR PLAYER
// =====================================


function checkDoors()
{

@@ -2063,25 +1882,42 @@ function checkDoors()





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