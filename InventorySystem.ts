import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { Player } from "./Yuu API/Player";
import { Controller } from "./Yuu API/Controller";
import { Events } from "./Yuu API/Events";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";
import { Text } from "./Yuu API/Text";

import { 
buyShopItem,
sellShopItem,
shopItems,
playerCoins,
openShop
} from "./ShopSystem";

import { buyShopItem } from "./ShopSystem";

// =====================================
// PLAYER CURRENCY
// =====================================


export let playerCoins:number = 250;





// =====================================
// INVENTORY ITEM DATA
// =====================================


export interface InventoryItem

{

name:string;

rarity:string;

amount:number;

buyPrice:number;

sellPrice:number;

color:Color;

}





// =====================================
// PLAYER INVENTORY
// =====================================


export let inventory:InventoryItem[] = [];







// =====================================
// SHOP ITEMS
// =====================================


export const shopItems:InventoryItem[] =

[


{

name:"Small Healing Potion",

rarity:"Common",

amount:1,

buyPrice:50,

sellPrice:25,

color:new Color(0,1,0)

},



{

name:"Iron Sword",

rarity:"Uncommon",

amount:1,

buyPrice:250,

sellPrice:125,

color:new Color(.5,.5,.5)

},



{

name:"Magic Crystal",

rarity:"Rare",

amount:1,

buyPrice:500,

sellPrice:250,

color:new Color(0,0.5,1)

},



{

name:"Dragon Scale",

rarity:"Epic",

amount:1,

buyPrice:1000,

sellPrice:500,

color:new Color(1,.3,0)

},



{

name:"Ancient Dungeon Crown",

rarity:"Legendary",

amount:1,

buyPrice:5000,

sellPrice:2500,

color:new Color(1,0.8,0)

}



];







// =====================================
// RARITY VALUES
// =====================================


function getRarityMultiplier(

rarity:string

)

{


switch(rarity)

{


case "Common":

return 1;



case "Uncommon":

return 2;



case "Rare":

return 5;



case "Epic":

return 10;



case "Legendary":

return 25;



}



return 1;


}

// =====================================
// INVENTORY MENU STORAGE
// =====================================


let inventoryMenu:Entity | undefined;


let menuOpen=false;





// =====================================
// CREATE MENU PANEL
// =====================================


function createInventoryMenu()

{


if(inventoryMenu)

return;




inventoryMenu = spawnPrimitive.cube(

new Vector3(

0,

1.8,

-1.5

),


new Vector3(

2,

1.5,

0.05

),


new Color(

0.05,

0.05,

0.05

),


Quaternion.one,

1,

false,

"Animated",

undefined

);







console.log(

"===================="

);


console.log(

" INVENTORY MENU OPEN "

);


console.log(

"Coins: "

+

playerCoins

);


console.log(

"Items Owned: "

+

inventory.length

);


console.log(

"===================="

);





}




// =====================================
// REMOVE MENU
// =====================================


function closeInventoryMenu()

{


if(!inventoryMenu)

return;



inventoryMenu.destroy();


inventoryMenu=undefined;


console.log(

"Inventory closed"

);



}







// =====================================
// B BUTTON CONTROL
// =====================================


Controller.subscribe(

"rightB",

"Pressed",

()=>{


if(menuOpen)

{


closeInventoryMenu();


menuOpen=false;


}

else

{


createInventoryMenu();


menuOpen=true;


}



}

);

// =====================================
// INVENTORY MENU UPDATE
// =====================================


function updateInventoryMenu()

{


if(!inventoryMenu)

return;




let playerPos =

Player.position.get();



if(!playerPos)

return;





// Place menu slightly in front of player

let forward =

Player.forward.get();



if(!forward)

return;




let menuPosition =

playerPos.add(

forward.multiplyScalar(2)

);




menuPosition.y += 1.5;



inventoryMenu.pos = menuPosition;






// Turn menu toward player

let direction =

playerPos.subtract(menuPosition);



inventoryMenu.rotation =

Quaternion.lookAt(

direction,

Vector3.up

);



}









// =====================================
// INVENTORY VALUE
// =====================================


export function getInventoryValue()

{


let total=0;



for(let item of inventory)

{


total +=

item.sellPrice *

item.amount;



}



return total;


}









// =====================================
// PRINT INVENTORY TO CONSOLE
// =====================================


export function displayInventory()

{


console.log(

"===================="

);


console.log(

" PLAYER INVENTORY "

);


console.log(

" COINS: "

+

playerCoins

);



console.log(

"--------------------"

);





if(inventory.length==0)

{


console.log(

"No items"

);


}

else

{


for(let item of inventory)

{


console.log(

item.name

+

" x"

+

item.amount

+

" | Sell: "

+

item.sellPrice

);


}



}





console.log(

"--------------------"

);



console.log(

"TOTAL VALUE: "

+

getInventoryValue()

);



console.log(

"===================="

);



}









// =====================================
// UPDATE LOOP
// =====================================


Events.onPhysicsUpdate(

()=>{


if(menuOpen)

{


updateInventoryMenu();


}



}

);

// =====================================
// BUY ITEM
// =====================================


export function buyItem(

itemName:string

)

{


let shopItem = shopItems.find(

(item)=>item.name==itemName

);



if(!shopItem)

{


console.log(

"Item not found in shop"

);


return;


}






if(playerCoins < shopItem.buyPrice)

{


console.log(

"Not enough coins!"

);


console.log(

"Need: "

+

shopItem.buyPrice

);



return;


}






playerCoins -= shopItem.buyPrice;






let owned = inventory.find(

(item)=>item.name==shopItem.name

);







if(owned)

{


owned.amount++;

}


else

{


inventory.push(

{


name:shopItem.name,


rarity:shopItem.rarity,


amount:1,


buyPrice:shopItem.buyPrice,


sellPrice:shopItem.sellPrice,


color:shopItem.color


}


);



}






console.log(

"===================="

);


console.log(

"ITEM PURCHASED"

);


console.log(

shopItem.name

);


console.log(

"Coins Left: "

+

playerCoins

);


console.log(

"===================="

);



}









// =====================================
// SELL ITEM
// =====================================


export function sellItem(

itemName:string

)

{


let item = inventory.find(

(item)=>item.name==itemName

);





if(!item)

{


console.log(

"You do not own this item"

);


return;


}







playerCoins += item.sellPrice;






item.amount--;






if(item.amount<=0)

{


let index = inventory.indexOf(item);


inventory.splice(

index,

1

);


}







console.log(

"===================="

);


console.log(

"ITEM SOLD"

);


console.log(

itemName

);


console.log(

"Coins: "

+

playerCoins

);


console.log(

"===================="

);



}









// =====================================
// SHOP DISPLAY
// =====================================


export function showShop()

{


console.log(

"===================="

);


console.log(

"        SHOP"

);


console.log(

"Coins Available: "

+

playerCoins

);


console.log(

"--------------------"

);






for(let item of shopItems)

{


console.log(

item.name

+

" | "

+

item.rarity

);


console.log(

"BUY: "

+

item.buyPrice

);


console.log(

"SELL: "

+

item.sellPrice

);


console.log(

"--------------------"

);



}





console.log(

"===================="

);



}

// =====================================
// MENU MODE
// =====================================


let shopMode=false;







// =====================================
// REFRESH MENU DISPLAY
// =====================================


function refreshInventoryMenu()

{


if(!menuOpen)

return;



console.log(

"===================="

);




if(shopMode)

{


console.log(

"        SHOP"

);


console.log(

"Coins: "

+

playerCoins

);



console.log(

"--------------------"

);



for(let item of shopItems)

{


console.log(

item.name

+

" | Buy: "

+

item.buyPrice

);


}



}

else

{


console.log(

"     INVENTORY"

);


console.log(

"Coins: "

+

playerCoins

);



console.log(

"--------------------"

);



if(inventory.length==0)

{


console.log(

"Empty Inventory"

);


}

else

{


for(let item of inventory)

{


console.log(

item.name

+

" x"

+

item.amount

+

" | Sell "

+

item.sellPrice

);



}


}




console.log(

"Total Worth: "

+

getInventoryValue()

);



}



console.log(

"===================="

);



}








// =====================================
// A BUTTON SHOP SWITCH
// =====================================


Controller.subscribe(

"rightA",

"Pressed",

()=>{


if(!menuOpen)

return;



shopMode=!shopMode;



refreshInventoryMenu();



}

);









// =====================================
// MENU SELECT EXAMPLES
// =====================================


// These can later be connected to VR buttons


Controller.subscribe(

"rightTrigger",

"Pressed",

()=>{


if(!menuOpen)

return;




if(shopMode)

{


console.log(

"Shop selected"

);


showShop();


}

else

{


console.log(

"Inventory selected"

);


displayInventory();


}



}

);








// =====================================
// AUTO REFRESH
// =====================================


Events.onPhysicsUpdate(

()=>{


if(menuOpen)

{


refreshInventoryMenu();


}



});

// =====================================
// ADD LOOT FROM CHESTS
// =====================================


export function addItemToInventory(

itemName:string,

rarity:string

)

{


let sellValue = 10;


switch(rarity)

{

case "Common":

sellValue = 25;

break;


case "Uncommon":

sellValue = 75;

break;


case "Rare":

sellValue = 250;

break;


case "Epic":

sellValue = 750;

break;


case "Legendary":

sellValue = 2500;

break;


}




let existing = inventory.find(

(item)=>item.name==itemName

);





if(existing)

{


existing.amount++;


}

else

{


inventory.push(

{

name:itemName,

rarity:rarity,

amount:1,

buyPrice:sellValue*2,

sellPrice:sellValue,

color:new Color(1,1,1)

}

);



}




console.log(

"Inventory Added: "

+

itemName

);



}

// =====================================
// SAVE DATA
// =====================================


interface SaveData

{

coins:number;

items:InventoryItem[];

}





let saveData:SaveData =

{

coins:250,

items:[]

};









// =====================================
// SAVE INVENTORY
// =====================================


export function saveInventory()

{


saveData =

{


coins:playerCoins,


items:[...inventory]



};





console.log(

"===================="

);



console.log(

"GAME SAVED"

);



console.log(

"Coins: "

+

saveData.coins

);



console.log(

"Items: "

+

saveData.items.length

);



console.log(

"===================="

);



}









// =====================================
// LOAD INVENTORY
// =====================================


export function loadInventory()

{


inventory.length=0;



for(let item of saveData.items)

{


inventory.push(

{

name:item.name,

rarity:item.rarity,

amount:item.amount,

buyPrice:item.buyPrice,

sellPrice:item.sellPrice,

color:item.color


}

);



}





playerCoins = saveData.coins;






console.log(

"===================="

);



console.log(

"GAME LOADED"

);



console.log(

"Coins: "

+

playerCoins

);



console.log(

"Items Restored: "

+

inventory.length

);



console.log(

"===================="

);



}









// =====================================
// AUTO SAVE TIMER
// =====================================


let saveTimer=0;






Events.onPhysicsUpdate(

()=>{


saveTimer++;





// approximately every few seconds

if(saveTimer > 600)

{


saveInventory();



saveTimer=0;



}



});

// =====================================
// VR TEXT STORAGE
// =====================================


let menuText:any;






// =====================================
// CREATE TEXT PANEL
// =====================================


function createMenuText()

{


if(menuText)

return;




menuText = Text.create(

new Vector3(

0,

1.8,

-2.1

),


"INVENTORY"

);



menuText.scale = 0.04;



}







// =====================================
// UPDATE TEXT
// =====================================


function updateMenuText()

{


if(!menuOpen)

return;



createMenuText();



let output = "";



output += "================\n";



if(shopMode)

{


output += " SHOP\n\n";


}

else

{


output += " INVENTORY\n\n";


}




output += "COINS: "

+

playerCoins

+

"\n\n";






let list = getCurrentList();





if(list.length==0)

{


output += "EMPTY";


}

else

{


for(let i=0;i<list.length;i++)

{


let item=list[i];



if(i==selectedIndex)

{


output += "> ";


}

else

{


output += "  ";


}





output += item.name;



output += "\n";





if(shopMode)

{


output +=

" Buy: "

+

item.buyPrice

+

"\n";


}

else

{


output +=

" Sell: "

+

item.sellPrice

+

"\n";


}





}



}







output += "\n";



output +=

"TOTAL VALUE: "

+

getInventoryValue();




output += "\n================";







menuText.text = output;



}









// =====================================
// TEXT UPDATE LOOP
// =====================================


Events.onPhysicsUpdate(

()=>{


if(menuOpen)

{


updateMenuText();



}

else

{


if(menuText)

{


menuText.destroy();


menuText=undefined;



}



}



});

// =====================================
// VR BUTTON SYSTEM
// =====================================


interface VRButton

{

name:string;

entity:Entity;

action:()=>void;

}





let vrButtons:VRButton[]=[];








// =====================================
// CREATE BUTTON
// =====================================


function createVRButton(

name:string,

position:Vector3,

action:()=>void

)

{


let button = spawnPrimitive.cube(

position,


new Vector3(

0.6,

0.25,

0.05

),


new Color(

0.2,

0.2,

0.2

),


Quaternion.fromEuler(

new Vector3(

0,

0,

0

)

),


1,


false,


"Animated",


undefined


);





vrButtons.push(

{

name:name,

entity:button,

action:action

}

);




return button;


}









// =====================================
// CREATE SHOP BUTTONS
// =====================================


function createShopButtons()

{


if(vrButtons.length>0)

return;




createVRButton(

"BUY",


new Vector3(

0.8,

1.2,

-2

),


()=>{


let list=getCurrentList();



if(list.length>0)

{


buyItem(

list[selectedIndex].name

);



}


}



);






createVRButton(

"SELL",


new Vector3(

-0.8,

1.2,

-2

),


()=>{


let list=getCurrentList();



if(list.length>0)

{


sellItem(

list[selectedIndex].name

);



}



}



);



}









// =====================================
// REMOVE BUTTONS
// =====================================


function removeVRButtons()

{


for(let button of vrButtons)

{


button.entity.destroy();


}



vrButtons=[];



}








// =====================================
// CHECK CONTROLLER CLICK
// =====================================


function checkButtonPress()

{


let handPosition = Player.position;



for(let button of vrButtons)

{


let distance =

handPosition.distanceTo(

button.entity.pos

);





if(distance < 1.5)

{


button.action();



}



}



}








// =====================================
// TRIGGER CLICK
// =====================================


Controller.subscribe(

"rightTrigger",

"Pressed",

()=>{


if(!menuOpen)

return;



if(shopMode)

{


createShopButtons();


}



checkButtonPress();



}

);

// =====================================
// ITEM PREVIEW DISPLAY
// =====================================


let previewItem:Entity | undefined;






// =====================================
// CREATE ITEM PREVIEW
// =====================================


function createItemPreview(

item:InventoryItem

)

{


if(previewItem)

{


previewItem.destroy();


}






previewItem = spawnPrimitive.cube(

new Vector3(

0,

2,

-2

),


new Vector3(

0.35,

0.35,

0.35

),


item.color,


Quaternion.fromEuler(

new Vector3(

0,

0,

0

)

),


1,


false,


"Animated",


undefined


);







console.log(

"Previewing: "

+

item.name

);


}








// =====================================
// UPDATE PREVIEW
// =====================================


function updateItemPreview()

{


if(!menuOpen)

return;




let list=getCurrentList();



if(list.length==0)

return;






let item=list[selectedIndex];






createItemPreview(

item

);




}








// =====================================
// DESTROY PREVIEW
// =====================================


function destroyItemPreview()

{


if(previewItem)

{


previewItem.destroy();


previewItem=undefined;



}



}








// =====================================
// PREVIEW UPDATE
// =====================================


Events.onPhysicsUpdate(

()=>{


if(menuOpen)

{


updateItemPreview();



}

else

{


destroyItemPreview();



}



});

// =====================================
// MENU MODE
// =====================================


export let shopMode=false;





// =====================================
// OPEN SHOP MENU
// =====================================


export function openShopInventory()

{


shopMode=true;



openShop();



console.log(

"SHOP MENU"

);



updateInventoryMenu();



}







// =====================================
// CLOSE SHOP MODE
// =====================================


export function closeShopInventory()

{


shopMode=false;



updateInventoryMenu();



}









// =====================================
// GET CURRENT MENU LIST
// =====================================


export function getCurrentList()

{


if(shopMode)

{


return shopItems;


}



return inventory;



}









// =====================================
// BUY SELECTED ITEM
// =====================================


export function buySelectedItem()

{


if(!shopMode)

return;





let list:any[]=getCurrentList();



if(list.length==0)

return;






let item=list[selectedIndex];






buyShopItem(

item.name

);



updateInventoryMenu();



}









// =====================================
// SELL SELECTED ITEM
// =====================================


export function sellSelectedItem()

{


if(shopMode)

return;






let list:any[]=getCurrentList();





if(list.length==0)

return;







let item=list[selectedIndex];






sellShopItem(

item.name

);





removeItemFromInventory(

item.name

);





updateInventoryMenu();



}

createDungeon();

startDungeonSystem();

createMerchant(
new Vector3(
40,
1,
40
)
);