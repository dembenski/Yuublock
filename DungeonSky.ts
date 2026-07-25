import { Color } from "./Yuu API/Basic Types/Color";


// =====================================
// RETRO DUNGEON SKY DOME
// =====================================


export function createDungeonSky()

{


console.log(
"Creating retro sky dome..."
);




// =====================================
// AMBIENT LIGHT
// =====================================


SkyDome.ambientLight.baseColor.set(

new Color(

0.12,

0.08,

0.20

)

);



SkyDome.ambientLight.energy.set(

0.45

);



SkyDome.ambientLight.skyColorContribution.set(

0.35

);






// =====================================
// PROCEDURAL SKY
// =====================================


SkyDome.skyMaterial.setProceduralSkyMaterial(

new Color(

0.03,

0.02,

0.08

),


new Color(

0.15,

0.10,

0.35

),


0.35,


new Color(

0.05,

0.02,

0.01

),


new Color(

0.5,

0.2,

0.1

),


0.02


);





console.log(

"Retro dungeon sky activated"

);


}