import Character from './../Character.js';
import Smash from './../../cards/cardClasses/Smash.js'
import Block from './../../cards/cardClasses/Block.js'

class Hero extends Character{

  constructor(){
    super();

    const handsize = 5;
    const decksize = 15;

    this.maxAp = 3;

    const cards = [
        Smash,
        Block,
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
