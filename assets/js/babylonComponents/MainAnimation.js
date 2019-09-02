import * as BABYLON from 'babylonjs';

class mainAnimation{

  constructor(){

    this.canvas = document.getElementById('babylon');
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.engine.getHardwareScalingLevel();
    this.scene = new BABYLON.Scene(this.engine);
    this.scene.clearColor = new BABYLON.Color4(0,0,0,0);
    this.scene.ambientColor = new BABYLON.Color3(0, 10/255, 20/255);

    this.stars = [];
    this.createStars(250);
    this.engine.resize();

    const color = {
      r: 1,
      g: 1,
      b: 1
    };
    const darken = 0.2;

    const light2 = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 10, 0), this.scene);
  	light2.diffuse = new BABYLON.Color3(1, 1, 1);
  	light2.specular = new BABYLON.Color3(0.9, 0.9, 1);
  	light2.groundColor = new BABYLON.Color3(0, 0, 0);

    this.createPivots();
    this.createHero();

    this.fixedCamera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0,3,7), this.scene);
    this.fixedCamera.setTarget( new BABYLON.Vector3(0,0,0) );
    this.fixedCamera.parent = this.pivotMain;
    this.scene.activeCamera = this.fixedCamera;

    this.freeCamera = new BABYLON.ArcRotateCamera('camera', 0, 0, 7, this.pivotHero.position, this.scene);
    this.freeCamera.attachControl(this.canvas, true);
    this.freeCamera.parent = this.pivotMain;

    // Register a render loop to repeatedly render the scene
    this.engine.runRenderLoop(() => {
      this.pivotMain.position.z -= 0.01;
      this.scene.render();
    });

    this.handleEvents();

  }

  setHeroPositionCharacterView = () => {

    const heroCharacterViewPos = new BABYLON.Vector3(-1.8, 1.5, 3);
    const hero = this.hero;

    const animationLoop = this.scene.registerBeforeRender(() => {
      this.hero.position = BABYLON.Vector3.Lerp(this.hero.position, heroCharacterViewPos, 0.1);
      if(this.hero.position == heroCharacterViewPos){
        this.scene.unregisterAfterRender(animationLoop);
      }
    });

  }

  resetHeroPositionCharacterView = () => {

    console.log('resetHeroPositionCharacterView');

    const heroCharacterViewPos = new BABYLON.Vector3(0, 0, 0);
    const hero = this.hero;

    const animationLoop = this.scene.registerBeforeRender(() => {
      this.hero.position = BABYLON.Vector3.Lerp(this.hero.position, heroCharacterViewPos, 0.5);
      if(this.hero.position == heroCharacterViewPos){
        this.scene.unregisterAfterRender(animationLoop);
      }
    });

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

    this.hero = BABYLON.MeshBuilder.CreateSphere('hero', {diameter: 1}, this.scene);
    this.hero.parent = this.pivotHero;

    this.hero.actionManager = new BABYLON.ActionManager(this.scene);
    this.hero.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnPickTrigger
      }, () => {
        console.log('hero clicked');
      })
    );

  }

  handleEvents = () => {
    window.addEventListener("resize", this.handleResize);
  }

  handleResize = (e) => {
    this.engine.resize();
  }

  turnCameraY = (deg, speed) => {

    // const rotateUntilX = this.camera.rotation.y + Math.PI / 180 * deg;
    const rotateUntilY = this.fixedCamera.rotation.y + BABYLON.Tools.ToRadians(deg);

    const rotateCamera = (deg) => {
      this.fixedCamera.rotation.y += BABYLON.Tools.ToRadians(speed);
      if(speed){
        if(this.fixedCamera.rotation.y >= rotateUntilY){
          this.scene.unregisterAfterRender(rotateCamera);
        }
      }
      else{
        if(this.fixedCamera.rotation.y <= rotateUntilY){
          this.scene.unregisterAfterRender(rotateCamera);
        }
      }
    }
    this.scene.registerAfterRender(rotateCamera);

  }

  movePivotMainTo = (destPos) => {

    const pivotMain = this.pivotMain;

    const renderLoop = this.scene.registerBeforeRender(() => {
      this.pivotMain.position = BABYLON.Vector3.Lerp(this.pivotMain._absolutePosition, destPos, 0.2);
    });

    this.scene.unregisterAfterRender(renderLoop);

  }

  createStars = (amount) => {

    let starCount = 0;

    while(starCount < amount){

      const starPosition = new BABYLON.Vector3((Math.random() - 0.5) * 1500, (Math.random() - 0.5) * 1500, (Math.random() - 0.5) * 1500);

      starCount += 1;
      const star = BABYLON.MeshBuilder.CreateSphere('star' + starCount, {diameter: 1}, this.scene);

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
          console.log('clicked');
          console.log(aura);
          const auroPos = this.movePivotMainTo(aura._absolutePosition);
        })
      );

      star.position = starPosition;
      const starMaterial = new BABYLON.StandardMaterial('starMaterial' + starCount, this.scene);
      starMaterial.diffuseColor = new BABYLON.Color3(Math.random(),Math.random(),Math.random());
      starMaterial.ambientColor = new BABYLON.Color3(1,1,1);
      starMaterial.emissiveColor = new BABYLON.Color3(0.3,0.3,0.3);
      star.material = starMaterial;

      this.stars.push(star);

    }

  }

}

export default mainAnimation;
