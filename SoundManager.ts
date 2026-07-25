// =====================================
// RETRO SOUND SYSTEM
// =====================================


let ambienceRunning=false;



// =====================================
// PLAY SOUND PLACEHOLDER
// CONNECT TO YUU AUDIO API
// =====================================

function playSound(

name:string

)

{

console.log(

"🔊 SOUND: "

+

name

);


}






// =====================================
// MACHINE HUM
// =====================================

export function startDungeonHum()

{


if(ambienceRunning)

{

return;

}


ambienceRunning=true;



playSound(

"machine_low_hum"

);



console.log(

"Machine ambience started"

);


}








// =====================================
// WALL MACHINE NOISE
// =====================================

export function machineTick()

{


if(Math.random()<0.5)

{


playSound(

"servo_click"

);


}

else

{


playSound(

"electric_buzz"

);


}



}







// =====================================
// DOOR SOUND
// =====================================

export function doorOpenSound()

{


playSound(

"metal_door_open"

);


}






// =====================================
// ENEMY ALERT
// =====================================

export function enemyAlertSound()

{


playSound(

"retro_enemy_alert"

);


}






// =====================================
// ENEMY HIT
// =====================================

export function enemyHitSound()

{


playSound(

"robot_hit"

);


}






// =====================================
// CHEST
// =====================================

export function chestSound()

{


playSound(

"treasure_beep"

);


}







// =====================================
// TORCH / ENERGY EFFECT
// =====================================

export function torchSound()

{


playSound(

"energy_crackle"

);


}






// =====================================
// PLAYER DAMAGE
// =====================================

export function playerDamageSound()

{


playSound(

"warning_beep"

);


}





// =====================================
// PLAYER DEATH
// =====================================

export function deathSound()

{


playSound(

"system_failure"

);


}