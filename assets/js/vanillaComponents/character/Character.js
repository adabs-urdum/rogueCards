import Deck from './../cards/Deck.js';

class Character{

  constructor(){
    this.name = '';
    this.description = '';
    this.health = 0;
    this.strength = 0;

    // flag to set game end
    this.isDead = false;

    // flag to know whether to "animate" a stat change
    this.blockChanged = false;
  }

  newDeck = (cards, handsize, decksize) => {
    return new Deck(cards, handsize, decksize);
  }

  gainBlock = (block) => {
    this.block += block;
  }

  reduceAp = (affected, amount) => {

  }

  dealDamage = (defender, attack) => {

    if(attack){

      if(defender.block - attack > 0){
        defender.block -= attack;
        defender.blockChanged = true;
      }
      else{
        defender.health = defender.health + defender.block - attack;
        defender.block = 0;
        defender.blockChanged = true;
        defender.healthChanged = true;
      }

    }

    if(defender.health <= 0){
      defender.isDead = true;
    }

    return defender.health;

  }

}

export default Character;
