import Character from './../Character.js';
import Smash from './../../cards/cardClasses/Smash.js'
import Smash2 from './../../cards/cardClasses/Smash2.js'
import Block from './../../cards/cardClasses/Block.js'
import Block2 from './../../cards/cardClasses/Block2.js'

class Hero extends Character{

  constructor(){
    super();

    this.maxAp = 3;

    this.cards = [
        Smash,
        Smash2,
        Block,
        Block2,
    ];

    this.baDiameter = 1;
    this.baSegments = 32;
    this.baMainPosition = [2.5,0.5,0];

  }

  fillApToMax(){
    this.oldAP = this.ap;
    this.ap = this.maxAp;
  }

  getNewDeck = () => {
    this.deck = this.newDeck(this.cards, this.handsize, this.decksize);
  }

}

export default Hero;
