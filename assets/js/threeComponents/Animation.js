import * as BABYLON from 'babylonjs';
import { TimelineLite, TweenLite }  from "gsap/all";
import { CountUp } from 'countup.js';

class Animation {

  constructor(){

    this.canvas = document.getElementById("animation"); // Get the canvas element
    this.engine = new BABYLON.Engine(this.canvas, true); // Generate the BABYLON 3D engine
    this.monsterSize = Math.random() + 0.2;

    const scene = this.createScene(); //Call the createScene function
    this.scene = scene;

    // Register a render loop to repeatedly render the scene
    this.engine.runRenderLoop(function () {
      scene.render();
    });

    this.handleEvents();

  }

  handleEvents = () => {
    window.addEventListener("resize", this.handleResize);
  }

  handleResize = (e) => {
    this.engine.resize();
  }

  animateShield = (from, to, shield) => {
    console.log('start animateShield');
    console.log(from, to, shield);
    from = from;
    to = to;
    const step = ((to / 100) - (from / 100)) / 10;
    console.log('step --->', step);
    var shieldAnimation = setInterval(shieldAnimationTimer, 100);

    function shieldAnimationTimer() {
      if(step > 0){
        if(shield.material.alpha >= to / 100 ){
          stopShieldAnimation();
          return;
        }
      }
      else if(step < 0){
        if(shield.material.alpha <= to / 100 ){
          stopShieldAnimation();
          return;
        }
      }
      shield.material.alpha += step;
    }

    // shield.material.alpha = to / 100;

    function stopShieldAnimation() {
      clearInterval(shieldAnimation);
    }

    console.log('-----------------');
    console.log('end animateShield');
  }

  createHero = () => {

    const hero = BABYLON.MeshBuilder.CreateSphere(
      "hero",
      {
        diameter:1,
        segments:32,
      },
      this.scene
    );
    hero.position = new BABYLON.Vector3(2.5,0.5,0);

    const heroMaterial = new BABYLON.StandardMaterial("heroMaterial", this.scene);
    heroMaterial.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
    heroMaterial.ambientColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
    hero.material = heroMaterial;

    return hero;
  }

  createHeroShield = () => {
    const shield = BABYLON.MeshBuilder.CreateSphere(
      "shield",
      {
        diameter:1.25,
        segments:32,
      },
      this.scene
    );
    shield.opacity = 0.1;
    this.heroShield = shield;

    shield.position = new BABYLON.Vector3(2.5,0.5,0);
    var shieldMaterial = new BABYLON.StandardMaterial("heroMaterial", this.scene);
    shield.material = shieldMaterial;
    shield.material.alpha = 0;
    shield.material.wireframe = true;
  }

  createMonster = () => {

    const monster = BABYLON.MeshBuilder.CreateSphere(
      "monster",
      {
        diameter: this.monsterSize,
        segments:32,
      },
      this.scene
    );
    monster.position = new BABYLON.Vector3(-2.5,0.5,0);

    const monsterMaterial = new BABYLON.StandardMaterial("monsterMaterial", this.scene);
    monsterMaterial.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
    monsterMaterial.ambientColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
    monster.material = monsterMaterial;

    return monster;
  }

  createMonsterShield = () => {

    const shield = BABYLON.MeshBuilder.CreateSphere(
      "shield",
      {
        diameter: this.monsterSize * 1.5,
        segments:32,
      },
      this.scene
    );

    shield.position = new BABYLON.Vector3(-2.5,0.5,0);
    var shieldMaterial = new BABYLON.StandardMaterial("shieldMaterial", this.scene);
    shield.material = shieldMaterial;
    shield.material.alpha = 0;
    shield.material.wireframe = true;

    this.monsterShield = shield;
  }

  createScene = () => {

      // Create the scene space
      const scene = new BABYLON.Scene(this.engine);
      scene.clearColor = new BABYLON.Color4(0,0,0,0);
      scene.ambientColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());

      // Add a camera to the scene and attach it to the canvas
      // const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0,0,7), scene);
      const camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, 7), scene);
      camera.setTarget(BABYLON.Vector3.Zero());

      // add lights to the scene
      const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, -10), scene);
      light.diffuse = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
    	light.groundColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());

      // add your character (sphere mesh) and potential shield
      this.createHero();
      this.createHeroShield();

      // add enemy and potential shield
      this.createMonster();
      this.createMonsterShield();

      return scene;

    };

}

export default Animation;
