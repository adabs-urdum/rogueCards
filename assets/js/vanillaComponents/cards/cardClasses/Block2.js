import Card from '../Card.js';

class Block extends Card{

  constructor(){
    super();

    this.name = 'Block 2';
    this.attack = 0;
    this.block = 9;
    this.cost = 2;
    this.description = 'Gain <span class="blueBlock">' + this.block + '</span> block.';
  }

}

export default Block;
