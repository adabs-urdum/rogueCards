class Cardset{

  constructor(allCards, handsize, decksize){
    this.handsize = handsize;
    this.allCards = allCards;
    this.decksize = decksize;
    this.deck = this.getNewDeck(allCards, decksize);
    this.drawPile = [...this.deck];
    this.hand = this.drawCards(this.drawPile, handsize);
    this.discardPile = [];
    this.playedCards = [];
  }

  drawCards = (deck, handsize) => {
    return deck.splice(0, handsize);
  }

  getNewDeck = (allCards, decksize) => {
    const returnList = [];
    let cardCount = 0;

    while(cardCount < decksize){
      const Card = allCards.getRandomValue();
      returnList.push(new Card());
      cardCount += 1;
    }

    return returnList;

  }

  shuffle = (cards) => {
    return cards.shuffle();
  }

}

export default Cardset;
