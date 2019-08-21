import Deck from './../cards/Deck.js';

class Character{

  constructor(){
    this.name = '';
    this.description = '';
    this.health = 0;
    this.strength = 0;
  }

  newDeck = (cards, handsize, decksize) => {
    return new Deck(cards, handsize, decksize);
  }

  attack = () => {
    console.log('attack');
  }

}

export default Character;
