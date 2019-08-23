import CountUp from 'react-countup';
import React, { Component, Fragment } from 'react';
import RichardB from '../vanillaComponents/character/characterClasses/heroes/RichardB.js';
import Xenomorph from '../vanillaComponents/character/characterClasses/monsters/Xenomorph.js';
import Character from '../reactComponents/Character.js';
import Header from '../reactComponents/Header.js';
import CardSet from '../reactComponents/cardset/CardSet.js';
import Arena from '../reactComponents/Arena.js';
import Message from '../reactComponents/uiElements/Message.js';
import Button from '../reactComponents/uiElements/Button.js';
import Info from '../reactComponents/Info.js';

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
      'startedTurn': true,
      'message': null,
      'showMessage': false,
      'messageRef': React.createRef(),
      'messageDuration': 700,
      'flashAP': false,
      'flashEndTurn': false,
      'scaleEndTurnButton': false,
      'gameOver': false,
      'showInfo': false,
    }

  }

  componentDidMount = () => {
    window.setTimeout(()=>{
      this.flashMessage('Round ' + this.state.turn, 700);
    }, 500);
  }

  componentDidUpdate = () => {

    const hero = this.state.hero;
    const monster = this.state.monster;
    const flashAP = this.state.flashAP;
    const flashEndTurn = this.state.flashEndTurn;
    const startedTurn = this.state.startedTurn;
    const scaleEndTurnButton = this.state.scaleEndTurnButton;
    const flashNextAttack = this.state.flashNextAttack;

    if(flashEndTurn == true){
      window.setTimeout(() => {
        this.setState({
          flashEndTurn: false
        });
      }, 300);
    }

    if(flashAP == true){
      window.setTimeout(() => {
        this.setState({
          flashAP: false
        });
      }, 300);
    }

    if(flashNextAttack == true){
      window.setTimeout(() => {
        this.setState({
          flashNextAttack: false
        });
      }, 1000);
    }

    if(scaleEndTurnButton == true){
      window.setTimeout(() => {
        this.setState({
          scaleEndTurnButton: false
        });
      }, 300);
    }

    if(startedTurn == true){
      window.setTimeout(() => {
        this.setState({
          startedTurn: false
        });
      }, 1000);
    }

    if(monster.healthChanged == true){
      window.setTimeout(() => {
        monster.healthChanged = false;
        this.setState({
          monster: monster
        });
      }, 300);
    }

    if(monster.blockChanged == true){
      window.setTimeout(() => {
        monster.blockChanged = false;
        this.setState({
          monster: monster
        });
      }, 300);
    }

    if(hero.healthChanged == true){
      window.setTimeout(() => {
        hero.healthChanged = false;
        this.setState({
          hero: hero
        });
      }, 300);
    }

    if(hero.blockChanged == true){
      window.setTimeout(() => {
        hero.blockChanged = false;
        this.setState({
          hero: hero
        });
      }, 300);
    }

  }

  flashMessage = (message, duration) => {
    const self = this;
    this.setState({
      'showMessage': true,
      'message': message,
      'messageDuration': duration,
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
      this.flashMessage('Not enough action points.', 700);
      this.setState({
        'flashEndTurn': true,
        'flashAP': true,
        'scaleEndTurnButton': true,
      });
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

    if(monster.isDead){
      console.log('game over');
      console.log('you won');
      this.flashMessage('He dead. You won.', 4000);
      window.setTimeout(()=>{
        this.setState({
          'gameOver': true,
        });
      }, 4000);
    }

    this.setState({
      'deck': deck,
      'flashAP': true,
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
      this.flashMessage('Enemie\'s turn', 700);
      setTimeout(() => {

        window.setTimeout(() => {
          this.monsterAttack(monster, hero, monster.nextAttack);
        }, 400);

        this.setState({
          'flashNextAttack': true,
        });
      }, this.state.messageDuration);
    });

    if(hero.isDead){
      console.log('game over');
      console.log('you lose');
      this.setState({
        'gameOver': true,
      });
    }
    if(monster.isDead){
      console.log('game over');
      console.log('you won');
      this.setState({
        'gameOver': true,
      });
    }
  }

  monsterAttack = () => {
    const monster = this.state.monster;
    const currentAttack = monster.nextAttack;
    let hero = this.state.hero;
    const turn = this.state.turn;

    hero.takeDamage(monster, currentAttack.attack);

    if(hero.isDead){
      console.log('game over');
      console.log('you lose');
      hero.die();
      this.flashMessage('You dead. He won.', 4000);
      window.setTimeout(()=>{
        this.setState({
          'gameOver': true,
        });
      }, 4000);
      return;
    }
    if(monster.isDead){
      monster.die();
      this.flashMessage('He dead. You won.', 4000);
      window.setTimeout(()=>{
        this.setState({
          'gameOver': true,
        });
      }, 4000);
    }

    monster.gainBlock(currentAttack.block);

    monster.getNextAttack();

    this.setState({
      hero: hero,
      monster: monster,
      turn: turn + 1,
    }, () => {
      window.setTimeout(()=>{
        this.startedTurn();
      }, 1000);
    } );
  }

  startedTurn = () => {
    this.flashMessage('Round ' + this.state.turn, 700);

    const hero = this.state.hero;
    const deck = hero.deck;

    deck.hand = deck.drawCards(deck.handsize);
    hero.deck = deck;

    hero.fillApToMax();

    this.setState({
      endedTurn: false,
      startedTurn: true,
      hero: hero,
      flashAP: true,
    });
  }

  restartGame = () => {
    window.setTimeout(()=>{
      this.flashMessage('Round ' + this.state.turn, 700);
    }, 500);
    this.setState({
      'turn': 1,
      'hero': new RichardB(),
      'monster': new Xenomorph(),
      'gameOver': false,
      'endedTurn': false,
    });
  }

  handleMouseEnterInfoButton = () => {
    this.setState({
      showInfo: true
    });
  }

  handleMouseLeaveInfoButton = () => {
    this.setState({
      showInfo: false
    });
  }

  toggleFullscreen = (e) => {
    if (document.fullscreenEnabled) {
      const inFullscreen = this.state.inFullscreen;
      console.log('fullscreenEnabled');
      if(inFullscreen){
        document.exitFullscreen();
        this.setState({
          'inFullscreen': false,
        });
      }
      else{
        document.documentElement.requestFullscreen();
        this.setState({
          'inFullscreen': true,
        });
      }
    }
    else{
      console.log('not fullscreenEnabled');
    }
  }

  render(){

    const hero = this.state.hero;
    const ap = hero.ap;
    const oldAP = hero.oldAP;
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
    const startedTurn = this.state.startedTurn;

    const message = this.state.message;
    const showMessage = this.state.showMessage;
    const messageDuration = this.state.messageDuration;

    const flashAP = this.state.flashAP;
    const flashEndTurn = this.state.flashEndTurn;

    const scaleEndTurnButton = this.state.scaleEndTurnButton;

    const toggleFullscreen = this.toggleFullscreen;

    const showInfo = this.state.showInfo;
    const mouseLeaveInfoButton = this.handleMouseLeaveInfoButton;
    const mouseEnterInfoButton = this.handleMouseEnterInfoButton;

    const flashNextAttack = this.state.flashNextAttack;

    const gameOver = this.state.gameOver;

    const gameLoop = (
      <section className="gameloop">

        <Message
          duration={ messageDuration }
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
            BS={ BS }
          />
          <Character
            character={ monster }
            containerClass="characters__character characters__character--monster"
            nextAttack={ monster.nextAttack }
            BS={ BS }
            flashNextAttack={ flashNextAttack }
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
          oldAP={ oldAP }
          maxAp={ maxAp }
          flashAP={ flashAP }
          flashEndTurn={ flashEndTurn }
          scaleEndTurnButton={ scaleEndTurnButton }
          startedTurn={ startedTurn }
        />

      </section>
    );

    return (
      <Fragment>

        <Header
          toggleFullscreen={ toggleFullscreen }
          mouseLeaveInfoButton={ mouseLeaveInfoButton }
          mouseEnterInfoButton={ mouseEnterInfoButton }
        />

      { showInfo ? <Info /> : null }

        { gameOver ? <Fragment>
          <div className="gameOver">
            <h1>{ 'rogueCards alpha v0.0.1' }</h1>
            <a target="_blank" style={{ 'pointerEvents': 'all', 'zIndex': 100, 'position': 'relative' }} href="https://cyrill-lehmann.ch">www.cyrill-lehmann.ch</a>
            <Button
              onclick={ this.restartGame }
              text="again"
              disabled={ !gameOver }
            />
          </div>
        </Fragment> : gameLoop }


      </Fragment>
    );

  }
}

export default App;
