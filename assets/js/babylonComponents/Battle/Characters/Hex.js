import Character from './../Character.js';

class Hex extends Character{
    constructor(){
        super();
        this.monsterJunctions = [];
        this.branches = [];
    }

    createMainBody = (mainPivot, scene, currentStar) => {

        const monsterMaterial = new BABYLON.StandardMaterial("monsterMaterial", scene);
        const materialTexture = 'flesh.jpg';
        monsterMaterial.diffuseTexture = new BABYLON.Texture("/dist/textures/" + materialTexture, scene);
        monsterMaterial.diffuseColor = new BABYLON.Color3(1,1,1);
        monsterMaterial.ambientColor = new BABYLON.Color3(1,1,1);
        monsterMaterial.emissiveColor = new BABYLON.Color3(0,0,0);
        monsterMaterial.specularColor = new BABYLON.Color3(0,0,0);
        monsterMaterial.roughness = 0;

        currentStar.material.alpha = 0;

        //Create lathe
        const monsterBody = BABYLON.MeshBuilder.CreatePolyhedron("monsterBody", {
            type: 4,
            size: 0.15,
        }, scene);
        monsterBody.material = monsterMaterial;
        monsterBody.parent = currentStar;
        monsterBody.position.y = 0.42;

        // const renderLoop = scene.registerAfterRender(() => {
        //     currentStar.rotation.y += Math.PI / 180 * 0.1;
        // });
        // scene.unregisterAfterRender(renderLoop);

        const depth = 8;
        this.createBranches(depth, 1, currentStar, 1, monsterMaterial, scene);

        const endFrame = 30;
        let key = 1;
        this.branches.map(branch => {
        const animationBox = new BABYLON.Animation("rotateToZero", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        const keys = [
            {
                frame: 0,
                value: branch.rotation.z
            },
            {
                frame: endFrame,
                value: key % 2 ? Math.PI / 180 * 60 : Math.PI / 180 * -60,
            }
        ];
        animationBox.setKeys(keys);

        const animationBox2 = new BABYLON.Animation("rotateToZero", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        const keys2 = [
            {
                frame: 0,
                value: branch.rotation.x
            },
            {
                frame: endFrame,
                value: key % 2 ? Math.PI / 180 * -60 : Math.PI / 180 * 60,
            }
        ];
        animationBox2.setKeys(keys2);

        branch.animations = [];
        branch.animations.push(animationBox, animationBox2);

        // window.setTimeout(() => {
        //     scene.beginAnimation(branch, 0, endFrame, true);
        // }, 100);

        key += 1;
        });

        this.monsterJunctions.map(junction => {
            const animationBox = new BABYLON.Animation("rotateToZero", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
            const keys = [
                {
                    frame: 0,
                    value: junction.rotation.y,
                },
                {
                    frame: endFrame,
                    value: Math.PI / 180 * 60,
                }
            ];
            animationBox.setKeys(keys);

            junction.animations = [];
            junction.animations.push(animationBox);

            // window.setTimeout(() => {
            //     scene.beginAnimation(junction, 0, endFrame, true);
            // }, 100);
        });

    }

}

export default Hex;