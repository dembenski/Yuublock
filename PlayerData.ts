import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Player } from "./Yuu API/Player";



// =====================================
// RESPAWN LOCATION
// CHANGE THIS IF YOU MOVE THE START ROOM
// =====================================

export let spawnPoint = new Vector3(

0,

1,

0

);






// =====================================
// PLAYER RPG DATA
// =====================================


export let player =

{


level:1,


xp:0,


gold:0,



hp:100,


maxHp:100,



damage:10,





weapon:

{

name:"Rusty Sword",

damage:10

},





inventory:

[

"Health Potion",

"Health Potion"

]



};









// =====================================
// SET SPAWN POINT
// =====================================

export function setSpawnPoint(pos:Vector3)

{


spawnPoint = pos;



console.log(

"Spawn point saved"

);



}









// =====================================
// ADD XP
// =====================================

export function addXP(amount:number)

{


player.xp += amount;



console.log(

"+"

+

amount

+

" XP"

);



checkLevel();



}











// =====================================
// LEVEL SYSTEM
// =====================================

function checkLevel()

{


let needed =

player.level * 100;





if(player.xp >= needed)

{


player.level++;



player.xp = 0;





player.maxHp += 25;



player.hp = player.maxHp;





player.weapon.damage += 5;





console.log(

"⭐ LEVEL UP!"

);



console.log(

"Level "

+

player.level

);



console.log(

"Max HP "

+

player.maxHp

);



}



}











// =====================================
// DAMAGE PLAYER
// =====================================

export function damagePlayer(amount:number)

{


player.hp -= amount;



console.log(

"👹 Player took "

+

amount

+

" damage"

);



console.log(

"HP "

+

player.hp

);







if(player.hp <= 0)

{


respawn();



}



}











// =====================================
// RESPAWN
// =====================================

export function respawn()

{


console.log(

"☠ YOU DIED"

);



console.log(

"Respawning..."

);






// restore health

player.hp = player.maxHp;






// lose half gold

player.gold =

Math.floor(

player.gold / 2

);








// move VR player

Player.position.set(

new Vector3(

spawnPoint.x,

spawnPoint.y,

spawnPoint.z

)

);






console.log(

"⭐ Respawn complete"

);



console.log(

"HP restored: "

+

player.hp

);



console.log(

"Gold remaining: "

+

player.gold

);



}











// =====================================
// HEAL PLAYER
// =====================================

export function healPlayer(amount:number)

{


player.hp += amount;



if(player.hp > player.maxHp)

{

player.hp = player.maxHp;

}



console.log(

"🧪 Healed "

+

amount

);



console.log(

"HP "

+

player.hp

);



}