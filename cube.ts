import * as THREE from 'three';

// 1. Create the scene
const scene = new THREE.Scene();

// 2. Create the cube geometry (width, height, depth)
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 3. Create a material with a color
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// 4. Combine geometry and material into a mesh (the "cube")
const cube = new THREE.Mesh(geometry, material);

// 5. Set initial position (optional)
cube.position.set(0, 0, 0);

// 6. Add the cube to the scene
scene.add(cube);