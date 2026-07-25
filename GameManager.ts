import { Async } from "./Yuu API/Async";
import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Player } from "./Yuu API/Player";
import { Controller } from "./Yuu API/Controller";
import { Events } from "./Yuu API/Events";
import { registerStart } from "./Yuu API/RegisterStart";
import { inWorldConsole } from "./Yuu API/Console";

import { createRoom } from "./Dungeon";
import { createBoss } from "./Boss";
import { player } from "./PlayerData";
import { usePotion } from "./Loot";





registerStart(start);





// =====================================
// GAME STATE
// =====================================

let currentRoom = 0;

let maxRooms = 10;

let bossSpawned = false;








// =====================================
// START GAME
// =====================================

async function start()

{


    console.log("");

    console.log(

        "===================="

    );

    console.log(

        " THE LOST DUNGEON VR "

    );

    console.log(

        "===================="

    );




    setupControls();




    moveConsole();





    console.log(

        "Generating dungeon..."

    );





    for(

        let i=0;

        i<maxRooms;

        i++

    )

    {


        await createRoom(i);


        await Async.wait(20);


    }





    console.log(

        "Dungeon Ready!"

    );



    console.log(

        "Find the boss!"

    );



}









// =====================================
// CONTROLS
// =====================================

function setupControls()

{


    Controller.subscribe(

        "rightTrigger",

        "Pressed",

        ()=>{


            console.log(

                "Attack Trigger"

            );


        }

    );





    Controller.subscribe(

        "leftTrigger",

        "Pressed",

        ()=>{


            usePotion();


        }

    );



}








// =====================================
// CONSOLE FOLLOW PLAYER
// =====================================

function moveConsole()

{


    let pos =

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






    let location =

    pos.add(

        forward.multiply(2)

    );





    location.y += 1.2;





    inWorldConsole.visible(

        true,

        location

    );


}









// =====================================
// ROOM PROGRESSION
// =====================================

function nextRoom()

{


    currentRoom++;




    console.log(

        "Entering room "

        +

        currentRoom

    );





    if(

        currentRoom >= maxRooms

    )

    {


        spawnFinalBoss();


    }



}









// =====================================
// FINAL BOSS
// =====================================

function spawnFinalBoss()

{


    if(bossSpawned)

    {

        return;

    }



    bossSpawned = true;




    console.log(

        "⚠ FINAL ROOM"

    );



    createBoss();


}









// =====================================
// PLAYER STATUS
// =====================================

function showPlayer()

{


    console.log("");

    console.log(

        "PLAYER"

    );


    console.log(

        "Level "

        +

        player.level

    );


    console.log(

        "HP "

        +

        player.hp

    );


    console.log(

        "Gold "

        +

        player.gold

    );


    console.log(

        "Weapon "

        +

        player.weapon.name

    );


}








// =====================================
// UPDATE LOOP
// =====================================

Events.onPhysicsUpdate(

()=>{


    moveConsole();


    showPlayer();


});