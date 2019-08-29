import Card from '../Card.js';

class AP extends Card{

  constructor(){
    super();

    this.name = 'AP';
    this.attack = 0;
    this.block = 0;
    this.ap = 2;
    this.cost = 1;
    this.draw = 1;
    this.description = 'Gain <span class="">' + this.ap + '</span> AP and draw <span class="">1</span> card.';
  }

}

export default AP;
