import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Player } from "./Yuu API/Player";
import { Events } from "./Yuu API/Events";

import { damagePlayer } from "./PlayerData";



// =====================================
// ENEMY AI STORAGE
// =====================================

let enemies:any[] = [];



// =====================================
// ADD ENEMY
// =====================================

export function addEnemyAI(entity:any)

{

    enemies.push(

    {

        entity:entity,

        speed:0.02,


        attackDamage:10,


        attackCooldown:0,


        patrolDirection:

        new Vector3(

            Math.random()-0.5,

            0,

            Math.random()-0.5

        )


    });


    console.log(

        "AI added"

    );


}







// =====================================
// UPDATE AI
// =====================================

function updateEnemyAI()

{


    let playerPos =

    Player.position.get()

    ??

    Vector3.zero;





    for(let enemy of enemies)

    {


        let cube = enemy.entity;



        if(!cube)

        {

            continue;

        }







        let pos = cube.pos;



        let direction =

        new Vector3(

            playerPos.x - pos.x,

            0,

            playerPos.z - pos.z

        );




        let distance =

        pos.distanceTo(

            playerPos

        );







        // =========================
        // CHASE PLAYER
        // =========================

        if(distance < 10)

        {


            let length =

            Math.sqrt(

                direction.x * direction.x +

                direction.z * direction.z

            );






            if(length > 0)

            {

                direction.x /= length;

                direction.z /= length;





                cube.pos =

                new Vector3(

                    pos.x +

                    direction.x *

                    enemy.speed,


                    pos.y,


                    pos.z +

                    direction.z *

                    enemy.speed

                );


            }



        }








        // =========================
        // PATROL
        // =========================

        else

        {


            if(Math.random()<0.01)

            {


                enemy.patrolDirection =

                new Vector3(

                    Math.random()-0.5,

                    0,

                    Math.random()-0.5

                );


            }






            cube.pos =

            new Vector3(

                pos.x +

                enemy.patrolDirection.x *

                enemy.speed,


                pos.y,


                pos.z +

                enemy.patrolDirection.z *

                enemy.speed


            );


        }








        // =========================
        // ATTACK PLAYER
        // =========================

        if(distance < 2)

        {


            if(enemy.attackCooldown <=0)

            {


                console.log(

                    "👹 Enemy hits player!"

                );



                console.log(

                    "Damage: "

                    +

                    enemy.attackDamage

                );





                damagePlayer(

                    enemy.attackDamage

                );





                enemy.attackCooldown = 120;


            }



        }







        // reduce cooldown

        if(enemy.attackCooldown > 0)

        {

            enemy.attackCooldown--;

        }



    }



}









// =====================================
// GAME LOOP
// =====================================

Events.onPhysicsUpdate(

()=>{


    updateEnemyAI();


});