import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { inWorldConsole } from "./Yuu API/Console";
import { registerStart } from "./Yuu API/RegisterStart";

registerStart(start);

const rooms = [
    "Dusty Library",
    "Dark Cave",
    "Crystal Cavern",
    "Ancient Temple",
    "Abandoned Laboratory",
    "Forgotten Armory",
    "Royal Throne Room",
    "Flooded Hall"
];

const enemies = [
    "Goblin",
    "Skeleton",
    "Zombie",
    "Orc",
    "Ghost",
    "Spider",
    "Slime"
];

const treasures = [
    "Health Potion",
    "Magic Sword",
    "Gold Coins",
    "Diamond",
    "Magic Ring",
    "Shield"
];

let room = 1;
let health = 100;
let gold = 0;
let xp = 0;

function random(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
}

function start() {

    inWorldConsole.visible(true, new Vector3(0, 1.5, -1.5));

    console.clear();

    console.log("=================================");
    console.log("      THE LOST DUNGEON");
    console.log("=================================");
    console.log("");
    console.log("Health: " + health);
    console.log("Gold: " + gold);
    console.log("XP: " + xp);
    console.log("");
    console.log("Your adventure begins...");
    console.log("");

    setInterval(nextRoom, 3000);
}

function nextRoom() {

    console.log("");
    console.log("===============================");
    console.log("Entering Room " + room);
    console.log("===============================");

    console.log("Location: " + random(rooms));

    const roll = Math.random();

    if (roll < 0.5) {

        const enemy = random(enemies);
        const damage = Math.floor(Math.random() * 20) + 5;

        console.log("Enemy: " + enemy);
        console.log("Battle...");

        health -= damage;
        xp += 10;

        console.log("You defeated the " + enemy + "!");
        console.log("You lost " + damage + " health.");

    } else {

        const treasure = random(treasures);
        const coins = Math.floor(Math.random() * 50) + 10;

        gold += coins;

        console.log("Treasure Found!");
        console.log(treasure);
        console.log("+" + coins + " Gold");

    }

    console.log("");
    console.log("Health: " + health);
    console.log("Gold: " + gold);
    console.log("XP: " + xp);

    if (health <= 0) {
        console.log("");
        console.log("=================================");
        console.log("YOU DIED");
        console.log("Game Over");
        console.log("=================================");
        return;
    }

    room++;

    if (room > 10) {

        console.log("");
        console.log("=================================");
        console.log("BOSS ROOM");
        console.log("=================================");
        console.log("The Dragon appears!");
        console.log("Congratulations! Demo Complete!");

        return;
    }

    console.log("");
    console.log("Walking deeper into the dungeon...");
}