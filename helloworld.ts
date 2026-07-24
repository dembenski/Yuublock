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
// PLAYER DATA
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
    ]

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

):Entity
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
// OBJECT STORAGE
// =====================================


let treasureEntities:Entity[] = [];


let enemyEntities:Entity[] = [];


let weaponEntities:Entity[] = [];


let doorEntities:Entity[] = [];





// =====================================
// ENEMY AI STORAGE
// =====================================


let enemyAI:any[] = [];



let enemyMessageTimer = 0;





// =====================================
// REGISTER OBJECTS
// =====================================


function registerTreasure(

    entity:Entity

)
{

    treasureEntities.push(entity);

}





function registerWeapon(

    entity:Entity

)
{

    weaponEntities.push(entity);

}





function registerDoor(

    entity:Entity

)
{

    doorEntities.push(entity);

}





// =====================================
// REGISTER ENEMY WITH AI
// =====================================


function registerEnemy(

    entity:Entity

)
{

    enemyEntities.push(entity);



    let enemyData = random(enemyTypes);



    enemyAI.push({

        entity:entity,


        hp:enemyData.hp,


        damage:enemyData.damage,


        name:enemyData.name,


        speed:0.025,


        chase:false,


        attackTimer:0,


        direction:

        new Vector3(

            Math.random()-0.5,

            0,

            Math.random()-0.5

        )

    });



    console.log(

        "👹 Enemy AI activated"

    );

}


// =====================================
// SPAWN POINT
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

        "🟢 Spawn point created"

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

        "🏰 Building room "

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








    // =====================================
    // DOOR INSIDE ROOM
    // =====================================


    let door = spawnCube(


        new Vector3(

            offset+4,

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



    console.log(

        "🚪 Door created"

    );






    // =====================================
    // TREASURE
    // =====================================


    if(Math.random()<0.5)
    {


        let chest = spawnCube(


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
    // =====================================


    if(Math.random()<0.7)
    {


        let enemy = spawnCube(


            new Vector3(

                offset+1,

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


    }





    await Async.wait(50);


}

// =====================================
// ENEMY AI MOVEMENT SYSTEM
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


        let enemy = ai.entity;



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



            let length = Math.sqrt(

                direction.x *

                direction.x

                +

                direction.z *

                direction.z

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





            if(enemyMessageTimer <=0)
            {


                console.log(

                    "⚔ Enemy chasing player"

                );


                enemyMessageTimer = 120;


            }


        }






        // =============================
        // PATROL
        // =============================


        else
        {


            if(Math.random()<0.01)
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
        // ENEMY ATTACK
        // =============================


        if(

            distance < 2

        )
        {


            if(

                ai.attackTimer <=0

            )
            {


                player.hp -= ai.damage;



                console.log(

                    "👹 "

                    +

                    ai.name

                    +

                    " attacks!"

                );



                console.log(

                    "❤️ Player HP: "

                    +

                    player.hp

                );



                ai.attackTimer = 90;


            }


        }





        if(

            ai.attackTimer >0

        )
        {

            ai.attackTimer--;

        }



    }





    if(enemyMessageTimer>0)
    {

        enemyMessageTimer--;

    }


}

// =====================================
// ENEMY COMBAT DATA
// =====================================


let enemyStats:any[] = [];




// =====================================
// REGISTER ENEMY WITH STATS
// =====================================


function registerEnemyStats(entity:Entity)
{


    let type = random(enemyTypes);



    enemyStats.push({


        entity:entity,


        name:type.name,


        hp:type.hp,


        maxHp:type.hp,


        damage:type.damage


    });



}






// =====================================
// FIND ENEMY DATA
// =====================================


function getEnemyStats(entity:Entity)
{


    for(

        let enemy of enemyStats

    )
    {


        if(

            enemy.entity == entity

        )
        {

            return enemy;

        }


    }



    return undefined;


}






// =====================================
// REMOVE DEAD ENEMY
// =====================================


function removeEnemy(entity:Entity)
{


    enemyEntities = enemyEntities.filter(

        e => e != entity

    );



    enemyAI = enemyAI.filter(

        ai => ai.entity != entity

    );



    enemyStats = enemyStats.filter(

        e => e.entity != entity

    );


}






// =====================================
// DAMAGE ENEMY
// =====================================


function damageEnemy(entity:Entity)
{


    let enemy =

    getEnemyStats(entity);



    if(!enemy)
    {

        console.log(

            "Enemy data missing"

        );

        return;

    }





    let damage =

    player.weapon.damage;





    enemy.hp -= damage;




    console.log(

        "⚔ You hit "

        +

        enemy.name

    );



    console.log(

        "Damage: "

        +

        damage

    );



    console.log(

        "Enemy HP: "

        +

        enemy.hp

        +

        "/"

        +

        enemy.maxHp

    );






    if(

        enemy.hp <=0

    )
    {


        console.log(

            "💀 "

            +

            enemy.name

            +

            " defeated!"

        );



        player.xp +=25;


        player.gold +=20;



        console.log(

            "+20 Gold"

        );



        removeEnemy(entity);



        entity.destroy();



        checkLevel();


    }


}

// =====================================
// ENEMY INTERACTION
// PLAYER ATTACKS ENEMY
// =====================================


function attackEnemy(entity:Entity)
{


    let enemy =

    getEnemyStats(entity);



    if(!enemy)
    {

        console.log(

            "No enemy detected"

        );


        return;

    }





    console.log(

        "⚔ Attacking "

        +

        enemy.name

    );



    damageEnemy(entity);



}






// =====================================
// ENEMY RECEIVES DAMAGE EFFECT
// =====================================


function enemyHitMessage(entity:Entity)
{


    let enemy =

    getEnemyStats(entity);



    if(enemy)
    {


        console.log(

            "🔥 "

            +

            enemy.name

            +

            " is damaged!"

        );



    }


}






// =====================================
// ENEMY ATTACK PLAYER
// =====================================


function enemyAttackPlayer(ai:any)
{


    if(

        ai.attackTimer >0

    )
    {

        return;

    }



    let enemy =

    getEnemyStats(

        ai.entity

    );



    if(!enemy)
    {

        return;

    }




    player.hp -= enemy.damage;



    console.log(

        "👹 "

        +

        enemy.name

        +

        " attacks!"

    );



    console.log(

        "Damage taken: "

        +

        enemy.damage

    );



    console.log(

        "❤️ Player HP: "

        +

        player.hp

    );



    ai.attackTimer = 90;



    if(

        player.hp <=0

    )
    {

        console.log(

            "☠ YOU DIED"

        );

    }


}

// =====================================
// IMPROVED ENEMY AI SYSTEM
// =====================================


let enemyMessageTimer = 0;




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

            distance < 10

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

                direction.x *

                direction.x

                +

                direction.z *

                direction.z

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






            if(

                enemyMessageTimer <=0

            )

            {


                console.log(

                    "👹 Enemy chasing player"

                );



                enemyMessageTimer = 120;


            }



        }








        // =============================
        // PATROL
        // =============================


        else

        {


            if(

                Math.random()<0.02

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
        // CLOSE RANGE ATTACK
        // =============================


        if(

            distance < 2

        )
        {


            enemyAttackPlayer(ai);


        }


    }





    if(

        enemyMessageTimer >0

    )
    {

        enemyMessageTimer--;

    }



}

// =====================================
// ENEMY ATTACK PLAYER
// =====================================


function enemyAttackPlayer(ai:any)
{


    if(

        ai.attackTimer > 0

    )
    {

        return;

    }





    let damage = 5;





    player.hp -= damage;





    console.log(

        "👹 Enemy hit you for "

        +

        damage

    );




    console.log(

        "❤️ Player HP: "

        +

        player.hp

    );






    ai.attackTimer = 90;






    if(

        player.hp <=0

    )
    {


        console.log(

            "☠ YOU DIED"

        );



        player.hp = player.maxHp;



        console.log(

            "🔄 Respawned"

        );


    }


}


// =====================================
// IMPROVED ENEMY AI UPDATE
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


        let enemy = ai.entity;



        if(!enemy)
        {
            continue;
        }





        let enemyPos = enemy.pos;



        let distance =

        enemyPos.distanceTo(

            playerPos

        );





        // DETECT PLAYER

        if(

            distance < 10

        )
        {

            ai.chase = true;


        }
        else
        {

            ai.chase = false;

        }








        // CHASE

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




            if(

                length > 0

            )
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









        // ATTACK RANGE


        if(

            distance < 2

        )
        {


            enemyAttackPlayer(ai);


        }






        // TIMER

        if(

            ai.attackTimer > 0

        )
        {

            ai.attackTimer--;

        }



    }


}


// =====================================
// IMPROVED VR TARGET DETECTION
// WORKS WITH MOVING ENEMIES
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

    new Vector3(

        0,

        0,

        -1

    );






    let hit =

    Raycast.directional(

        handPosition,

        handDirection,

        8,

        {

            getEntity:true

        }

    );





    if(hit?.entity)
    {

        return hit.entity;

    }





    // SECOND CHECK
    // LOOK FOR NEARBY ENEMY

    for(

        let enemy of enemyEntities

    )
    {


        let distance =

        enemy.pos.distanceTo(

            handPosition

        );



        if(

            distance < 3

        )
        {

            console.log(

                "🎯 Enemy targeted"

            );


            return enemy;

        }


    }




    return undefined;


}


// =====================================
// FINAL WORLD UPDATE LOOP
// ENEMY AI + COMBAT + CONSOLE
// =====================================


let enemyMessageTimer = 0;



Events.onPhysicsUpdate(

    () =>

    {


        // =========================
        // CHESTS / ENEMIES NEARBY
        // =========================

        checkExploration();



        // =========================
        // DOORS
        // =========================

        checkDoors();



        // =========================
        // MOVE CONSOLE IN FRONT OF PLAYER
        // =========================

        updateConsolePosition();



        // =========================
        // ENEMY AI
        // =========================

        updateEnemyAI();




        // =========================
        // REDUCE CONSOLE SPAM
        // =========================

        if(
            enemyMessageTimer > 0
        )
        {

            enemyMessageTimer--;

        }


    }

);