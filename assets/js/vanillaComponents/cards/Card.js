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
    const block = this.block;

    if(attack){
      target.health = doer.dealDamage(target, attack);
    }

    if(block){
      doer.gainBlock(block);
    }

    return [doer, target];

  }

}

export default Card;
