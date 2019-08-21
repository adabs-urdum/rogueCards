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

  gainBlock = (block) => {
    this.block += block;
  }

  dealDamage = (defender, attack) => {

    if(attack){

      if(defender.block - attack > 0){
        defender.block -= attack;
      }
      else{
        defender.health = defender.health + defender.block - attack;
        defender.block = 0;
      }

    }

    return defender.health;

  }

}

export default Character;
