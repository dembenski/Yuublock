import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Player } from "./Yuu API/Player";
import { Controller } from "./Yuu API/Controller";
import { Events } from "./Yuu API/Events";
import { inWorldConsole } from "./Yuu API/Console";
import { registerStart } from "./Yuu API/RegisterStart";


import { createRoom, enemies, chests } from "./Dungeon";

import { attackEnemy } from "./Combat";

import { openChest } from "./Loot";

import { player } from "./PlayerData";




registerStart(start);




// =====================================
// START GAME
// =====================================

async function start()

{


    console.log(

        "======================"

    );


    console.log(

        " THE LOST DUNGEON VR "

    );


    console.log(

        "======================"

    );



    console.log(

        "Generating dungeon..."

    );





    for(

        let i = 0;

        i < 10;

        i++

    )
    {


        await createRoom(i);


    }





    console.log(

        "Dungeon Ready!"

    );



    showStats();



    setupVR();



}







// =====================================
// VR CONTROLS
// =====================================

function setupVR()

{


    Controller.subscribe(

        "rightTrigger",

        "Pressed",

        ()=>{


            interact();


        }

    );



    console.log(

        "VR controls ready"

    );


}







// =====================================
// INTERACTION
// =====================================

function interact()

{


    let target = findTarget();



    if(!target)

    {

        return;

    }





    // CHEST

    for(let chest of chests)

    {


        if(chest == target)

        {


            openChest();


            chest.destroy();


            return;


        }


    }







    // ENEMY

    for(let enemy of enemies)

    {


        if(enemy.entity == target)

        {


            attackEnemy(enemy);


            return;


        }


    }



}









// =====================================
// FIND OBJECT IN FRONT
// =====================================

function findTarget()

{


    let hand =

    Player.rightHand.position.get()

    ??

    Vector3.zero;



    let forward =

    Player.rightHand.forward.get()

    ??

    new Vector3(

        0,

        0,

        -1

    );





    // simple distance check

    for(let enemy of enemies)

    {


        if(

            enemy.entity.pos.distanceTo(hand)

            <

            5

        )

        {


            return enemy.entity;


        }


    }




    for(let chest of chests)

    {


        if(

            chest.pos.distanceTo(hand)

            <

            5

        )

        {


            return chest;


        }


    }



}








// =====================================
// PLAYER HUD DATA
// =====================================

function showStats()

{


    console.log("");

    console.log(

        "PLAYER"

    );


    console.log(

        "Level: "

        +

        player.level

    );


    console.log(

        "HP: "

        +

        player.hp

        +

        "/"

        +

        player.maxHp

    );


    console.log(

        "Weapon: "

        +

        player.weapon.name

    );


    console.log(

        "Damage: "

        +

        player.weapon.damage

    );


}









// =====================================
// FLOATING CONSOLE
// =====================================

function updateConsole()

{


    let head =

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




    let pos =

    head.add(

        forward.multiply(2)

    );



    pos.y += 1.2;




    inWorldConsole.visible(

        true,

        pos

    );


}








// =====================================
// GAME LOOP
// =====================================

Events.onPhysicsUpdate(

()=>{


    updateConsole();



}

);