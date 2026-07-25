import { Async } from "./Yuu API/Async";
import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Player } from "./Yuu API/Player";
import { Controller } from "./Yuu API/Controller";
import { Events } from "./Yuu API/Events";
import { registerStart } from "./Yuu API/RegisterStart";
import { inWorldConsole } from "./Yuu API/Console";

import { createDungeon } from "./Dungeon";
import { createBoss } from "./Boss";
import { player } from "./PlayerData";
import { usePotion } from "./Loot";





registerStart(start);






// =====================================
// GAME STATE
// =====================================


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





    console.log(

        "Generating Wolfenstein Maze..."

    );





    await Async.wait(5);





    await createDungeon();





    console.log(

        "Dungeon Ready!"

    );



    console.log(

        "Explore the maze!"

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

                "⚔ Attack"

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





    console.log(

        "Controls ready"

    );


}









// =====================================
// MOVING WORLD CONSOLE
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

        "👑 FINAL BOSS ROOM"

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


});