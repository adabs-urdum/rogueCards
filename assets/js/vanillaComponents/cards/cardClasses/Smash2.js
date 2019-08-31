import Card from '../Card.js';

class Smash extends Card{

  constructor(){
    super();

    this.name = 'Smash 2';
    this.attack = 14;
    this.block = 1;
    this.description = 'Deal <span class="redHealth">' + this.attack + '</span> damage<br>and gain <span class="blueBlock">' + this.block + '</span> block.';
    this.cost = 2;
    this.chance = 0.4;
  }

}

export default Smash;
