import Character from './../Character.js';
import Smash from './../../cards/cardClasses/Smash.js'
import Block from './../../cards/cardClasses/Block.js'
import Block2 from './../../cards/cardClasses/Block2.js'

class Hero extends Character{

  constructor(){
    super();

    const handsize = 4;
    const decksize = 13;

    this.maxAp = 3;

    const cards = [
        Smash,
        Block,
        Block2,
    ];

    // inherited from Character.js
    this.deck = this.newDeck(cards, handsize, decksize);

  }

  fillApToMax(){
    this.oldAP = this.ap;
    this.ap = this.maxAp;
  }

}

export default Hero;
