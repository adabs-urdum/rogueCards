import * as BABYLON from 'babylonjs';

class Character{

  constructor(){
    this.fighterSource = null;
    this.body = null;
  }

  createMainBody = () => {}

  createFighters = () => {}

  createNewBranch = (id, level, parent, branchMaterial, scene) => {
    const junction = new BABYLON.TransformNode('junction_' + id);
    junction.parent = parent;
    junction.position = new BABYLON.Vector3(0,parent.getBoundingInfo().boundingBox.extendSize.y,0);
    junction.addRotation(Math.PI / 180 * (Math.random() - 0.5) * 60, Math.PI / 180 * (Math.random() - 0.5) * 60, 0)

    const junctionRenderLoop = scene.registerAfterRender(() => {
      if(level % 2 > 0){
        junction.addRotation(Math.PI / 180 * 0.8, 0, 0);
      }
      else{
        junction.addRotation(Math.PI / 180 * -0.8, 0, 0);
      }
    });

    const factor = 0.8;

    const junctionBody = BABYLON.MeshBuilder.CreateSphere('hero', {diameter: 0.3 / level * factor}, scene);
    junctionBody.parent = junction;
    junctionBody.material = branchMaterial;
    junctionBody.material.diffuseColor = new BABYLON.Color3(1,0.5,0.5);
    junctionBody.material.ambientColor = new BABYLON.Color3(0.2,0.2,0.2);

    const height = 0.8 / level * factor;
    const diameterTop = 0.2  / level * factor;
    const diameterBottom = 0.3 / level * factor;

    const branch1 = BABYLON.MeshBuilder.CreateCylinder('branch1_' + id, {
      height: height,
      diameterTop: diameterTop,
      diameterBottom: diameterBottom,
      tessellation: 8,
    }, scene);
    branch1.parent = junction;
    branch1.rotation = new BABYLON.Vector3(0, 0, Math.PI/180*60);
    branch1.locallyTranslate(new BABYLON.Vector3(0, branch1.getBoundingInfo().boundingBox.extendSize.y, 0));
    branch1.material = branchMaterial;

    const branch1RenderLoop = scene.registerAfterRender(() => {
      if(level % 2 > 0){
        branch1.addRotation(0, Math.PI / 180 * 0.01, 0);
      }
      else{
        branch1.addRotation(0, Math.PI / 180 * -0.01, 0);
      }
    });

    const branch2 = BABYLON.MeshBuilder.CreateCylinder('branch2_' + id, {
      height: height,
      diameterTop: diameterTop,
      diameterBottom: diameterBottom,
      tessellation: 8,
    }, scene);
    branch2.parent = junction;
    branch2.rotation = new BABYLON.Vector3(0, 0, Math.PI/180*60);
    branch2.locallyTranslate(new BABYLON.Vector3(0, branch2.getBoundingInfo().boundingBox.extendSize.y, 0));
    branch2.material = branchMaterial;

    const branch2RenderLoop = scene.registerAfterRender(() => {
      if(level % 2 > 0){
        branch2.addRotation(0, Math.PI / 180 * 0.15, 0);
      }
      else{
        branch2.addRotation(0, Math.PI / 180 * -0.15, 0);
      }
    });

    this.monsterJunctions.push(junction);
    this.branches.push(branch1, branch2);
    return [junction, branch1, branch2];
  }

  createBranches = (depth, count, parent, level, branchMaterial, scene) => {
    if(level < depth){
      count += 1;
      level += 1;
      let arch = this.createNewBranch(count, level, parent, branchMaterial, scene)
      this.createBranches(depth, count, arch[1], level, branchMaterial, scene);
      count += 1;
      this.createBranches(depth, count, arch[2], level, branchMaterial, scene);
    }
  }

}

export default Character