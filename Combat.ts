import { player, addXP } from "./PlayerData";
import { enemyDrop } from "./Loot";




// =====================================
// REGISTERED ENEMIES
// =====================================

let combatEnemies:any[] = [];





// =====================================
// ADD ENEMY TO COMBAT
// =====================================

export function registerEnemyCombat(enemy:any)

{

    combatEnemies.push(enemy);


}







// =====================================
// ATTACK ENEMY
// =====================================

export function attackEnemy(enemy:any)

{


    if(!enemy.alive)

    {

        return;

    }





    console.log("");

    console.log(

        "⚔ ATTACK!"

    );



    console.log(

        enemy.name

    );





    // D20 ROLL

    let roll =

    Math.floor(

        Math.random()*20

    )

    +1;





    console.log(

        "🎲 Roll "

        +

        roll

    );





    let damage = 0;





    // CRITICAL

    if(roll == 20)

    {


        damage =

        player.weapon.damage * 2;



        console.log(

            "💥 CRITICAL HIT!"

        );


    }





    // NORMAL HIT

    else if(roll >= 10)

    {


        damage =

        player.weapon.damage;



        console.log(

            "⚔ HIT!"

        );


    }




    else

    {


        console.log(

            "❌ MISS"

        );


    }





    enemy.hp -= damage;






    console.log(

        "Damage "

        +

        damage

    );



    console.log(

        enemy.name

        +

        " HP "

        +

        enemy.hp

    );







    // ENEMY DEAD

    if(enemy.hp <= 0)

    {


        enemy.alive = false;



        console.log(

            "☠ "

            +

            enemy.name

            +

            " defeated!"

        );




        addXP(25);



        player.gold += 20;




        enemyDrop();



        enemy.entity.destroy();




        combatEnemies =

        combatEnemies.filter(

            e => e != enemy

        );



        return;


    }






    // ENEMY ATTACK BACK

    enemyAttack(enemy);



}








// =====================================
// ENEMY ATTACK
// =====================================

function enemyAttack(enemy:any)

{


    let damage = enemy.damage ?? 5;



    player.hp -= damage;



    console.log(

        "👹 "

        +

        enemy.name

        +

        " hits you for "

        +

        damage

    );



    console.log(

        "HP "

        +

        player.hp

    );





    if(player.hp <=0)

    {


        console.log(

            "☠ YOU DIED"

        );



        player.hp = player.maxHp;


        console.log(

            "Respawned"

        );


    }


}







// =====================================
// REMOVE ENEMY
// =====================================

export function removeEnemy(enemy:any)

{


    combatEnemies =

    combatEnemies.filter(

        e => e != enemy

    );


}