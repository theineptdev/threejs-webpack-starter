import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0;
material.roughness = 1;
material.color = new THREE.Color(0x404040);

// Mesh
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.x = 1;
pointLight.position.y = 1;
pointLight.position.z = 1;
scene.add(pointLight);

// Lights2

const pointLight2 = new THREE.PointLight(0xffffff, 1);
pointLight2.position.x = -1;
pointLight2.position.y = -1;
pointLight2.position.z = 1;
scene.add(pointLight2);

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener('resize', () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 3;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update objects
	cube.rotation.y = 0.25 * elapsedTime;
    cube.rotation.x = 0.225 * elapsedTime;
    cube.rotation.z = 0.20 * elapsedTime;

	// Update Orbital Controls
	// controls.update()

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
