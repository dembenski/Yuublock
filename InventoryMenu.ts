// =====================================
// VR INVENTORY MENU SYSTEM
// PART 1/6
// =====================================


import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { Player } from "./Yuu API/Player";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";





// =====================================
// PLAYER CURRENCY
// =====================================


export let coins = 250;







// =====================================
// INVENTORY ITEM
// =====================================


export interface ItemData

{

name:string;

rarity:string;

amount:number;

buyPrice:number;

sellPrice:number;

}









// =====================================
// PLAYER INVENTORY STORAGE
// =====================================


export let playerInventory:ItemData[]=[];









// =====================================
// SHOP DATABASE
// =====================================


export let shopInventory:ItemData[] =

[


{

name:"Small Healing Potion",

rarity:"Common",

amount:1,

buyPrice:50,

sellPrice:25

},



{

name:"Iron Sword",

rarity:"Uncommon",

amount:1,

buyPrice:250,

sellPrice:125

},



{

name:"Knight Armor",

rarity:"Rare",

amount:1,

buyPrice:750,

sellPrice:375

},



{

name:"Dragon Blade",

rarity:"Legendary",

amount:1,

buyPrice:5000,

sellPrice:2500

}



];









// =====================================
// ADD ITEM
// =====================================


export function addItemToInventory(

item:ItemData

)

{


let existing = playerInventory.find(

x=>x.name==item.name

);






if(existing)

{


existing.amount += item.amount;



}

else

{


playerInventory.push(item);



}






console.log(

"ITEM ADDED: "

+

item.name

);



}









// =====================================
// REMOVE ITEM
// =====================================


export function removeItem(

itemName:string,

amount:number

)

{


let item = playerInventory.find(

x=>x.name==itemName

);






if(!item)

return false;







item.amount-=amount;








if(item.amount<=0)

{


playerInventory.splice(

playerInventory.indexOf(item),

1

);



}






return true;



}

// =====================================
// BUY ITEM FROM SHOP
// =====================================


export function buyItem(

itemName:string

)

{


let shopItem = shopInventory.find(

x=>x.name==itemName

);





if(!shopItem)

{


console.log(

"ITEM NOT FOUND IN SHOP"

);


return false;


}








if(coins < shopItem.buyPrice)

{


console.log(

"NOT ENOUGH COINS"

);


return false;



}








coins -= shopItem.buyPrice;








addItemToInventory(

{


name:shopItem.name,


rarity:shopItem.rarity,


amount:1,


buyPrice:shopItem.buyPrice,


sellPrice:shopItem.sellPrice



}

);







console.log(

"BOUGHT: "

+

shopItem.name

);



console.log(

"COINS LEFT: "

+

coins

);






return true;



}









// =====================================
// SELL ITEM
// =====================================


export function sellItem(

itemName:string

)

{


let item = playerInventory.find(

x=>x.name==itemName

);








if(!item)

{


console.log(

"ITEM NOT OWNED"

);


return false;



}








coins += item.sellPrice;








item.amount--;







if(item.amount<=0)

{


playerInventory.splice(

playerInventory.indexOf(item),

1

);



}








console.log(

"SOLD: "

+

itemName

);





console.log(

"COINS: "

+

coins

);








return true;



}









// =====================================
// INVENTORY TOTAL VALUE
// =====================================


export function getInventoryValue()

{


let total=0;








for(let item of playerInventory)

{


total += item.sellPrice * item.amount;



}








return total;



}









// =====================================
// SHOP INFO
// =====================================


export function showShop()

{


console.log(

"========= SHOP ========="

);







for(let item of shopInventory)

{


console.log(

item.name

+

" | "

+

item.rarity

+

" | BUY "

+

item.buyPrice

+

" coins"

);



}







console.log(

"========================"

);



}









// =====================================
// INVENTORY INFO
// =====================================


export function showInventory()

{


console.log(

"========= INVENTORY ========="

);







console.log(

"Coins: "

+

coins

);







console.log(

"Value: "

+

getInventoryValue()

+

" coins"

);








for(let item of playerInventory)

{


console.log(

item.name

+

" x"

+

item.amount

+

" | "

+

item.rarity

);



}







console.log(

"============================="

);



}

// =====================================
// INVENTORY MENU OBJECT
// =====================================


let inventoryMenu:Entity|null=null;


let menuVisible=false;









// =====================================
// CREATE PANEL
// =====================================


function createInventoryPanel()

{


if(inventoryMenu)

return;








inventoryMenu = spawnPrimitive.cube(

new Vector3(

0,

1.5,

2

),



new Vector3(

2,

1.5,

0.05

),



Quaternion.fromEuler(

new Vector3(

0,

0,

0

)

),



new Color(

0.05,

0.05,

0.08

),



1,



false,



"Dynamic",



undefined



);








console.log(

"Inventory panel created"

);








inventoryMenu.setEnabled(

false

);



}











// =====================================
// OPEN MENU
// =====================================


export function openInventoryMenu()

{


if(!inventoryMenu)

{


createInventoryPanel();



}







if(inventoryMenu)

{


inventoryMenu.setEnabled(

true

);



}








menuVisible=true;






refreshInventoryDisplay();








console.log(

"INVENTORY OPEN"

);



}









// =====================================
// CLOSE MENU
// =====================================


export function closeInventoryMenu()

{


if(!inventoryMenu)

return;







inventoryMenu.setEnabled(

false

);







menuVisible=false;








console.log(

"INVENTORY CLOSED"

);



}









// =====================================
// TOGGLE MENU
// =====================================


export function toggleInventoryMenu()

{


if(menuVisible)

{


closeInventoryMenu();



}

else

{


openInventoryMenu();



}



}

// =====================================
// INVENTORY DISPLAY DATA
// =====================================


let displayLines:string[]=[];









// =====================================
// BUILD INVENTORY TEXT
// =====================================


function buildInventoryText()

{


displayLines=[];








displayLines.push(

"===== INVENTORY ====="

);





displayLines.push(

"Coins: "

+

coins

);






displayLines.push(

"Total Worth: "

+

getInventoryValue()

+

" coins"

);







displayLines.push(

""

);







if(playerInventory.length==0)

{


displayLines.push(

"No items owned"

);



}

else

{


for(let item of playerInventory)

{


displayLines.push(

item.name

+

" x"

+

item.amount

);



displayLines.push(

"Rarity: "

+

item.rarity

);



displayLines.push(

"Sell: "

+

item.sellPrice

+

" coins"

);



displayLines.push(

""

);



}



}








displayLines.push(

"[B] Close"

);



displayLines.push(

"[SHOP] Open Shop"

);









}









// =====================================
// REFRESH DISPLAY
// =====================================


export function refreshInventoryDisplay()

{


buildInventoryText();







console.log(

"===================="

);



for(let line of displayLines)

{


console.log(

line

);



}






console.log(

"===================="

);





}

// =====================================
// CONTROLLER INPUT SYSTEM
// META QUEST B BUTTON
// =====================================



let inputStarted=false;








// =====================================
// START INVENTORY CONTROLLER
// =====================================


export function startInventoryController()

{


if(inputStarted)

return;






inputStarted=true;






console.log(

"Inventory controller started"

);





}









// =====================================
// B BUTTON EVENT HANDLER
// =====================================


export function inventoryButtonPressed()

{


console.log(

"B BUTTON PRESSED"

);






toggleInventoryMenu();



}









// =====================================
// MANUAL TEST BUTTON
// =====================================


// Useful for desktop testing


export function testInventory()

{


toggleInventoryMenu();



}

// =====================================
// DUNGEON LOOT CONNECTION
// =====================================


export function receiveDungeonLoot(

item:any

)

{


addItemToInventory(

{


name:item.name,


rarity:item.rarity,


amount:item.amount || 1,


buyPrice:item.buyPrice || 0,


sellPrice:item.sellPrice || 0



}

);








console.log(

"DUNGEON ITEM RECEIVED: "

+

item.name

);



}