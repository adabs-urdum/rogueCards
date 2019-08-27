import * as BABYLON from 'babylonjs';
import { TimelineLite, TweenLite }  from "gsap/all";
import { CountUp } from 'countup.js';

class Animation {

  constructor(){

    BABYLON.ParticleHelper.BaseAssetsUrl = './dist/js/particleSets';

    this.materials = [
      'dirt.jpg',
      'rocks.jpg',
      'water.jpg',
    ];

    this.canvas = document.getElementById("animation"); // Get the canvas element
    this.engine = new BABYLON.Engine(this.canvas, true); // Generate the BABYLON 3D engine
    this.monsterSize = Math.random() + 0.3;
    this.monsterPosition = new BABYLON.Vector3(-2.5,0.5,0);
    this.heroPosition = new BABYLON.Vector3(2.5,0.5,0);

    this.heroFighters = [];

    const scene = this.createScene(); //Call the createScene function
    this.scene = scene;

    // Register a render loop to repeatedly render the scene
    this.engine.runRenderLoop(() => {
      this.heroShield.addRotation(Math.PI / -1000, Math.PI / -1000, Math.PI / -1000);
      this.hero.addRotation(Math.PI / 3000, Math.PI / 3000, Math.PI / 3000);
      this.monsterShield.addRotation(Math.PI / 1000, Math.PI / 1000, Math.PI / 1000);
      this.monster.addRotation(Math.PI / -3000, Math.PI / -3000, Math.PI / -3000);
      scene.render();
    });

    this.handleEvents();

  }

  createScene = () => {

    const colors = {
      r: Math.random(),
      g: Math.random(),
      b: Math.random()
    };

    // Create the scene space
    const scene = new BABYLON.Scene(this.engine);
    scene.clearColor = new BABYLON.Color4(0,0,0,0);

    // Add a camera to the scene and attach it to the canvas
    // const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0,0,7), scene);
    const camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, 7), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(this.canvas);

    // add lights to the scene
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, -10), scene);
    light.diffuse = new BABYLON.Color3(colors.r, colors.g, colors.b);
    const darken = 0.2;
    scene.ambientColor = new BABYLON.Color3(colors.r - darken, colors.g - darken, colors.b - darken);
  	light.groundColor = new BABYLON.Color3(Math.random() - darken, Math.random() - darken, Math.random() - darken);

    // add your character (sphere mesh) and potential shield
    const heroColors = {
      r: Math.random() - 0.2,
      g: Math.random() - 0.2,
      b: Math.random() - 0.2
    };
    this.createHero(heroColors);
    this.createHeroShield(heroColors);

    // add enemy and potential shield
    this.createMonster();
    this.createMonsterShield();

    return scene;

  }

  handleEvents = () => {
    window.addEventListener("resize", this.handleResize);
  }

  handleResize = (e) => {
    this.engine.resize();
  }

  animateShield = (from, to, shield) => {
    // console.log('start animateShield');
    // console.log(from, to, shield);
    from = from;
    to = to;
    const step = ((to / 200) - (from / 200)) / 10;
    const shieldAnimation = setInterval(shieldAnimationTimer, 30);

    function shieldAnimationTimer() {
      if(step > 0){
        if(shield.material.alpha >= to / 200 ){
          stopShieldAnimation();
          return;
        }
      }
      else if(step < 0){
        if(shield.material.alpha <= to / 200 ){
          stopShieldAnimation();
          return;
        }
      }
      shield.material.alpha += step;
    }

    function stopShieldAnimation() {
      clearInterval(shieldAnimation);
    }
  }

  createHero = (heroColors) => {

    const hero = BABYLON.MeshBuilder.CreateSphere(
      "hero",
      {
        diameter:1,
        segments:32,
      },
      this.scene
    );
    this.hero = hero;
    hero.position = this.heroPosition;

    const heroMaterial = new BABYLON.StandardMaterial("heroMaterial", this.scene);
    const material = this.materials.getRandomValue();
    heroMaterial.diffuseTexture = new BABYLON.Texture("/dist/textures/" + material, this.scene);
    heroMaterial.diffuseColor = new BABYLON.Color3(heroColors.r, heroColors.g, heroColors.b);
    heroMaterial.ambientColor = new BABYLON.Color3(heroColors.r, heroColors.g, heroColors.b);
    hero.material = heroMaterial;

    return hero;
  }

  createHeroFighters = (amount) => {

    const hero = this.hero;

    // hero.material.alpha = 0.5;

    let fighterCount = 0;
    while(fighterCount < amount){

      const fighter = BABYLON.Mesh.CreateBox("fighter", 0.03, this.scene);
      const pivot = new BABYLON.TransformNode("root");
      const hero = this.hero;

      const fighterMaterial = new BABYLON.StandardMaterial("fighterMaterial", this.scene);
      fighterMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
      fighterMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
      fighterMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
      fighterMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
      fighter.material = fighterMaterial;

      pivot.position = hero.position;
      fighter.parent = pivot;
      fighter.position = new BABYLON.Vector3(0.7, 0, 0);

      const angle = Math.random() * -0.02;
      const axis = new BABYLON.Vector3(0,6,Math.random());
      const rotateAnimation = () => {
        pivot.rotate(axis, angle, BABYLON.Space.WORLD);
      }
      this.scene.registerAfterRender(rotateAnimation);
      this.heroFighters.push({
        fighter: fighter,
        animation: rotateAnimation,
      });

      fighterCount += 1;
    }

  }

  attack = () => {

    const fighter = this.heroFighters.shift();

    const fighterPosition = fighter.fighter.position;
    this.scene.unregisterAfterRender(fighter.animation);
    this.monster.removeChild(fighter.fighter);

    const pivot = new BABYLON.TransformNode("root");
    pivot.position = fighterPosition;

    fighter.fighter.parent = pivot;
    fighter.fighter.position = new BABYLON.Vector3(0,0,0);

    const distance = {
      x: this.monsterPosition.x - fighterPosition.x,
      y: this.monsterPosition.y - fighterPosition.y,
      z: this.monsterPosition.z - fighterPosition.z,
    };
    const axis = new BABYLON.Vector3(distance.x, distance.y, distance.z);
    // const axisLine = BABYLON.MeshBuilder.CreateLines("axisLine", { points: [fighterPosition.add(axis.scale(-50)), fighterPosition.add(axis.scale(50))] }, this.scene);
    const axisNormal = axis.normalize();

    const moveFighter = () => {
      pivot.position = pivot.position.add(axisNormal.scale(0.15)); //move fighter along axis


      // if fighter hits monstershield
      if (fighter.fighter.intersectsMesh(this.monsterShield, true) && this.monsterShield.material.alpha > 0){
        // console.log('hit shield');

        stopMoveFighter();

        var particleSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);
        particleSystem.particleTexture = new BABYLON.Texture('/dist/textures/flare.png', this.scene);

        // An optional mask to filter some colors out of the texture, or filter a part of the alpha channel
        particleSystem.textureMask = new BABYLON.Color4(0, 0.5, 0.5, 0.5);

        particleSystem.emitter = fighter.fighter;

        // colors 1 and 2 get combined, dead is the color it takes right before it disappears
        particleSystem.color1 = new BABYLON.Color4(1, 1, 1, 1);
        particleSystem.color2 = new BABYLON.Color4(1, 1, 1, 1);
        particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0);

        // size of particles
        particleSystem.minSize = 0.05;
        particleSystem.maxSize = 0.01;

        // lifetime of particles
        particleSystem.minLifeTime = 0.05;
        particleSystem.maxLifeTime = 0.3;

        // the density of particles, the rate of particles flow
        particleSystem.emitRate = 100;

        // emit only 300 particles at once
        particleSystem.manualEmitCount = 200;

        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;

        //Set the gravity of all particles (not necessary down)
        particleSystem.gravity = new BABYLON.Vector3(5, 0, 0);

        // random direction of each particle after it has been emitted, between direction1 and direction2
        particleSystem.direction1 = new BABYLON.Vector3(1, 1, 1);
        particleSystem.direction2 = new BABYLON.Vector3(0, -1, 0);

        // AngularSpeed. You can define a rotation for each particle (in radian)
        particleSystem.minAngularSpeed = Math.PI;
        particleSystem.maxAngularSpeed = Math.PI;

        // Speed/Strength. You can define the power in emitting particles, and the overall motion speed (0.01 is default update speed, faster updates = faster animation).
        particleSystem.minEmitPower = 1;
        particleSystem.maxEmitPower = 15;
        particleSystem.updateSpeed = 0.005;

        // Duration. You can set the amount of time the particle system is running (depends of the overall speed above).
        const animationDuration = 5;
        particleSystem.targetStopDuration = animationDuration;

        // Dispose. Disposes or not the particle system on stop (very useful if you want to create a one shot particle system with a specific targetStopDuration)
        particleSystem.disposeOnStop = true;

        particleSystem.start();

        fighter.fighter.material.alpha = 0;

        window.setTimeout(()=>{
          fighter.fighter.dispose();
        }, animationDuration * 5000);

        // BABYLON.ParticleHelper.CreateAsync('explosion', this.scene).then((set) => {
        //   set.start(fighter.fighter);
        //   window.setTimeout(() => {
        //     set.dispose(fighter.fighter);
        //   }, 1000);
        // });

        // const shieldParticles = BABYLON.ParticleHelper.CreateDefault(fighter.fighter);
        // shieldParticles.start();

      }


      // if fighter hits monster
      if (fighter.fighter.intersectsMesh(this.monster, true)){
        // console.log('hit monster');

        stopMoveFighter();

        BABYLON.ParticleHelper.CreateAsync('explosion', this.scene).then((set) => {
          set.start(fighter.fighter);
          window.setTimeout(() => {
            set.dispose(fighter.fighter);
          }, 1000);
        });

      }
	  }

    this.scene.registerAfterRender(moveFighter);

    const stopMoveFighter = () => {
      this.scene.unregisterAfterRender(moveFighter);
    }

  }

  createHeroShield = (heroColors) => {
    const shield = BABYLON.MeshBuilder.CreateSphere(
      "shield",
      {
        diameter:2,
        segments:32,
      },
      this.scene
    );

    this.heroShield = shield;
    shield.position = new BABYLON.Vector3(2.5,0.5,0);

    var shieldMaterial = new BABYLON.StandardMaterial("heroMaterial", this.scene);
    shieldMaterial.diffuseColor = new BABYLON.Color3(0.078125, 0.62890625, 0.796875);
    shieldMaterial.specularColor = new BABYLON.Color3(0.078125, 0.62890625, 0.796875);
    shieldMaterial.ambientColor = new BABYLON.Color3(0.078125, 0.62890625, 0.796875);
    shieldMaterial.emissiveColor = new BABYLON.Color3(0.078125, 0.62890625, 0.796875);
    shieldMaterial.specularPower = 150;
    shieldMaterial.alpha = 0;
    shield.material = shieldMaterial;
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
    this.monster = monster;
    monster.position = this.monsterPosition;

    const monsterMaterial = new BABYLON.StandardMaterial("monsterMaterial", this.scene);
    const material = this.materials.getRandomValue();
    monsterMaterial.diffuseTexture = new BABYLON.Texture("/dist/textures/" + material, this.scene);
    monsterMaterial.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
    monsterMaterial.ambientColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
    monster.material = monsterMaterial;

    return monster;
  }

  createMonsterShield = () => {

    const shield = BABYLON.MeshBuilder.CreateSphere(
      "shield",
      {
        diameter: this.monsterSize * 2,
        segments:32,
      },
      this.scene
    );

    shield.position = new BABYLON.Vector3(-2.5,0.5,0);

    var shieldMaterial = new BABYLON.StandardMaterial("shieldMaterial", this.scene);
    shieldMaterial.diffuseColor = new BABYLON.Color3(0.078125, 0.62890625, 0.796875);
    shieldMaterial.specularColor = new BABYLON.Color3(0.078125, 0.62890625, 0.796875);
    shieldMaterial.ambientColor = new BABYLON.Color3(0.078125, 0.62890625, 0.796875);
    shieldMaterial.emissiveColor = new BABYLON.Color3(0.078125, 0.62890625, 0.796875);
    shieldMaterial.specularPower = 150;
    shieldMaterial.alpha = 0;
    shield.material = shieldMaterial;
    shield.material.wireframe = true;

    this.monsterShield = shield;
  }

}

export default Animation;
