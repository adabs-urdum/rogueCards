import Character from './../Character.js';

class Monster extends Character{
  constructor(){
    super();
  }

  getNextAttack(){
    console.log(this);
    this.nextAttack = this.attacks.getRandomValue();
  }


}

export default Monster;
