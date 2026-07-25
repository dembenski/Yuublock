import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";

import { attackEnemy } from "./Combat";
import { player, addXP } from "./PlayerData";




// =====================================
// BOSS LIST
// =====================================

const bosses =

[

    {

        name:"Dragon",

        hp:300,

        damage:35,

        reward:200

    },


    {

        name:"Demon Lord",

        hp:450,

        damage:45,

        reward:300

    },


    {

        name:"Ancient Golem",

        hp:600,

        damage:30,

        reward:400

    }

];





let activeBoss:any = undefined;






// =====================================
// SPAWN CUBE BOSS
// =====================================

function spawnBossCube(

    position:Vector3

):Entity

{


    return spawnPrimitive.cube(

        position,


        new Vector3(

            2,

            4,

            2

        ),



        Quaternion.fromEuler(

            new Vector3(

                0,

                0,

                0

            )

        ),



        new Color(

            .5,

            0,

            .8

        ),



        1,

        true,

        "Static",

        undefined

    );


}







// =====================================
// CREATE BOSS
// =====================================

export function createBoss()

{


    let data =

    bosses[

        Math.floor(

            Math.random()

            *

            bosses.length

        )

    ];




    let cube = spawnBossCube(

        new Vector3(

            145,

            2,

            0

        )

    );





    activeBoss =

    {


        entity:cube,


        name:data.name,


        hp:data.hp,


        maxHp:data.hp,


        damage:data.damage,


        reward:data.reward,


        alive:true


    };





    console.log(

        "👑 BOSS SPAWNED"

    );


    console.log(

        data.name

    );


    console.log(

        "HP "

        +

        data.hp

    );




    return activeBoss;


}







// =====================================
// DAMAGE BOSS
// =====================================

export function hitBoss()

{


    if(!activeBoss)

    {

        console.log(

            "No boss"

        );

        return;

    }





    let damage =

    player.weapon.damage;




    activeBoss.hp -= damage;




    console.log(

        "⚔ Hit "

        +

        activeBoss.name

    );



    console.log(

        "Boss HP "

        +

        activeBoss.hp

    );





    if(activeBoss.hp <= 0)

    {


        killBoss();


    }


}







// =====================================
// BOSS DEATH
// =====================================

function killBoss()

{


    console.log(

        "☠ "

        +

        activeBoss.name

        +

        " defeated!"

    );





    player.gold += activeBoss.reward;



    addXP(100);




    console.log(

        "💰 Boss reward "

        +

        activeBoss.reward

        +

        " gold"

    );




    activeBoss.entity.destroy();



    activeBoss = undefined;


}






// =====================================
// GET CURRENT BOSS
// =====================================

export function getBoss()

{

    return activeBoss;

}