import { runStart } from "./Yuu API/RegisterStart";
import { Vector3 } from "./Yuu API/Basic Types/Vector3";

console.log('Running Start From YuuBlocks');

// If your API supports spawning primitives directly, you can call it here:
const cubePosition = new Vector3(0, 1.0, -2.0);
spawnPrimitive.cube(cubePosition);

runStart();