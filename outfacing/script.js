const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);


let raycaster = new THREE.Raycaster();
let delta;
let stage = 3;
var mouse = new THREE.Vector2(1, 1);
let cameraMouseX, cameraMouseY;
var clock = new THREE.Clock();
var scrollPosition = 0;
var elapsedTime;
const geometry = new THREE.BoxBufferGeometry(0.99, 25, 0.99);;

const cameraSettings = {
    rotationX: 20,
}

const grid = {
    sizeX: 200,
    sizeZ: 90,
    objects: [],
}


class cubeObject {
    constructor(_x, _y, _height, _mesh) {
        this.x = _x;
        this.y = _y;
        this.height = _height;
        this.mesh = _mesh;
        this.isLit = false;
        this.neighbors = [];
    }
    create() {
        let material = new THREE.MeshStandardMaterial({
            color: 0xF7F7FE,
            metalness: 0.20,
            roughness: 0.15,
            emissiveIntensity: 0.92
        });

        var _mesh = new THREE.Mesh(geometry, material);
        _mesh.position.z = this.y - (grid.sizeZ / 2);
        _mesh.position.x = this.x - (grid.sizeX / 2);

        this.mesh = _mesh;
        scene.add(_mesh);
        _mesh.castShadow = true;
        _mesh.receiveShadow = true;

        grid.objects[this.y].push(this);
        MASTER.OBJS.cubes.push(this);

        return this;

    }

    // assignNeighbors() {

    //     let left = 0;
    //     let right = 2;
    //     let top = 0;
    //     let bottom = 2;
    //     let center = 1;

    //     for (let i = 0; i <= bottom; i++) {
    //         for (let j = 0; j <= right; j++) {
    //             let y = this.y + i - 1;
    //             let x = this.x + j - 1;

    //             if (y == -1 || x == -1 || x >= grid.sizeZ || y >= grid.sizeX) return;

    //             this.neighbors.push(grid.objects[x][y]);

    //         }
    //     }

    //     console.log(this.neighbors)

    // }
}



const MASTER = {
    CURRENT: {
        STAGE: 0,
        // position: {
        //     SETTINGS: {
        //         background: 0x000000,
        //     },
        //     CAMERA: {
        //         positionX: 1.671,
        //         positionY: 32.17,
        //         positionZ: 36.086,
        //         rotationX: -10.267,
        //         rotationY: 3.007,
        //         rotationZ: 3.007,
        //     },
        //     material: {
        //         emissive: 0x000000,
        //         color: 0x000000,
        //         metalness: 0.0,
        //         roughness: 1.00,
        //         emissiveIntensity: 0.00,
        //         wireframe: false,
        //     },
        //     lights: [{
        //             color: 0xeecde1,
        //             brightness: 1.147,
        //             positionX: -100,
        //             positionY: 19.378,
        //             positionZ: -67.526,
        //         },
        //         {
        //             color: 0x4187d2,
        //             brightness: 1.277,
        //             positionX: 52.883,
        //             positionY: 6.421,
        //             positionZ: -35.203,
        //         },
        //         {
        //             color: 0xd2cde5,
        //             brightness: 2.257,
        //             positionX: 95.084,
        //             positionY: 41.863,
        //             positionZ: 47.977,
        //         },
        //         {
        //             color: 0xd27f8f,
        //             brightness: 0.01,
        //             positionX: 26.708,
        //             positionY: 28.016,
        //             positionZ: 5.767,
        //         }
        //     ],
        //     fractal: [{
        //             width: 16.8,
        //             speed: -7,
        //             height: 50.8,
        //             translateX: 160,
        //             translateY: -900,
        //         },
        //         {
        //             width: 22,
        //             speed: -2,
        //             height: 121.5,
        //             translateX: -470,
        //             translateY: -1360,
        //         },
        //         {
        //             width: 30,
        //             speed: -1,
        //             height: 40,
        //             translateX: 1360,
        //             translateY: -160,
        //         }

        //     ]
        // },
    },
    OBJS: {
        cubes: [],
        lights: [],
    },
    STAGES: [{
            SETTINGS: {
                background: 0xffffff,
            },
            CAMERA: {
                positionX: 0,
                positionY: 28,
                positionZ: 36.086,
                rotationX: 0,
                rotationY: 33.981,
                rotationZ: 0,
            },
            material: {
                emissive: 0x000000,
                color: 0xF7F7FE,
                metalness: 1.0,
                roughness: 1.00,
                emissiveIntensity: 0.00,
                wireframe: false,
            },
            lights: [{
                    color: 0xe3e3e3,
                    brightness: 2.257,
                    positionX: -59.785,
                    positionY: 54.031,
                    positionZ: 100,
                },
                {
                    color: 0x96edf3,
                    brightness: 3.302,
                    positionX: -41.35,
                    positionY: 54.031,
                    positionZ: 100,
                },
                {
                    color: 0xa3b1cc,
                    brightness: 5,
                    positionX: 95.084,
                    positionY: 41.863,
                    positionZ: 48.377,
                },
                {
                    color: 0xc93b8e,
                    brightness: 1.604,
                    positionX: 24.09,
                    positionY: 10.74,
                    positionZ: 77.876,
                }
            ],
            fractal: [{
                    width: 20,
                    speed: 5,
                    height: 40,
                    translateX: -774.6,
                    translateY: -900,
                },
                {
                    width: 10.7,
                    speed: 5,
                    height: 50,
                    translateX: -410,
                    translateY: -1340,
                },
                {
                    width: 30,
                    speed: -5,
                    height: 40,
                    translateX: 1360,
                    translateY: -160,
                }

            ]
        },
        // {
        //     SETTINGS: {
        //         background: 0xffffff,
        //     },
        //     CAMERA: {
        //         positionX: 0,
        //         positionY: 26,
        //         positionZ: 0,
        //         rotationX: -20,
        //         rotationY: 0,
        //         rotationZ: 0,
        //     },
        //     material: {
        //         emissive: 0x000000,
        //         color: 0xF7F7FE,
        //         metalness: 1.0,
        //         roughness: 1.00,
        //         emissiveIntensity: 0.00,
        //         wireframe: false,
        //     },
        //     lights: [{
        //             color: 0xa3a3a3,
        //             brightness: 0.01,
        //             positionX: -59.785,
        //             positionY: 54.031,
        //             positionZ: 100,
        //         },
        //         {
        //             color: 0xbeedee,
        //             brightness: 1.995,
        //             positionX: -52.41,
        //             positionY: 16.174,
        //             positionZ: -35.203,
        //         },
        //         {
        //             color: 0xd2cde5,
        //             brightness: 3.712,
        //             positionX: 95.084,
        //             positionY: 41.863,
        //             positionZ: 48.377,
        //         },
        //         {
        //             color: 0xd2cde5,
        //             brightness: 3.221,
        //             positionX: 95.084,
        //             positionY: 6.71,
        //             positionZ: 77.876,
        //         }
        //     ],
        //     fractal: [{
        //             width: 20,
        //             speed: 5,
        //             height: 40,
        //             translateX: 160,
        //             translateY: -900,
        //         },
        //         {
        //             width: 10.7,
        //             speed: 5,
        //             height: 50,
        //             translateX: -410,
        //             translateY: -1340,
        //         },
        //         {
        //             width: 30,
        //             speed: -5,
        //             height: 40,
        //             translateX: 1360,
        //             translateY: -160,
        //         }

        //     ]
        // },
        {
            SETTINGS: {
                background: 0xffffff,
            },
            CAMERA: {
                positionX: -35.603,
                positionY: 31.17,
                positionZ: 28.711,
                rotationX: -18.717,
                rotationY: -35.541,
                rotationZ: -6.142,
            },
            material: {
                emissive: 0xe7dcc5,
                color: 0xFFFFFF,
                metalness: 1.0,
                roughness: 1.00,
                emissiveIntensity: 0.00,
                wireframe: false,
            },
            lights: [{
                    color: 0xebe0db,
                    brightness: 2.649,
                    positionX: 38.589,
                    positionY: 54.031,
                    positionZ: 81.677,
                },
                {
                    color: 0xb6aab2,
                    brightness: .01,
                    positionX: -12.556,
                    positionY: 61.129,
                    positionZ: -64.908,
                },
                {
                    color: 0xf09475,
                    brightness: 0.82,
                    positionX: -25.644,
                    positionY: 25.137,
                    positionZ: 76.442,
                },
                {
                    color: 0xeeecd8,
                    brightness: 2.78,
                    positionX: -100,
                    positionY: 9.301,
                    positionZ: 37.178,
                }
            ],
            fractal: [{
                    width: 20,
                    speed: 5,
                    height: 40,
                    translateX: 160,
                    translateY: -900,
                },
                {
                    width: 10.7,
                    speed: 5,
                    height: 50,
                    translateX: -410,
                    translateY: -1340,
                },
                {
                    width: 30,
                    speed: -5,
                    height: 40,
                    translateX: 1360,
                    translateY: -160,
                }

            ]
        }, {
            SETTINGS: {
                background: 0x000000,
            },
            CAMERA: {
                positionX: 1.671,
                positionY: 32.17,
                positionZ: 37.086,
                rotationX: -10.267,
                rotationY: 3.007,
                rotationZ: 3.007,
            },
            material: {
                emissive: 0x000000,
                color: 0x000000,
                metalness: 0.0,
                roughness: 1.00,
                emissiveIntensity: 0.00,
                wireframe: false,
            },
            lights: [{
                    color: 0xeecde1,
                    brightness: 1.147,
                    positionX: -100,
                    positionY: 19.378,
                    positionZ: -67.526,
                },
                {
                    color: 0x4187d2,
                    brightness: 1.277,
                    positionX: 52.883,
                    positionY: 6.421,
                    positionZ: -35.203,
                },
                {
                    color: 0xd2cde5,
                    brightness: 2.257,
                    positionX: 95.084,
                    positionY: 41.863,
                    positionZ: 47.977,
                },
                {
                    color: 0xd27f8f,
                    brightness: 0.01,
                    positionX: 26.708,
                    positionY: 28.016,
                    positionZ: 5.767,
                }
            ],
            fractal: [{
                    width: 16.8,
                    speed: -7,
                    height: 50.8,
                    translateX: 160,
                    translateY: -900,
                },
                {
                    width: 22,
                    speed: -2,
                    height: 121.5,
                    translateX: -470,
                    translateY: -1360,
                },
                {
                    width: 30,
                    speed: -1,
                    height: 40,
                    translateX: 1360,
                    translateY: -160,
                }

            ]
        }



    ]
}

function updateCamera() {
    camera.position.x = MASTER.STAGES[MASTER.CURRENT.STAGE].CAMERA.positionX;
    camera.position.y = MASTER.STAGES[MASTER.CURRENT.STAGE].CAMERA.positionY;
    camera.position.z = MASTER.STAGES[MASTER.CURRENT.STAGE].CAMERA.positionZ;
    camera.rotation.x = ((Math.PI / 180) *
        MASTER.STAGES[MASTER.CURRENT.STAGE].CAMERA.rotationX) + (mouse.y * .010);
    camera.rotation.y = ((Math.PI / 180) *
        MASTER.STAGES[MASTER.CURRENT.STAGE].CAMERA.rotationY - (mouse.x * .010));
    camera.rotation.z = ((Math.PI / 180) *
        MASTER.STAGES[MASTER.CURRENT.STAGE].CAMERA.rotationZ);
}

// function displayGUI() {
//     const gui = new GUI();

//     var speed = 0.1;

//     gui.add(MASTER.CURRENT, "STAGE").min(0).max(MASTER.STAGES.length - 1).step(1).name('Stage');
//     var material = gui.addFolder("Material");
//     material.addColor(MASTER.STAGES[MASTER.CURRENT.STAGE].material, 'color').name('Color');
//     material.addColor(MASTER.STAGES[MASTER.CURRENT.STAGE].material, 'emissive').name('Emissive');
//     material.add(MASTER.STAGES[MASTER.CURRENT.STAGE].material, 'metalness').min(0).max(1).step(speed * .01).name('Metalness');
//     material.add(MASTER.STAGES[MASTER.CURRENT.STAGE].material, 'roughness').min(0).max(1).step(speed * .01).name('Roughness');
//     material.add(MASTER.STAGES[MASTER.CURRENT.STAGE].material, 'emissiveIntensity').min(-10).max(100).step(speed * .01).name('Emissive Intensity');
//     material.add(MASTER.STAGES[MASTER.CURRENT.STAGE].material, 'wireframe').name('Wireframe');
//     material.close();

//     var waveFolder = gui.addFolder("Waves");
//     MASTER.STAGES[MASTER.CURRENT.STAGE].fractal.forEach((fractal, i) => {

//         var wave1 = waveFolder.addFolder("Wave " + i);
//         wave1.add(fractal, 'width').min(0.01).max(200).step(speed).name('Width');
//         wave1.add(fractal, 'speed').min(-100).max(200).step(speed * 10).name('Speed');
//         wave1.add(fractal, 'height').min(0).max(200).step(speed).name('Height');
//         wave1.add(fractal, 'translateX').min(-2000).max(2000).step(speed).name('Translate X');
//         wave1.add(fractal, 'translateY').min(-2000).max(2000).step(speed).name('Translate Y');
//         wave1.close();
//     })

//     waveFolder.close();

//     var lightsFolder = gui.addFolder("Lights");
//     MASTER.STAGES[MASTER.CURRENT.STAGE].lights.forEach((light, i) => {

//         var fillLight = lightsFolder.addFolder("Light " + i);
//         fillLight.addColor(light, 'color').name('Color');
//         fillLight.add(light, 'brightness').min(0.01).max(5).step(speed * .01).name('Brightness');
//         fillLight.add(light, 'positionX').min(-100).max(100).step(speed * .01).name('Position: X');
//         fillLight.add(light, 'positionY').min(-10).max(100).step(speed * .01).name('Position: Y');
//         fillLight.add(light, 'positionZ').min(-100).max(100).step(speed * .01).name('Position: Z');
//         fillLight.close();

//     });

//     lightsFolder.close();

//     var cameraSettings = gui.addFolder("Camera");
//     cameraSettings.add(MASTER.STAGES[MASTER.CURRENT.STAGE].CAMERA, 'positionX').min(-100).max(100).step(speed * .01).name('Position: X');
//     cameraSettings.add(MASTER.STAGES[MASTER.CURRENT.STAGE].CAMERA, 'positionY').min(-100).max(100).step(speed * .01).name('Position: Y');
//     cameraSettings.add(MASTER.STAGES[MASTER.CURRENT.STAGE].CAMERA, 'positionZ').min(-100).max(100).step(speed * .01).name('Position: Z');
//     cameraSettings.add(MASTER.STAGES[MASTER.CURRENT.STAGE].CAMERA, 'rotationX').min(-180).max(180).step(speed * .01).name('Rotation: X');
//     cameraSettings.add(MASTER.STAGES[MASTER.CURRENT.STAGE].CAMERA, 'rotationY').min(-180).max(180).step(speed * .01).name('Rotation: Y');
//     cameraSettings.add(MASTER.STAGES[MASTER.CURRENT.STAGE].CAMERA, 'rotationZ').min(-180).max(180).step(speed * .01).name('Rotation: Z');
//     cameraSettings.close();

//     gui.open();
// }


// var getRGBArray = function (img) {
//     // create the canvas we need to work withll
//     var canvas = document.createElement('canvas');

//     // get the canvas context
//     var context = canvas.getContext("2d");

//     // will store the image data and the returned array
//     var imgData, rgbArray = [];

//     // make sure that the width and height are correct
//     context.canvas.width = img.naturalWidth;
//     context.canvas.height = img.naturalHeight;

//     // draw the image
//     context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)

//     // get the image data
//     imgData = context.getImageData(0, 0, img.naturalWidth, img.naturalHeight);

//     // imgData contains r,g,b,alpha values. We skip
//     // the alpha value.
//     for (var i = 0, n = 0; i < imgData.data.length; i += 4, n += 3) {
//         rgbArray[n] = imgData.data[i];
//         rgbArray[n + 1] = imgData.data[i + 1];
//         rgbArray[n + 2] = imgData.data[i + 2]; // imgData.data[i+3] is the alpha channel.
//     }
//     return imgData.data;
// };

function createLight(_lights) {
    _lights.forEach((_light) => {
        const light = new THREE.DirectionalLight(_light.color, _light.brightness);
        light.castShadow = true;
        light.position.set(_light.positionX, _light.positionY, _light.positionZ, );
        MASTER.OBJS.lights.push(light);
        scene.add(light);
    })
}


var c = document.getElementById("text");

// let photo = getRGBArray(c);

// var photo = createPicture('img/test1.jpg');
// console.log(photo);

// function getPixel(photo, x, y) {
//     var start = (x * 4 + y * grid.sizeX * 4);
//     var r = photo[start];
//     var g = photo[start + 1];
//     var b = photo[start + 2];
//     // var a = photo[start + 3];
//     return [r, g, b];
// }


function createGrid() {
    for (let j = 0; j < grid.sizeZ; j++) {

        grid.objects.push([]);

        for (let i = 0; i < grid.sizeX; i++) {


            // var value = (getPixel(photo, i, j)[0] + getPixel(photo, i, j)[1] + getPixel(photo, i, j)[2]) / .3;
            let cube = new cubeObject(i, j, 0);

            cube.create();

        }
    }

    // grid.objects.forEach(col => {
    //     col.forEach(cube => {
    //         cube.assignNeighbors();
    //     })
    // });

    // console.log(grid.objects);
};


function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function onPointerMove(event) {

    if (event.isPrimary === false) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    cameraMouseX = event.clientX - windowHalfX;
    cameraMouseY = event.clientY - windowHalfY;

    camera.rotation.y = (camera.rotation.y + (delta * -cameraMouseX * .03 * Math.PI / 180)) / 2;
    camera.rotation.x = ((-cameraSettings.rotationX * Math.PI / 180) + (delta * -cameraMouseY * .03 * Math.PI /
        180)) / 2;

}

const pointLight = new THREE.PointLight(0xE1D3EC, .02, 0, 2000);
// const help = new THREE.Mesh(geometry, material);
// scene.add(help);
scene.add(pointLight);

function lerp(min, max, value) {
    return (max - min) * value + min;
}

function hoverObject() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, false);



    if (intersects[0]) {


        // help.position.set(intersects[0].point);
        pointLight.position.x = (intersects[0].object.position.x + pointLight.position.x) / 2;
        pointLight.position.z = (intersects[0].object.position.z + pointLight.position.z) / 2;
        // intersects[0].object.material.emissive = new THREE.Color(0xffffff);
        pointLight.position.y = 48;

        // intersects[0].object.position.y += 1;
        // grid.objects.forEach(col => {
        //     col.forEach(cube => {
        //         if (intersects[0].object == cube) {
        //             cube.neighbors.forEach(neighbor => {
        //                 neighbor.mesh.position.y += 30;
        //             })
        //         }
        //     })
        // });

    }

}

function resetMaterials() {
    for (let i = 0; i < scene.children.length; i++) {
        const cube = scene.children[i];


        renderer.setClearColor(new THREE.Color(MASTER.STAGES[MASTER.CURRENT.STAGE].SETTINGS.background));

        // console.log(cube.material);
        if (cube.material) {
            if (cube.material.emissive) {
                cube.material.emissive = new THREE.Color(MASTER.STAGES[MASTER.CURRENT.STAGE].material.emissive);
                cube.material.color = new THREE.Color(MASTER.STAGES[MASTER.CURRENT.STAGE].material.color);
                cube.material.roughness = MASTER.STAGES[MASTER.CURRENT.STAGE].material.roughness;
                cube.material.metalness = MASTER.STAGES[MASTER.CURRENT.STAGE].material.metalness;
                cube.material.emissiveIntensity = MASTER.STAGES[MASTER.CURRENT.STAGE].material.emissiveIntensity;
                cube.material.wireframe = MASTER.STAGES[MASTER.CURRENT.STAGE].material.wireframe;


            }
        }
    }
}


function animateNoise(i, j, time) {

    const elem = grid.objects[j][i].mesh;

    elem.position.y = addFractalNoise(elem.position.y, MASTER.STAGES[MASTER.CURRENT.STAGE].fractal[0]);
    elem.position.y -= addFractalNoise(elem.position.y * 2, MASTER.STAGES[MASTER.CURRENT.STAGE].fractal[1]);
    elem.position.y += addFractalNoise(elem.position.y * 2, MASTER.STAGES[MASTER.CURRENT.STAGE].fractal[2]);

    function addFractalNoise(initial, fractal) {
        return Math.sin(1 / (fractal.width + (mouse.x * .05)) * ((-elapsedTime * fractal.speed) + initial + Math.sqrt(Math.pow((
                i +
                fractal.translateX),
            2) + Math.pow((
            j + fractal.translateY), 2)))) * (fractal.height + (mouse.y)) / 10;
    }

}



window.addEventListener('wheel', (event) => {

    scrollPosition += -event.wheelDeltaY / 2000;
    console.log(scrollPosition);

    animateScroll();
})

function animateScroll() {

    // if (scrollPosition > 0) {
    //     MASTER.CURRENT.position.lights[0].positionX = lerp(MASTER.STAGES[MASTER.CURRENT.STAGE].lights[0].positionX, MASTER.STAGES[MASTER.CURRENT.STAGE + 1].lights[0].positionX, scrollPosition);
    //     MASTER.CURRENT.position.lights[0].positionZ = lerp(MASTER.STAGES[MASTER.CURRENT.STAGE].lights[0].positionZ, MASTER.STAGES[MASTER.CURRENT.STAGE + 1].lights[0].positionZ, scrollPosition);
    // } else {
    //     MASTER.CURRENT.position.lights[0].positionZ = lerp(MASTER.STAGES[MASTER.CURRENT.STAGE].lights[0].positionZ, MASTER.STAGES[MASTER.CURRENT.STAGE - 1].lights[0].positionZ, Math.abs(scrollPosition));
    //     MASTER.CURRENT.position.lights[0].positionX = lerp(MASTER.STAGES[MASTER.CURRENT.STAGE].lights[0].positionX, MASTER.STAGES[MASTER.CURRENT.STAGE - 1].lights[0].positionX, Math.abs(scrollPosition));
    // }

    if (scrollPosition >= 1) {
        console.log("Next Stage");
        MASTER.CURRENT.STAGE++;
        // MASTER.CURRENT.position.lights[0].positionX = MASTER.STAGES[MASTER.CURRENT.STAGE + 1].lights[0].positionX;
        // MASTER.CURRENT.position.lights[0].positionZ = MASTER.STAGES[MASTER.CURRENT.STAGE + 1].lights[0].positionZ;
        scrollPosition = 0;
    }
    if (scrollPosition <= -1) {
        console.log("Previous Stage");
        // MASTER.CURRENT.position.lights[0].positionZ = MASTER.STAGES[MASTER.CURRENT.STAGE - 1].lights[0].positionZ;
        // MASTER.CURRENT.position.lights[0].positionX = MASTER.STAGES[MASTER.CURRENT.STAGE - 1].lights[0].positionX;
        MASTER.CURRENT.STAGE--;
        scrollPosition = 0;
    }
    if (MASTER.CURRENT.STAGE >= MASTER.STAGES.length) {
        MASTER.CURRENT.STAGE = MASTER.STAGES.length - 1;
    }
    if (MASTER.CURRENT.STAGE < 0) {
        MASTER.CURRENT.STAGE = 0;
    }

}

var canvas = document.getElementById("canvas");
console.log(canvas);
var renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(window.innerWidth, window
    .innerHeight);
renderer.setClearColor(new THREE.Color(MASTER.STAGES[MASTER.CURRENT.STAGE].SETTINGS.background));
// renderer.domElement = document.getElementById("canvas");
// document.body.appendChild(renderer.domElement);

let container = renderer.domElement;
document.addEventListener('pointermove', onPointerMove);

//
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
window.addEventListener('resize', onWindowResize);
// displayGUI();

createLight(MASTER.STAGES[MASTER.CURRENT.STAGE].lights);
createGrid();






// camera.lookAt(scene.position);

function animate() {
    requestAnimationFrame(animate);
    resetMaterials();
    delta = clock.getDelta();
    elapsedTime = clock.getElapsedTime();

    for (let j = 0; j < grid.objects.length; j++) {
        for (let i = 0; i < grid.objects[j].length; i++) {
            animateNoise(i, j, elapsedTime);
        }
    }

    animateLights()
    updateCamera();

    hoverObject();
    // console.log(Math.sin(elapsedTime));
    // backLight.position.y += 0.05;

    // raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, false);

    // console.log(backLight.position.y);
    // console.log(cube.rotation.x);
    renderer.render(scene, camera);
};

animate();

function animateLights() {
    MASTER.OBJS.lights.forEach((light, i) => {
        light.intensity = MASTER.STAGES[MASTER.CURRENT.STAGE].lights[i].brightness;
        light.color = new THREE.Color(MASTER.STAGES[MASTER.CURRENT.STAGE].lights[i].color);
        light.position.x = MASTER.STAGES[MASTER.CURRENT.STAGE].lights[i].positionX;
        light.position.y = MASTER.STAGES[MASTER.CURRENT.STAGE].lights[i].positionY;
        light.position.z = MASTER.STAGES[MASTER.CURRENT.STAGE].lights[i].positionZ;
    })
}