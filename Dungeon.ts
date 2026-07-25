import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";

import { addEnemyAI } from "./EnemyAI";
import { registerEnemyCombat } from "./Combat";




// =====================================
// STORAGE
// =====================================

export let enemies:any[] = [];

export let chests:Entity[] = [];







// =====================================
// SPAWN CUBE
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

        1,

        true,

        "Static",

        undefined


    );


}








// =====================================
// CREATE ROOM
// =====================================

export async function createRoom(room:number)

{


    let offset = room * 14;




    console.log(

        "Creating room "

        +

        room

    );







    // FLOOR

    for(let x=-6;x<=6;x++)

    {


        for(let z=-6;z<=6;z++)

        {


            cube(

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

                    .2,

                    .2,

                    .2

                )

            );


        }

    }








    // WALLS

    for(let x=-6;x<=6;x++)

    {


        cube(

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





        cube(

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








    // DOOR

    cube(

        new Vector3(

            offset+6,

            2,

            0

        ),


        new Vector3(

            .5,

            4,

            2

        ),



        new Color(

            .4,

            .2,

            0

        )

    );









    // CHEST CHANCE

    if(Math.random()<0.5)

    {


        let chest = cube(

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




        chests.push(chest);



        console.log(

            "📦 Chest created"

        );


    }









    // ENEMY CHANCE

    if(Math.random()<0.8)

    {


        let enemy = cube(

            new Vector3(

                offset+2,

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





        let data =

        {

            entity:enemy,


            name:

            randomEnemy(),


            hp:100,


            damage:10,


            alive:true


        };





        enemies.push(data);





        addEnemyAI(enemy);



        registerEnemyCombat(data);





        console.log(

            "👹 Enemy created"

        );


    }





}








// =====================================
// RANDOM ENEMY NAME
// =====================================

function randomEnemy()

{


    let list =

    [

        "Goblin",

        "Skeleton",

        "Orc",

        "Shadow Beast"

    ];



    return list[

        Math.floor(

            Math.random()

            *

            list.length

        )

    ];

}