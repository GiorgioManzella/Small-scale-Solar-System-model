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

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0x020204,
});

// define the object and his components*************************

const torus = new THREE.Mesh(geometry, material);

// add to the scene the created object*************************

scene.add(torus);

// add the first source of LIGHT

const firstLight = new THREE.PointLight(0xffffff);
firstLight.position.set(20, 20, 20);

// import the first source of LIGHT

scene.add(firstLight);

// add the second source of LIGHT

const secondLight = new THREE.AmbientLight(0xffffff);

//import the second source of LIGHT

scene.add(secondLight);

//graphic light source points

const lightHelper = new THREE.PointLightHelper(firstLight);
scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(gridHelper);

// set up orbit control after import

const controls = new OrbitControls(camera, renderer.domElement);

// create multiple random objects for the scene and add it to the rendered scene

function addStars() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(600).fill().forEach(addStars);

// set custom texture for it

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

// my image creation

const myTexture = new THREE.TextureLoader().load("./me.jpg");

const me = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: myTexture })
);
scene.add(me);

// earth geometry
const earthTexture = new THREE.TextureLoader().load("earth.jpg");
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: earthTexture })
);
scene.add(earth);
earth.position.z = 30;
earth.position.setX(-10);

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

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.001;
  torus.rotation.z += 0.001;

  me.rotation.y += -0.001;

  controls.update();

  renderer.render(scene, camera);
}

//call the function

animate();
moveCamera();
