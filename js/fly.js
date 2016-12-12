var Colors = {
	red: 0xED6A5A,
	grey: 0xD8DBE2,
	green: 0x96E6B3,
	brown: 0x9F7E69,
	mintcream: 0xF1FFFA,
	blue: 0xA5DCE5,
	black: 0x000000
};

var scene,
		camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
		renderer, container;

function start() {
  buildScene();
  buildLights();

  buildDog();
  buildWallStreet();
  buildSky();
  // // start a loop that will update the objects' positions
	// // and render the scene on each frame
  loop();
}

//this is for the aspect ratio of the camera and size of rendered
function buildScene() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene

  scene.fog = new THREE.Fog(0xF1FFFA, 100, 950);

  aspectRatio = WIDTH/HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera (
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );

  camera.position.x = 0;
  camera.position.z = 200;
  camera.position.y = 100;

  renderer = new THREE.WebGLRenderer ({
    alpha: true,
    antialias: true,
  });

  renderer.setSize(WIDTH, HEIGHT);

  renderer.shadowMap.enabled = true;

  container = $('#wall-street');
  //adds the domElement of the rendered to wallstreet
  container.append(renderer.domElement);
  renderer.render(scene, camera);


  window.addEventListener('resize', handleWindowResize, false);

}
//redefine for the window size
function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
  console.log('this window is resizing!')
}

var hemisphereLight, shadowLight;
//set the mood for flying dog
//let's name him now
//i name my flying dog Doggo

function buildLights() {
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)

  shadowLight = new THREE.DirectionalLight(0xFFFFFF, .9);
  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;

  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  scene.add(hemisphereLight);
  scene.add(shadowLight);
  console.log('lights are on')
}

//build wall-street
var wallStreet = function() {

  // create the geometry (shape) of the cylinder;
  // the parameters are:
  // radius top, radius bottom, height, number of segments on the radius, number of segments vertically
  //
  // var mat;
  // var geom;
  //
  // var loader = new THREE.TextureLoader();
  // loader.load(
  //   'textures/brickwall.jpg',
  //   function(texture) {
  //     // var geom = new THREE.CylinderBufferGeometry(600,600,800,40,10);
  //     geom = new THREE.BoxBufferGeometry( 200, 200, 200 );
  //     geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
  //     mat = new THREE.MeshBasicMaterial({
  //       map: texture
  //     });
  //     // console.log(mat)
  //
  //   }
  // );
  // console.log(geom)
  // this.mesh = new THREE.Mesh(geom, mat);
  // this.mesh.receiveShadow = true;

}

var wallStreet;

function buildWallStreet(){

	// push it a little bit at the bottom of the scene
	// wallStreet.mesh.position.y = -10;
  // instantiate a loader
  var loader = new THREE.TextureLoader();

  // load a resource
  loader.load(
  	// resource URL
  	'../textures/brickwall.jpg',
  	// Function when resource is loaded
  	function ( texture ) {
  		// do something with the texture
  		var material = new THREE.MeshBasicMaterial( {
  			map: texture,
        transparent: true,
        opacity: .8,
        shading: THREE.FlatShading
  		 } );
       var geometry = new THREE.CylinderGeometry(120,120,180,16,4);
       geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
       var mesh = new THREE.Mesh( geometry, material );
       mesh.position.y = -50;
       scene.add( mesh );
       renderer.render(scene, camera)
  	}
  );


	// add the mesh of the sea to the scene
  console.log(wallStreet)
	// scene.add(wallStreet.mesh);
}

//
// Cloud = function() {
//   this.mesh = new THREE.Object3D();
//
//   var loader = new THREE.TextureLoader();
//   var that = this;
// 	var material;
// 	var geom;
//
//   loader.load(
//     '../textures/cloud.png',
//     function(texture) {
//       var geom = new THREE.BoxBufferGeometry(20,20,20);
//       var material = new THREE.MeshBasicMaterial( {
//         color: Colors.grey,
//       });
// 			var nBlocs = 3+Math.floor(Math.random()*3);
// 			for (var i=0; i<nBlocs; i++ ) {
// 				// create the mesh by cloning the geometry
// 				var m = new THREE.Mesh(geom, material);
// 				// set the position and the rotation of each cube randomly
// 				m.position.x = i*15;
// 				m.position.y = Math.random()*10;
// 				m.position.z = Math.random()*10;
// 				m.rotation.z = Math.random()*Math.PI*2;
// 				m.rotation.y = Math.random()*Math.PI*2;
//
// 				// set the size of the cube randomly
// 				var s = .1 + Math.random()*.9;
// 				m.scale.set(s,s,s);
//
// 				// allow each cube to cast and to receive shadows
// 				m.castShadow = true;
// 				m.receiveShadow = true;
//
// 				// add the cube to the container we first created
// 				that.mesh.add(m);
//   	}
// 	});
// }


Cloud = function(){
	// Create an empty container that will hold the different parts of the cloud
	this.mesh = new THREE.Object3D();

	// create a cube geometry;
	// this shape will be duplicated to create the cloud
	var geom = new THREE.BoxGeometry(20,20,20);

	// create a material; a simple white material will do the trick
	var mat = new THREE.MeshPhongMaterial();
	mat.color.set(Colors.grey)

	// duplicate the geometry a random number of times
	var nBlocs = 3+Math.floor(Math.random()*3);
	for (var i=0; i<nBlocs; i++ ){

		// create the mesh by cloning the geometry
		var m = new THREE.Mesh(geom, mat);

		// set the position and the rotation of each cube randomly
		m.position.x = i*15;
		m.position.y = Math.random()*10;
		m.position.z = Math.random()*10;
		m.rotation.z = Math.random()*Math.PI*2;
		m.rotation.y = Math.random()*Math.PI*2;

		// set the size of the cube randomly
		var s = .1 + Math.random()*.9;
		m.scale.set(s,s,s);

		// allow each cube to cast and to receive shadows
		m.castShadow = true;
		m.receiveShadow = true;

		// add the cube to the container we first created
		this.mesh.add(m);
	}
}

// Define a Sky Object
Sky = function(){
	// Create an empty container
	this.mesh = new THREE.Object3D();

	// choose a number of clouds to be scattered in the sky
	this.nClouds = 20;

	// To distribute the clouds consistently,
	// we need to place them according to a uniform angle
	var stepAngle = Math.PI*2 / this.nClouds;

	// create the clouds
	for(var i=0; i<this.nClouds; i++){
		var c = new Cloud();

		// set the rotation and the position of each cloud;
		// for that we use a bit of trigonometry
		var a = stepAngle*i; // this is the final angle of the cloud
		var h = 750 + Math.random()*200; // this is the distance between the center of the axis and the cloud itself

		// Trigonometry!!! I hope you remember what you've learned in Math :)
		// in case you don't:
		// we are simply converting polar coordinates (angle, distance) into Cartesian coordinates (x, y)
		c.mesh.position.y = Math.sin(a)*h;
		c.mesh.position.x = Math.cos(a)*h;

		// rotate the cloud according to its position
		c.mesh.rotation.z = a + Math.PI/2;

		// for a better result, we position the clouds
		// at random depths inside of the scene
		c.mesh.position.z = -400-Math.random()*400;

		// we also set a random scale for each cloud
		var s = 1+Math.random()*2;
		c.mesh.scale.set(s,s,s);

		// do not forget to add the mesh of each cloud in the scene
		this.mesh.add(c.mesh);
	}
}

// Now we instantiate the sky and push its center a bit
// towards the bottom of the screen

var sky;

function buildSky(){
	sky = new Sky();
	sky.mesh.position.y = -600;
	scene.add(sky.mesh);
}



var Dog = function() {
  this.mesh = new THREE.Object3D();

  var geomBody = new THREE.BoxGeometry(60,40,50,1,1,1)
	var matBody = new THREE.MeshPhongMaterial({
		shading: THREE.FlatShading
	})
	matBody.color.set(Colors.brown);

	var body = new THREE.Mesh(geomBody, matBody);
	body.castShadow = true;
	body.receiveShadow = true;
	body.position.y = -10;
	this.mesh.add(body)

	var geomHead = new THREE.BoxGeometry(30,50,50,1,1,1);
	var matHead = new THREE.MeshPhongMaterial({color:Colors.brown, shading:THREE.FlatShading});
	var head = new THREE.Mesh(geomHead, matHead);
	head.position.x = 40;
	head.castShadow = true;
	head.receiveShadow = true;
	this.mesh.add(head);

	var geomRightEye = new THREE.BoxGeometry(5,10,1,1,1,1);
	var matRightEye = new THREE.MeshPhongMaterial({color: Colors.black, shading: THREE.FlatShading});
	var rightEye = new THREE.Mesh(geomRightEye, matRightEye);
	rightEye.position.x = 40;
	rightEye.position.y = 10;
	rightEye.position.z = 30;
	rightEye.receiveShadow = true;
	this.mesh.add(rightEye)

	var geomLeftEye = new THREE.BoxGeometry(5,10,1,1,1,1);
	var matLeftEye = new THREE.MeshPhongMaterial({color: Colors.black, shading: THREE.FlatShading});
	var leftEye = new THREE.Mesh(geomLeftEye, matLeftEye);
	leftEye.position.x = 40;
	leftEye.position.y = 10;
	leftEye.position.z = -30;
	leftEye.receiveShadow = true;
	this.mesh.add(leftEye)

	var geomMouth = new THREE.BoxGeometry(20,30,30,1,1,1);
	var matMouth = new THREE.MeshPhongMaterial({color:Colors.brown, shading:THREE.FlatShading});
	var mouth = new THREE.Mesh(geomMouth, matMouth);
	mouth.position.x = 60;
	mouth.position.y = -10;
	mouth.castShadow = true;
	mouth.receiveShadow = true;
	this.mesh.add(mouth);

	var geomNose = new THREE.BoxGeometry(10,10,5,1,1,1);
	var matNose = new THREE.MeshPhongMaterial({color:Colors.black, shading:THREE.FlatShading});
	var nose = new THREE.Mesh(geomNose, matNose);
	nose.position.x = 70;
	nose.position.y = 1;
	nose.position.z = 20;
	nose.receiveShadow = true;
	this.mesh.add(nose);

	var geomLeftEar = new THREE.BoxGeometry(20,30,10,1,1,1);
	var matLeftEar = new THREE.MeshPhongMaterial({color:Colors.black, shading:THREE.FlatShading});
	var leftEar = new THREE.Mesh(geomLeftEar, matLeftEar);
	leftEar.position.x = 20;
	leftEar.position.y = 10;
	leftEar.position.z = -20;
	leftEar.castShadow = true;
	leftEar.receiveShadow = true;
	this.mesh.add(leftEar);

	var geomRightEar = new THREE.BoxGeometry(20,30,10,1,1,1);
	var matRightEar = new THREE.MeshPhongMaterial({color:Colors.black, shading:THREE.FlatShading});
	var rightEar = new THREE.Mesh(geomRightEar, matRightEar);
	rightEar.position.x = 20;
	rightEar.position.y = 10;
	rightEar.position.z = 20;
	rightEar.castShadow = true;
	rightEar.receiveShadow = true;
	this.mesh.add(rightEar);

	var geomTail = new THREE.BoxGeometry(10,5,5,1,1,1);
	var matTail = new THREE.MeshPhongMaterial({color:Colors.black, shading:THREE.FlatShading});
	this.tail = new THREE.Mesh(geomTail, matTail);
	this.tail.position.x = -30;
	this.tail.position.y = 10;
	this.tail.position.z = 30;
	this.tail.receiveShadow = true;
	this.mesh.add(this.tail);


}

var dog;

function buildDog() {
	dog = new Dog();
	dog.mesh.scale.set(.25,.25,.25);
	dog.mesh.position.y = 100;
	scene.add(dog.mesh)
}

function loop() {
	dog.tail.rotation.x += 0.3;
	wallStreet.mesh.rotation.z += .005;
	sky.mesh.rotation.z += .01;

  renderer.render(scene, camera);
  console.log("where is my bloody wallstreet")
	requestAnimationFrame(loop);
}

window.addEventListener('load', start, false);
