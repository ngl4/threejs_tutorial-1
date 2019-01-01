//set up global vars

var fieldOfView = 45;
var aspect = window.innerWidth / window.innerHeight;
var nearClippingPlane = 1;
var farClippingPlane = 1000;
var cube;

//create a scene object
var scene = new THREE.Scene();

//create a camera
var camera = new THREE.PerspectiveCamera(
  fieldOfView,
  aspect,
  nearClippingPlane,
  farClippingPlane
);

//create a renderer
var renderer = new THREE.WebGLRenderer ({antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("3d-image").appendChild(renderer.domElement);

//create 3D object
var geometry = new THREE.BoxGeometry (3, 1, .3);

//create materials which includes (shaders, lambert, phong, custom)
//using MeshNormalMaterial ---> you do not need lighting to light it up

var material = new THREE.MeshNormalMaterial();

//create a mesh
//you need material to see the geometry object 
var cube = new THREE.Mesh(geometry, material);

//Add to the scene
scene.add (cube);

//move camera back to avoid the camera and object being in the same location
camera.position.z = 5; 

//Use wireframe to see segments
//segments: number of triangles or faces used to draw the shape
//the more segments, the smoother the object 


//Render the scene
//renderer.render(scene, camera);


//render the scene with requestAnimationFrame 
// var render = function() {
//     requestAnimationFrame(render); //optimally run at 60 frames per second
//     renderer.render(scene, camera);
// };

// render();


//make the cube rotate 
cube.rotation.y = Math.PI/ 180 * 45;
cube.rotation.z = Math.PI/180 * -25;
//alternative format
//cube.rotation.set(0, Math.PI/180 * 45, Math.PI/180 * -25);


//add positioning to object
// cube.position.x = 1;
// cube.position.z=.1;
cube.position.y=-.1;
//alternative format (x, z, y)
//cube.position.set(1,.1,-.1);


//animate the cube's position
cube.position.x = 2 * Math.sin(cube.rotation.x);
cube.position.z = 2 * Math.sin(cube.rotation.z);


//add animation to cube rotation
var render = function() {
    requestAnimationFrame(render); //optimally run at 60 frames per second
    cube.rotation.x += 0.01;
    cube.rotation.z -= 0.01;
    renderer.render(scene, camera);
};

render();


//add window resize handler
//the application will still looks great even if screen size changes or phone gets rotated
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

