import "./style.css";

import * as THREE from "three";
import {
  MapControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

// set settings for the render proprieties like width and height*************

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//create mesh components so geometry and material, +the defined shape from the library or blender**************
const sunTexture = new THREE.TextureLoader().load("sun.jpg");
const geometry = new THREE.SphereGeometry(25, 24, 24);
const material = new THREE.MeshStandardMaterial({
  map: sunTexture,
});
// define the object and his components*************************

const torus = new THREE.Mesh(geometry, material);

// add to the scene the created object*************************

scene.add(torus);

// add the first source of LIGHT

const firstLight = new THREE.PointLight(0xffffff);
firstLight.position.set(0, 0, 0);

// import the first source of LIGHT

scene.add(firstLight);

// add the second source of LIGHT

const secondLight = new THREE.AmbientLight(0xffffff);

//import the second source of LIGHT

scene.add(secondLight);

//graphic light source points

const lightHelper = new THREE.PointLightHelper(firstLight);
//scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

// set up orbit control after import

const controls = new OrbitControls(camera, renderer.domElement);

// create multiple random objects for the scene and add it to the rendered scene

function addStars() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(800));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStars);

// set custom texture for it

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

// earth geometry
const earthTexture = new THREE.TextureLoader().load("earth.jpg");
const earthClouds = new THREE.TextureLoader().load("earth-clouds.jpg");
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: earthTexture })
);
scene.add(earth);
earth.position.z = 80;

//jupiter geometry

const jupiterTexture = new THREE.TextureLoader().load("jupiter.jpg");

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(10, 50, 50),
  new THREE.MeshStandardMaterial({ map: jupiterTexture })
);
scene.add(jupiter);
jupiter.position.z = 140;

// mars geometry

const marsTexture = new THREE.TextureLoader().load("mars.jpg");

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3, 26, 26),
  new THREE.MeshStandardMaterial({ map: marsTexture })
);
scene.add(mars);
mars.position.z = 100;

// mercury geometry

const mercuryTexture = new THREE.TextureLoader().load("mercury.jpg");

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(3, 22, 22),
  new THREE.MeshStandardMaterial({ map: mercuryTexture })
);
scene.add(mercury);
mercury.position.z = 40;

// venus geometry

const venusTexture = new THREE.TextureLoader().load("venus.jpg");
const venusAtmosphere = new THREE.TextureLoader().load("venus-atmosphere");
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(3, 25, 32),
  new THREE.MeshStandardMaterial({
    map: venusTexture,
    normalMa: venusAtmosphere,
  })
);
scene.add(venus);
venus.position.z = 60;

// defining the camera movement

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  earth.rotation.x + -0.05;
  earth.rotation.y + -0.075;
  earth.position.z + -0.05;

  me.rotation.x + -0.01;
  me.rotation.z + -0.01;

  camera.position.z = t * -0.2;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.002;
}
document.body.Onscroll = moveCamera;
// create a "infinite-game-loop" to render continuosly

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.y += 0.00008;

  const earthYear = 2 * Math.PI * (1 / 60) * (1 / 60);

  mercury.rotation.y += earthYear * 4;
  venus.rotation.y += earthYear * 2;

  earth.rotation.y += earthYear;

  controls.update();

  renderer.render(scene, camera);
}

//call the function

animate();
moveCamera();
