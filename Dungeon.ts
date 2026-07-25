// =====================================
// GENERATE CONNECTED MAZE
// EVERY ROOM HAS OPENINGS
// =====================================

function generateMaze()

{


maze=[];



// Fill everything with walls

for(let x=0;x<mazeWidth;x++)

{

    maze[x]=[];


    for(let z=0;z<mazeHeight;z++)

    {

        maze[x][z]=1;

    }

}





// =================================
// CARVE CONNECTED PATHS
// =================================

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


            // open wall between cells

            maze[x+d[0]/2][z+d[1]/2]=0;



            carve(nx,nz);


        }


    }


}






// create main maze

carve(1,1);







// =================================
// ADD EXTRA DOORWAYS
// STOP SEALED ROOMS
// =================================

for(let x=1;x<mazeWidth-1;x++)

{


    for(let z=1;z<mazeHeight-1;z++)

    {


        if(maze[x][z]==0)

        {


            let exits = 0;



            if(maze[x+1][z]==0)
                exits++;


            if(maze[x-1][z]==0)
                exits++;


            if(maze[x][z+1]==0)
                exits++;


            if(maze[x][z-1]==0)
                exits++;





            // create another exit if trapped

            if(exits <= 1)

            {


                let possible =

                [

                    [1,0],

                    [-1,0],

                    [0,1],

                    [0,-1]

                ];





                let choice = possible[

                    Math.floor(

                        Math.random()*possible.length

                    )

                ];





                let nx=x+choice[0];

                let nz=z+choice[1];





                if(

                    nx>0 &&

                    nz>0 &&

                    nx<mazeWidth-1 &&

                    nz<mazeHeight-1

                )

                {


                    maze[nx][nz]=0;


                }


            }


        }


    }


}







// =================================
// GUARANTEED START + EXIT
// =================================

maze[1][1]=0;


maze[mazeWidth-2][mazeHeight-2]=0;



}