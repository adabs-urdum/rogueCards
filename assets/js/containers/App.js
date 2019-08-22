import React, { Component, Fragment } from 'react';
import RichardB from '../vanillaComponents/character/characterClasses/heroes/RichardB.js';
import Xenomorph from '../vanillaComponents/character/characterClasses/monsters/Xenomorph.js';
import Character from '../reactComponents/Character.js';
import CardSet from '../reactComponents/cardset/CardSet.js';
import Arena from '../reactComponents/Arena.js';
import Message from '../reactComponents/uiElements/Message.js';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      'turn': 1,
      'hero': new RichardB(),
      'monster': new Xenomorph(),
      'hoveredCard': null,
      'cardWidth': 300,
      'BS': 100 / 2560,
      'handWidth': 1600,
      'endedTurn': false,
      'message': null,
      'messageDuration': 900,
      'showMessage': false,
    }

  }

  componentDidMount = () => {
    this.flashMessage('turn' + this.state.turn);
  }

  flashMessage = (message) => {
    const duration = this.state.messageDuration;
    const self = this;
    this.setState({
      'showMessage': true,
      'message': message,
    });

    setTimeout( () => {
      this.setState({
        'showMessage': false,
        'message': '',
      });
    }, duration);
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

    const availableAP = hero.ap;
    const cardCostAP = cardObject.cost;

    if( availableAP < cardCostAP ){
      this.flashMessage('Not enough ActionPoints.');
      return null;
    }

    const clickedCardIndex = hand.indexOf(cardObject);

    // add card to playedCards
    const playedCard = deck.hand[clickedCardIndex];
    deck.playedCards.push(playedCard);

    // remove played card from hand
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

    // remove cards from hand and arena after 700ms (after css transition)
    window.setTimeout(() => {
      deck.discardPile = deck.discardPile.concat(hand, playedCards);
      deck.hand = [];
      deck.playedCards = [];
    }, 100);
    hero.deck = deck;

    this.setState({
      hero: hero,
    }, () => {
      this.flashMessage('enemy turn');
      setTimeout(() => {
        this.monsterAttack(monster, hero, monster.nextAttack);
      }, this.state.messageDuration);
    });
  }

  monsterAttack = () => {
    const monster = this.state.monster;
    const currentAttack = monster.nextAttack;
    let hero = this.state.hero;
    const turn = this.state.turn;

    hero.health = monster.dealDamage(hero, currentAttack.attack);
    monster.gainBlock(currentAttack.block);

    monster.getNextAttack();

    this.setState({
      hero: hero,
      monster: monster,
      turn: turn + 1,
    }, () => {
      window.setTimeout(()=>{
        this.newTurn();
      }, 1000);
    } );
  }

  newTurn = () => {
    this.flashMessage('turn ' + this.state.turn);

    const hero = this.state.hero;
    const deck = hero.deck;

    deck.hand = deck.drawCards(deck.handsize);
    hero.deck = deck;

    hero.fillApToMax();

    this.setState({
      endedTurn: false,
      hero: hero,
    });
  }

  render(){

    const hero = this.state.hero;
    const ap = hero.ap;
    const maxAp = hero.maxAp;
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
    const banishPile = deck.banishPile;
    const endedTurn = this.state.endedTurn;
    const message = this.state.message;
    const showMessage = this.state.showMessage;

    return (
      <Fragment>

        <section className="header">
        </section>

        <Message
          duration="0.5"
          message={ message }
          showMessage={ showMessage }
        />

        <Arena
          deck={ deck }
          endedTurn={ endedTurn }
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
          banishPile={ banishPile }
          cardWidth={ cardWidth }
          handWidth={ handWidth }
          BS={ BS }
          handleClickCard={ this.handleClickCard }
          handleMouseEnterCard={ this.handleMouseEnterCard }
          handleMouseLeaveCard={ this.handleMouseLeaveCard }
          hoveredCard={ hoveredCard }
          endTurn={ this.endTurn }
          endedTurn={ endedTurn }
          ap={ ap }
          maxAp={ maxAp }
        />

      </Fragment>
    );

  }
}

export default App;
