const update = (renderer, scene, camera, controls, clock) => {
  renderer.render(scene, camera);
  var boxGrid = scene.getObjectByName("box-grid");
  // plane.rotation.y += 0.01;
  // plane.rotation.z += 0.01;
  let timeElapsed = clock.getElapsedTime();

  boxGrid.children.forEach((element, index) => {
    element.scale.y = (Math.sin(timeElapsed * 5 + index) + 1) / 2 + 0.01;
    element.position.y = element.scale.y;
  });

  controls.update();

  requestAnimationFrame(() => update(renderer, scene, camera, controls, clock));
};

// for light point light

const point_light = (intensity) => {
  let light = new THREE.PointLight(0xffffff, intensity);
  return light;
};

const firstExample = () => {
  var scene = new THREE.Scene();

  let enablefog = false;

  if (enablefog) {
    scene.fog = new THREE.FogExp2("rgb(120 ,120 ,120)", 0.2);
  }

  let clock = new THREE.Clock();
  // gui

  var gui = new dat.GUI();

  //   console.log(scene);

  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  let CameraZPosition = new THREE.Group();

  let CameraYRotation = new THREE.Group();
  let CameraXRotation = new THREE.Group();
  CameraZPosition.add(camera);
  CameraXRotation.add(CameraZPosition);
  CameraYRotation.add(CameraXRotation);

  scene.add(CameraYRotation);

  gui.add(CameraZPosition.position, "z", 0, 100);
  gui.add(CameraYRotation.rotation, "y", -Math.PI, Math.PI);
  gui.add(CameraXRotation.rotation, "x", -Math.PI, Math.PI);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // mesh = getBox(1, 1, 1);

  // mesh.name = "cube-1";

  // mesh.position.y = mesh.geometry.parameters.height / 2;

  plane = getPlane(40);

  boxGrid = getgridBox(10, 1.5);

  boxGrid.name = "box-grid";

  plane.name = "plane-1";

  pointLight = point_light(1);

  pointLight.position.y = 2;

  plane.rotation.x = Math.PI / 2;

  sphere = getSphere(0.05);
  pointLight.add(sphere);
  gui.add(pointLight, "intensity", 0, 10);
  gui.add(pointLight.position, "y", 0, 5);

  scene.add(plane);

  scene.add(boxGrid);

  // scene.add(mesh);

  scene.add(pointLight);

  // position camera

  // camera.position.x = 1;
  // camera.position.y = 2;
  // camera.position.z = 10;

  // renderer

  var renderer = new THREE.WebGLRenderer();

  renderer.setClearColor("rgb(120 ,120 ,120)");

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.getElementById("webgl").appendChild(renderer.domElement);

  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  update(renderer, scene, camera, controls, clock);
};

const getBox = (x, y, z) => {
  // geometry

  var geometry = new THREE.BoxGeometry(x, y, z);

  // material

  var material = new THREE.MeshPhongMaterial({
    color: "rgb(120 ,120 ,120)",
  });

  // mesh

  var mesh = new THREE.Mesh(geometry, material);

  return mesh;
};

const getSphere = (size) => {
  // geometry

  var geometry = new THREE.SphereGeometry(size, 24, 24);

  // material

  var material = new THREE.MeshBasicMaterial({
    color: "rgb(255 ,255 ,255)",
  });

  // mesh

  var mesh = new THREE.Mesh(geometry, material);

  return mesh;
};

const getPlane = (size) => {
  let geometryplane = new THREE.PlaneGeometry(size, size);

  let material = new THREE.MeshPhongMaterial({
    color: "rgb(120 ,120 ,120)",
    side: THREE.DoubleSide,
  });

  var mesh = new THREE.Mesh(geometryplane, material);

  return mesh;
};

const getgridBox = (amount, seperationMultiplier) => {
  let group = new THREE.Group();

  for (let index = 0; index < amount; index++) {
    let object = getBox(1, 1, 1);
    object.position.x = index * seperationMultiplier;
    object.position.y = object.geometry.parameters.height / 2;
    group.add(object);

    for (let j = 0; j < amount; j++) {
      let object = getBox(1, 1, 1);
      object.position.x = index * seperationMultiplier;
      object.position.y = object.geometry.parameters.height / 2;
      object.position.z = j * seperationMultiplier;
      group.add(object);
    }
  }
  group.position.x = -(seperationMultiplier * (amount - 1)) / 2;
  group.position.z = -(seperationMultiplier * (amount - 1)) / 2;

  return group;
};

firstExample();
