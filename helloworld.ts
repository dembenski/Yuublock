import { Async } from "./Yuu API/Async";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { inWorldConsole } from "./Yuu API/Console";
import { registerStart } from "./Yuu API/RegisterStart";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";


registerStart(start);


// =============================
// GAME DATA
// =============================

const locations = [
    "Dark Cave",
    "Ancient Temple",
    "Crystal Cavern",
    "Lost Library",
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


const bosses = [
    {name:"Dragon", hp:300, damage:35},
    {name:"Demon Lord", hp:400, damage:45}
];



// =============================
// PLAYER
// =============================

let player = {

    level:1,
    hp:100,
    maxHp:100,

    damage:10,

    xp:0,
    gold:0,

    weapon:"Rusty Sword",

    inventory:[
        "Health Potion"
    ]

};



// =============================
// HELPERS
// =============================

function random(list:any[]){

    return list[
        Math.floor(Math.random()*list.length)
    ];

}



// =============================
// 3D WORLD
// =============================

function cube(
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



async function buildDungeon(){


    console.log("Building 3D Dungeon...");


    for(let room=0; room<10; room++){


        let offset = room * 15;



        // Floor

        for(let x=-5;x<=5;x++){

            for(let z=-5;z<=5;z++){

                cube(
                    new Vector3(
                        offset+x,
                        0,
                        z
                    ),

                    new Vector3(
                        1,
                        0.2,
                        1
                    ),

                    new Color(
                        0.25,
                        0.25,
                        0.25
                    )
                );

            }
        }



        // Walls

        for(let x=-5;x<=5;x++){

            cube(
                new Vector3(
                    offset+x,
                    3,
                    -5
                ),

                new Vector3(
                    1,
                    6,
                    1
                ),

                new Color(
                    0.5,
                    0.5,
                    0.5
                )
            );


            cube(
                new Vector3(
                    offset+x,
                    3,
                    5
                ),

                new Vector3(
                    1,
                    6,
                    1
                ),

                new Color(
                    0.5,
                    0.5,
                    0.5
                )
            );

        }



        // Treasure

        if(Math.random()<0.5){

            cube(
                new Vector3(
                    offset,
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
                    0.7,
                    0
                )
            );

        }



        // Enemy marker

        if(Math.random()<0.6){

            cube(
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


    console.log(
        "Dungeon Ready!"
    );

}



// =============================
// COMBAT
// =============================

function battle(enemy:any){


    console.log("");
    console.log(
        "⚔ Fight: "+enemy.name
    );


    while(
        enemy.hp>0 &&
        player.hp>0
    ){


        let damage =
        player.damage;


        enemy.hp-=damage;


        console.log(
            "You deal "+damage
        );



        if(enemy.hp<=0)
            break;



        player.hp-=enemy.damage;


        console.log(
            "Enemy hits "+enemy.damage
        );


    }



    if(player.hp<=0){

        console.log(
            "☠ You died"
        );

        return;

    }



    console.log(
        "Enemy defeated!"
    );


    player.xp+=25;

    player.gold+=20;



    if(player.xp>=50){

        player.level++;

        player.xp=0;

        player.damage+=5;

        player.maxHp+=20;

        player.hp=
        player.maxHp;


        console.log(
            "⭐ LEVEL UP!"
        );

    }

}



// =============================
// GAME START
// =============================

async function start(){


    inWorldConsole.visible(
        true,
        new Vector3(
            0,
            1.5,
            -1.5
        )
    );


    console.log(
        "======================"
    );

    console.log(
        " THE LOST DUNGEON VR"
    );

    console.log(
        "======================"
    );


    await buildDungeon();



    console.log(
        "Adventure Begins!"
    );



    for(let room=1;room<=10;room++){


        console.log(
            "Entering Room "+room
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
                "Found Treasure!"
            );

            player.gold+=50;

        }


    }



    console.log(
        "FINAL BOSS"
    );


    let boss=random(bosses);


    battle({
        name:boss.name,
        hp:boss.hp,
        damage:boss.damage
    });



    console.log(
        "Dungeon Complete!"
    );


}