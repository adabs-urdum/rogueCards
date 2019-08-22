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
    this.healthChanged = false;
  }

  newDeck = (cards, handsize, decksize) => {
    return new Deck(cards, handsize, decksize);
  }

  gainBlock = (block) => {
    this.block += block;
    this.blockChanged = true;
  }

  reduceAp = (affected, amount) => {

  }

  die = () => {
    console.log(this.name + ' is dead, mate');
  }

  takeDamage = (offender, attack) => {

    let block = this.block;
    let remainingBlock = block - attack;

    if(remainingBlock >= 0){
      this.block = remainingBlock;
      this.blockChanged = true;
    }
    else if(remainingBlock < 0){
      this.block = 0;
      this.health += remainingBlock;
      this.healthChanged = true;
    }

    if(this.health <= 0){
      this.isDead = true;
      this.health = 0;
    }

  }

}

export default Character;
