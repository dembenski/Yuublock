import { player } from "./PlayerData";
import { Entity } from "./Yuu API/Entity";




// =====================================
// WEAPON LIST
// =====================================

const weapons =

[

    {
        name:"Iron Sword",
        damage:15
    },


    {
        name:"Flame Blade",
        damage:25
    },


    {
        name:"Crystal Axe",
        damage:40
    },


    {
        name:"Dragon Slayer",
        damage:60
    }

];







// =====================================
// CHEST OPEN
// =====================================

export function openChest(chest:Entity)

{


console.log(

"📦 Chest opened!"

);





let gold =

Math.floor(

Math.random()*100

)

+50;





player.gold += gold;




console.log(

"+"

+

gold

+

" Gold"

);







// potion chance

if(Math.random()<0.7)

{


player.inventory.push(

"Health Potion"

);



console.log(

"🧪 Found Health Potion"

);


}







// weapon chance

if(Math.random()<0.4)

{


giveWeapon();


}







// remove chest

if(chest)

{

chest.destroy();


console.log(

"Chest removed"

);


}



}









// =====================================
// WEAPON DROP
// =====================================

export function enemyDrop()

{


console.log(

"🎁 Enemy dropped loot"

);





if(Math.random()<0.25)

{


giveWeapon();


}

else

{


player.inventory.push(

"Health Potion"

);



console.log(

"🧪 Found Potion"

);


}



}









// =====================================
// GIVE WEAPON
// =====================================

function giveWeapon()

{


let weapon =

weapons[

Math.floor(

Math.random()

*

weapons.length

)

];






player.weapon = weapon;





console.log(

"🗡 Equipped "

+

weapon.name

);





console.log(

"Damage "

+

weapon.damage

);



}









// =====================================
// USE POTION
// =====================================

export function usePotion()

{


let index =

player.inventory.indexOf(

"Health Potion"

);





if(index < 0)

{


console.log(

"No potions"

);


return;


}







player.inventory.splice(

index,

1

);






player.hp += 50;






if(

player.hp >

player.maxHp

)

{


player.hp = player.maxHp;


}







console.log(

"🧪 Healed!"

);



console.log(

"HP "

+

player.hp

);



}