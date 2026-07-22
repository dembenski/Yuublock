import * as THREE from "three";

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101018);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
);

camera.position.set(0, 80, 150);
camera.lookAt(0, 40, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(50, 200, 50);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));


// Cube platform creator
const platforms: THREE.Mesh[] = [];

function createCube(
    x: number,
    y: number,
    z: number,
    size: number,
    color: number
) {
    const geometry = new THREE.BoxGeometry(size, size, size);

    const material = new THREE.MeshStandardMaterial({
        color: color
    });

    const cube = new THREE.Mesh(geometry, material);

    cube.position.set(x, y, z);

    scene.add(cube);
    platforms.push(cube);

    return cube;
}


// START PLATFORM
createCube(0, 20, 0, 15, 0x00ff00);


// PARKOUR COURSE
const course = [
    [20, 30, 0],
    [40, 45, 10],
    [60, 60, -10],
    [80, 80, 15],
    [100, 100, -15],
    [120, 120, 20],
    [140, 145, 0],
    [160, 170, -20],
    [180, 200, 20],
    [210, 230, 0]
];


course.forEach((p, i) => {

    createCube(
        p[0],
        p[1],
        p[2],
        10,
        new THREE.Color(
            Math.random(),
            Math.random(),
            Math.random()
        ).getHex()
    );

});


// Extra floating steps
for(let i = 0; i < 40; i++){

    createCube(
        Math.random() * 250 - 20,
        30 + i * 5,
        Math.random() * 80 - 40,
        6,
        0x0088ff
    );

}


// FINISH PLATFORM
createCube(
    240,
    260,
    0,
    20,
    0xff0000
);


// Ground far below
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(1000,1000),
    new THREE.MeshStandardMaterial({
        color:0x222222
    })
);

ground.rotation.x = -Math.PI/2;
ground.position.y = -50;

scene.add(ground);


// Animation
function animate(){

    requestAnimationFrame(animate);

    platforms.forEach((cube,i)=>{

        cube.rotation.y += 0.005;

        // rainbow effect
        const mat = cube.material as THREE.MeshStandardMaterial;

        mat.color.setHSL(
            (performance.now()*0.0001 + i*0.03)%1,
            1,
            0.5
        );

    });


    renderer.render(scene,camera);
}

animate();


// Resize
window.addEventListener("resize",()=>{

    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});