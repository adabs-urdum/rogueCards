import * as BABYLON from 'babylonjs';
import Hero from './Battle/Characters/Hero';
import Hex from './Battle/Characters/Hex';

class mainAnimation{

  constructor(){

    this.canvas = document.getElementById('babylon');
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.engine.getHardwareScalingLevel();
    this.scene = new BABYLON.Scene(this.engine);
    this.scene.clearColor = new BABYLON.Color4(0,0,0,0);
    this.scene.ambientColor = new BABYLON.Color3(0, 10/255, 20/255);
    this.scene.gravity = new BABYLON.Vector3(0, -0.8, 0);
    this.scene.collisionsEnabled = true;
    this.branches = [];
    this.monsterJunctions = [];

    this.materials = [
      'drops.jpg',
      'water.jpg',
      'rocky.jpg',
      'forest.png',
      'marmor.jpg',
    ];

    this.starTypes = [
      {
        'type': 'heal',
        'chance': 0.15,
        'color': new BABYLON.Color3(1,0,0)
      },
      {
        'type': 'shop',
        'chance': 0.2,
        'color': new BABYLON.Color3(1,0,0)
      },
      {
        'type': 'enemy',
        'chance': 0.7,
        'color': new BABYLON.Color3(1,0,0)
      },
    ];

    this.stars = [];
    this.createStars(350);
    this.currentStar = this.stars.getRandomValue();

    const color = {
      r: 1,
      g: 1,
      b: 1
    };
    const darken = 0.2;

    const light2 = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 10, 0), this.scene);
  	light2.diffuse = new BABYLON.Color3(0.5, 0.5, 0.5);
  	light2.specular = new BABYLON.Color3(0.4, 0.4, 0.4);
  	light2.groundColor = new BABYLON.Color3(0, 0, 0);

    this.createPivots();
    this.createHero();

    const animationFixedCamera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0,3,7), this.scene);
    this.fixedCamera = animationFixedCamera;
    this.fixedCamera.setTarget( new BABYLON.Vector3(0,0,0) );
    this.fixedCamera.parent = this.pivotMain;
    this.scene.activeCamera = this.fixedCamera;

    this.freeCamera = new BABYLON.ArcRotateCamera('camera', Math.PI / 2, Math.PI / 4, 7, this.pivotHero.position, this.scene);
    this.freeCamera.attachControl(this.canvas, true);
    this.freeCamera.parent = this.pivotMain;
    this.freeCamera.upperRadiusLimit = 10;
    this.freeCamera.lowerRadiusLimit = 1;

    // Register a render loop to repeatedly render the scene
    this.engine.runRenderLoop(() => {
      this.pivotMain.rotate(BABYLON.Axis.Y, Math.PI / 180 / -350, BABYLON.Space.LOCAL);
      this.scene.render();
    });

    this.handleEvents();

    this.heroFleet = [];

  }

  setBattleView = () => {

    this.scene.activeCamera = this.fixedCamera;

    this.currentStar.parent = this.pivotEnemy;
    this.currentStar.before = this.currentStar.position;
    this.currentStar.position = new BABYLON.Vector3(0.27,0.4,0);
    this.setMonsterBattleView();

    this.hero.position = new BABYLON.Vector3(-0.27,0.25,0);

  }

  setMonsterBattleView = () => {

    this.monster = new Hex();
    this.monster = this.monster.createMainBody(this.pivotEnemy, this.scene, this.currentStar);

  }

  setHeroPositionCharacterView = () => {

    const heroCharacterViewPos = new BABYLON.Vector3(-2.3, 1.8, 5);

    const animationLoop = () => {
      const distance = BABYLON.Vector3.Distance(heroCharacterViewPos, this.hero.body.position);
      if(Math.round(distance) <= 0.1){
        this.hero.body.position = heroCharacterViewPos;
        this.scene.unregisterAfterRender(animationLoop);
      }
      else{
        this.hero.body.position = BABYLON.Vector3.Lerp(this.hero.body.position, heroCharacterViewPos, 0.1);
      }
    }
    this.scene.registerAfterRender(animationLoop);

    this.scene.activeCamera = this.fixedCamera;

  }

  resetHeroPositionCharacterView = (callback) => {

    const heroCharacterViewPos = new BABYLON.Vector3(0, 0, 0);

    const animationLoop = () => {
      const distance = BABYLON.Vector3.Distance(heroCharacterViewPos, this.hero.body.position);
      if(distance <= 0.1){
        this.hero.body.position = heroCharacterViewPos;
        this.scene.unregisterAfterRender(animationLoop);
      }
      else{
        this.hero.body.position = BABYLON.Vector3.Lerp(this.hero.body.position, heroCharacterViewPos, 0.1);
      }
    };
    this.scene.registerAfterRender(animationLoop);

    callback();

  }

  createPivots = () => {

    this.pivotMain = BABYLON.MeshBuilder.CreateSphere('pivotMain', {diameter: 0.1}, this.scene);
    this.pivotMain.position = new BABYLON.Vector3(0,0,0);

    this.pivotHero = BABYLON.MeshBuilder.CreateSphere('pivotHero', {diameter: 0.001}, this.scene);
    this.pivotHero.parent = this.pivotMain;
    this.pivotHero.position = new BABYLON.Vector3(2.8,0,0);

    this.pivotEnemy = BABYLON.MeshBuilder.CreateSphere('pivotEnemy', {diameter: 0.1}, this.scene);
    this.pivotEnemy.parent = this.pivotMain;
    this.pivotEnemy.position = new BABYLON.Vector3(-2.8,0,0);

  }

  createHero = () => {

    this.hero = new Hero();
    this.heroBody = this.hero.createMainBody(this.pivotHero, this.scene);

  }

  handleEvents = () => {

    window.addEventListener("resize", this.handleResize);

  }

  handleResize = (e) => {
    this.engine.resize();
  }

  turnCameraY = (deg, endFrame) => {

    const animationBox2 = new BABYLON.Animation("animationBox2", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keys2 = [
      {
        frame: 0,
        value: this.fixedCamera.rotation.y
      },
      {
        frame: endFrame,
        value: this.fixedCamera.rotation.y + Math.PI / 180 * deg
      }
    ];

    animationBox2.setKeys(keys2);

    this.fixedCamera.animations = [];
    this.fixedCamera.animations.push(animationBox2);

    this.scene.beginAnimation(this.fixedCamera, 0, endFrame, true);

  }

  movePivotMainToRandomStar = () => {

    this.stars.shuffle();

    let nextStarKey = 0;
    let nextStar = this.stars[nextStarKey];

    this.movePivotMainTo(nextStar._absolutePosition);
    window.dispatchEvent(new CustomEvent('setCurrentStar', {
      detail: {
        currentStar: nextStar,
      }
    }));

  }

  movePivotMainTo = (destPos) => {

    const renderLoop = this.scene.registerAfterRender(() => {
      this.pivotMain.position = BABYLON.Vector3.Lerp(this.pivotMain._absolutePosition, destPos, 0.2);
    });

    this.scene.unregisterAfterRender(renderLoop);

  }

  createStars = (amount) => {

    let starCount = 0;

    while(starCount < amount){

      const starPosition = new BABYLON.Vector3((Math.random() - 0.5) * 1500, (Math.random() - 0.5) * 1500, (Math.random() - 0.5) * 1500);

      starCount += 1;
      const star = BABYLON.MeshBuilder.CreateSphere('star' + starCount, {diameter: 0.75}, this.scene);

      const aura = BABYLON.MeshBuilder.CreateSphere('aura' + starCount, {diameter: 3}, this.scene);
      aura.parent = star;

      const auraMaterial = new BABYLON.StandardMaterial('auraMaterial' + starCount, this.scene);
      auraMaterial.alpha = 0;
      aura.material = auraMaterial;

      aura.actionManager = new BABYLON.ActionManager(this.scene);
      aura.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction({
          trigger: BABYLON.ActionManager.OnPickTrigger,
          parameter: {}
        }, () => {
          window.dispatchEvent(new CustomEvent('setCurrentStar', {
            detail: {
              currentStar: star,
            }
          }));
          const auroPos = this.movePivotMainTo(aura._absolutePosition);
        })
      );

      star.type = null;
      while(star.type == null){
        const type = this.starTypes.getRandomValue();
        if(type.chance >= Math.random()){
          star.type = type;
        }
      }

      star.position = starPosition;
      const starMaterial = new BABYLON.StandardMaterial('starMaterial' + starCount, this.scene);
      starMaterial.diffuseColor = new BABYLON.Color3(Math.random() + 0.3, Math.random() + 0.3, Math.random() + 0.3);
      starMaterial.ambientColor = new BABYLON.Color3(1,1,1);
      starMaterial.emissiveColor = new BABYLON.Color3(0.3,0.3,0.3);
      star.material = starMaterial;

      this.stars.push(star);

    }

  }

}

export default mainAnimation;
