import CountUp from 'react-countup';
import React, { Component, Fragment } from 'react';
import Hero from '../vanillaComponents/character/characterClasses/heroes/Hero.js';
import Enemy from '../vanillaComponents/character/characterClasses/monsters/Enemy.js';
import Character from '../reactComponents/Character.js';
import Header from '../reactComponents/Header.js';
import CardSet from '../reactComponents/cardset/CardSet.js';
import Arena from '../reactComponents/Arena.js';
import Message from '../reactComponents/uiElements/Message.js';
import Button from '../reactComponents/uiElements/Button.js';
import Info from '../reactComponents/Info.js';
import Animation from '../babylonComponents/Animation.js';
import { TimelineLite, CSSPlugin, AttrPlugin }  from "gsap/all";

const DEBUG = true;

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      BS: 100 / 2560,
      startScreen: true,
      battleScreen: false,
    }

    if(DEBUG){
      console.log('constructor()');
      this.state = {
        BS: 100 / 2560,
        startScreen: false,
        battleScreen: true,
      }
    }

  }

  componentDidMount = () => {

    if(DEBUG){
      console.log('componentDidMount()');
      this.startBattle();
    }

    // const plugins = [ CSSPlugin, AttrPlugin ];
    // var tl = new TimelineLite();
    //
    // tl.fromTo("#gameOverTitle", 1, {
    //   x:-200,
    //   opacity:0,
    // }, {
    //   x:0,
    //   opacity:1,
    //   onComplete: () => {
    //     console.log('onComplete');
    //   }
    // });
  }

  startBattle = () => {
    console.log('this.startBattle()');

    this.setState({
      'turn': 1,
      'hero': new Hero(),
      'monster': new Enemy(),
      'animation':  new Animation(),
      'hoveredCard': null,
      'cardWidth': 300,
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
      'battleStarted': true,
      'startScreen': false,
      'battleScreen': true,
    }, () => {

      const animation = this.state.animation;

      this.startedTurn();

      animation.createHeroFighters(10);
    });
  }

  componentDidUpdate = () => {

    if(DEBUG){
      console.log('componentDidUpdate()');
    }

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
      }, 500);
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

    const gameOver = this.state.gameOver;
    if(gameOver){
      this.setState({
        startScreen: true,
        battleScreen: false,
        gameOver: false,
      });
    }

  }

  flashMessage = (message, duration) => {

    if(DEBUG){
      console.log('this.flashMessage()');
    }

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

    if(DEBUG){
      console.log('this.handleMouseEnterCard()');
    }

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

    if(DEBUG){
      console.log('this.handleMouseLeaveCard()');
    }

    const card = e.currentTarget;

    this.setState({
      'hoveredCard': null,
    });
  }

  // handle click on card, now play card
  handleClickCard = (e, id) => {

    if(DEBUG){
      console.log('this.handleClickCard()');
    }

    const card = e.currentTarget;
    let hero = this.state.hero;
    let monster = this.state.monster;
    const deck = hero.deck;
    const hand = deck.hand;
    const discardPile = deck.discardPile;
    const animation = this.state.animation;

    const cardObject = hand.find(handCard => {
      return handCard.id == card.dataset.key;
    });

    const availableAP = hero.ap;
    const cardCostAP = cardObject.cost;

    if( availableAP < cardCostAP ){
      this.flashMessage('Not enough action points.', 700);
      this.setState({
        'flashAP': true,
      });
      if(availableAP == 0){
        this.setState({
          'flashEndTurn': true,
          'scaleEndTurnButton': true,
        });
      }
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
    [hero, monster] = cardObject.playCard(hero, monster, animation);

    this.animateShieldIfBlockChanged();

    if(monster.isDead){
      this.flashMessage('He dead. You won.', 2000);
      window.setTimeout(()=>{
        this.setState({
          'gameOver': true,
        });
      }, 2000);
    }

    this.setState({
      'deck': deck,
      'flashAP': true,
      'hero': hero,
      'monster': monster,
    });
  }

  animateShieldIfBlockChanged = () => {

    if(DEBUG){
      console.log('this.animateShieldIfBlockChanged()');
    }

    const hero = this.state.hero;
    const monster = this.state.monster;
    const animation = this.state.animation;

    if(hero.blockChanged){
      console.log('hero.blockChanged');
      animation.animateShield(hero.blockBefore, hero.block, animation.heroShield);
      console.log(animation.heroShield);
    }
    if(monster.blockChanged){
      console.log('monster.blockChanged');
      animation.animateShield(monster.blockBefore, monster.block, animation.monsterShield);
      console.log(animation.monsterShield);
    }
  }

  endTurn = () => {

    if(DEBUG){
      console.log('this.endTurn()');
    }

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

    if(DEBUG){
      console.log('this.monsterAttack()');
    }

    const monster = this.state.monster;
    const currentAttack = monster.nextAttack;
    let hero = this.state.hero;
    const turn = this.state.turn;
    const animation = this.state.animation;

    hero.takeDamage(monster, currentAttack.attack);

    if(hero.isDead){
      console.log('game over');
      console.log('you lose');
      hero.die();
      this.flashMessage('You dead. He won.', 2000);
      window.setTimeout(()=>{
        this.setState({
          'gameOver': true,
        });
      }, 2000);
      return;
    }
    if(monster.isDead){
      monster.die();
      this.flashMessage('He dead. You won.', 2000);
      window.setTimeout(()=>{
        this.setState({
          'gameOver': true,
        });
      }, 2000);
    }

    monster.gainBlock(currentAttack.block);
    this.animateShieldIfBlockChanged();

    window.setTimeout(()=>{
      monster.getNextAttack();
    }, 1000);

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

    if(DEBUG){
      console.log('this.startedTurn()');
    }

    this.flashMessage('Round ' + this.state.turn, 700);

    const hero = this.state.hero;
    const deck = hero.deck;

    deck.hand = deck.drawCards(deck.handsize);
    hero.deck = deck;

    hero.fillApToMax();

    const turn = this.state.turn;

    this.setState({
      turn: turn + 1,
      endedTurn: false,
      hero: hero,
      flashAP: true,
    });
  }

  restartGame = () => {

    if(DEBUG){
      console.log('this.restartGame()');
    }

    this.startBattle();

    // window.setTimeout(()=>{
    //   this.flashMessage('Round ' + this.state.turn, 700);
    // }, 500);
    // this.setState({
    //   'turn': 1,
    //   'hero': new Hero(),
    //   'monster': new Enemy(),
    //   'gameOver': false,
    //   'endedTurn': false,
    //   'startedTurn': true
    // });
  }

  handleMouseEnterInfoButton = () => {

    if(DEBUG){
      console.log('handleMouseEnterInfoButton()');
    }

    this.setState({
      showInfo: true
    });
  }

  handleMouseLeaveInfoButton = () => {

    if(DEBUG){
      console.log('this.handleMouseLeaveInfoButton()');
    }

    this.setState({
      showInfo: false
    });
  }

  getGameLoop = () => {

    if(DEBUG){
      console.log('this.getGameLoop()');
    }

    const hero = this.state.hero;
    const ap = hero.ap;
    const oldAP = hero.oldAP;
    const maxAp = hero.maxAp;
    const monster = this.state.monster;
    const cardWidth = this.state.cardWidth;
    const handWidth = this.state.handWidth;
    const hoveredCard = this.state.hoveredCard;

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

    const flashNextAttack = this.state.flashNextAttack;

    const showInfo = this.state.showInfo;

    const BS = this.state.BS;

    const gameLoop = (
      <section className="gameloop">

        { showInfo ? <Info /> : null }

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

    return gameLoop;
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

    if(DEBUG){
      console.log('render()');
    }

    const BS = this.state.BS;

    const startScreen = this.state.startScreen;

    const showInfo = this.state.showInfo;

    const toggleFullscreen = this.toggleFullscreen;
    const mouseLeaveInfoButton = this.handleMouseLeaveInfoButton;
    const mouseEnterInfoButton = this.handleMouseEnterInfoButton;

    const header = (
      <Header
        toggleFullscreen={ toggleFullscreen }
        mouseLeaveInfoButton={ mouseLeaveInfoButton }
        mouseEnterInfoButton={ mouseEnterInfoButton }
      />
    );

    let gameLoop = null;
    if(this.state.battleStarted){
      gameLoop = this.getGameLoop();
    }

    return (
      <Fragment>

        { header }

        { startScreen ? <Fragment>
          <div className="gameOver">
            <h1 id="gameOverTitle">{ 'rogueCards alpha v0.0.2' }</h1>
            <p>attempt to build a rogue like/light card deck builder<br/>using react and a yet to be chosen graphics/game engine</p>
            <a target="_blank" style={{ 'pointerEvents': 'all', 'zIndex': 100, 'position': 'relative' }} href="https://cyrill-lehmann.ch">cyrill-lehmann.ch</a>
            <a target="_blank" style={{ 'pointerEvents': 'all', 'zIndex': 100, 'position': 'relative' }} href="https://github.com/adabs-urdum/rogueCards">github.com/adabs-urdum/rogueCards</a>
            <Button
              onclick={ this.restartGame }
              text="Play"
              disabled={ !startScreen }
            />
          </div>
        </Fragment> : gameLoop }

        <canvas id="animation" className="animation" />

      </Fragment>
    );

  }
}

export default App;
