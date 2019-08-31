import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { TimelineLite, CSSPlugin, AttrPlugin }  from "gsap/all";

// import vanilla models
import Hero from '../../vanillaComponents/character/characterClasses/heroes/Hero.js';
import Enemy from '../../vanillaComponents/character/characterClasses/monsters/Enemy.js';

// import react components
import Character from '../Character.js';
import Message from '../uiElements/Message.js';
import CardSet from '../cardset/CardSet.js';
import Arena from '../Arena.js';
import Info from '../Info.js';

// import babylon components
import Animation from '../../babylonComponents/BattleAnimation.js';


class Battle extends Component{

  constructor(props){
    super(props);

    const BS = props.BS;

    const monster = new Enemy();

    let hero = props.hero;
    if(!hero){
      hero = new Hero();
    }
    hero.deck.resetBattle();

    const timings = {
      beforeTurnStart: 2500,
    }

    this.state = {
      'BS': BS,
      'turn': 0,
      'hero': hero,
      'monster': monster,
      'animation':  null,
      'hoveredCard': null,
      'cardWidth': 300,
      'handWidth': 1600,
      'endedTurn': false,
      'startTurn': true,
      'message': null,
      'showMessage': false,
      'messageRef': React.createRef(),
      'messageDuration': 700,
      'gameOver': false,
      'battleStarted': true,
      'startScreen': false,
      'battleScreen': true,
      'drawnNewCards': false,
      'battleLog': {},
      'returnBattleLog': props.setNewBattleLog,
      'removeHero': props.removeHero,
      'timings': timings,
    };

  }

  checkIfGameOver = () => {

    if(this.state.hero.isDead || this.state.monster.isDead){
      this.state.returnBattleLog(this.state.battleLog);
      this.setState({
        'gameOver': true,
      });
    }

    if(this.state.hero.isDead){
      console.log('game over');
      console.log('you lose');
      this.flashMessage('You dead. He won.', 6000, () => {
        this.state.animation.destroy();
        this.props.history.push({
          pathname: '/character',
          state: { showDeathNote: true }
        });
      });
      return true;
    }
    if(this.state.monster.isDead){
      console.log('game over');
      console.log('you win');
      this.flashMessage('He dead. You won.', 6000, () => {
        this.state.animation.destroy();
        this.props.history.push({
          pathname: '/character',
          state: { showBattleLog: true }
        });
      });
      return true;
    }

    return false;

  }

  componentDidMount = () => {

    const hero = this.state.hero;
    const monster = this.state.monster;

    // if hero not defined, return to startscreen
    if(!hero){
      props.history.push('/');
    }

    const animation = new Animation();

    if(!hero.baBody){
      hero.baBody = animation.createCharacter(hero);
      animation.createFighters(hero);
    }
    animation.hero = hero.baBody;

    if(!hero.baShield){
      hero.baShield = animation.createShield(hero);
    }
    animation.heroShield = hero.baShield;

    if(!monster.baBody){
      monster.baBody = animation.createCharacter(monster);
    }
    animation.monster = monster.baBody;
    animation.createFighters(monster);

    if(!monster.baShield){
      monster.baShield = animation.createShield(monster);
    }
    animation.monsterShield = monster.baShield;

    this.setState({
      'animation':  animation,
      'battleLog': {
        'monster': [monster],
        'hero': [hero],
      }
    }, () => {
      this.startTurn();
    });

  }

  componentDidUpdate = () => {
    const hero = this.state.hero;
    const monster = this.state.monster;
    const startTurn = this.state.startTurn;

    if(startTurn == true){
      window.setTimeout(() => {
        this.setState({
          startTurn: false
        });
      }, 1000);
    }

    if(this.state.drawnNewCards != false){
      window.setTimeout(() => {
        this.setState({
          drawnNewCards: false
        });
      }, 500);
    }

    if(monster){
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
    }

    if(hero){
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

  flashPile = (elementId) => {
    const plugins = [ CSSPlugin, AttrPlugin ];
    const tl = new TimelineLite();
    const totalFlashDuration = 0.5;

    tl.fromTo(
      elementId, totalFlashDuration / 2, {
      display: 'inline-block',
      transform: 'scale(1)',
      transformOrigin: 'center',
    }, {
      display: 'inline-block',
      transform: 'scale(2)',
      transformOrigin: 'center',
    }).to(
      elementId, totalFlashDuration / 2, {
      display: 'inline-block',
      transform: 'scale(1)',
      transformOrigin: 'center',
    });

  }

  animateEndturnButton = () => {
    const plugins = [ CSSPlugin, AttrPlugin ];
    // wiggle animation;
    const tl = new TimelineLite();
    const totalWiggleDuration = 0.3;
    tl.fromTo(
      "#endTurnButton", totalWiggleDuration / 100 * 10, {
      transform: 'translate(-50%, -180%) scale(1) rotate(0deg)'
    }, {
      transform: 'translate(-50%, -180%) scale(1.3) rotate(0deg)',
    }).to(
      "#endTurnButton", totalWiggleDuration / 100 * 15, {
      transform: 'translate(-50%, -180%) scale(1.3) rotate(-10deg)'
      }
    ).to(
      "#endTurnButton", totalWiggleDuration / 100 * 50, {
      transform: 'translate(-50%, -180%) scale(1.3) rotate(10deg)'
      }
    ).to(
      "#endTurnButton", totalWiggleDuration / 100 * 15, {
      transform: 'translate(-50%, -180%) scale(1.3) rotate(0deg)'
      }
    ).to(
      "#endTurnButton", totalWiggleDuration / 100 * 10, {
      transform: 'translate(-50%, -180%) scale(1) rotate(0deg)'
      }
    );
  }

  // handle click on card, now play card
  handleClickCard = (e, id) => {

    const card = e.currentTarget;
    let hero = this.state.hero;
    let monster = this.state.monster;
    const deck = hero.deck;
    deck.handBefore = deck.hand;
    deck.drawPileBefore = deck.drawPile;
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
      this.flashPile('#numberAP');

      if(availableAP == 0){
        this.animateEndturnButton();
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
    [hero, monster] = cardObject.playCard(hero, monster);
    animation.playCard(hero, monster, cardObject);

    if(hero.deck.hand.length == 0){
      this.flashMessage('No more cards to draw.', 1200, () => {
        if(!this.state.endedTurn){
          this.animateEndturnButton();
        }
      });
    }

    const battleLog = this.state.battleLog;
    const battleLogEntryKey = hero.name + '-' + this.state.turn;
    if(!Array.isArray(battleLog[battleLogEntryKey])){
      battleLog[battleLogEntryKey] = [];
    }
    battleLog[battleLogEntryKey].push(cardObject);

    let drawnNewCards = false;
    if(cardObject.draw){
      drawnNewCards = true;
    }

    this.flashPile('#numberAP');

    hero.deck = deck;

    this.setState({
      hero: hero,
      monster: monster,
      drawnNewCards: drawnNewCards,
      battleLog: battleLog,
    },() => {
      this.checkIfGameOver();
    });
  }

  handleClickEndTurn = () => {

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
      deck.discardPileBefore = deck.discardPile;
      deck.discardPile = deck.discardPile.concat(hand, playedCards);
      deck.handBefore = deck.hand;
      deck.hand = [];
      deck.playedCards = [];
    }, 100);
    hero.deck = deck;

    this.setState({
      hero: hero
    }, () => {
      this.flashMessage('Enemie\'s turn', 700);
      setTimeout(() => {

        window.setTimeout(() => {
          this.monsterAttack(monster, hero, monster.nextAttack);
        }, 500);

        const plugins = [ CSSPlugin, AttrPlugin ];
        const tl = new TimelineLite();
        const totalFlashDuration = 1.5;

        tl.fromTo(
          '#MonsterNextAttack', totalFlashDuration / 6, {
          transform: 'translateX(0%) translateY(0%) scale(1)',
        }, {
          transform: 'translateX(-150%) translateY(-150%) scale(1.5)',
        }).to(
          '#MonsterNextAttack', totalFlashDuration / 6 * 4, {
          transform: 'translateX(-150%) translateY(-150%) scale(1.5)',
        }).to(
          '#MonsterNextAttack', totalFlashDuration / 6, {
          transform: 'translateX(0%) translateY(0%) scale(1)',
        });

      }, this.state.messageDuration);
    });

    this.checkIfGameOver();

  }

  startTurn = () => {

    const turn = this.state.turn + 1;
    this.flashMessage('Round ' + turn, 700);

    const hero = this.state.hero;
    const deck = hero.deck;

    deck.handBefore = deck.hand;
    deck.drawPileBefore = deck.drawPile;
    deck.hand = deck.drawCards(deck.handsize);
    const drawnNewCards = true;

    hero.deck = deck;

    hero.fillApToMax();

    const animation = this.state.animation;
    const monster = this.state.monster;
    animation.createFighters(hero);
    animation.createFighters(monster);

    this.flashPile('#numberAP');

    this.setState({
      turn: turn,
      endedTurn: false,
      hero: hero,
      drawnNewCards: drawnNewCards,
    });
  }

  monsterAttack = () => {

    const monster = this.state.monster;
    const currentAttack = monster.nextAttack;
    let hero = this.state.hero;
    const turn = this.state.turn;
    const animation = this.state.animation;

    hero.takeDamage(monster, currentAttack.attack);
    animation.playCard(monster, hero, currentAttack);

    monster.gainBlock(currentAttack.block);
    animation.animateShield(monster.block, currentAttack.block + monster.block, monster.baShield);

    window.setTimeout(()=>{
      monster.getNextAttack();
    }, 1000);

    const battleLog = this.state.battleLog;
    battleLog[monster.name + '-' + this.state.turn] = {
      'move': currentAttack,
    };

    this.setState({
      hero: hero,
      monster: monster,
      battleLog: battleLog,
    }, () => {
      const gameOver = this.checkIfGameOver();
      window.setTimeout(()=>{
        if(!gameOver){
          this.startTurn();
        }
        else{
          this.setState({
            endedTurn: false,
          });
        }
      }, this.state.timings.beforeTurnStart);
    } );
  }

  flashMessage = (message, duration, callback) => {

    // if no callback has been passed in, set empty function
    callback = callback ? callback : () => {};

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
      callback();
    }, duration);
  }

  render(){

    const hero = this.state.hero;
    const ap = hero.ap;
    const apBefore = hero.apBefore;
    const maxAp = hero.maxAp;
    const monster = this.state.monster;
    const cardWidth = this.state.cardWidth;
    const handWidth = this.state.handWidth;
    const hoveredCard = this.state.hoveredCard;

    const deck = hero.deck;
    const drawPile = deck.drawPile;
    const drawPileBefore = deck.drawPileBefore;
    const playedCards = deck.playedCards;
    const hand = deck.hand;
    const handBefore = deck.handBefore;
    const discardPile = deck.discardPile;
    const discardPileBefore = deck.discardPileBefore;
    const banishPile = deck.banishPile;
    const endedTurn = this.state.endedTurn;
    const startTurn = this.state.startTurn;
    const drawnNewCards = this.state.drawnNewCards;

    const message = this.state.message;
    const showMessage = this.state.showMessage;
    const messageDuration = this.state.messageDuration;

    const showInfo = this.props.showInfo;

    const BS = this.state.BS;

    return(

      <Fragment>

        <canvas id="animation" className="animation" />

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
            />
          </section>

          <CardSet
            drawPile={ drawPile }
            drawPileBefore={ drawPileBefore.length }
            hand={ hand }
            handBefore={ handBefore }
            playedCards={ playedCards }
            discardPile={ discardPile }
            discardPileBefore={ discardPileBefore.length }
            banishPile={ banishPile }
            cardWidth={ cardWidth }
            handWidth={ handWidth }
            BS={ BS }
            handleClickCard={ this.handleClickCard }
            handleMouseEnterCard={ this.handleMouseEnterCard }
            handleMouseLeaveCard={ this.handleMouseLeaveCard }
            hoveredCard={ hoveredCard }
            endTurn={ this.handleClickEndTurn }
            endedTurn={ endedTurn }
            gameOver={ this.state.gameOver }
            ap={ ap }
            apRef={ this.state.apRef }
            apBefore={ apBefore }
            maxAp={ maxAp }
            startTurn={ startTurn }
            drawnNewCards={ drawnNewCards }
          />

        </section>

      </Fragment>
    )
  }

}

export default withRouter(Battle);
