import { Player } from "./Yuu API/Player";
import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { player } from "./PlayerData";


export function respawnPlayer()

{


console.log(
"☠ YOU DIED"
);


console.log(
"Respawning..."
);





player.hp = player.maxHp;





Player.position.set(

new Vector3(

0,

1,

0

)

);






console.log(

"⭐ Respawned!"

);


console.log(

"HP restored: "

+

player.hp

);



}