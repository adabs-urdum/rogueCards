class Card{
  constructor(){
    this.id = this.guidGenerator();
  }

  guidGenerator = () => {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
  }

  playCard = (doer, target) => {
    const attack = this.attack;
    doer.recentAttack = this.attack;
    const block = this.block;
    const ap = this.ap;
    const draw = this.draw;
    const fleetSize = doer.fleetSize;

    if(attack && doer.fleetSize > 0){
      target.takeDamage(doer, attack);
    }

    if(block){
      doer.gainBlock(block);
    }

    if(ap){
      doer.gainAP(ap);
    }

    if(draw){
      doer.deck.handBefore = [...doer.deck.hand];
      doer.deck.drawPileBefore = [...doer.deck.drawPile];
      doer.deck.hand = doer.deck.hand.concat(doer.deck.drawCards(draw));
    }

    doer.apBefore = doer.ap;
    doer.ap -= this.cost;

    return [doer, target];

  }

}

export default Card;
