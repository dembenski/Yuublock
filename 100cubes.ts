// ===============================
// RANDOM COLOR CUBE SPAWNER
// ===============================

const cubes: THREE.Mesh[] = [];

const cubeCount = 100;

for (let i = 0; i < cubeCount; i++) {

    const size = Math.random() * 5 + 2; // cubes between 2 and 7 units

    const geometry = new THREE.BoxGeometry(
        size,
        size,
        size
    );


    // Random color
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(
            Math.random(),
            Math.random(),
            Math.random()
        )
    });


    const cube = new THREE.Mesh(
        geometry,
        material
    );


    // Random positions HIGH in the sky
    cube.position.set(
        (Math.random() - 0.5) * 500, // X
        Math.random() * 600 + 600,   // Y (600 - 1200 high)
        (Math.random() - 0.5) * 500  // Z
    );


    // Random rotation
    cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );


    scene.add(cube);
    cubes.push(cube);

}


// Animate cubes
function animateCubes(){

    cubes.forEach((cube, index)=>{

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.015;


        // Slowly change colors
        const material = cube.material as THREE.MeshStandardMaterial;

        material.color.setHSL(
            (performance.now() * 0.0001 + index * 0.02) % 1,
            1,
            0.5
        );

    });

}