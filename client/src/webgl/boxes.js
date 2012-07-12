if (!Modernizr.webgl){
  alert(' NEED to update your browser!');
}

// Shorthand for the Three library
var t = THREE;

// The physics library scripts
Physijs.scripts.worker = '/assets/js/physijs_worker.js';
Physijs.scripts.ammo = '/assets/js/ammo.js';

var camera, scene, renderer,
    geometry, material, mesh,
    stats,
    mouseX = 0, mouseY = 0,
    cubeArr = [];

    init();
    animate();

function init() {
  // THe height and width of the window.
  var height = window.innerHeight
    , width = window.innerWidth
    ;

  // Create a new scene
  //scene = new t.Scene();
  scene = new Physijs.Scene;

  // create the stats obj.
  //stats = new Stats();

  // WebGL renderer
  renderer = new t.WebGLRenderer({ antialias: true });
  // set the size of the renderer
  renderer.setSize( width, height );


  //stats.domElement.style.position = 'absolute';
  //stats.domElement.style.top = '0px';
  // Prepend the stats box to the body
  //$('#webgl').prepend(stats.domElement);

  // Set up the camera
  camera = new t.PerspectiveCamera( 75 , width / height, 1, 10000 );
  // Set the z axis position of the camera
  camera.position.z = 200;
  // Add the camera to the scene
  scene.add( camera );

  // Start a loop to create the boxes.
  for (var i = 4 - 1; i >= 0; i--) {
    var cubeheight = 10 * i
      , cubewidth = 10 * i
      , depth = 10 * i
      , newColor = '0xff00' + (i * 5)
      , newColor = newColor.length >= 8 ? newColor : '0xff0000'
      , cubeObj = {
          geometry : new t.CubeGeometry( cubewidth, cubeheight, depth ),
          material : new t.MeshBasicMaterial( { color: newColor, wireframe: true } ),
          mesh : undefined
        }
      ;

    cubeObj.mesh = new t.Mesh( cubeObj.geometry, cubeObj.material );

    cubeArr.push( cubeObj );
    scene.add( cubeObj.mesh );
  };

  $('#webgl').append( renderer.domElement );

}

function animate() {
  requestAnimationFrame( animate );
  render();
  stats.update();
}

function render() {
  //getPosition();
  for (var i = cubeArr.length - 1; i >= 0; i--) {
    cubeArr[i].mesh.rotation.x += Math.random() * (0.07 - 0.01) + 0.01;
    cubeArr[i].mesh.rotation.y += Math.random() * (0.07 - 0.01) + 0.01;
    //cubeArr[i].mesh.position.x = Math.random() * (1.07 -0.01) + 0.01;
  };


  renderer.render( scene, camera );
}

function getPosition () {
  for (var i = cubeArr.length - 1; i >= 0; i--) {
    console.log( cubeArr[i].mesh.position.x , i)
  };
}

