
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




  // Now we instantiate the sky and push its center a bit
  // towards the bottom of the screen

  // var sky;
  //
  // function buildSky(){
  // 	sky = new Sky();
  // 	sky.mesh.position.y = -600;
  // 	scene.add(sky.mesh);
  // 	// smart = new Smart();
  // 	// setTimeout(function(){
  // 	// 	scene.add(smart.mesh)
  // 	// },1000);
  // 	// allSmartz.push(smart);
  // }




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
