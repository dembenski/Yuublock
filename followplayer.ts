import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { inWorldConsole } from "./Yuu API/Console";
import { Player } from "./Yuu API/Player";
import { Events } from "./Yuu API/Events";
import { registerStart } from "./Yuu API/RegisterStart";

registerStart(start);

// =====================================
// START
// =====================================

function start()
{
    console.log("Console Follow Test");

    updateConsolePosition();
}

// =====================================
// MOVE CONSOLE
// ALWAYS FACES PLAYER
// =====================================

function updateConsolePosition()
{
    let playerPos =

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



    // Position console 2 metres in front
    let consolePos =

        new Vector3(

            playerPos.x + forward.x * 2,

            playerPos.y + 1.2,

            playerPos.z + forward.z * 2

        );



    // Make console face the player
    let lookDirection =

        new Vector3(

            playerPos.x - consolePos.x,

            0,

            playerPos.z - consolePos.z

        );



    let rotation =

        Quaternion.lookRotation(

            lookDirection,

            Vector3.up

        );



    inWorldConsole.visible(

        true,

        consolePos,

        rotation

    );
}

// =====================================
// UPDATE LOOP
// =====================================

Events.onPhysicsUpdate(

    () =>

    {

        updateConsolePosition();

    }

);