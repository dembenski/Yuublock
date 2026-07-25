// =====================================
// GENERATE MAZE
// GUARANTEED OPEN ROOMS
// =====================================

function generateMaze()

{

maze=[];


// fill walls

for(let x=0;x<mazeWidth;x++)

{

maze[x]=[];

for(let z=0;z<mazeHeight;z++)

{

maze[x][z]=1;

}

}





// carve connected maze

function carve(x:number,z:number)

{


maze[x][z]=0;



let dirs =

[

[2,0],

[-2,0],

[0,2],

[0,-2]

];



dirs.sort(()=>Math.random()-0.5);



for(let d of dirs)

{


let nx=x+d[0];

let nz=z+d[1];



if(

nx>0 &&

nz>0 &&

nx<mazeWidth-1 &&

nz<mazeHeight-1 &&

maze[nx][nz]==1

)

{


maze[x+d[0]/2][z+d[1]/2]=0;


carve(nx,nz);


}


}


}



carve(1,1);






// =====================================
// ADD EXTRA DOORS
// PREVENT SEALED ROOMS
// =====================================


for(let x=1;x<mazeWidth-1;x++)

{


for(let z=1;z<mazeHeight-1;z++)

{


if(maze[x][z]==0)

{


let openings=0;



if(maze[x+1][z]==0)
openings++;


if(maze[x-1][z]==0)
openings++;


if(maze[x][z+1]==0)
openings++;


if(maze[x][z-1]==0)
openings++;






// if room has only one entrance,
// add another exit

if(openings<=1)

{


let side=Math.floor(Math.random()*4);



if(side==0 && x<mazeWidth-2)

{

maze[x+1][z]=0;

}



if(side==1 && x>1)

{

maze[x-1][z]=0;

}



if(side==2 && z<mazeHeight-2)

{

maze[x][z+1]=0;

}



if(side==3 && z>1)

{

maze[x][z-1]=0;

}



}



}



}



}







// =====================================
// GUARANTEED START ROOM EXIT
// =====================================


maze[1][1]=0;

maze[2][1]=0;

maze[1][2]=0;






// =====================================
// GUARANTEED FINAL EXIT
// =====================================


maze[mazeWidth-2][mazeHeight-2]=0;

maze[mazeWidth-3][mazeHeight-2]=0;

maze[mazeWidth-2][mazeHeight-3]=0;



console.log("Maze rooms opened");

}