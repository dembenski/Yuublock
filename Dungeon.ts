function generateMaze()
{

maze=[];


for(let x=0;x<mazeWidth;x++)
{

maze[x]=[];


for(let z=0;z<mazeHeight;z++)
{

maze[x][z]=1;

}

}




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





// make extra openings so it feels like rooms

for(let x=1;x<mazeWidth-1;x++)
{

for(let z=1;z<mazeHeight-1;z++)
{


if(

maze[x][z]==0

)

{


if(Math.random()<0.15)

{


maze[x+1][z]=0;


}


if(Math.random()<0.15)

{


maze[x][z+1]=0;


}



}


}

}




// guaranteed start

maze[1][1]=0;


// guaranteed exit

maze[mazeWidth-2][mazeHeight-2]=0;


}