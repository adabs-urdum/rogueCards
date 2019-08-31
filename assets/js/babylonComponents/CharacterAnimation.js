import * as BABYLON from 'babylonjs';
import { TimelineLite, TweenLite }  from "gsap/all";

class Animation {

  constructor(){

    BABYLON.ParticleHelper.BaseAssetsUrl = './dist/js/particleSets';

    this.materials = [
      'drops.jpg',
      'water.jpg',
      'rocky.jpg',
      'forest.png',
      'marmor.jpg',
    ];

    this.canvas = document.getElementById("viewCharacterScene"); // Get the canvas element
    this.engine = new BABYLON.Engine(this.canvas, true); // Generate the BABYLON 3D engine

    const scene = this.createScene(); //Call the createScene function
    this.scene = scene;

    // Register a render loop to repeatedly render the scene
    this.engine.runRenderLoop(() => {
      scene.render();
    });

    this.handleEvents();

  }

  createScene = () => {

    const colors = {
      r: 1,
      g: 1,
      b: 1
    };

    // Create the scene space
    const scene = new BABYLON.Scene(this.engine);
    scene.clearColor = new BABYLON.Color4(0,0,0,0);

    // Add a camera to the scene and attach it to the canvas
    // const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0,0,7), scene);
    const camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, 2), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    // camera.attachControl(this.canvas);

    // add lights to the scene
    const darken = 0.2;

    const light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(0, -10, 0), scene);
    light.diffuse = new BABYLON.Color3(colors.r, colors.g, colors.b);
    light.intensity = 0.7;
    scene.ambientColor = new BABYLON.Color3(colors.r - darken, colors.g - darken, colors.b - darken);
  	light.groundColor = new BABYLON.Color3(colors.r, colors.g, colors.b);

    const star = BABYLON.MeshBuilder.CreateBox('star', {height: 1, width: 1, depth: 1}, scene);

    const starRotation = () => {
      star.rotation.y -= 0.002;
    }
    scene.registerAfterRender(starRotation);

    return scene;

  }

  handleEvents = () => {
    window.addEventListener("resize", this.handleResize);
  }

  handleResize = (e) => {
    this.engine.resize();
  }

}

export default Animation;
