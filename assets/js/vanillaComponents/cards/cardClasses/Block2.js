import Card from '../Card.js';

class Block extends Card{

  constructor(){
    super();

    this.name = 'Block';
    this.attack = 0;
    this.block = 19;
    this.cost = 3;
    this.description = 'Gain <span class="blueBlock">' + this.block + '</span> block.';
  }

}

export default Block;
