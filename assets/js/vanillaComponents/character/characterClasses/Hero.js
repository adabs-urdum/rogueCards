import Character from './../Character.js';
import Smash from './../../cards/cardClasses/Smash.js'
import Block from './../../cards/cardClasses/Block.js'

class Hero extends Character{
  constructor(){
    super();

    const handsize = 10;
    const decksize = 15;

    const cards = [
        Smash,
        Block,
    ];

    // inherited from Character.js
    this.deck = this.newDeck(cards, handsize, decksize);

  }


}

export default Hero;
