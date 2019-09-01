class Deck{

  constructor(allCards, handsize, decksize){
    this.handsize = handsize;
    this.allCards = allCards;
    this.decksize = decksize;
    this.deck = this.getNewCards(decksize);
    this.drawPile = [...this.deck];
    this.drawPileBefore = [];
    this.hand = [];
    this.handBefore = [];
    this.discardPile = [];
    this.discardPileBefore = [];
    this.banishPile = [];
    this.banishPileBefore = [];
    this.playedCards = [];
  }

  addToDeck = (card) => {
    this.deck.unshift(card);
    this.decksize += 1;
    this.drawPile = this.deck;
    this.drawPileBefore = this.drawPile;
  }

  removeCardFromDeck = (card) => {
    this.deck = this.deck.filter(loopCard => {
      return loopCard.id != card.id;
    });
    this.decksize -= 1;
    this.drawPile = this.deck;
    this.drawPileBefore = this.drawPile;
    return this.deck;
  }

  resetBattle = () => {
    this.drawPileBefore = [...this.drawPile];
    this.drawPile = [...this.deck];
    this.drawPile.shuffle();
    this.hand = [];
    this.handBefore = [];
    this.discardPile = [];
    this.discardPileBefore = [];
    this.banishPile = [];
    this.banishPileBefore = [];
    this.playedCards = [];
  }

  drawCards = (amount) => {

    let cards = [];

    if(this.discardPile.length == 0 && this.drawPile.length == 0){
      return [];
    }

    if(amount > this.drawPile.length){
      const leftOvers = amount - this.drawPile.length;
      cards = cards.concat(this.drawPile.splice(0, this.drawPile.length));
      this.shuffleDiscardIntoDraw();
      cards = cards.concat(this.drawCards(leftOvers));
    }
    else{
      cards = cards.concat(this.drawPile.splice(0, amount));

    }

    return cards;

  }

  shuffleDiscardIntoDraw = () => {
    const discard = this.discardPile;
    this.drawPileBefore = this.drawPile;
    this.drawPile = discard.shuffle();
    this.discardPileBefore = this.discardPile;
    this.discardPile = [];
    return;
  }

  getNewCards = (decksize) => {
    const returnList = [];
    let cardCount = 0;

    while(cardCount < decksize){

      let card = null;
      const getCard = () => {
        const Card = this.allCards.getRandomValue();
        const card = new Card();

        if(Math.random() <= card.chance){
          return card;
        }

        return null;

      }

      while(card == null){
        card = getCard();
      }

      returnList.push(card);
      cardCount += 1;

    }

    return returnList;

  }

  shuffle = (cards) => {
    return cards.shuffle();
  }

}

export default Deck;
