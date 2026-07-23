import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { inWorldConsole } from "./Yuu API/Console";
import { registerStart } from "./Yuu API/RegisterStart";

registerStart(start);

function start() {
    inWorldConsole.visible(true, new Vector3(0, 1.5, -1.5));
    console.log('Hello World!');

    // Spawn a cube primitive right in front of the user
    const cubePosition = new Vector3(0, 1.0, -2.0);
    
    // Using the Yuu API primitive spawner
    spawnPrimitive.cube(cubePosition);
}