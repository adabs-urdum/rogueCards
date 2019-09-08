import Character from './../Character.js';

class Hero extends Character{
    constructor(){
        super();
    }

    createMainBody = (mainPivot, scene) => {

        const hero = BABYLON.MeshBuilder.CreateSphere('hero', {diameter: 0.01}, scene);
        hero.parent = mainPivot;

        const base = BABYLON.MeshBuilder.CreateCylinder("heroPlatform", {height: 0.03, diameterTop: 0.95, diameterBottom: 1, tessellation: 32}, scene);
        base.parent = hero;
        const baseMaterial = new BABYLON.StandardMaterial("baseMaterial", scene);
        const baseTexture = 'body.jpg';
        baseMaterial.diffuseTexture = new BABYLON.Texture("/dist/textures/" + baseTexture, scene);
        baseMaterial.diffuseColor = new BABYLON.Color3(0.3,0.3,0.3);
        baseMaterial.ambientColor = new BABYLON.Color3(0,0,0);
        baseMaterial.emissiveColor = new BABYLON.Color3(0,0,0);
        baseMaterial.specularColor = new BABYLON.Color3(0,0,0);
        const baseBumpMap = 'body_bmpmp.jpg';
        baseMaterial.bumpTexture = new BABYLON.Texture("/dist/textures/" + baseBumpMap, scene);
        baseMaterial.invertNormalMapX = true;
        baseMaterial.invertNormalMapY = true
        base.material = baseMaterial;

        const bob = BABYLON.MeshBuilder.CreateSphere('stem', {
        diameter: 0.4,
        }, scene);
        bob.position = new BABYLON.Vector3(0,0.7,0);
        bob.parent = base;
        const bobMaterial = new BABYLON.StandardMaterial("bobMaterial", scene);
        const materialTexture = 'branches1.jpg';
        bobMaterial.diffuseTexture = new BABYLON.Texture("/dist/textures/" + materialTexture, scene);
        bobMaterial.diffuseColor = new BABYLON.Color3(1,1,1);
        bobMaterial.ambientColor = new BABYLON.Color3(1,1,1);
        bobMaterial.emissiveColor = new BABYLON.Color3(1,1,1);
        bobMaterial.specularColor = new BABYLON.Color3(0,0,0);
        bobMaterial.roughness = 1;
        const materialBumpMap = 'branches1_bmpmp.jpg';
        bobMaterial.bumpTexture = new BABYLON.Texture("/dist/textures/" + materialBumpMap, scene);
        bob.material = bobMaterial;
        this.fighterSource = bob;

        const rotateAnimation = () => {
            bob.rotation.y -= 0.001;
        }
        scene.registerAfterRender(rotateAnimation);

        const stem = BABYLON.MeshBuilder.CreateSphere('stem', {
        diameter: 0.01,
        }, scene);
        stem.position = new BABYLON.Vector3(0,0,0);
        stem.parent = bob;

        const heroLight = new BABYLON.PointLight("heroLight", new BABYLON.Vector3(0, 0, 0), scene);
        heroLight.diffuse = new BABYLON.Color3(1, 1, 1);
        heroLight.specular = new BABYLON.Color3(1, 1, 1);
        heroLight.groundColor = new BABYLON.Color3(1, 1, 1);
        heroLight.intensity = 4;
        heroLight.parent = stem;

        const body = BABYLON.MeshBuilder.CreateSphere("heroBody", {diameter: 1, slice: 0.5}, scene);
        body.parent = hero;
        body.position.y = base.getBoundingInfo().boundingBox.extendSize.y * -1;
        body.rotate(BABYLON.Axis.X, Math.PI, BABYLON.Space.LOCAL);
        const bodyMaterial = new BABYLON.StandardMaterial("bobMaterial", scene);
        const bodyTexture = 'branches.jpg';
        bodyMaterial.diffuseTexture = new BABYLON.Texture("/dist/textures/" + bodyTexture, scene);
        bodyMaterial.diffuseColor = new BABYLON.Color3(0.7,0.7,0.7);
        bodyMaterial.ambientColor = new BABYLON.Color3(0,0,0);
        bodyMaterial.emissiveColor = new BABYLON.Color3(0.4,0.4,0.4);
        bodyMaterial.specularColor = new BABYLON.Color3(0,0,0);
        const bodyBumpMap = 'branches_bmpmp.jpg';
        bodyMaterial.bumpTexture = new BABYLON.Texture("/dist/textures/" + bodyBumpMap, scene);
        body.material = bodyMaterial;

        this.body = hero;
        return hero;

    }

    createFighters = (character, mainPivot, fleet, scene) => {
        let counter = 0;

        while(counter < character.ap){

          // const fighter = BABYLON.Mesh.CreateBox("fighter", 0.03, scene);
          const fighterSize = 0.015;
          const fighter = BABYLON.Mesh.CreateTorus("fighter" + counter, fighterSize, fighterSize, 28, scene, false, BABYLON.Mesh.DEFAULTSIDE);
          const pivot = new BABYLON.TransformNode("fighterPivot_" + counter);

          const fighterMaterial = new BABYLON.StandardMaterial("fighterMaterial_" + counter, scene);

          fighterMaterial.diffuseColor = new BABYLON.Color3(1,1,1);
          fighterMaterial.specularColor = new BABYLON.Color3(1,1,1);
          fighterMaterial.emissiveColor = new BABYLON.Color3(0,0,0);
          fighter.material = fighterMaterial;

          pivot.rotation = new BABYLON.Vector3(Math.PI * Math.random(),Math.PI * (Math.random() - 0.5),0);
          pivot.parent = mainPivot;
          fighter.parent = pivot;
          fighter.position = new BABYLON.Vector3(0.5, 0, 0);

          // const angle = Math.random() * -0.1;
          const angle = -0.05;
          // const angle = (Math.floor(Math.random() * (max - min + 1) + min)) * -0.1;
          // const angle = (Math.floor(Math.random() * (0.5 - 0.01 + 1) + 0.01)) * -1;
          const axis = new BABYLON.Vector3(0,6,0);
          const rotateFactor = 1;
          const rotateAnimation = () => {
            pivot.rotate(axis, angle, BABYLON.Space.WORLD);
            fighter.rotation.x += rotateFactor * 0.005;
            fighter.rotation.y += rotateFactor * 0.005;
            fighter.rotation.z += rotateFactor * 0.005;
          }
          scene.registerAfterRender(rotateAnimation);
          fleet.push({
            fighter: fighter,
            animation: rotateAnimation,
            pivot: pivot,
          });

          counter++;
        }

      }
}

export default Hero;