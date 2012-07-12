Physijs.scripts.worker = '/assets/js/physijs_worker.js';
Physijs.scripts.ammo = '/assets/js/ammo.js';

var initScene, render, _boxes = [], spawnBox,
    renderer, stats, scene, ground_material, ground, light, camera;

  initScene = function() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    $('#webgl').append( renderer.domElement );

    scene = new Physijs.Scene;

    camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 60, 50, 60 );
    camera.lookAt( scene.position );
    scene.add( camera );

    // Light
    light = new THREE.DirectionalLight( 0xFFFFFF );
    light.position.set( 20, 40, -15 );
    light.target.position.copy( scene.position );
    light.castShadow = true;
    light.shadowCameraLeft = -60;
    light.shadowCameraTop = -60;
    light.shadowCameraRight = 60;
    light.shadowCameraBottom = 60;
    light.shadowCameraNear = 20;
    light.shadowCameraFar = 200;
    light.shadowBias = -.0001
    light.shadowMapWidth = light.shadowMapHeight = 2048;
    light.shadowDarkness = .7;
    scene.add( light );

    // Ground
    ground_material = Physijs.createMaterial(
      new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( '../src/webgl/imgs/rocks.jpg' ) }),
      .8, // high friction
      .4 // low restitution
    );
    ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
    ground_material.map.repeat.set( 3, 3 );

    ground = new Physijs.BoxMesh(
      new THREE.CubeGeometry(100, 1, 100),
      ground_material,
      0 // mass
    );
    ground.receiveShadow = true;
    scene.add( ground );

    spawnBox();

    requestAnimationFrame( render );
  };

  spawnBox = (function() {
    var box_geometry = new THREE.CubeGeometry( 4, 4, 4 ),
      handleCollision = function( collided_with, linearVelocity, angularVelocity ) {
        switch ( ++this.collisions ) {

          case 1:
            this.material.color.setHex(0xcc8855);
            break;

          case 2:
            this.material.color.setHex(0xbb9955);
            break;

          case 3:
            this.material.color.setHex(0xaaaa55);
            break;

          case 4:
            this.material.color.setHex(0x99bb55);
            break;

          case 5:
            this.material.color.setHex(0x88cc55);
            break;

          case 6:
            this.material.color.setHex(0x77dd55);
            break;
        }
      },
      createBox = function() {
        var box, material;

        // mesunglassessm.jpg plywood.jpg
        material = Physijs.createMaterial(
          new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( '../src/webgl/imgs/plywood.jpg' ) }),
          .4, // low friction
          .6 // high restitution
        );
        material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
        material.map.repeat.set( .5, .5 );

        //material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/rocks.jpg' ) });

        box = new Physijs.BoxMesh(
          box_geometry,
          material
        );
        box.collisions = 0;

        box.position.set(
          Math.random() * 15 - 7.5,
          25,
          Math.random() * 15 - 7.5
        );

        box.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        box.castShadow = true;
        box.addEventListener( 'collision', handleCollision );
        box.addEventListener( 'ready', spawnBox );
        scene.add( box );
      };

    return function() {
      setTimeout( createBox, 1000 );
    };
  })();

  render = function() {
    scene.simulate(undefined, 2);
    renderer.render( scene, camera);
    requestAnimationFrame( render );
  };

  window.onload = initScene;