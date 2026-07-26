// =====================================
// VR DUNGEON SHOP SYSTEM
// =====================================

import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Entity } from "./Yuu API/Entity";
import { Player } from "./Yuu API/Player";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";
import { Color } from "./Yuu API/Basic Types/Color";

import { addItemToInventory } from "./InventorySystem";




// =====================================
// PLAYER MONEY
// =====================================


export let playerCoins:number = 250;







// =====================================
// SHOP ITEM TYPE
// =====================================


export interface ShopItem

{


name:string;


rarity:string;


buyPrice:number;


sellPrice:number;


color:Color;



}








// =====================================
// MERCHANT INVENTORY
// =====================================


export const shopItems:ShopItem[] =

[



// COMMON

{

name:"Small Healing Potion",

rarity:"Common",

buyPrice:50,

sellPrice:25,

color:new Color(

0.2,

1,

0.2

)

},



{

name:"Iron Sword",

rarity:"Common",

buyPrice:150,

sellPrice:75,

color:new Color(

0.5,

0.5,

0.5

)

},





// UNCOMMON

{

name:"Magic Herb",

rarity:"Uncommon",

buyPrice:300,

sellPrice:150,

color:new Color(

0.2,

1,

0.2

)

},




{

name:"Crystal Fragment",

rarity:"Uncommon",

buyPrice:400,

sellPrice:200,

color:new Color(

0.2,

0.8,

1

)

},






// RARE

{

name:"Ancient Rune Stone",

rarity:"Rare",

buyPrice:900,

sellPrice:450,

color:new Color(

0.4,

0.6,

1

)

},





{

name:"Cyber Circuit",

rarity:"Rare",

buyPrice:1000,

sellPrice:500,

color:new Color(

0,

1,

1

)

},






// EPIC

{

name:"Dragon Scale",

rarity:"Epic",

buyPrice:2500,

sellPrice:1200,

color:new Color(

1,

0.3,

0.1

)

},






{

name:"Void Crystal",

rarity:"Epic",

buyPrice:3000,

sellPrice:1500,

color:new Color(

0.7,

0.1,

1

)

},







// LEGENDARY

{

name:"Ancient Dungeon Crown",

rarity:"Legendary",

buyPrice:10000,

sellPrice:5000,

color:new Color(

1,

0.8,

0

)

}





];

// =====================================
// BUY ITEM FROM SHOP
// =====================================


export function buyShopItem(

itemName:string

)

{


let item = shopItems.find(

(x)=>x.name==itemName

);





if(!item)

{


console.log(

"SHOP ITEM NOT FOUND"

);


return;


}







if(playerCoins < item.buyPrice)

{


console.log(

"NOT ENOUGH COINS"

);


return;


}







playerCoins -= item.buyPrice;






addItemToInventory(

{


name:item.name,


rarity:item.rarity,


amount:1,


sellPrice:item.sellPrice


}

);






console.log(

"===================="

);



console.log(

"PURCHASE COMPLETE"

);



console.log(

"Bought: "

+

item.name

);



console.log(

"Spent: "

+

item.buyPrice

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
// SELL ITEM TO SHOP
// =====================================


export function sellShopItem(

itemName:string

)

{


// inventory system will handle removing item


console.log(

"SELL REQUEST"

);



console.log(

itemName

);





let item = shopItems.find(

(x)=>x.name==itemName

);






if(item)

{


playerCoins += item.sellPrice;






console.log(

"SOLD FOR: "

+

item.sellPrice

);



}

else

{


console.log(

"ITEM HAS NO SHOP VALUE"

);



}



}









// =====================================
// ADD COINS
// =====================================


export function addCoins(

amount:number

)

{


playerCoins += amount;



console.log(

"Coins +"

+

amount

);



}









// =====================================
// REMOVE COINS
// =====================================


export function removeCoins(

amount:number

)

{


playerCoins -= amount;



if(playerCoins < 0)

{

playerCoins=0;

}



}
// =====================================
// MERCHANT STORAGE
// =====================================


let merchant:Entity | undefined;



let shopOpen=false;








// =====================================
// CREATE MERCHANT
// =====================================


export function createMerchant(

position:Vector3

)

{


if(merchant)

return;






merchant = spawnPrimitive.cube(

position,


new Vector3(

1,

2,

1

),


Quaternion.fromEuler(

new Vector3(

0,

0,

0

)

),


new Color(

0.2,

0.8,

1

),


1,


true,


"Static",


undefined



);







console.log(

"MERCHANT CREATED"

);






attachMerchantTrigger();



}









// =====================================
// MERCHANT INTERACTION
// =====================================


function attachMerchantTrigger()

{


if(!merchant)

return;






merchant.trigger.initialize(

1,

2,

[

"Left Hand",

"Right Hand"

],


undefined

);








merchant.trigger.setOccupiedFunction(()=>{


if(shopOpen)

return;






let distance =

Player.position.distanceTo(

merchant!.pos

);






if(distance < 3)

{


openShop();



}



});




}









// =====================================
// OPEN SHOP
// =====================================


export function openShop()

{


shopOpen=true;



console.log(

"===================="

);



console.log(

"MERCHANT SHOP OPEN"

);



console.log(

"Coins: "

+

playerCoins

);





console.log(

"Items Available:"

);





for(let item of shopItems)

{


console.log(

item.name

+

" | BUY "

+

item.buyPrice

);



}





console.log(

"===================="

);



}









// =====================================
// CLOSE SHOP
// =====================================


export function closeShop()

{


shopOpen=false;



console.log(

"SHOP CLOSED"

);



}









// =====================================
// SHOP STATUS
// =====================================


export function isShopOpen()

{


return shopOpen;


}

// =====================================
// MERCHANT MESSAGES
// =====================================


export function merchantGreeting()

{


console.log(

"===================="

);



console.log(

"MERCHANT:"

);



console.log(

"Welcome traveler!"

);



console.log(

"I buy rare treasures."

);



console.log(

"I sell useful equipment."

);



console.log(

"Your coins: "

+

playerCoins

);



console.log(

"===================="

);



}









// =====================================
// BUY CONFIRMATION
// =====================================


export function confirmPurchase(

itemName:string

)

{


console.log(

"===================="

);



console.log(

"PURCHASED: "

+

itemName

);



console.log(

"Remaining Coins: "

+

playerCoins

);



console.log(

"===================="

);



}









// =====================================
// SELL CONFIRMATION
// =====================================


export function confirmSale(

itemName:string,

price:number

)

{


console.log(

"===================="

);



console.log(

"SOLD: "

+

itemName

);



console.log(

"Received: "

+

price

);



console.log(

"Total Coins: "

+

playerCoins

);



console.log(

"===================="

);



}









// =====================================
// SHOP RESTOCK
// =====================================


export function restockShop()

{


console.log(

"MERCHANT RESTOCKING..."

);



shopItems.push(

{

name:"Mystery Dungeon Box",

rarity:"Rare",

buyPrice:750,

sellPrice:350,

color:new Color(

0.5,

0.2,

1

)

}

);





console.log(

"SHOP RESTOCK COMPLETE"

);



}









// =====================================
// SHOW SHOP INVENTORY
// =====================================


export function showShopInventory()

{


console.log(

"========= SHOP ========="

);



console.log(

"Coins: "

+

playerCoins

);





for(let item of shopItems)

{


console.log(

item.name

+

" | "

+

item.rarity

+

" | "

+

item.buyPrice

+

" coins"

);



}




console.log(

"======================="

);



}