import Monster from '../Monster.js';

class Xenomorph extends Monster{
  constructor(){
    super();
    this.name = 'Enemy';
    this.description = '';
    // this.maxHealth = 20;
    this.maxHealth = Math.floor( Math.random() * 80 );
    this.health = this.maxHealth;
    this.strength = 0;
    this.fleetSize = 10;
    this.block = 0;
    this.mainColor = {
      r: Math.random() + 0.2,
      g: Math.random() + 0.2,
      b: Math.random() + 0.2
    };
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
    const randomAttack = this.attacks.getRandomValue();
    this.recentAttack = randomAttack.attack;

    return randomAttack;
  }
}

export default Xenomorph;
