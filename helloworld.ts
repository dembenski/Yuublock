import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { inWorldConsole } from "./Yuu API/Console";
import { registerStart } from "./Yuu API/RegisterStart";


registerStart(start);


// =============================
// DUNGEON DATA
// =============================

const locations = [
    "Dark Cave",
    "Crystal Cavern",
    "Ancient Temple",
    "Lost Library",
    "Frozen Chamber",
    "Forgotten Armory"
];


const enemies = [
    {name:"Goblin", hp:40, damage:8},
    {name:"Skeleton", hp:60, damage:12},
    {name:"Orc", hp:100, damage:20},
    {name:"Shadow Beast", hp:150, damage:25}
];


const weapons = [
    {name:"Iron Sword", damage:10},
    {name:"Flame Blade", damage:20},
    {name:"Crystal Axe", damage:30},
    {name:"Dragon Slayer", damage:50}
];


const items = [
    "Health Potion",
    "Gold Coin",
    "Magic Scroll"
];


const bosses = [
    {name:"Dragon", hp:300, damage:35},
    {name:"Demon King", hp:400, damage:45}
];


// =============================
// PLAYER
// =============================

let player = {

    level:1,

    hp:100,
    maxHp:100,

    xp:0,

    gold:0,

    weapon:{
        name:"Rusty Sword",
        damage:5
    },

    inventory:[
        "Health Potion",
        "Health Potion"
    ],

    position:new Vector3(0,0,0)

};



// =============================
// HELPERS
// =============================

function random(array:any[]){

    return array[
        Math.floor(Math.random()*array.length)
    ];

}



// =============================
// INVENTORY
// =============================

function showInventory(){

    console.log("");
    console.log("🎒 INVENTORY");

    player.inventory.forEach(item=>{
        console.log("- "+item);
    });

    console.log(
        "Weapon: "+
        player.weapon.name
    );

}



// =============================
// USE POTION
// =============================

function usePotion(){

    let index =
    player.inventory.indexOf(
        "Health Potion"
    );


    if(index >= 0){

        player.inventory.splice(index,1);

        player.hp += 40;


        if(player.hp > player.maxHp){
            player.hp = player.maxHp;
        }


        console.log(
            "🧪 Potion used!"
        );

        console.log(
            "HP restored"
        );

    }

}



// =============================
// LEVELING
// =============================

function levelUp(){

    let needed =
    player.level * 50;


    if(player.xp >= needed){

        player.level++;

        player.xp=0;

        player.maxHp+=25;

        player.hp=
        player.maxHp;


        player.weapon.damage+=5;


        console.log("");
        console.log(
            "⭐ LEVEL UP!"
        );

        console.log(
            "Level "+
            player.level
        );

    }

}



// =============================
// COMBAT
// =============================

function battle(enemy:any){


    console.log("");
    console.log(
        "⚔ "+enemy.name+
        " attacks!"
    );


    while(enemy.hp>0 &&
          player.hp>0){


        let damage =
        player.weapon.damage;


        enemy.hp-=damage;


        console.log(
            "You hit for "+
            damage
        );


        if(enemy.hp<=0){
            break;
        }


        player.hp-=enemy.damage;


        console.log(
            "Enemy hits for "+
            enemy.damage
        );


        if(
        player.hp < 40 &&
        player.inventory.includes(
        "Health Potion"))
        {
            usePotion();
        }

    }



    if(player.hp<=0){

        console.log(
            "☠ GAME OVER"
        );

        return false;

    }


    console.log(
        "🏆 Enemy defeated!"
    );


    player.xp+=25;


    let gold =
    Math.floor(Math.random()*50);


    player.gold+=gold;


    console.log(
        "+"+gold+" gold"
    );


    if(Math.random()<0.3){

        let weapon =
        random(weapons);


        player.weapon=weapon;


        console.log(
            "🗡 New Weapon: "+
            weapon.name
        );

    }


    levelUp();


    return true;

}



// =============================
// DUNGEON MAP
// =============================

function generateRoom(room:number){


    player.position =
    new Vector3(
        room*10,
        0,
        Math.random()*20
    );


    console.log("");
    console.log(
        "ROOM "+room
    );


    console.log(
        "Location: "+
        random(locations)
    );


    if(Math.random()<0.7){

        let enemy=random(enemies);


        battle({
            name:enemy.name,
            hp:enemy.hp+room*10,
            damage:enemy.damage+room
        });

    }

    else{

        console.log(
            "💰 Treasure!"
        );


        player.inventory.push(
            random(items)
        );

    }

}



// =============================
// START
// =============================

function start(){


inWorldConsole.visible(
true,
new Vector3(0,1.5,-1.5)
);



console.log(
"=============================="
);

console.log(
"      THE LOST DUNGEON RPG"
);

console.log(
"=============================="
);



for(let room=1;room<=10;room++){

    generateRoom(room);


    if(player.hp<=0)
    return;

}



console.log("");
console.log(
"👑 FINAL BOSS"
);



let boss=random(bosses);


battle({
name:boss.name,
hp:boss.hp,
damage:boss.damage
});



console.log("");

showInventory();


console.log(
"🎉 ADVENTURE COMPLETE!"
);


}