TypeScript
import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { inWorldConsole } from "./Yuu API/Console";
import { registerStart } from "./Yuu API/RegisterStart";
// Assuming standard Yuu API imports for geometry, material, mesh, and scene:
import { BoxGeometry } from "./Yuu API/Graphics/BoxGeometry";
import { MeshBasicMaterial } from "./Yuu API/Graphics/MeshBasicMaterial";
import { Color } from "./Yuu API/Basic Types/Color";
import { Mesh } from "./Yuu API/Graphics/Mesh";
import { currentScene } from "./Yuu API/Scene"; // Or similar scene reference in Yuu API

registerStart(start);

function start() {
  inWorldConsole.visible(true, new Vector3(0, 1.5, -1.5));
  console.log('Hello Mike!');

  // Create the red cube using Yuu API structures
  const cubeGeometry = new BoxGeometry(1, 1, 1);
  const redMaterial = new MeshBasicMaterial(new Color(255, 0, 0));
  const redCube = new Mesh(cubeGeometry, redMaterial);

  // Position the cube in the world (e.g., in front of the player/console)
  redCube.position = new Vector3(0, 1, -3);

  // Add the cube to the active world scene
  currentScene.add(redCube);
}