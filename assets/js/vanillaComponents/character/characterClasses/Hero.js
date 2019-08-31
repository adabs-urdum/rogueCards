import Character from './../Character.js';
import Smash from './../../cards/cardClasses/Smash.js';
import Smash2 from './../../cards/cardClasses/Smash2.js';
import Block from './../../cards/cardClasses/Block.js';
import Block2 from './../../cards/cardClasses/Block2.js';
import AP from './../../cards/cardClasses/AP.js';
import Cards from './../../cards/cardClasses/Cards.js';

class Hero extends Character{

  constructor(){
    super();

    this.xp = 0;
    this.maxAp = 3;

    this.cards = [
        Smash,
        Smash2,
        Block,
        Block2,
        Cards,
        AP,
    ];

    this.baDiameter = 1;
    this.baSegments = 32;
    this.baMainPosition = [2.5,0.5,0];

  }

  fillApToMax(){
    this.apBefore = this.ap;
    this.ap = this.maxAp;
  }

  getNewDeck = () => {
    this.deck = this.newDeck(this.cards, this.handsize, this.decksize);
  }

}

export default Hero;
