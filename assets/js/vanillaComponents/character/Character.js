import Deck from './../cards/Deck.js';

class Character{

  constructor(){
    this.xp = 0;
    this.gold = 0;
    this.name = '';
    this.description = '';
    this.health = 0;
    this.apBefore = 0;
    this.healthBefore = 0;
    this.blockBefore = 0;
    this.strength = 0;
    this.recentAttack = 0;
    this.mainColor = {};

    this.fleetSize = 0;
    this.fleet = [];

    // flag to set game end
    this.isDead = false;

    // flag to know whether to "animate" a stat change
    this.blockChanged = false;
    this.healthChanged = false;
    this.mainColor = [Math.random(), Math.random(), Math.random()];
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

  gainAP = (ap) => {
    if(ap){
      this.apBefore = this.ap;
      this.ap += ap;
      this.apChanged = true;
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
