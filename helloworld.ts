import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { inWorldConsole } from "./Yuu API/Console";
import { registerStart } from "./Yuu API/RegisterStart";


registerStart(start);


// ==========================
// GAME DATA
// ==========================

const locations = [
  "Dusty Library",
  "Dark Cave",
  "Crystal Cavern",
  "Ancient Temple",
  "Forgotten Armory",
  "Flooded Hall",
  "Frozen Chamber",
  "Lost Laboratory"
];


const enemyTypes = [
  { name:"Goblin", hp:35, damage:8 },
  { name:"Skeleton", hp:50, damage:12 },
  { name:"Zombie", hp:70, damage:15 },
  { name:"Orc", hp:100, damage:20 }
];


const treasures = [
  "Health Potion",
  "Magic Sword",
  "Ancient Ring",
  "Golden Key",
  "Rare Gem"
];


const bosses = [
  { name:"Dragon", hp:250, damage:30 },
  { name:"Demon Lord", hp:300, damage:35 },
  { name:"Ancient Golem", hp:400, damage:25 }
];


// ==========================
// PLAYER
// ==========================

let player = {
  level:1,
  hp:100,
  maxHp:100,
  damage:20,
  xp:0,
  gold:0,
  rooms:0
};


// ==========================
// HELPERS
// ==========================

function random(list:any[]) {
  return list[Math.floor(Math.random()*list.length)];
}


// ==========================
// BATTLE SYSTEM
// ==========================

function battle(enemy:any) {

  console.log("");
  console.log("⚔️ BATTLE START!");
  console.log(enemy.name + " appears!");
  console.log(enemy.name + " HP: " + enemy.hp);


  while(enemy.hp > 0 && player.hp > 0) {


    let critical = Math.random() < 0.2;

    let damage = player.damage;


    if(critical){
      damage *= 2;
      console.log("💥 Critical Hit!");
    }


    enemy.hp -= damage;


    console.log(
      "You deal " +
      damage +
      " damage"
    );


    if(enemy.hp <= 0){
      break;
    }


    player.hp -= enemy.damage;


    console.log(
      enemy.name +
      " hits you for " +
      enemy.damage
    );


    console.log(
      "Your HP: " +
      player.hp
    );

  }


  if(player.hp <= 0){

    console.log("");
    console.log("☠ YOU DIED");
    return false;

  }


  let xpGain = 25;
  let goldGain = Math.floor(Math.random()*50)+10;


  player.xp += xpGain;
  player.gold += goldGain;


  console.log("");
  console.log("🏆 Enemy defeated!");
  console.log("+"+xpGain+" XP");
  console.log("+"+goldGain+" Gold");


  levelCheck();


  return true;

}


// ==========================
// LEVEL SYSTEM
// ==========================

function levelCheck(){

  let needed = player.level * 50;


  if(player.xp >= needed){

    player.level++;

    player.xp = 0;

    player.maxHp += 25;
    player.hp = player.maxHp;

    player.damage += 5;


    console.log("");
    console.log("⭐ LEVEL UP!");
    console.log(
      "You are now level " +
      player.level
    );

  }

}


// ==========================
// TREASURE
// ==========================

function treasureRoom(){

  let item = random(treasures);

  let gold = Math.floor(Math.random()*40)+10;

  player.gold += gold;


  console.log("");
  console.log("💰 TREASURE FOUND!");
  console.log(item);
  console.log("+"+gold+" Gold");

}



// ==========================
// DUNGEON GENERATION
// ==========================

function createRoom(room:number){


  console.log("");
  console.log("======================");
  console.log("ROOM " + room);
  console.log("======================");


  console.log(
    "Location: " +
    random(locations)
  );


  let event = Math.random();


  if(event < 0.65){

    let baseEnemy = random(enemyTypes);


    let enemy = {
      name:baseEnemy.name,
      hp:baseEnemy.hp + room * 5,
      damage:baseEnemy.damage + room
    };


    battle(enemy);


  }
  else {

    treasureRoom();

  }


  console.log("");
  console.log(
    "❤️ HP: " + player.hp
  );

  console.log(
    "⭐ Level: " + player.level
  );

  console.log(
    "💰 Gold: " + player.gold
  );

}



// ==========================
// START GAME
// ==========================

function start(){


  inWorldConsole.visible(
    true,
    new Vector3(0,1.5,-1.5)
  );


  console.log("==============================");
  console.log("       THE LOST DUNGEON");
  console.log("==============================");


  console.log("");
  console.log(
    "You enter a forgotten dungeon..."
  );


  for(let i = 1; i <= 10; i++){

    createRoom(i);


    if(player.hp <= 0){
      return;
    }

  }



  console.log("");
  console.log("==============================");
  console.log("        FINAL BOSS");
  console.log("==============================");


  let boss = random(bosses);


  battle({
    name:boss.name,
    hp:boss.hp,
    damage:boss.damage
  });


  if(player.hp > 0){

    console.log("");
    console.log("🎉 VICTORY!");
    console.log(
      "You conquered the dungeon!"
    );

  }

}