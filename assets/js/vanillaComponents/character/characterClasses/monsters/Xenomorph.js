import Monster from '../Monster.js';

class Xenomorph extends Monster{
  constructor(){
    super();
    this.name = 'Xenomorph';
    this.description = '';
    this.health = 125;
    this.strength = 0;
    this.block = 0;
    this.attacks = [
      {
        attack: 11,
        block: 4,
      },
      {
        attack: 3,
        block: 10,
      }
    ];
    this.nextAttack = this.getNewRandomAttack();
  }

  getNewRandomAttack = () => {
    return this.attacks.getRandomValue();
  }
}

export default Xenomorph;
