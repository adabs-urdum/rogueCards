import Card from '../Card.js';

class Smash extends Card{

  constructor(){
    super();

    this.name = 'Smash';
    this.description = 'Smash ipsum dolor sit amet, sectum sempra avada kedavra. Valar morghulis, valar doaheris.';
    this.attack = 7;
    this.block = 0;
    this.cost = 1;
  }

}

export default Smash;
