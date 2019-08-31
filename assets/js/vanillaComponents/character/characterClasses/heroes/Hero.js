import Hero from './../Hero.js';

class RichardB extends Hero{
  constructor(){
    super();
    this.name = 'You';
    this.description = '"Where the hell\'s your God now?" -- Richard B. Riddick';
    this.maxHealth = 20;
    this.health = this.maxHealth;
    this.strength = 3;
    this.block = 0;
    this.maxAp = 3;
    this.fleetSize = 10;
    this.ap = this.maxAp;
    this.handsize = 4;
    this.decksize = 8;
    this.mainColor = {
      r: Math.random() + 0.2,
      g: Math.random() + 0.2,
      b: Math.random() + 0.2
    };

    this.getNewDeck();
  }
}

export default RichardB;
