class Deck{

  constructor(allCards, handsize, decksize){
    this.handsize = handsize;
    this.allCards = allCards;
    this.decksize = decksize;
    this.deck = this.getNewDeck(decksize);
    this.drawPile = [...this.deck];
    this.hand = this.drawCards(handsize);
    this.discardPile = [];
    this.banishPile = [];
    this.playedCards = [];
  }

  drawCards = (handsize) => {

    let cards = [];

    if(handsize > this.drawPile.length){
      const leftOvers = handsize - this.drawPile.length;
      cards = cards.concat(this.drawPile.splice(0, this.drawPile.length));
      this.shuffleDiscardIntoDraw();
      cards = cards.concat(this.drawCards(leftOvers));
    }
    else{
      cards = cards.concat(this.drawPile.splice(0, handsize));

    }

    return cards;
    
  }

  shuffleDiscardIntoDraw = () => {
    const discard = this.discardPile;
    this.drawPile = discard.shuffle();
    this.discardPile = [];
    return;
  }

  getNewDeck = (decksize) => {
    const returnList = [];
    let cardCount = 0;

    while(cardCount < decksize){
      const Card = this.allCards.getRandomValue();
      returnList.push(new Card());
      cardCount += 1;
    }

    return returnList;

  }

  shuffle = (cards) => {
    return cards.shuffle();
  }

}

export default Deck;
