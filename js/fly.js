var Colors = {
	red: 0xED6A5A,
	grey: 0xD8DBE2,
	green: 0x96E6B3,
	skin: 0xFFE0BD,
	mintcream: 0xF1FFFA,
	blue: 0xA5DCE5,
	black: 0x000000,
	blue: 0x5ec4ff
};

var points = 0;
var smartzArray = [];
var funnyzArray = [];
var knivesArray = [];
var paused = true;
var winPoints = 10;
var losePoints = -10;
var levelSpeed = 0.008;
var funnySpeed = 0.0005;


var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
		renderer, container;

function buildScene() {

  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene;

  scene.fog = new THREE.Fog(0xF1FFFA, 100, 950);

  aspectRatio = WIDTH/HEIGHT;
  fieldOfView = 50;
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

  container = $('#melbourne');
  //adds the domElement of the rendered to wallstreet
  container.append(renderer.domElement);
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

function buildLights() {
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
	ambientLight = new THREE.AmbientLight(0xdc8874, .5);
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
	scene.add(ambientLight);
  console.log('lights are on')
}

Melbourne = function() {
	var loader = new THREE.TextureLoader();
	var that = this;
  loader.load(
  	'map.jpeg',
  	function ( texture ) {
  		var material = new THREE.MeshBasicMaterial( {
  			map: texture,
        transparent: true,
        opacity: .8,
        shading: THREE.FlatShading
  		 } );
    	var geometry = new THREE.CylinderGeometry(120,120,150,16,4);
			geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
			that.mesh = new THREE.Mesh( geometry, material );
			that.mesh.position.y = -50
	});
}

Smart = function() {
	var loader = new THREE.TextureLoader();
	var that = this;
	loader.load(
		'lightbulb.png',
		function ( texture ) {
			var material = new THREE.MeshBasicMaterial( {
				map: texture
			 } );
			 var plane = new THREE.PlaneGeometry( 20, 20 );
			 plane.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI));
			 that.mesh = new THREE.Mesh( plane, material );
			 that.mesh.material.side = THREE.DoubleSide;
			//  that.mesh.position.y= 50;
	});
}

Funny = function() {
	var loader = new THREE.TextureLoader();
	var that = this;
	loader.load(
		'datboi.png',
		function ( texture ) {
			var material = new THREE.MeshBasicMaterial( {
				map: texture
			 } );
			 var plane = new THREE.PlaneGeometry( 20, 20 );
			 plane.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI));
			 that.mesh = new THREE.Mesh( plane, material );
			 that.mesh.material.side = THREE.DoubleSide;
			//  that.mesh.position.y= 50;
	});
}


Knife = function() {
	var loader = new THREE.TextureLoader();
	var that = this;
	loader.load(
		// resource URL
		'knife.png',
		// Function when resource is loaded
		function ( texture ) {
			// do something with the texture
			var material = new THREE.MeshBasicMaterial( {
				map: texture,
				transparent: true,
				opacity: .8
			 } );
			 var geometry = new THREE.BoxGeometry( 30, 0, 30 );
			 geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
			 that.mesh = new THREE.Mesh( geometry, material );
			 that.mesh.position.y= 150;
		});
}


Cloud = function(){
	// Create an empty container that will hold the different parts of the cloud
	//CREATES A SINGLE CLOUD
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
		m = new THREE.Mesh(geom, mat);
		// set the position and the rotation of each cube randomly
		m.position.x = i*15;
		m.position.y = Math.random()*10;
		m.position.z = Math.random()*10;
		m.rotation.z = Math.random()*Math.PI*2;
		m.rotation.y = Math.random()*Math.PI*2;
		// set the size of the cube randomly
		s = .1 + Math.random()*.9;
		m.scale.set(s,s,s);
		m.castShadow = true;
		m.receiveShadow = true;
		this.mesh.add(m);
	}
}

allSmartz = function() {
	this.mesh = new THREE.Object3D();
	this.nSmartz = 15;

	var that = this;
	var stepSmartAngle = Math.PI*2;

	for (var i = 0; i < this.nSmartz; i++) {
		m = new Smart();
		smartzArray.push(m);
	}

	setTimeout(function() {
		smartzArray.forEach(function(m) {
			a = stepSmartAngle * Math.random(20);
			h = 700 + Math.random() * 50;

			m.mesh.position.y = Math.sin(a) * h;
			m.mesh.position.x = Math.cos(a) * h;

			m.mesh.rotation.z = a + Math.PI/2;
			m.mesh.position.z = 0;

			s = 0.5+Math.random()*0.5;
			m.mesh.scale.set(s,s,s);

			that.mesh.add(m.mesh);
		})
	}, 1000)
}

allFunnyz = function() {
	this.mesh = new THREE.Object3D();
	// let's scatter some smart in the sky
	// this.mesh = new THREE.Object3D();
	this.nFunnyz = 10;

	var that = this;

	var stepFunnyAngle = Math.PI*2;


	for (var i = 0; i < this.nFunnyz; i++) {
		m = new Funny();

		funnyzArray.push(m);
	}

	setTimeout(function() {
		funnyzArray.forEach(function(m) {
			a = stepFunnyAngle * Math.random(20);
			h = 700 + Math.random() * 50;

			m.mesh.position.y = Math.sin(a) * h;
			m.mesh.position.x = Math.cos(a) * h;

			m.mesh.rotation.z = a + Math.PI/2;
			m.mesh.position.z = 0;

			s = 0.5+Math.random()*0.5;
			m.mesh.scale.set(s,s,s);

			that.mesh.add(m.mesh);
		})
	}, 1000)
}

allKnives = function() {
	this.mesh = new THREE.Object3D();

	this.nKnives = 20;

	var that = this;

	var stepKnifeAngle = Math.PI*2;


	for (var i = 0; i < this.nKnives; i++) {
		k = new Knife();

		knivesArray.push(k);
	}

	setTimeout(function() {
		knivesArray.forEach(function(k) {
			a = stepKnifeAngle * Math.random(20);
			h = 700 + Math.random() * 50;

			k.mesh.position.y = Math.sin(a) * h;
			k.mesh.position.x = Math.cos(a) * h;

			k.mesh.rotation.z = a + Math.PI/2;
			k.mesh.position.z = 0;

			s = 0.5+Math.random()*0.5;
			k.mesh.scale.set(s,s,s);

			that.mesh.add(k.mesh);
		})
	}, 1000)

}

// Define a Sky Object
allClouds = function(){
	// Create an empty container
	// CREATES A WHOLE BUNCH OF CLOUDS

	this.mesh = new THREE.Object3D();

	// choose a number of clouds to be scattered in the sky
	this.nClouds = 20;

	// To distribute the clouds consistently,
	// we need to place them according to a uniform angle
	var stepCloudAngle = Math.PI*2 / this.nClouds;

	// create the clouds
	for (var i=0; i<this.nClouds; i++) {
		c = new Cloud();

		// set the rotation and the position of each cloud;
		// for that we use a bit of trigonometry
		a = stepCloudAngle*i; // this is the final angle of the cloud
		h = 750 + Math.random()*200; // this is the distance between the center of the axis and the cloud itself

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
		s = 1+Math.random()*2;
		c.mesh.scale.set(s,s,s);

		// do not forget to add the mesh of each cloud in the scene
		this.mesh.add(c.mesh);
	}
}

var Chloe = function() {
  this.mesh = new THREE.Object3D();

  var geomBody = new THREE.BoxGeometry(60,40,50,1,1,1)
	var matBody = new THREE.MeshPhongMaterial({color: Colors.blue	})

	var body = new THREE.Mesh(geomBody, matBody);
	body.castShadow = true;
	body.receiveShadow = true;
	body.position.y = -10;
	this.mesh.add(body)

	var geomHead = new THREE.SphereGeometry(30 ,32, 32);
	var matHead = new THREE.MeshBasicMaterial({color:Colors.skin, shading:THREE.FlatShading});
	var head = new THREE.Mesh(geomHead, matHead);
	head.position.x = 40;
	head.castShadow = true;
	head.receiveShadow = true;
	this.mesh.add(head);

	var geomTopHair = new THREE.SphereGeometry(30 ,32, 32, 0, Math.PI*2, 0, Math.PI/2);
	var matTopHair = new THREE.MeshBasicMaterial({color:Colors.black, shading:THREE.FlatShading});
	var topHair = new THREE.Mesh(geomTopHair, matTopHair);
	topHair.position.x = 40;
	topHair.castShadow = true;
	topHair.receiveShadow = true;
	this.mesh.add(topHair);

	var points = [];
	for ( var i = 0; i < 30; i ++ ) {
		points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 20 + 10, ( i  ) * 2 ) );
	}
	var geomMoreHair = new THREE.LatheGeometry( points );
	var matMoreHair = new THREE.MeshBasicMaterial( { color: Colors.black } );
	var moreHair = new THREE.Mesh( geomMoreHair, matMoreHair );
	moreHair.position.x = 40;
	moreHair.position.y = 0;
	moreHair.castShadow = true;
	moreHair.receiveShadow = true;
	moreHair.rotation.z = Math.PI / 2;
	this.mesh.add( moreHair );


	var geomRightEye = new THREE.BoxGeometry(5,5,1,1,1,1);
	var matRightEye = new THREE.MeshPhongMaterial({color: Colors.black, shading: THREE.FlatShading});
	var rightEye = new THREE.Mesh(geomRightEye, matRightEye);
	rightEye.position.x = 45;
	rightEye.position.y = -10;
	rightEye.position.z = 30;
	rightEye.receiveShadow = true;
	this.mesh.add(rightEye)

	var geomLeftEye = new THREE.BoxGeometry(5,5,1,1,1,1);
	var matLeftEye = new THREE.MeshPhongMaterial({color: Colors.black, shading: THREE.FlatShading});
	var leftEye = new THREE.Mesh(geomLeftEye, matLeftEye);
	leftEye.position.x = 45;
	leftEye.position.y = -10;
	leftEye.position.z = -30;
	leftEye.receiveShadow = true;
	this.mesh.add(leftEye)

	var geomHair = new THREE.BoxGeometry(30,20,10,1,1,1);
	var matHair = new THREE.MeshPhongMaterial({color:Colors.black, shading:THREE.FlatShading});
	this.hair = new THREE.Mesh(geomHair, matHair);
	this.hair.position.x = 10;
	this.hair.position.y = 10;
	this.hair.position.z = 0;
	this.hair.castShadow = true;
	this.hair.receiveShadow = true;
	this.mesh.add(this.hair);

	var geomLeftLeg = new THREE.BoxGeometry(20,10,10,1,1,1);
	var matLeftLeg = new THREE.MeshPhongMaterial({color:Colors.skin, shading:THREE.FlatShading});
	this.leftLeg = new THREE.Mesh(geomLeftLeg, matLeftLeg);
	this.leftLeg.position.x = -35;
	this.leftLeg.position.y = 0;
	this.leftLeg.position.z = -15;
	this.leftLeg.receiveShadow = true;
	this.mesh.add(this.leftLeg);

	var geomRightLeg = new THREE.BoxGeometry(20,10,10,1,1,1);
	var matRightLeg = new THREE.MeshPhongMaterial({color:Colors.skin, shading:THREE.FlatShading});
	this.rightLeg = new THREE.Mesh(geomLeftLeg, matLeftLeg);
	this.rightLeg.position.x = -35;
	this.rightLeg.position.y = 0;
	this.rightLeg.position.z = 15;
	this.rightLeg.receiveShadow = true;
	this.mesh.add(this.rightLeg);


}

var melbourne;

function buildMelbourne() {
	melbourne = new Melbourne();
	setTimeout(function(){
		scene.add(melbourne.mesh)}, 2000);
}

var clouds;

function buildClouds() {
	clouds = new allClouds();
	clouds.mesh.position.y = -600;
	scene.add(clouds.mesh)
}

var knives;

function buildKnives() {
	knives = new allKnives();
	knives.mesh.position.y = -600;
	scene.add(knives.mesh)
}

var smartz;

function buildSmartz() {
	smartz = new allSmartz();
	smartz.mesh.position.y = -600;
	scene.add(smartz.mesh)
}

var funnyz;

function buildFunnyz() {
	funnyz = new allFunnyz();
	funnyz.mesh.position.y = -600;
	scene.add(funnyz.mesh)
}


var chloe;

function buildChloe() {
	chloe = new Chloe();
	chloe.mesh.scale.set(.25,.25,.25);
	chloe.mesh.position.y = 100;
	scene.add(chloe.mesh)
}

function loop() {
	if (paused == false) {
		melbourne.mesh.rotation.z += .005;
		clouds.mesh.rotation.z += .005;
		knives.mesh.rotation.z += levelSpeed;
		smartz.mesh.rotation.z += levelSpeed;
		funnyz.mesh.rotation.z += funnySpeed;
		$(document.body).css("cursor", "none")
		updateChloePos();
		checkWin();
		checkGetSmart();
		checkGetFunny();
		checkGetStabbed();
	} else {
		melbourne.mesh.rotation.z += 0;
		clouds.mesh.rotation.z += 0;
		knives.mesh.rotation.z += 0;
		smartz.mesh.rotation.z += 0;
		funnyz.mesh.rotation.z += 0;
		$(document.body).css("cursor", "default")
	}

  renderer.render(scene, camera);
	requestAnimationFrame(loop);
}

var mousePos = {
	x : 0,
	y : 0
};

function handleMouseMove(event) {
	// here we are converting the mouse position value received
	// to a normalized value varying between -1 and 1;
	// this is the formula for the horizontal axis:
	var tx = -1 + (event.clientX / WIDTH)*2;
	// for the vertical axis, we need to inverse the formula
	// because the 2D y-axis goes the opposite direction of the 3D y-axis
	var ty = 1 - (event.clientY / HEIGHT)*2;
	mousePos = {x:tx, y:ty};
};

function updateChloePos() {

	var targetX = normalize(mousePos.x, -.75, .75, -100, 100);
	var targetY = normalize(mousePos.y, -.75, .75, 25, 175);
	chloe.mesh.position.y += (targetY-chloe.mesh.position.y)*0.1;
	chloe.mesh.position.y = targetY;
	chloe.mesh.position.x = targetX;
	chloe.leftLeg.rotation.x += 0.3;
	chloe.rightLeg.rotation.x += 0.3;
	chloe.hair.rotation.x += 0.5;
}

function normalize(v,vmin,vmax,tmin, tmax){

	var nv = Math.max(Math.min(v,vmax), vmin);
	var dv = vmax-vmin;
	var pc = (nv-vmin)/dv;
	var dt = tmax-tmin;
	var tv = tmin + (pc*dt);
	return tv;

}

function checkGetSmart() {

	m = smartz.mesh;

	for (var i = 0; i < m.children.length; i++) {
		mChild = m.children[i]
		var position = new THREE.Vector3();

		if (mChild.visible == true) {
			smartX = position.setFromMatrixPosition(mChild.matrixWorld).x;
			smartY = position.setFromMatrixPosition(mChild.matrixWorld).y;

			var mXRange = [smartX-12, smartX + 5];
			var mYRange = [smartY-5, smartY + 5];
			//give a range to the chloe
			var chloeXRange = [chloe.mesh.position.x - 15, chloe.mesh.position.x]
			var chloeYRange = [chloe.mesh.position.y - 5, chloe.mesh.position.y + 10]

			if (chloeXRange[1] >= mXRange[0] && chloeXRange[0] <= mXRange[1]
			&& chloeYRange[1] >= mYRange[0] && chloeYRange[0] <= mYRange[1]) {
				// m.remove(mChild);
				//when you remove it,
				mChild.visible = false;
				if (mChild.visible == false) {
					addFunnySmart();
				}
			}
		}
	}
}

function checkGetFunny() {

	m = funnyz.mesh;

	for (var i = 0; i < m.children.length; i++) {
		mChild = m.children[i]
		var position = new THREE.Vector3();

		if (mChild.visible == true) {
			funnyX = position.setFromMatrixPosition(mChild.matrixWorld).x;
			funnyY = position.setFromMatrixPosition(mChild.matrixWorld).y;

			var mXRange = [funnyX-12, funnyX + 5];
			var mYRange = [funnyY-5, funnyY + 5];
			//give a range to the chloe
			var chloeXRange = [chloe.mesh.position.x - 15, chloe.mesh.position.x]
			var chloeYRange = [chloe.mesh.position.y - 5, chloe.mesh.position.y + 10]

			if (chloeXRange[1] >= mXRange[0] && chloeXRange[0] <= mXRange[1]
			&& chloeYRange[1] >= mYRange[0] && chloeYRange[0] <= mYRange[1]) {
				// m.remove(mChild);
				//when you remove it,
				mChild.visible = false;
				if (mChild.visible == false) {
					addFunnySmart();
				}
			}
		}
	}
}


function checkGetStabbed() {

	k = knives.mesh;

	for (var i = 0; i < k.children.length; i++) {
		kChild = k.children[i];
		var position = new THREE.Vector3();

		if (kChild.visible == true) {
			knifeX = position.setFromMatrixPosition(kChild.matrixWorld).x;
			knifeY = position.setFromMatrixPosition(kChild.matrixWorld).y;

			var mXRange = [knifeX-12, knifeX + 5];
			var mYRange = [knifeY-5, knifeY + 5];
			//give a range to the chloe
			var chloeXRange = [chloe.mesh.position.x - 15, chloe.mesh.position.x]
			var chloeYRange = [chloe.mesh.position.y - 5, chloe.mesh.position.y + 10]

			if (chloeXRange[1] >= mXRange[0] && chloeXRange[0] <= mXRange[1]
			&& chloeYRange[1] >= mYRange[0] && chloeYRange[0] <= mYRange[1]) {
				kChild.visible = false;
				if (kChild.visible == false) {
					deductFunnySmart();
				}
			}
		}
	}
}


function addFunnySmart() {
	points += 1;
	$('#amount').text(points)
	// $('#amount').css("transform","scale(1.2)")
}

function deductFunnySmart() {
	points -= 1;
	$('#amount').text(points)
}

function checkWin() {
	m = smartz.mesh.children
	remainingSmart = 20;
	for (var i = 0; i < m.length; i++) {
		if (m[i].visible == false) {
			remainingSmart -= 1;
		}
	}
	pointDiff = winPoints - points;
	if (remainingSmart < pointDiff) {
		loseActions();
		$('#outcome').toggle();
		$('#outcome').text("NO MORE FUNNY & NO MORE SMARTS LEFT! GET STABBED LESS!")
	} else if (points == winPoints) {
		winActions();
		$('#outcome').toggle();
		$('#outcome').text("Am I enough funnyz and smarts yet?")
	} else if (points == losePoints) {
		loseActions();
		$('#outcome').toggle();
		$('#outcome').text("YOU DIE! NO JOB FOR YOU!")
	}
}

function winActions() {
	paused = true;
	setInterval(winAnimation,50)
	$('.fa-pause').hide();
	$('.fa-repeat').show();
}

function loseActions() {
	paused = true;
	setInterval(loseAnimation,50)
	$('.fa-pause').hide();
	$('.fa-repeat').show();
}

function winAnimation() {
	if (chloe.mesh.scale.x < 2 && chloe.mesh.scale.y < 2 && chloe.mesh.scale.z < 2) {
		chloe.mesh.rotation.x += 0.1;
		chloe.mesh.rotation.y += 0.1;
		chloe.mesh.scale.x += 0.01;
		chloe.mesh.scale.y += 0.01;
		chloe.mesh.scale.z += 0.01;
	}
}

function loseAnimation() {
	if (chloe.mesh.position.y > -10) {
		chloe.mesh.scale.set(.5,.5,.5);
		chloe.mesh.position.y -= 5;
	}
}

function start() {
	buildScene();
	buildLights();
	buildMelbourne();
	buildClouds();
	buildSmartz(); //this is child 4
	buildFunnyz(); //this is child 4
	buildKnives(); //this is child 5
	buildChloe();

	$(document).on("mousemove",handleMouseMove)
	setTimeout(function(){loop()},2000);
}

window.addEventListener('load', start, false);

$(document).ready(function() {
	$('#bg-beats').get(0).play();

	$('#letsplay').on("mousedown", function() {
		paused = false;
		$('#play').hide();
		$('#controls').show();
		$('.fa-play').hide();
		$('.fa-repeat').hide();
	})

	$('.fa-pause').on("mousedown", function() {
		paused = true;
		$('.fa-play').show();
		$('.fa-pause').hide();

	})

	$('.fa-play').on("mousedown", function() {
		paused = false;
		$('.fa-pause').show();
		$('.fa-play').hide();
	})

	$('.fa-repeat').on("mousedown", function() {
		points = 0;
		$('#amount').text(points)
		$('.fa-repeat').hide();
		$('.fa-pause').show();
		clearGame();
		newGame();
	})
});

function clearGame() {
	$('#outcome').toggle();
	d = chloe.mesh;
	scene.remove(d)
	for (var i = 0; i < 999; i++) {
		window.clearInterval(i)
	}
}

function resizeChloe() {
	chloe.mesh.rotation.x = 0;
	chloe.mesh.rotation.y = 0;
	chloe.mesh.scale.x = 0;
	chloe.mesh.scale.y = 0;
	chloe.mesh.scale.z = 0;
	chloe.mesh.position.y = 100;
}

function newGame() {
	paused = false;
	points = 0;
	k = knives.mesh.children;
	m = smartz.mesh.children;
	for (var i = 0; i < k.length; i ++) {
		k[i].visible = true;
	}
	for (var i = 0; i < m.length; i ++) {
		m[i].visible = true;
	}
	buildChloe();
}
