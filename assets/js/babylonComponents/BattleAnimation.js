import * as BABYLON from 'babylonjs';
import { TimelineLite, TweenLite }  from "gsap/all";
import { CountUp } from 'countup.js';

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

    this.canvas = document.getElementById("animation"); // Get the canvas element
    this.engine = new BABYLON.Engine(this.canvas, true); // Generate the BABYLON 3D engine
    this.heroFighters = [];

    const scene = this.createScene(); //Call the createScene function
    this.scene = scene;

    this.stars = [];
    this.createStars(150);

    // Register a render loop to repeatedly render the scene
    this.engine.runRenderLoop(() => {
      const shieldRotation = 0.0005;
      this.heroShield.addRotation(0, shieldRotation, 0);
      this.hero.addRotation(0, Math.PI / -5000, 0);
      this.monsterShield.addRotation(0,shieldRotation,0);
      this.monster.addRotation(0, Math.PI / 5000, 0);
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
    const camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, 7), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(this.canvas);

    // add lights to the scene
    const darken = 0.2;

    const light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(0, -10, 0), scene);
    light.diffuse = new BABYLON.Color3(colors.r, colors.g, colors.b);
    light.intensity = 0.7;
    scene.ambientColor = new BABYLON.Color3(colors.r - darken, colors.g - darken, colors.b - darken);
  	light.groundColor = new BABYLON.Color3(colors.r, colors.g, colors.b);

    const light2 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 0, 7), scene);
    light2.diffuse = new BABYLON.Color3(colors.r, colors.g, colors.b);
    light2.intensity = 0.2;
    scene.ambientColor = new BABYLON.Color3(colors.r - darken, colors.g - darken, colors.b - darken);
  	light2.groundColor = new BABYLON.Color3(colors.r, colors.g, colors.b);

    return scene;

  }

  handleEvents = () => {
    window.addEventListener("resize", this.handleResize);
  }

  handleResize = (e) => {
    this.engine.resize();
  }

  animateShield = (from, to, shield) => {

    const opacityFactor = 150;
    const frames = 20;
    const step = ((to / opacityFactor) - (from / opacityFactor)) / frames;

    const stopAnimateShield = () => {
      this.scene.unregisterAfterRender(animateShield);
    }

    const animateShield = () => {

      if(step > 0){
        if(shield.material.alpha >= to / opacityFactor ){
          stopAnimateShield();
          return;
        }
      }
      else if(step < 0){
        if(shield.material.alpha <= to / opacityFactor ){
          stopAnimateShield();
          return;
        }
      }

      shield.material.alpha += step;
    }

    this.scene.registerAfterRender(animateShield);

  }

  createCharacter = (object) => {

    const character = BABYLON.MeshBuilder.CreateSphere(
      object.name,
      {
        diameter: object.baDiameter,
        segments:object.baSegments,
      },
      this.scene
    );

    character.position = new BABYLON.Vector3(object.baMainPosition[0],object.baMainPosition[1],object.baMainPosition[2]);

    const characterMaterial = new BABYLON.StandardMaterial(object.name + "Material", this.scene);
    const materialTexture = this.materials.getRandomValue();
    characterMaterial.diffuseTexture = new BABYLON.Texture("/dist/textures/" + materialTexture, this.scene);
    characterMaterial.diffuseColor = new BABYLON.Color3(object.mainColor.r, object.mainColor.g, object.mainColor.b);
    characterMaterial.ambientColor = new BABYLON.Color3(object.mainColor.r, object.mainColor.g, object.mainColor.b);
    characterMaterial.roughness = 0;

    var characterMaterial2 = new BABYLON.StandardMaterial("mat1", this.scene);
    const materialTexture2 = this.materials.getRandomValue();
    characterMaterial2.diffuseTexture = new BABYLON.Texture("/dist/textures/" + materialTexture2, this.scene);
    characterMaterial2.diffuseColor = new BABYLON.Color3(object.mainColor.r, object.mainColor.g, object.mainColor.b);
    characterMaterial2.ambientColor = new BABYLON.Color3(object.mainColor.r, object.mainColor.g, object.mainColor.b);

    character.material = characterMaterial;

    // var multimat = new BABYLON.MultiMaterial("multi", this.scene);
    // multimat.subMaterials.push(characterMaterial);
    // multimat.subMaterials.push(characterMaterial2);
    // character.subMeshes = [];
    // var verticesCount = character.getTotalVertices();
    // new BABYLON.SubMesh(0, 0, verticesCount, 0, 8000, character);
    // new BABYLON.SubMesh(1, 0, verticesCount, 9000, 20000, character);

    return character;
  }

  createShield = (character) => {

    const shield = BABYLON.MeshBuilder.CreateSphere(
      character.name + 'shield',
      {
        diameter:character.baDiameter * 2,
        segments:32,
      },
      this.scene
    );

    shield.position = new BABYLON.Vector3(character.baMainPosition[0],character.baMainPosition[1],character.baMainPosition[2]);

    var shieldMaterial = new BABYLON.StandardMaterial(character.name + 'ShieldMaterial', this.scene);
    shieldMaterial.diffuseColor = new BABYLON.Color3(0.078125, 0.62890625, 0.796875);
    shieldMaterial.specularColor = new BABYLON.Color3(0.078125, 0.62890625, 0.796875);
    shieldMaterial.ambientColor = new BABYLON.Color3(0.078125, 0.62890625, 0.796875);
    shieldMaterial.emissiveColor = new BABYLON.Color3(0.078125, 0.62890625, 0.796875);
    shieldMaterial.specularPower = 150;
    shieldMaterial.alpha = 0;
    shield.material = shieldMaterial;
    shield.material.wireframe = true;

    return shield;

  }

  playCard = (doer, target, card) => {
    const attack = card.attack;
    const block = card.block;
    const fleetSize = doer.fleetSize;

    if(attack && doer.fleetSize > 0){
      this.attack(doer, target);
    }

    if(block){
      this.animateShield(doer.block, doer.block + block, doer.baShield);
    }

  }

  createStars = (amount) => {

    let starCount = 0;

    while(starCount < amount){
      starCount += 1;
      const star = BABYLON.MeshBuilder.CreateBox('star' + starCount, {height: 1, width: 1, depth: 1}, this.scene);
      star.position = new BABYLON.Vector3((Math.random() - 0.5) * 1000, (Math.random() - 0.5) * 1000, (Math.random() - 1.5) * 1000);
      // const star = BABYLON.MeshBuilder.CreateBox('star' + starCount, {height: Math.random() * 0.001, width: Math.random() * 0.001, depth: Math.random() * 0.001}, this.scene);
      const starMaterial = new BABYLON.StandardMaterial('starMaterial' + starCount, this.scene);
      starMaterial.diffuseColor = new BABYLON.Color3(1,1,1);
      starMaterial.ambientColor = new BABYLON.Color3(1,1,1);
      starMaterial.emissiveColor = new BABYLON.Color3(1,1,1);
      star.material = starMaterial;
      this.stars.push(star);
    }

  }

  createFighters = (character) => {
    let counter = 0;

    while(counter < character.fleetSize){

      // const fighter = BABYLON.Mesh.CreateBox("fighter", 0.03, this.scene);
      const fighterSize = Math.random() * (0.04 - 0.025) + 0.025;
      const fighter = BABYLON.Mesh.CreateTorus("fighter" + counter, fighterSize, fighterSize, 28, this.scene, false, BABYLON.Mesh.DEFAULTSIDE);
      const pivot = new BABYLON.TransformNode("root");

      const materialTexture = this.materials.getRandomValue();
      const fighterMaterial = new BABYLON.StandardMaterial("fighterMaterial", this.scene);
      // fighterMaterial.diffuseTexture = new BABYLON.Texture("/dist/textures/" + materialTexture, this.scene);
      fighterMaterial.diffuseColor = new BABYLON.Color3(character.mainColor.r, character.mainColor.g, character.mainColor.b);
      // fighterMaterial.specularColor = new BABYLON.Color3(character.mainColor.r, character.mainColor.g, character.mainColor.b);
      // fighterMaterial.emissiveColor = new BABYLON.Color3(1,1,1);
      fighter.material = fighterMaterial;

      pivot.position = character.baBody.position;
      pivot.rotation = new BABYLON.Vector3(Math.PI * Math.random(),Math.PI * (Math.random() - 0.5),0);
      fighter.parent = pivot;
      fighter.position = new BABYLON.Vector3(character.baBody.getBoundingInfo().boundingBox.extendSize.x * 1.5, 0, 0);

      const angle = Math.random() * -0.005;
      const axis = new BABYLON.Vector3(0,6,Math.random());
      const rotateFactor = Math.random() - 0.75;
      const rotateAnimation = () => {
        pivot.rotate(axis, angle, BABYLON.Space.WORLD);
        fighter.rotation.x += rotateFactor * 0.025;
        fighter.rotation.y += rotateFactor * 0.025;
        fighter.rotation.z += rotateFactor * 0.025;
      }
      this.scene.registerAfterRender(rotateAnimation);
      character.fleet.push({
        fighter: fighter,
        animation: rotateAnimation,
        pivot: pivot,
      });

      counter++;
    }

  }

  attack = (doer, target) => {

    // get first fighter in fleet
    let startedMovement = false;

    let fighter = null;
    fighter = doer.fleet.find(loopFighter => {
      return Math.abs(doer.baBody._absolutePosition.x) > Math.abs(loopFighter.fighter._absolutePosition.x);
    });

    if(fighter == null || fighter == false){
      fighter = doer.fleet.shift();
    }
    else{
      doer.fleet = doer.fleet.filter( obj => {
        return obj.fighter.id !== fighter.fighter.id;
      });
    }

    const doerPosition = doer.baBody.position;
    const fighterPosition = fighter.fighter.position;

    // check if fighter won't crash into own planet
    const checkFighterPosition = () => {
      const result = Math.abs(doerPosition.x) - Math.abs(fighterPosition.x);
      if(!startedMovement && result > 0){
        startedMovement = true;
        attackAnimation();
      }
      else{
        window.clearTimeout(checkFighterPositionTimer);
      }
      return result;
    }
    const checkFighterPositionTimer = window.setTimeout(checkFighterPosition, 100);

    // play explosion AND shield-deflect if attack is larger than block
    let residueDamage = false;
    if(doer.recentAttack > target.blockBefore && target.block != target.blockBefore){
      residueDamage = true;
    }

    // if fighter is in good position, then attack
    const attackAnimation = () => {

      // stop moving around planet
      this.scene.unregisterAfterRender(fighter.animation);
      // detach from planet
      doer.baBody.removeChild(fighter.fighter);

      const pivot = new BABYLON.TransformNode('pivot' + fighter.fighter.id);
      pivot.position = fighterPosition;
      fighter.fighter.parent = pivot;
      fighter.fighter.position = new BABYLON.Vector3(0,0,0);

      const distance = {
        x: target.baBody.position.x - fighterPosition.x,
        y: target.baBody.position.y - fighterPosition.y,
        z: target.baBody.position.z - fighterPosition.z + 0.05,
      };
      const axis = new BABYLON.Vector3(distance.x, distance.y, distance.z);
      // const axisLine = BABYLON.MeshBuilder.CreateLines("axisLine", { points: [fighterPosition.add(axis.scale(-50)), fighterPosition.add(axis.scale(50))] }, this.scene);
      const axisNormal = axis.normalize();

      const moveFighter = () => {
        pivot.position = pivot.position.add(axisNormal.scale(0.07)); //move fighter along axis

        // if fighter hits shield
        if (fighter.fighter.intersectsMesh(target.baShield, true) && target.baShield.material.alpha > 0){

          if(!residueDamage){
            stopMoveFighter();
            fighter.fighter.parent = target.baBody;
          }

          this.animateShield(target.blockBefore, target.block, target.baShield);

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
          particleSystem.minSize = 0.005;
          particleSystem.maxSize = 0.015;

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

        }


        // if fighter hits enemy
        if (fighter.fighter.intersectsMesh(target.baBody, true)){

          if(residueDamage){
            BABYLON.ParticleHelper.CreateAsync("smoke", this.scene).then((set) => {
              set.start(fighter.fighter);
            });
          }
          else{
            BABYLON.ParticleHelper.CreateAsync('explosionFighter', this.scene).then((set) => {
              set.start(fighter.fighter);
              window.setTimeout(() => {
                set.dispose(fighter.fighter);
                fighter.fighter.dispose();
              }, 1000);
            });
          }

          stopMoveFighter();
          fighter.fighter.material.alpha = 0;

          if(target.isDead){
            this.explodePlanet(target.baBody);
          }


        }

  	  }

      this.scene.registerAfterRender(moveFighter);

      const stopMoveFighter = () => {
        this.scene.unregisterAfterRender(moveFighter);
      }
    }

  }

  explodePlanet = ( body ) => {
    BABYLON.ParticleHelper.CreateAsync("explosionPlanet", this.scene).then((set) => {
      const animateOpacity = () => {
        body.material.alpha -= 0.07;
        body.scaling.x -= 0.05;
        body.scaling.y -= 0.05;
        body.scaling.z -= 0.05;
        if(body.material <= 0){
          this.scene.unregisterAfterRender(animateOpacity);
        }
      }
      this.scene.registerAfterRender(animateOpacity);
      set.systems.forEach(s => {
          s.disposeOnStop = true;
      });
      set.start(body);
    });
  }

}

export default Animation;
