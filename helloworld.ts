import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { inWorldConsole } from "./Yuu API/Console";
import { registerStart } from "./Yuu API/RegisterStart";

registerStart(start);


const enemies = [
  { name: "Goblin", hp: 35, damage: 8 },
  { name: "Skeleton", hp: 50, damage: 12 },
  { name: "Zombie", hp: 70, damage: 15 },
  { name: "Orc", hp: 100, damage: 20 }
];


const rooms = [
  "Dark Cave",
  "Ancient Temple",
  "Crystal Cavern",
  "Forgotten Armory",
  "Lost Library"
];


let player = {
  level: 1,
  hp: 100,
  maxHp: 100,
  xp: 0,
  gold: 0,
  damage: 20
};


function random(list:any[]) {
  return list[Math.floor(Math.random() * list.length)];
}


function battle(enemy:any) {

  console.log("");
  console.log("======================");
  console.log("BATTLE!");
  console.log("======================");

  console.log(enemy.name + " appears!");
  console.log(enemy.name + " HP: " + enemy.hp);


  while(enemy.hp > 0 && player.hp > 0) {

    // Player attack
    let critical = Math.random() < 0.2;

    let damage = player.damage;

    if(critical) {
      damage *= 2;
      console.log("CRITICAL HIT!");
    }


    enemy.hp -= damage;

    console.log(
      "You hit " + enemy.name +
      " for " + damage
    );


    if(enemy.hp <= 0) {
      break;
    }


    // Enemy attack
    player.hp -= enemy.damage;

    console.log(
      enemy.name +
      " hits you for " +
      enemy.damage
    );


    console.log(
      "Your HP: " + player.hp
    );
  }


  if(player.hp > 0) {

    let rewardXP = 25;
    let rewardGold = Math.floor(Math.random()*50)+10;

    player.xp += rewardXP;
    player.gold += rewardGold;


    console.log("");
    console.log(enemy.name + " defeated!");
    console.log("+" + rewardXP + " XP");
    console.log("+" + rewardGold + " Gold");


    checkLevel();

  }

}



function checkLevel(){

  let needed = player.level * 50;


  if(player.xp >= needed){

    player.level++;
    player.xp = 0;

    player.maxHp += 20;
    player.hp = player.maxHp;
    player.damage += 5;


    console.log("");
    console.log("================");
    console.log("LEVEL UP!");
    console.log("Level: " + player.level);
    console.log("================");

  }

}



function start(){

  inWorldConsole.visible(
    true,
    new Vector3(0,1.5,-1.5)
  );


  console.log("======================");
  console.log("   THE LOST DUNGEON");
  console.log("======================");


  for(let room = 1; room <= 5; room++){

    console.log("");
    console.log("ROOM " + room);
    console.log(random(rooms));


    if(Math.random() < 0.7){

      let enemy = random(enemies);

      // copy enemy so stats don't change forever
      battle({
        name: enemy.name,
        hp: enemy.hp,
        damage: enemy.damage
      });

    }
    else {

      let gold = Math.floor(Math.random()*30);

      player.gold += gold;

      console.log("You found treasure!");
      console.log("+" + gold + " Gold");

    }


    console.log("");
    console.log(
      "HP: " + player.hp +
      " | Level: " + player.level +
      " | Gold: " + player.gold
    );


    if(player.hp <= 0){

      console.log("");
      console.log("YOU DIED");
      return;

    }

  }


  console.log("");
  console.log("======================");
  console.log("FINAL BOSS");
  console.log("======================");


  battle({
    name:"Dragon",
    hp:250,
    damage:30
  });


  console.log("");
  console.log("Adventure Complete!");

}