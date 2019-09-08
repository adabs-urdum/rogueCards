import * as BABYLON from 'babylonjs';

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
    this.freeCamera.upperRadiusLimit = 7;
    // this.freeCamera.lowerRadiusLimit = 7;

    // Register a render loop to repeatedly render the scene
    this.engine.runRenderLoop(() => {
      this.pivotMain.rotate(BABYLON.Axis.Y, Math.PI / 180 / -350, BABYLON.Space.LOCAL);
      this.scene.render();
    });

    this.handleEvents();

  }

  setBattleView = () => {
    console.log('setHeroPositionBattleView');
    console.log(this.hero.position);
    console.log(this.currentStar);

    this.scene.activeCamera = this.fixedCamera;

    this.currentStar.parent = this.pivotEnemy;
    this.currentStar.before = this.currentStar.position;
    this.currentStar.position = new BABYLON.Vector3(0,0,0);

    

  }

  setHeroPositionCharacterView = () => {

    const heroCharacterViewPos = new BABYLON.Vector3(-2.3, 1.8, 5);
    const hero = this.hero;

    const animationLoop = () => {
      const distance = BABYLON.Vector3.Distance(heroCharacterViewPos, this.hero.position);
      if(Math.round(distance) <= 0.1){
        this.hero.position = heroCharacterViewPos;
        this.scene.unregisterAfterRender(animationLoop);
      }
      else{
        this.hero.position = BABYLON.Vector3.Lerp(this.hero.position, heroCharacterViewPos, 0.1);
      }
    }
    this.scene.registerAfterRender(animationLoop);

    this.scene.activeCamera = this.fixedCamera;

  }

  resetHeroPositionCharacterView = (callback) => {

    const heroCharacterViewPos = new BABYLON.Vector3(0, 0, 0);
    const hero = this.hero;

    const animationLoop = () => {
      const distance = BABYLON.Vector3.Distance(heroCharacterViewPos, this.hero.position);
      if(distance <= 0.1){
        this.hero.position = heroCharacterViewPos;
        this.scene.unregisterAfterRender(animationLoop);
      }
      else{
        this.hero.position = BABYLON.Vector3.Lerp(this.hero.position, heroCharacterViewPos, 0.1);
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

  createNewBranch = (id, level, parent, branchMaterial) => {
    const junction = new BABYLON.TransformNode('junction_' + id);
    junction.parent = parent;
    junction.position = new BABYLON.Vector3(0,parent.getBoundingInfo().boundingBox.extendSize.y,0);
    console.log(branchMaterial);

    const factor = 0.93;
    const height = 0.15 / level * factor;
    const diameterTop = 0.01  / level * factor;
    const diameterBottom = 0.03 / level * factor;

    const branch1 = BABYLON.MeshBuilder.CreateCylinder('branch1_' + id, {
      height: height,
      diameterTop: diameterTop,
      diameterBottom: diameterBottom,
      tessellation: 6,
    }, this.scene);
    branch1.parent = junction;
    branch1.rotation = new BABYLON.Vector3(Math.PI/180*-60, 0, Math.PI/180*60);
    branch1.locallyTranslate(new BABYLON.Vector3(0, branch1.getBoundingInfo().boundingBox.extendSize.y, 0));
    branch1.material = branchMaterial;

    const branch2 = BABYLON.MeshBuilder.CreateCylinder('branch2_' + id, {
      height: height,
      diameterTop: diameterTop,
      diameterBottom: diameterBottom,
      tessellation: 6,
    }, this.scene);
    branch2.parent = junction;
    branch2.rotation = new BABYLON.Vector3(Math.PI/180*Math.random() * 60, 0, Math.PI/180*-60);
    branch2.locallyTranslate(new BABYLON.Vector3(0, branch2.getBoundingInfo().boundingBox.extendSize.y, 0));
    branch2.material = branchMaterial;

    const renderLoop = this.scene.registerAfterRender(() => {
      junction.rotation.y += Math.PI / 180 *  Math.random() * 0.05;
      // junction.rotation.x += Math.PI / 180 * 0.05;
    });

    return [junction, branch1, branch2];
  }

  createBranches = (depth, count, parent, level, branchMaterial) => {
    if(level < depth){
      count += 1;
      level += 1;
      let arch = this.createNewBranch(count, level, parent, branchMaterial)
      this.createBranches(depth, count, arch[1], level, branchMaterial);
      count += 1;
      this.createBranches(depth, count, arch[2], level, branchMaterial);
    }
  }

  createHero = () => {

    this.hero = BABYLON.MeshBuilder.CreateSphere('hero', {diameter: 0.01}, this.scene);
    this.hero.parent = this.pivotHero;

    const base = BABYLON.MeshBuilder.CreateCylinder("heroPlatform", {height: 0.05, diameterTop: 0.85, diameterBottom: 0.75, tessellation: 32}, this.scene);
    base.parent = this.hero;
    const baseMaterial = new BABYLON.StandardMaterial("baseMaterial", this.scene);
    const baseTexture = 'body.jpg';
    baseMaterial.diffuseTexture = new BABYLON.Texture("/dist/textures/" + baseTexture, this.scene);
    baseMaterial.diffuseColor = new BABYLON.Color3(0.1,0.1,0.1);
    baseMaterial.ambientColor = new BABYLON.Color3(0,0,0);
    baseMaterial.emissiveColor = new BABYLON.Color3(0,0,0);
    baseMaterial.specularColor = new BABYLON.Color3(0,0,0);
    const baseBumpMap = 'body_bmpmp.jpg';
    baseMaterial.bumpTexture = new BABYLON.Texture("/dist/textures/" + baseBumpMap, this.scene);
    baseMaterial.invertNormalMapX = true;
    baseMaterial.invertNormalMapY = true
    base.material = baseMaterial;

    const bob = BABYLON.MeshBuilder.CreateSphere('stem', {
      diameter: 0.12,
    }, this.scene);
    bob.position = new BABYLON.Vector3(0,0.4,0);
    bob.parent = base;
    const bobMaterial = new BABYLON.StandardMaterial("bobMaterial", this.scene);
    const materialTexture = 'branches1.jpg';
    bobMaterial.diffuseTexture = new BABYLON.Texture("/dist/textures/" + materialTexture, this.scene);
    bobMaterial.diffuseColor = new BABYLON.Color3(1,1,1);
    bobMaterial.ambientColor = new BABYLON.Color3(1,1,1);
    bobMaterial.emissiveColor = new BABYLON.Color3(1,1,1);
    bobMaterial.specularColor = new BABYLON.Color3(0,0,0);
    bobMaterial.roughness = 1;
    const materialBumpMap = 'branches1_bmpmp.jpg';
    bobMaterial.bumpTexture = new BABYLON.Texture("/dist/textures/" + materialBumpMap, this.scene);
    bob.material = bobMaterial;

    const stem = BABYLON.MeshBuilder.CreateSphere('stem', {
      diameter: 0.01,
    }, this.scene);
    stem.position = new BABYLON.Vector3(0,0,0);
    stem.parent = bob;

    const heroLight = new BABYLON.PointLight("heroLight", new BABYLON.Vector3(0, 0, 0), this.scene);
  	heroLight.diffuse = new BABYLON.Color3(1, 1, 1);
  	heroLight.specular = new BABYLON.Color3(1, 1, 1);
    heroLight.groundColor = new BABYLON.Color3(1, 1, 1);
    heroLight.intensity = 8;
    heroLight.parent = stem;

    // const arch1 = this.createNewBranch(1, 1, stem);

    // const arch2 = this.createNewBranch(2, 2, arch1[1]);
    // const arch3 = this.createNewBranch(3, 2, arch1[2]);

    // const arch4 = this.createNewBranch(4, 3, arch2[1]);
    // const arch5 = this.createNewBranch(5, 3, arch2[2]);

    // const arch6 = this.createNewBranch(6, 3, arch3[1]);
    // const arch7 = this.createNewBranch(7, 3, arch3[2]);

    // const arch8 = this.createNewBranch(8, 4, arch4[1]);
    // const arch9 = this.createNewBranch(9, 4, arch4[2]);

    // const arch10 = this.createNewBranch(10, 4, arch5[1]);
    // const arch11 = this.createNewBranch(11, 4, arch5[2]);

    // const arch12 = this.createNewBranch(12, 4, arch6[1]);
    // const arch13 = this.createNewBranch(13, 4, arch6[2]);

    const depth = 9;
    // this.createBranches(depth, 1, stem, 1, bobMaterial);

    // const junction1 = new BABYLON.TransformNode("junction1");
    // junction1.parent = stem;
    // junction1.position = new BABYLON.Vector3(0,stem.getBoundingInfo().boundingBox.extendSize.y,0);

    // const branch1 = BABYLON.MeshBuilder.CreateCylinder('branch1', {
    //   height: 0.15,
    //   diameterTop: 0.03,
    //   diameterBottom: 0.04,
    //   tessellation: 6,
    // }, this.scene);
    // branch1.parent = junction1;
    // branch1.rotation = new BABYLON.Vector3(0, 0, Math.PI/180*60);
    // branch1.locallyTranslate(new BABYLON.Vector3(0, branch1.getBoundingInfo().boundingBox.extendSize.y, 0));

    // const junction2 = new BABYLON.TransformNode("junction2");
    // junction2.parent = stem;
    // junction2.position = new BABYLON.Vector3(0,stem.getBoundingInfo().boundingBox.extendSize.y,0);

    // const branch2 = BABYLON.MeshBuilder.CreateCylinder('branch2', {
    //   height: 0.15,
    //   diameterTop: 0.03,
    //   diameterBottom: 0.04,
    //   tessellation: 6,
    // }, this.scene);
    // branch2.parent = junction2;
    // branch2.rotation = new BABYLON.Vector3(0, 0, Math.PI/180*-60);
    // branch2.locallyTranslate(new BABYLON.Vector3(0, branch2.getBoundingInfo().boundingBox.extendSize.y, 0));

    // const junction3 = new BABYLON.TransformNode("junction3");
    // junction3.parent = branch2;
    // junction3.position = new BABYLON.Vector3(0,branch2.getBoundingInfo().boundingBox.extendSize.y,0);

    // const branch3 = BABYLON.MeshBuilder.CreateCylinder('branch3', {
    //   height: 0.12,
    //   diameterTop: 0.02,
    //   diameterBottom: 0.03,
    //   tessellation: 6,
    // }, this.scene);
    // branch3.parent = junction3;
    // branch3.rotation = new BABYLON.Vector3(Math.PI/180*-60, 0, 0);
    // branch3.locallyTranslate(new BABYLON.Vector3(0, branch3.getBoundingInfo().boundingBox.extendSize.y, 0));

    // const branch4 = BABYLON.MeshBuilder.CreateCylinder('branch4', {
    //   height: 0.12,
    //   diameterTop: 0.02,
    //   diameterBottom: 0.03,
    //   tessellation: 6,
    // }, this.scene);
    // branch4.parent = junction3;
    // branch4.rotation = new BABYLON.Vector3(Math.PI/180*60, 0, 0);
    // branch4.locallyTranslate(new BABYLON.Vector3(0, branch4.getBoundingInfo().boundingBox.extendSize.y, 0));

    const body = BABYLON.MeshBuilder.CreateSphere("heroBody", {diameter: 0.75, slice: 0.5}, this.scene);
    body.parent = this.hero;
    body.rotate(BABYLON.Axis.X, Math.PI, BABYLON.Space.LOCAL);
    const bodyMaterial = new BABYLON.StandardMaterial("bobMaterial", this.scene);
    const bodyTexture = 'branches.jpg';
    bodyMaterial.diffuseTexture = new BABYLON.Texture("/dist/textures/" + bodyTexture, this.scene);
    bodyMaterial.diffuseColor = new BABYLON.Color3(0.7,0.7,0.7);
    bodyMaterial.ambientColor = new BABYLON.Color3(0,0,0);
    bodyMaterial.emissiveColor = new BABYLON.Color3(0.4,0.4,0.4);
    bodyMaterial.specularColor = new BABYLON.Color3(0,0,0);
    const bodyBumpMap = 'branches_bmpmp.jpg';
    bodyMaterial.bumpTexture = new BABYLON.Texture("/dist/textures/" + bodyBumpMap, this.scene);
    body.material = bodyMaterial;

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
