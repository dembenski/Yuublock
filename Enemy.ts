import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Entity } from "./Yuu API/Entity";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";

import { addEnemyAI } from "./EnemyAI";



// =====================================
// ENEMY TYPES
// =====================================

const enemyTypes =

[

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
// ACTIVE ENEMIES
// =====================================

export let enemyList:any[] = [];



// =====================================
// RANDOM PICK
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
// CREATE ENEMY
// =====================================

export function createEnemy(

position:Vector3

):Entity
{


    let type = random(enemyTypes);



    let enemy = spawnPrimitive.cube(

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



        new Color(

            1,

            0,

            0

        ),



        1,


        true,


        "Static",


        undefined

    );





    let data =

    {

        entity:enemy,

        name:type.name,

        hp:type.hp,

        maxHp:type.hp,

        damage:type.damage

    };





    enemyList.push(data);





    console.log(

        "👹 Enemy Spawned: "

        + type.name

    );



    console.log(

        "HP: "

        + type.hp

        +

        " Damage: "

        + type.damage

    );





    // CONNECT MOVEMENT AI

    addEnemyAI(enemy);





    return enemy;


}