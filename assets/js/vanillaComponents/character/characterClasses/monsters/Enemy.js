import Monster from '../Monster.js';

class Xenomorph extends Monster{
  constructor(){
    super();
    this.name = 'Enemy';
    this.description = '';
    this.maxHealth = 20;
    this.health = this.maxHealth;
    this.strength = 0;
    this.block = 10;
    this.attacks = [
      {
        attack: 11,
        block: 11,
      },
      {
        attack: 2,
        block: 6,
      },
      {
        attack: 8,
        block: 2,
      },
      {
        attack: 10,
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
