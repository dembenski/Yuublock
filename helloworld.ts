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




// =====================================
// ENEMY TYPES
// =====================================


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





// =====================================
// WEAPON DROPS
// =====================================


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






// =====================================
// BOSSES
// =====================================


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
// COMBAT TRACKING
// ENEMY DATA CONNECTED TO RED CUBES
// =====================================


// stores enemy stats for each red cube

let enemyStats:any[] = [];



// currently fighting enemy

let currentEnemy:any = undefined;



// prevents instant repeated attacks

let combatCooldown = 0;







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
// KEEPING MOVEMENT SYSTEM
// =====================================


let enemyAI:any[] = [];








// =====================================
// REGISTER OBJECTS
// =====================================


function registerTreasure(entity:Entity)
{

    treasureEntities.push(entity);

}

// =====================================
// REGISTER ENEMY
// CREATES REAL ENEMY DATA
// AND KEEPS AI ACTIVE
// =====================================


function registerEnemy(entity:Entity)
{

    enemyEntities.push(entity);



    // choose enemy type

    let type = random(enemyTypes);




    let stats = {


        entity:entity,


        name:type.name,


        hp:type.hp,


        maxHp:type.hp,


        damage:type.damage,


        alive:true


    };



    // connect red cube to enemy stats

    enemyStats.push(stats);






    // ADD TO AI SYSTEM

    enemyAI.push({


        entity:entity,


        stats:stats,


        speed:0.025,


        direction:

        new Vector3(

            Math.random()-0.5,

            0,

            Math.random()-0.5

        ),



        chase:false,


        attackTimer:0


    });






    console.log(

        "👹 "

        +

        stats.name

        +

        " spawned"

    );



    console.log(

        "HP: "

        +

        stats.hp

        +

        " Damage: "

        +

        stats.damage

    );


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








    // =================================
    // FLOOR
    // =================================


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








    // =================================
    // WALLS
    // =================================


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


    // =====================================
// DOOR INSIDE ROOM
// =====================================


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








// =====================================
// TREASURE CHEST
// =====================================


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









// =====================================
// ENEMY SPAWN
// RED CUBE GETS REAL STATS
// =====================================


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



    // registers:
    // - enemyEntities
    // - enemyStats
    // - enemyAI

    registerEnemy(enemy);



    console.log(

        "🔴 Clickable enemy created"

    );


}





await Async.wait(50);


}

// =====================================
// ENEMY AI SYSTEM
// MOVEMENT + CHASING + PLAYER DAMAGE
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


        if(ai.chase)
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

                    enemyPos.x

                    +

                    direction.x *

                    ai.speed,



                    enemyPos.y,



                    enemyPos.z

                    +

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

                enemyPos.x

                +

                ai.direction.x *

                ai.speed,



                enemyPos.y,



                enemyPos.z

                +

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


                player.hp -= ai.stats.damage;





                console.log(

                    "👹 "

                    +

                    ai.stats.name

                    +

                    " attacks!"

                );



                console.log(

                    "Damage: "

                    +

                    ai.stats.damage

                );



                console.log(

                    "Player HP: "

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
// ENEMY CLICK ATTACK SYSTEM
// D20 ROLL COMBAT
// =====================================


function attackEnemy(entity:Entity)
{


    let enemy =


    enemyStats.find(

        e => e.entity == entity

    );





    if(!enemy)

    {

        console.log(

            "Enemy data missing"

        );


        return;

    }







    if(!enemy.alive)

    {

        return;

    }








    // =============================
    // D20 ATTACK ROLL
    // =============================


    let roll =


    Math.floor(

        Math.random()*20

    ) + 1;






    console.log(

        "🎲 Attack Roll: "

        +

        roll

    );








    let damage = 0;








    // NATURAL 20 CRITICAL

    if(roll == 20)

    {


        damage = player.weapon.damage * 2;



        console.log(

            "💥 CRITICAL HIT!"

        );


    }





    // NORMAL HIT

    else if(roll >= 10)

    {


        damage = player.weapon.damage;



        console.log(

            "⚔ HIT!"

        );


    }





    // MISS

    else

    {


        console.log(

            "❌ MISS!"

        );


    }









    // APPLY DAMAGE

    if(damage > 0)

    {


        enemy.hp -= damage;





        console.log(

            "⚔ You hit "

            +

            enemy.name

            +

            " for "

            +

            damage

            +

            " damage"

        );





        console.log(

            enemy.name

            +

            " HP: "

            +

            enemy.hp

        );


    }









    // =============================
    // ENEMY DEATH
    // =============================


    if(enemy.hp <= 0)

    {


        enemy.alive = false;





        console.log(

            "☠ "

            +

            enemy.name

            +

            " defeated!"

        );





        player.xp += 25;


        player.gold += 20;





        console.log(

            "+25 XP"

        );





        console.log(

            "+20 Gold"

        );







        enemyEntities.splice(

            enemyEntities.indexOf(entity),

            1

        );







        enemyAI = enemyAI.filter(

            ai => ai.entity != entity

        );







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






        player.weapon = weapon;






        console.log(

            "🗡 Equipped "

            +

            weapon.name

        );





        console.log(

            "Damage: "

            +

            weapon.damage

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
// CHEST / ENEMY / WEAPON / DOOR
// =====================================


function interact()
{


    let target =


    getLookedAtEntity();






    if(!target)

    {

        return;

    }








    // =============================
    // CHEST
    // =============================


    if(

        treasureEntities.includes(target)

    )

    {


        openChest(target);


    }








    // =============================
    // ENEMY
    // =============================


    else if(

        enemyEntities.includes(target)

    )

    {


        attackEnemy(target);


    }









    // =============================
    // WEAPON
    // =============================


    else if(

        weaponEntities.includes(target)

    )

    {


        pickupWeapon(target);


    }









    // =============================
    // DOOR
    // =============================


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
// INVENTORY SYSTEM
// =====================================


function showInventory()
{


    console.log("");



    console.log(

        "🎒 INVENTORY"

    );






    for(

        let item of player.inventory

    )
    {


        console.log(

            "- "

            +

            item

        );


    }






    console.log(

        "Weapon: "

        +

        player.weapon.name

    );





    console.log(

        "Weapon Damage: "

        +

        player.weapon.damage

    );



}











// =====================================
// POTIONS
// =====================================


function usePotion()
{


    let index =


    player.inventory.indexOf(

        "Health Potion"

    );






    if(index >= 0)

    {


        player.inventory.splice(

            index,

            1

        );





        player.hp += 40;





        if(

            player.hp >

            player.maxHp

        )

        {

            player.hp = player.maxHp;

        }







        console.log(

            "🧪 Health restored!"

        );





        console.log(

            "HP: "

            +

            player.hp

        );



    }


    else

    {


        console.log(

            "No potions left"

        );


    }


}









// =====================================
// LEVEL SYSTEM
// =====================================


function checkLevel()
{

    let needed =


    player.level * 50;







    if(

        player.xp >= needed

    )
    {


        player.level++;





        player.xp = 0;





        player.maxHp += 25;





        player.hp =

        player.maxHp;





        player.damage += 5;







        console.log(

            "⭐ LEVEL UP!"

        );





        console.log(

            "Level "

            +

            player.level

        );





        console.log(

            "Max HP "

            +

            player.maxHp

        );


    }


}

// =====================================
// BATTLE SYSTEM
// =====================================


function battle(enemy:any)
{


    console.log("");

    console.log(

        "⚔ BATTLE!"

    );



    console.log(

        enemy.name

        +

        " appears!"

    );







    while(

        enemy.hp > 0

        &&

        player.hp > 0

    )
    {



        let roll =


        Math.floor(

            Math.random()*20

        ) + 1;





        console.log(

            "🎲 Roll: "

            +

            roll

        );





        let damage = 0;







        if(

            roll >= 10

        )
        {


            damage = player.weapon.damage;



            if(

                roll == 20

            )
            {

                damage *= 2;


                console.log(

                    "💥 Critical!"

                );

            }





            enemy.hp -= damage;





            console.log(

                "You deal "

                +

                damage

                +

                " damage"

            );


        }

        else

        {

            console.log(

                "❌ Miss"

            );

        }







        if(enemy.hp <= 0)

        {

            break;

        }







        player.hp -= enemy.damage;





        console.log(

            enemy.name

            +

            " hits for "

            +

            enemy.damage

        );





        console.log(

            "HP: "

            +

            player.hp

        );



    }








    if(player.hp <= 0)

    {


        console.log(

            "☠ YOU DIED"

        );


        return false;

    }







    console.log(

        "🏆 Enemy defeated!"

    );





    player.xp += 25;

    player.gold += 20;





    checkLevel();



    return true;


}









// =====================================
// FINAL BOSS
// =====================================


function bossFight()
{


    let boss =

    random(bosses);





    console.log(

        "👑 BOSS: "

        +

        boss.name

    );







    battle({

        name:boss.name,

        hp:boss.hp,

        damage:boss.damage

    });


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


        // proximity messages

        checkExploration();




        // door detection

        checkDoors();




        // moving console

        updateConsolePosition();




        // enemy AI movement + attacks

        updateEnemyAI();



    }

);