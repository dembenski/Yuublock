import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { Events } from "./Yuu API/Events";
import { Player } from "./Yuu API/Player";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";





// =====================================
// HEALTH BAR STORAGE
// =====================================


let healthBars:any[] = [];





// =====================================
// CREATE CUBE
// =====================================


function cube(

pos:Vector3,

scale:Vector3,

color:Color

):Entity

{


return spawnPrimitive.cube(

pos,

scale,

Quaternion.one,

color,

1,

false,

"Animated",

undefined

);


}







// =====================================
// CREATE ENEMY HEALTH BAR
// =====================================


export function createEnemyHealthBar(

enemyData:any

)

{


let enemy = enemyData.entity;



let back = cube(

new Vector3(

enemy.pos.x,

enemy.pos.y + 3,

enemy.pos.z

),


new Vector3(

1.8,

0.15,

0.15

),


new Color(

0.1,

0.1,

0.1

)

);





let health = cube(

new Vector3(

enemy.pos.x,

enemy.pos.y + 3,

enemy.pos.z - 0.1

),


new Vector3(

1.8,

0.2,

0.2

),


new Color(

0,

1,

0

)

);





let namePlate = cube(

new Vector3(

enemy.pos.x,

enemy.pos.y + 3.5,

enemy.pos.z

),


new Vector3(

0.8,

0.1,

0.05

),


new Color(

1,

1,

1

)

);






healthBars.push(

{

enemy:enemyData,

back:back,

health:health,

name:namePlate

}

);



}









// =====================================
// UPDATE HEALTH BARS
// =====================================


function updateHealthBars()

{


for(let bar of healthBars)

{


if(!bar.enemy.alive)

{

bar.health.destroy();

bar.back.destroy();

bar.name.destroy();

continue;

}



let enemy = bar.enemy.entity;



// follow enemy


bar.back.pos = new Vector3(

enemy.pos.x,

enemy.pos.y + 3,

enemy.pos.z

);



bar.health.pos = new Vector3(

enemy.pos.x,

enemy.pos.y + 3,

enemy.pos.z-0.1

);



bar.name.pos = new Vector3(

enemy.pos.x,

enemy.pos.y + 3.5,

enemy.pos.z

);





// shrink bar based on HP


let percent =

bar.enemy.hp / 100;



if(percent < 0)

{

percent = 0;

}



bar.health.scale = new Vector3(

1.8 * percent,

0.2,

0.2

);





// color changes


if(percent > .5)

{

bar.health.color = new Color(

0,

1,

0

);

}


else if(percent > .25)

{

bar.health.color = new Color(

1,

0.8,

0

);

}


else

{

bar.health.color = new Color(

1,

0,

0

);

}



}



}







// =====================================
// UPDATE LOOP
// =====================================


Events.onPhysicsUpdate(

()=>{


updateHealthBars();


});