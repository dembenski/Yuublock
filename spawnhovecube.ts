import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";
import { inWorldConsole } from "./Yuu API/Console";

export const spawnhovercube = {
  spawn,
};

const diameter = 8;
const scale = 0.35;

function spawn() {
  try {
    const position = new Vector3(
      Math.random() * diameter,
      1,
      Math.random() * diameter
    );

    // Check if scale needs to be passed in a options object or vector, 
    // or if the function signature expects parameters in a different order
    spawnPrimitive.cube(position, scale);
    
    inWorldConsole.log(`Spawned cube at: ${position.x}, ${position.y}, ${position.z}`);
  } catch (error) {
    inWorldConsole.log(`Spawn failed: ${error}`);
  }
}
}