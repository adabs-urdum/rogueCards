import Deck from './../cards/Deck.js';

class Character{

  constructor(){
    this.name = '';
    this.description = '';
    this.health = 0;
    this.healthBefore = 0;
    this.blockBefore = 0;
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
    if(block){
      this.blockBefore = this.block;
      this.block += block;
      this.blockChanged = true;
    }
  }

  reduceAp = (affected, amount) => {

  }

  die = () => {
    console.log(this.name + ' is dead, mate');
  }

  takeDamage = (offender, attack) => {
    const block = this.block;
    let remainingBlock = block - attack;

    this.blockBefore = block;
    this.oldHealth = this.health;

    if(remainingBlock >= 0){
      this.block = remainingBlock;
      this.blockChanged = true;
    }
    else if(remainingBlock < 0){
      if(block > 0){
        this.blockChanged = true;
      }
      this.block = 0;
      this.health += remainingBlock;
      this.healthChanged = true;
    }

    if(this.health <= 0){
      this.isDead = true;
      this.health = 0;
    }

    return this;

  }

}

export default Character;
