import Character from './../Character.js';

class Monster extends Character{
  constructor(){
    super();

    this.baDiameter = Math.random() + 0.2 * 1.4;
    this.baSegments = 32;
    this.baMainPosition = [-2.5,0.5,0];

  }

  getNextAttack(){
    this.nextAttack = this.attacks.getRandomValue();
  }


}

export default Monster;
