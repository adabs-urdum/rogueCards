import Hero from './../Hero.js';

class RichardB extends Hero{
  constructor(one, two){
    super();
    this.name = 'Richard B.';
    this.description = '"Where the hell\'s your God now?" -- Richard B. Riddick';
    this.maxHealth = 20;
    this.health = this.maxHealth;
    this.strength = 3;
    this.block = 0;
    this.maxAp = 3;
    this.ap = this.maxAp;
  }
}

export default RichardB;
