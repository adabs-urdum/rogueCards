import Card from '../Card.js';

class Block extends Card{

  constructor(){
    super();

    this.name = 'Block';
    this.description = 'Lorem ipsum dolor sit amet, sectum sempra avada kedavra. Valar morghulis, valar doaheris.';
    this.attack = 0;
    this.block = 4;
    this.cost = 1;
  }

}

export default Block;
