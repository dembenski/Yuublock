import { Async } from "./Yuu API/Async";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { inWorldConsole } from "./Yuu API/Console";
import { registerStart } from "./Yuu API/RegisterStart";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";


registerStart(start);


// =====================================
// GAME DATA
// =====================================

const locations = [
    "Dark Cave",
    "Ancient Temple",
    "Crystal Cavern",
    "Lost Library",
    "Forgotten Armory",
    "Frozen Chamber"
];


const enemyTypes = [
    {
        name:"Goblin",
        hp:40,
        damage:8
    },
    {
        name:"Skeleton",
        hp:60,
        damage:12
    },
    {
        name:"Orc",
        hp:100,
        damage:20
    },
    {
        name:"Shadow Beast",
        hp:150,
        damage:25
    }
];


const weaponDrops = [
    {
        name:"Iron Sword",
        damage:10
    },
    {
        name:"Flame Blade",
        damage:20
    },
    {
        name:"Crystal Axe",
        damage:35
    },
    {
        name:"Dragon Slayer",
        damage:50
    }
];


const bosses = [
    {
        name:"Dragon",
        hp:300,
        damage:35
    },
    {
        name:"Demon Lord",
        hp:450,
        damage:45
    },
    {
        name:"Ancient Golem",
        hp:500,
        damage:30
    }
];



// =====================================
// PLAYER
// =====================================

let player = {

    level:1,

    hp:100,
    maxHp:100,

    damage:10,

    xp:0,

    gold:0,

    weapon:{
        name:"Rusty Sword",
        damage:10
    },

    inventory:[
        "Health Potion",
        "Health Potion"
    ],

    position:
    new Vector3(0,1,0)

};



// =====================================
// HELPERS
// =====================================

function random(list:any[])
{
    return list[
        Math.floor(Math.random()*list.length)
    ];
}



// =====================================
// 3D WORLD SPAWNING
// =====================================

function spawnCube(
    position:Vector3,
    scale:Vector3,
    color:Color
){

    spawnPrimitive.cube(

        position,

        scale,

        Quaternion.fromEuler(
            new Vector3(
                0,
                Math.random()*Math.PI,
                0
            )
        ),

        color,

        1,

        true,

        "Static",

        undefined
    );

}



// =====================================
// SPAWN PAD
// =====================================

function createSpawnPoint()
{

    spawnCube(

        new Vector3(
            0,
            0.1,
            0
        ),

        new Vector3(
            3,
            .2,
            3
        ),

        new Color(
            0,
            1,
            0
        )

    );


    console.log(
        "Spawn point created"
    );

}



// =====================================
// DUNGEON ROOM BUILDER
// =====================================

async function createRoom(room:number)
{

    let offset =
    room * 20;


    console.log(
        "Building room "+
        room
    );


    // FLOOR

    for(
        let x=-6;
        x<=6;
        x++
    ){

        for(
            let z=-6;
            z<=6;
            z++
        ){

            spawnCube(

                new Vector3(
                    offset+x,
                    0,
                    z
                ),

                new Vector3(
                    1,
                    .2,
                    1
                ),

                new Color(
                    .25,
                    .25,
                    .25
                )

            );

        }

    }



    // WALLS

    for(
        let x=-6;
        x<=6;
        x++
    ){

        spawnCube(

            new Vector3(
                offset+x,
                3,
                -6
            ),

            new Vector3(
                1,
                6,
                1
            ),

            new Color(
                .5,
                .5,
                .5
            )

        );


        spawnCube(

            new Vector3(
                offset+x,
                3,
                6
            ),

            new Vector3(
                1,
                6,
                1
            ),

            new Color(
                .5,
                .5,
                .5
            )

        );

    }



    // DOOR

    spawnCube(

        new Vector3(
            offset+10,
            1.5,
            0
        ),

        new Vector3(
            2,
            3,
            .5
        ),

        new Color(
            .4,
            .2,
            0
        )

    );



    // TREASURE CHEST

    if(Math.random()<0.5)
    {

        spawnCube(

            new Vector3(
                offset-3,
                1,
                0
            ),

            new Vector3(
                1,
                1,
                1
            ),

            new Color(
                1,
                .8,
                0
            )

        );

    }



    // ENEMY MARKER

    if(Math.random()<0.7)
    {

        spawnCube(

            new Vector3(
                offset+3,
                1,
                2
            ),

            new Vector3(
                1,
                2,
                1
            ),

            new Color(
                1,
                0,
                0
            )

        );

    }



    await Async.wait(50);

}

// =====================================
// INVENTORY SYSTEM
// =====================================

function showInventory()
{

    console.log("");
    console.log("🎒 INVENTORY");

    for(
        let item of player.inventory
    ){

        console.log(
            "- "+item
        );

    }


    console.log(
        "Weapon: "+
        player.weapon.name
    );

}



// =====================================
// POTIONS
// =====================================

function usePotion()
{

    let index =
    player.inventory.indexOf(
        "Health Potion"
    );


    if(index >= 0)
    {

        player.inventory.splice(
            index,
            1
        );


        player.hp += 40;


        if(
            player.hp >
            player.maxHp
        )
        {
            player.hp =
            player.maxHp;
        }


        console.log(
            "🧪 Health restored!"
        );

    }

}



// =====================================
// LEVEL SYSTEM
// =====================================

function checkLevel()
{

    let needed =
    player.level * 50;


    if(
        player.xp >= needed
    )
    {

        player.level++;

        player.xp=0;

        player.maxHp+=25;

        player.hp=
        player.maxHp;


        player.damage+=5;


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



// =====================================
// COMBAT
// =====================================

function battle(enemy:any)
{

    console.log("");

    console.log(
        "⚔ BATTLE!"
    );


    console.log(
        enemy.name+
        " appears!"
    );


    while(
        enemy.hp > 0 &&
        player.hp > 0
    )
    {


        let damage =
        player.weapon.damage;



        let critical =
        Math.random()<0.2;



        if(critical)
        {

            damage*=2;

            console.log(
                "💥 CRITICAL HIT!"
            );

        }



        enemy.hp-=damage;


        console.log(
            "You deal "+
            damage+
            " damage"
        );



        if(enemy.hp<=0)
        {
            break;
        }



        player.hp -=
        enemy.damage;



        console.log(
            enemy.name+
            " hits for "+
            enemy.damage
        );


        console.log(
            "HP: "+
            player.hp
        );



        if(
            player.hp < 40 &&
            player.inventory.includes(
                "Health Potion"
            )
        )
        {

            usePotion();

        }

    }



    if(
        player.hp<=0
    )
    {

        console.log(
            "☠ YOU DIED"
        );

        return false;

    }



    console.log(
        "🏆 Enemy defeated!"
    );



    player.xp+=25;


    player.gold+=20;



    console.log(
        "+20 Gold"
    );



    // weapon drop

    if(
        Math.random()<0.3
    )
    {

        let weapon =
        random(weaponDrops);


        player.weapon =
        weapon;


        console.log(
            "🗡 Found weapon: "+
            weapon.name
        );


    }



    checkLevel();


    return true;

}



// =====================================
// ROOM ADVENTURE
// =====================================

function exploreRoom(room:number)
{

    console.log("");

    console.log(
        "================"
    );

    console.log(
        "ROOM "+
        room
    );


    console.log(
        "Location: "+
        random(locations)
    );



    let event =
    Math.random();



    if(
        event < .7
    )
    {

        let enemy =
        random(enemyTypes);



        battle({

            name:enemy.name,

            hp:
            enemy.hp +
            room*10,

            damage:
            enemy.damage+
            room

        });


    }
    else
    {

        console.log(
            "💰 Treasure found!"
        );


        player.gold+=50;


        player.inventory.push(
            "Health Potion"
        );


        console.log(
            "+50 Gold"
        );

    }


}



// =====================================
// FINAL BOSS
// =====================================

function bossFight()
{

    console.log("");

    console.log(
        "================"
    );

    console.log(
        "👑 FINAL BOSS"
    );

    console.log(
        "================"
    );



    let boss =
    random(bosses);



    battle({

        name:boss.name,

        hp:boss.hp,

        damage:boss.damage

    });


}



// =====================================
// GAME START
// =====================================

async function start()
{

    inWorldConsole.visible(

        true,

        new Vector3(
            0,
            1.5,
            -1.5
        )

    );



    console.log(
        "============================"
    );

    console.log(
        "     THE LOST DUNGEON VR"
    );

    console.log(
        "============================"
    );



    console.log(
        "Generating world..."
    );



    createSpawnPoint();



    for(
        let room=0;
        room<10;
        room++
    )
    {

        await createRoom(room);

    }



    console.log(
        "Dungeon created!"
    );



    console.log(
        "Adventure begins!"
    );



    for(
        let room=1;
        room<=10;
        room++
    )
    {


        exploreRoom(room);



        if(
            player.hp<=0
        )
        {

            return;

        }

    }



    bossFight();



    console.log("");

    console.log(
        "================"
    );

    console.log(
        "ADVENTURE COMPLETE"
    );

    console.log(
        "================"
    );



    showInventory();



    console.log(
        "Gold: "+
        player.gold
    );

}