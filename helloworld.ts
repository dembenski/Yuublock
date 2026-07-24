import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { inWorldConsole } from "./Yuu API/Console";
import { registerStart } from "./Yuu API/RegisterStart";

registerStart(start);

const rooms = [
  "Dusty Library",
  "Dark Cave",
  "Crystal Cavern",
  "Ancient Temple",
  "Forgotten Armory"
];

const enemies = [
  "Goblin",
  "Skeleton",
  "Zombie",
  "Spider"
];

const treasures = [
  "Gold Coins",
  "Health Potion",
  "Magic Sword",
  "Ancient Key"
];


function random(list:string[]) {
  return list[Math.floor(Math.random() * list.length)];
}


function start() {

  inWorldConsole.visible(true, new Vector3(0, 1.5, -1.5));

  console.log("============================");
  console.log("      THE LOST DUNGEON");
  console.log("============================");

  let health = 100;
  let gold = 0;

  console.log("");
  console.log("You enter the dungeon...");
  console.log("");

  for(let room = 1; room <= 10; room++) {

    console.log("----------------------------");
    console.log("ROOM " + room);

    console.log("Location: " + random(rooms));


    let event = Math.random();


    if(event < 0.5) {

      let enemy = random(enemies);
      let damage = Math.floor(Math.random() * 20) + 5;

      console.log("Enemy appears: " + enemy);
      console.log("You fight!");

      health -= damage;

      console.log("You take " + damage + " damage");

    } else {

      let treasure = random(treasures);
      let coins = Math.floor(Math.random() * 50);

      gold += coins;

      console.log("You found: " + treasure);
      console.log("Gold +" + coins);

    }


    console.log("Health: " + health);
    console.log("Gold: " + gold);

  }


  console.log("");
  console.log("============================");
  console.log("      BOSS ROOM");
  console.log("============================");

  console.log("A Dragon appears!");

  if(health > 0) {
    console.log("You defeated the Dragon!");
    console.log("YOU WIN!");
  }
  else {
    console.log("You collapsed...");
    console.log("GAME OVER");
  }

}