import React, { Component, Fragment } from 'react';
import RichardB from '../vanillaComponents/character/characterClasses/heroes/RichardB.js';
import Xenomorph from '../vanillaComponents/character/characterClasses/monsters/Xenomorph.js';
import Character from '../reactComponents/Character.js';
import CardSet from '../reactComponents/CardSet.js';
import Arena from '../reactComponents/Arena.js';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      'hero': new RichardB(),
      'monster': new Xenomorph(),
      'hoveredCard': null,
      'cardWidth': 300,
      'BS': 100 / 2560,
      'handWidth': 1600,
    }

  }

  handleMouseEnterCard = (e) => {
    const card = e.currentTarget;
    const deck = this.state.hero.deck;
    const hand = deck.hand;
    const discardPile = deck.discardPile;
    const cardWidth = this.state.cardWidth;
    const BS = this.state.BS;
    const handWidth = this.state.handWidth;

    const target = hand.find(handCard => {
      return handCard.id == card.dataset.key;
    });

    this.setState({
      'hoveredCard': target,
    });

  }

  handleMouseLeaveCard = (e) => {
    const card = e.currentTarget;

    this.setState({
      'hoveredCard': null,
    });
  }

  // handle click on card, now play card
  handleClickCard = (e, id) => {
    const card = e.currentTarget;
    const deck = this.state.hero.deck;
    const hand = deck.hand;
    const discardPile = deck.discardPile;

    const target = hand.find(handCard => {
      return handCard.id == card.dataset.key;
    });

    const clickedCardIndex = hand.indexOf(target);

    // add card to playedCards and get coordinates
    const playedCard = deck.hand[clickedCardIndex];
    // console.log('----start');
    // console.log(card);
    // console.log(playedCard);
    var cardRect = card.getBoundingClientRect();
    // console.log(cardRect.top, cardRect.left);
    // console.log('----end');
    deck.playedCards.push(playedCard);

    // remove played card
    deck.hand = deck.hand.filter(card => {
      return card.id != target.id;
    });

    this.setState({
      'deck': deck,
    });
  }

  render(){

    const hero = this.state.hero;
    const monster = this.state.monster;
    const cardWidth = this.state.cardWidth;
    const handWidth = this.state.handWidth;
    const hoveredCard = this.state.hoveredCard;
    const BS = this.state.BS;
    const deck = hero.deck;
    const drawPile = deck.drawPile;
    const playedCards = deck.playedCards;
    const hand = deck.hand;
    const discardPile = deck.discardPile;

    return (
      <Fragment>

        <section className="header">
        </section>

        <Arena
          deck={ deck }
        />

        <section className="characters">
          <Character
            character={ hero }
            containerClass="characters__character characters__character--hero"
          />
          <Character
            character={ monster }
            containerClass="characters__character characters__character--monster"
            nextAttack={ monster.nextAttack }
          />
        </section>

        <CardSet
          drawPile={ drawPile }
          hand={ hand }
          playedCards={ playedCards }
          discardPile={ discardPile }
          cardWidth={ cardWidth }
          handWidth={ handWidth }
          BS={ BS }
          handleClickCard={ this.handleClickCard }
          handleMouseEnterCard={ this.handleMouseEnterCard }
          handleMouseLeaveCard={ this.handleMouseLeaveCard }
          hoveredCard={ hoveredCard }
        />

      </Fragment>
    );

  }
}

export default App;
