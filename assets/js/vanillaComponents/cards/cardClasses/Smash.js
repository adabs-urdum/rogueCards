import Card from '../Card.js';

class Smash extends Card{

  constructor(){
    super();

    this.name = 'Smash';
    this.attack = 7;
    this.description = 'Deal <span class="redHealth">' + this.attack + '</span> damage.';
    this.block = 0;
    this.cost = 1;
  }

}

export default Smash;
