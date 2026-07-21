import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";

export const spawnhovercube = {
  spawn,
};

const diameter = 8;
const scale = 0.35;

function spawn() {
  spawnPrimitive.cube(
    new Vector3(
      Math.random() * diameter,
      1,
      Math.random() * diameter
    ),
    scale
  );
}