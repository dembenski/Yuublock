import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { inWorldConsole } from "./Yuu API/Console";
import { Player } from "./Yuu API/Player";
import { Events } from "./Yuu API/Events";



// =====================================
// START CONSOLE
// =====================================

export function startConsole()
{

    console.log(

        "VR Console Started"

    );


    updateConsolePosition();

}



// =====================================
// MOVE CONSOLE IN FRONT OF PLAYER
// =====================================

function updateConsolePosition()
{


    let headPosition =

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





    let consolePosition =

    headPosition.add(

        forward.multiply(2)

    );





    consolePosition.y += 1.2;





    inWorldConsole.visible(

        true,

        consolePosition

    );


}



// =====================================
// UPDATE EVERY FRAME
// =====================================

Events.onPhysicsUpdate(

()=>{


    updateConsolePosition();


}

);