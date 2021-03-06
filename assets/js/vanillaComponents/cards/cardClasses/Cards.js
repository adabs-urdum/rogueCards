import Card from '../Card.js';

class Cards extends Card{

  constructor(){
    super();

    this.name = 'Cards';
    this.attack = 0;
    this.block = 0;
    this.ap = 1;
    this.cost = 1;
    this.draw = 2;
    this.chance = 0.2;
    this.description = 'Draw <span class="">' + this.draw + '</span> cards and gain <span class="yellowAP">' + this.ap + '</span> AP.';
  }

}

export default Cards;
