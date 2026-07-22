import * as THREE from "three";

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 20;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// Cube Array
const cubes: THREE.Mesh[] = [];

const cubeCount = 50;

for (let i = 0; i < cubeCount; i++) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(Math.random(), Math.random(), Math.random())
    });

    const cube = new THREE.Mesh(geometry, material);

    // Random position
    cube.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
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

// Animation
function animate() {
    requestAnimationFrame(animate);

    cubes.forEach((cube) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.015;

        const material = cube.material as THREE.MeshStandardMaterial;

        // Slowly cycle through colors
        const hue = (performance.now() * 0.0001 + cube.id * 0.05) % 1;
        material.color.setHSL(hue, 1, 0.5);
    });

    renderer.render(scene, camera);
}

animate();

// Handle resizing
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});