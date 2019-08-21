import Hero from './../Hero.js';

class RichardB extends Hero{
  constructor(one, two){
    super();
    this.name = 'Richard B.';
    this.description = '"Where the hell\'s your God now?" -- Richard B. Riddick';
    this.health = 101;
    this.strength = 3;
    this.block = 0;
  }
}

export default RichardB;
