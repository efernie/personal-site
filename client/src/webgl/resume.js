var t = THREE;

Physijs.scripts.worker = '/assets/js/physijs_worker.js';

var camera, scene, renderer,
    geometry, material, mesh,
    stats, text, parent,
    cubeArr = [],
    targetRotation = 0;

    init();
    animate();

function init() {
  var height = 900
    , width = 1550
    , geoText = 'Eric Fernberg'
    ;

  scene = new t.Scene();
  stats = new Stats();

  // stats.domElement.style.postion = 'absolute';
  // stats.domElement.style.top = '0px';
  // stats.domElement.style.zIndex = 100;
  stats.domElement.style.width = '115px';

  $('body').prepend(stats.domElement);

  camera = new t.PerspectiveCamera( 75 , width / height, 1, 10000 );
  camera.position.z = 200;
  scene.add( camera );

  var text3d = new t.TextGeometry( geoText, {
    size : 50,
    height : 10,
    curveSegments : 2,
    font : 'helvetiker'
  });

  text3d.computeBoundingBox();
  var centerOffset = -0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x );

  var textMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: true } );
  text = new t.Mesh( text3d, textMaterial );

  text.doubleSided = false;

  text.position.x = centerOffset;
  text.position.y = 10;
  text.position.z = 5;

  text.rotation.x = 0;
  text.rotation.y = Math.PI * 2;

  parent = new t.Object3D();
  parent.add( text );

  scene.add( parent );

  // for (var i = 14 - 1; i >= 0; i--) {
  //   var cubeheight = 10 * i
  //     , cubewidth = 10 * i
  //     , depth = 10 * i
  //     , newColor = '0xff00' + (i * 5)
  //     , newColor = newColor.length >= 8 ? newColor : '0xff0000'
  //     , cubeObj = {
  //         geometry : new t.CubeGeometry( cubewidth, cubeheight, depth ),
  //         material : new t.MeshBasicMaterial( { color: newColor, wireframe: true } ),
  //         mesh : undefined
  //       }
  //     ;

  //   cubeObj.mesh = new t.Mesh( cubeObj.geometry, cubeObj.material );

  //   cubeArr.push( cubeObj );
  //   //scene.add( cubeObj.mesh );
  // };

  renderer = new t.CanvasRenderer();
  renderer.setSize( width, height );

  //document.body.appendChild( renderer.domElement );
  $('#about').append( renderer.domElement );

}

function animate() {
  requestAnimationFrame( animate );
  render();
  stats.update();
}
function render() {
  // for (var i = cubeArr.length - 1; i >= 0; i--) {
  //   //cubeArr[i].mesh.rotation.x += 0.01;
  //   //cubeArr[i].mesh.rotation.y += 0.02;
  //   cubeArr[i].mesh.rotation.x += Math.random() * (0.07 - 0.01) + 0.01;
  //   cubeArr[i].mesh.rotation.y += Math.random() * (0.07 - 0.01) + 0.01;
  // };

  //parent.rotation.y += ( targetRotation - parent.rotation.y ) * 0.05;

  renderer.render( scene, camera );
}