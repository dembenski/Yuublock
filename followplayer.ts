import { Vector3 } from "./Yuu API/Basic Types/Vector3";
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

    // Show the console immediately
    updateConsolePosition();
}

// =====================================
// MOVE CONSOLE
// =====================================

function updateConsolePosition()
{
    // Player head position
    let headPosition =

        Player.position.get()

        ??

        Vector3.zero;

    // Direction player is looking
    let forward =

        Player.forward.get()

        ??

        new Vector3(

            0,

            0,

            -1

        );

    // Position console 2 metres ahead
    let consolePosition =

        headPosition.add(

            forward.multiply(2)

        );

    // Raise console to eye level
    consolePosition.y += 1.2;

    // Show console
    inWorldConsole.visible(

        true,

        consolePosition

    );
}

// =====================================
// UPDATE EVERY PHYSICS FRAME
// =====================================

Events.onPhysicsUpdate(

    () =>

    {

        updateConsolePosition();

    }

);