import * as THREE from "three";

// Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Move camera up so it can see the cubes
camera.position.set(0, 150, 250);
camera.lookAt(0, 150, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 200, 100);
scene.add(directionalLight);

// Ground
const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x555555,
    side: THREE.DoubleSide,
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Cube array
const cubes: THREE.Mesh[] = [];
const cubeCount = 50;

for (let i = 0; i < cubeCount; i++) {
    const geometry = new THREE.BoxGeometry(5, 5, 5);

    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(Math.random(), Math.random(), Math.random()),
    });

    const cube = new THREE.Mesh(geometry, material);

    // Spawn VERY HIGH
cube.position.set(
    (Math.random() - 0.5) * 200, // X
    600 + Math.random() * 3200,   // Y (600–1200)
    (Math.random() - 0.5) * 200  // Z
);

    scene.add(cube);
    cubes.push(cube);
}

// Animation
function animate() {
    requestAnimationFrame(animate);

    const t = performance.now() * 0.0002;

    cubes.forEach((cube, i) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.015;

        const material = cube.material as THREE.MeshStandardMaterial;
        material.color.setHSL((t + i * 0.03) % 1, 1, 0.5);
    });

    renderer.render(scene, camera);
}

animate();

// Resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});