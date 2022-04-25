import "./style.css";

import * as THREE from "three";
import {
  MapControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import Stats from "stats.js";

// attempt at implementing sound, not working for now

const scene = new THREE.Scene();
// const listener = new THREE.AudioListener();
// camera.add(listener);

// const audioFile = new THREE.Audio(listener);

// const audioLoader = new THREE.AudioLoader();
// audioLoader.load("./Data/base music.mp4", function (buffer) {
//   sound.setBuffer(buffer);
//   sound.setLoop(true);
//   sound.setVolume(0.5);
//   sound.play();
// });
// fps counter************************************************************FPS
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
// ANTIALIASING***************************************************************AA
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
});

//VR *************************************************************************

renderer.xr.enabled = true;
renderer.setAnimationLoop(function () {
  renderer.render(scene, camera);
});

document.body.appendChild(VRButton.createButton(renderer));

// set settings for the render proprieties like width and height*************

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//create mesh components so geometry and material, +the defined shape from the library or blender**************
const sunTexture = new THREE.TextureLoader().load("./Data/sun.jpg");
const geometry = new THREE.SphereGeometry(25, 24, 24);
const material = new THREE.MeshStandardMaterial({
  map: sunTexture,
  emissive: true,
  emissiveIntensity: 0.1,
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
//scene.add(gridHelper);

// set up orbit control after import

const controls = new OrbitControls(camera, renderer.domElement);

// create multiple random objects for the scene and add it to the rendered scene*****STARS

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

// set custom texture for it*********************************************************

const spaceTexture = new THREE.TextureLoader().load("./Data/space.jpg");
scene.background = spaceTexture;

// uranus*********************************************************************** URANUS

const uranusTexture = new THREE.TextureLoader().load("./Data/uranus.jpg");
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(4, 50, 50),
  new THREE.MeshStandardMaterial({ map: uranusTexture })
);
scene.add(uranus);
uranus.position.z = 330;

// NEPTUNE************************************************************************NEPTUNE

const neptuneTexture = new THREE.TextureLoader().load("./Data/neptune.jpg");
const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(4, 50, 50),
  new THREE.MeshStandardMaterial({ map: neptuneTexture })
);
scene.add(neptune);
neptune.position.z = 370;

//saturn************************************************************************SATURN

const saturnTexture = new THREE.TextureLoader().load("./Data/saturn.jpg");
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(10, 50, 50),
  new THREE.MeshStandardMaterial({ map: saturnTexture })
);
scene.add(saturn);
saturn.position.z = 240;

//saturn rings*********************************************************************RINGS

const saturnRingTexture = new THREE.TextureLoader().load(
  "./Data/saturnRing2.png"
);
const saturnRing = new THREE.Mesh(
  new THREE.PlaneGeometry(80, 80, 1, 1),
  new THREE.MeshStandardMaterial({
    map: saturnRingTexture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5,
    color: 0xffffff,
  })
);
scene.add(saturnRing);
saturnRing.position.z = 240;
saturnRing.rotation.y += 25;
saturnRing.rotation.x += 45;

// earth geometry************************************************************************EARTH
const earthTexture = new THREE.TextureLoader().load("./Data/earth.jpg");
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: earthTexture })
);
scene.add(earth);
earth.position.z = 80;

//jupiter geometry**********************************************************************JUPITER

const jupiterTexture = new THREE.TextureLoader().load("./Data/jupiter.jpg");

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(12, 50, 50),
  new THREE.MeshStandardMaterial({ map: jupiterTexture })
);
scene.add(jupiter);
jupiter.position.z = 160;

// mars geometry************************************************************************MARS

const marsTexture = new THREE.TextureLoader().load("./Data/mars.jpg");

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(2, 26, 26),
  new THREE.MeshStandardMaterial({ map: marsTexture })
);
scene.add(mars);
mars.position.z = 100;

// mercury geometry********************************************************************MERCURY

const mercuryTexture = new THREE.TextureLoader().load("./Data/mercury.jpg");

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(1, 22, 22),
  new THREE.MeshStandardMaterial({ map: mercuryTexture })
);
scene.add(mercury);
mercury.position.z = 40;

// venus geometry**********************************************************************VENUS

const venusTexture = new THREE.TextureLoader().load("./Data/venus.jpg");
const venusAtmosphere = new THREE.TextureLoader().load(
  "./Data/venus-atmosphere"
);
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(2.2, 25, 32),
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

  mercury.rotation.y += earthYear * 6.228668941979522;
  venus.rotation.y += earthYear * 1.502057613168724;
  earth.rotation.y += earthYear;
  mars.rotation.y += earthYear * 1.03;
  jupiter.rotation.y += earthYear * 0.041;
  saturn.rotation.y += earthYear * 0.04329166666666667;
  uranus.rotation.y += earthYear * 0.7083333333333333;
  neptune.rotation.y += earthYear * 0.0416666666666667;
  controls.update();

  renderer.render(scene, camera);
}

(function () {
  var script = document.createElement("script");
  script.onload = function () {
    var stats = new Stats();
    document.body.appendChild(stats.dom);
    requestAnimationFrame(function loop() {
      stats.update();
      requestAnimationFrame(loop);
    });
  };
  script.src = "//mrdoob.github.io/stats.js/build/stats.min.js";
  document.head.appendChild(script);
})();

//call the function

animate();
moveCamera();
