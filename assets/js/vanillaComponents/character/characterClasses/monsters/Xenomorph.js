import Monster from '../Monster.js';

class Xenomorph extends Monster{
  constructor(){
    super();
    this.name = 'Monster';
    this.description = '';
    this.maxHealth = 20;
    this.health = this.maxHealth;
    this.strength = 0;
    this.block = 3;
    this.attacks = [
      {
        attack: 11,
        block: 0,
      },
      {
        attack: 2,
        block: 6,
      },
      {
        attack: 4,
        block: 4,
      }
    ];
    this.nextAttack = this.getNewRandomAttack();
  }

  getNewRandomAttack = () => {
    return this.attacks.getRandomValue();
  }
}

export default Xenomorph;
