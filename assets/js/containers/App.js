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
      'endedTurn': false,
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
    const hero = this.state.hero;
    const monster = this.state.monster;
    const deck = hero.deck;
    const hand = deck.hand;
    const discardPile = deck.discardPile;

    const cardObject = hand.find(handCard => {
      return handCard.id == card.dataset.key;
    });

    const clickedCardIndex = hand.indexOf(cardObject);

    // add card to playedCards and get coordinates
    const playedCard = deck.hand[clickedCardIndex];
    deck.playedCards.push(playedCard);

    // remove played card
    deck.hand = deck.hand.filter(card => {
      return card.id != cardObject.id;
    });

    // play actual card stats
    cardObject.playCard(hero, monster);

    this.setState({
      'deck': deck,
    });
  }

  endTurn = () => {
    const hero = this.state.hero;
    const deck = hero.deck;
    const playedCards = deck.playedCards;
    const hand = deck.hand;
    const monster = this.state.monster;

    // disable button
    this.setState({
      'endedTurn': true,
    });

    deck.discardPile = deck.discardPile.concat(hand, playedCards);
    deck.hand = [];
    deck.playedCards = [];

    // TODO: reset cards / shuffle / draw / etc.

    this.setState({
      hero: hero,
    }, this.monsterAttack(monster, hero, monster.nextAttack));
  }

  monsterAttack = () => {
    const monster = this.state.monster;
    const currentAttack = monster.nextAttack;
    let hero = this.state.hero;

    hero.health = monster.dealDamage(hero, currentAttack.attack);
    monster.gainBlock(currentAttack.block);

    monster.getNextAttack();

    this.setState({
      hero: hero,
      monster: monster,
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
    const endedTurn = this.state.endedTurn;

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
          endTurn={ this.endTurn }
          endedTurn={ endedTurn }
        />

      </Fragment>
    );

  }
}

export default App;
