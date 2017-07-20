var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMapEnabled = true

var updateFcts = [];
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100);
camera.position.z = 3;

var light = new THREE.AmbientLight(0x888888)
scene.add(light)
// var light	= new THREE.DirectionalLight( 'white', 1)
// light.position.set(5,5,5)
// light.target.position.set( 0, 0, 0 )
// scene.add( light )

var light = new THREE.DirectionalLight(0xcccccc, 1)
light.position.set(5, 5, 5)
scene.add(light)
light.castShadow = true
light.shadowCameraNear = 0.01
light.shadowCameraFar = 15
light.shadowCameraFov = 45

light.shadowCameraLeft = -1
light.shadowCameraRight = 1
light.shadowCameraTop = 1
light.shadowCameraBottom = -1
// light.shadowCameraVisible	= true

light.shadowBias = 0.001
light.shadowDarkness = 0.2

light.shadowMapWidth = 1024
light.shadowMapHeight = 1024

//////////////////////////////////////////////////////////////////////////////////
//		add an object and make it move					//
//////////////////////////////////////////////////////////////////////////////////

function renderSun() {
  var mesh = THREEx.Planets.createSun();
  scene.add(mesh);
}

function renderMercury() {
  var mesh = THREEx.Planets.createMercury();
  scene.add(mesh);
}

function renderVenus() {
  var mesh = THREEx.Planets.createVenus();
  scene.add(mesh);
}

function renderEarth() {
  var mesh = THREEx.Planets.createMoon();
  scene.add(mesh);
  var earthMesh = THREEx.Planets.createEarth();
  scene.add(earthMesh);
  var mesh = THREEx.Planets.createEarthCloud();
  scene.add(mesh);
  updateFcts.push(function(delta, now) {
    mesh.rotation.y += 1 / 8 * delta;
  });
}

function renderMars() {
  var mesh = THREEx.Planets.createMars();
  scene.add(mesh);
}

function renderJupiter() {
  var mesh = THREEx.Planets.createJupiter();
  scene.add(mesh);
}

function renderSaturn() {
  var mesh = THREEx.Planets.createSaturn();
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add(mesh);
  var mesh = THREEx.Planets.createSaturnRing();
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add(mesh);
}


function renderUranus() {
  var mesh = THREEx.Planets.createUranus();
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add(mesh);
  var mesh = THREEx.Planets.createUranusRing();
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add(mesh);
}

function renderNeptune() {
  var mesh = THREEx.Planets.createNeptune();
  scene.add(mesh);
}


function renderPluto() {
  var mesh = THREEx.Planets.createPluto();
  scene.add(mesh);
}

var randomPlanet = {
  1: renderSun(),
  2: renderMercury(),
  3: renderVenus(),
  4: renderEarth(),
  5: renderMars(),
  6: renderJupiter(),
  7: renderSaturn(),
  8: renderUranus(),
  9: renderNeptune(),
  10: renderPluto()
};

var random = Math.floor((Math.random() * 10) + 1);

var mesh = THREEx.Planets.createStarfield();
scene.add(mesh);

randomPlanet[random];

updateFcts.push(function(delta, now) {
  //mesh.rotation.x += 1 * delta;
  //mesh.rotation.y += 1/2 * delta;
})

//////////////////////////////////////////////////////////////////////////////////
//		Camera Controls							//
//////////////////////////////////////////////////////////////////////////////////
var mouse = {
  x: 0,
  y: 0
}
document.addEventListener('mousemove', function(event) {
  mouse.x = (event.clientX / window.innerWidth) - 0.5
  mouse.y = (event.clientY / window.innerHeight) - 0.5
}, false)
updateFcts.push(function(delta, now) {
  camera.position.x += (mouse.x * 5 - camera.position.x) * (delta * 3)
  camera.position.y += (mouse.y * 5 - camera.position.y) * (delta * 3)
  camera.lookAt(scene.position)
})


//////////////////////////////////////////////////////////////////////////////////
//		render the scene						//
//////////////////////////////////////////////////////////////////////////////////
updateFcts.push(function() {
  renderer.render(scene, camera);
})

//////////////////////////////////////////////////////////////////////////////////
//		loop runner							//
//////////////////////////////////////////////////////////////////////////////////
var lastTimeMsec = null
requestAnimationFrame(function animate(nowMsec) {
  // keep looping
  requestAnimationFrame(animate);
  // measure time
  lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60
  var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
  lastTimeMsec = nowMsec
  // call each update function
  updateFcts.forEach(function(updateFn) {
    updateFn(deltaMsec / 1000, nowMsec / 1000)
  })
})