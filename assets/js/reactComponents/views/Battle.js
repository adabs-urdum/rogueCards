import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

// import vanilla models
import Hero from '../../vanillaComponents/character/characterClasses/heroes/Hero.js';
import Enemy from '../../vanillaComponents/character/characterClasses/monsters/Enemy.js';

// import react components
import Character from '../Character.js';
import Header from '../Header.js';
import Message from '../uiElements/Message.js';
import CardSet from '../cardset/CardSet.js';
import Arena from '../Arena.js';

// import babylon components
import Animation from '../../babylonComponents/Animation.js';


class Battle extends Component{

  constructor(props){
    super(props);

    const BS = props.BS;
    const toggleFullscreen = props.toggleFullscreen;

    const hero = new Hero();
    const monster = new Enemy();

    this.state = {
      'BS': BS,
      'turn': 1,
      'hero': hero,
      'monster': monster,
      'animation':  null,
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
      'toggleFullscreen': toggleFullscreen,
    };

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

  componentDidMount = () => {

    const hero = this.state.hero;
    const monster = this.state.monster;

    const animation = new Animation();

    hero.baBody = animation.hero;
    hero.baShield = animation.heroShield;
    monster.baBody = animation.monster;
    monster.baShield = animation.monsterShield;

    animation.createFighters(hero, animation.hero);
    animation.createFighters(monster, animation.monster);

    this.setState({
      'animation':  animation,
    }, () => {
      this.startedTurn();
    });

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
      }, 500);
    }

    if(startedTurn == true){
      window.setTimeout(() => {
        this.setState({
          startedTurn: false
        });
      }, 1000);
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

    const gameOver = this.state.gameOver;
    if(gameOver){
      this.setState({
        startScreen: true,
        battleScreen: false,
        gameOver: false,
      });
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
    [hero, monster] = cardObject.playCard(hero, monster);
    animation.playCard(hero, monster, cardObject);

    if(monster.isDead){
      this.flashMessage('He dead. You won.', 2000, () => {
        this.props.history.push('/');
      });
    }

    this.setState({
      'deck': deck,
      'flashAP': true,
      'hero': hero,
      'monster': monster,
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

  startedTurn = () => {
    this.flashMessage('Round ' + this.state.turn, 700);

    const hero = this.state.hero;
    const deck = hero.deck;

    deck.hand = deck.drawCards(deck.handsize);
    hero.deck = deck;

    hero.fillApToMax();

    const turn = this.state.turn;

    const animation = this.state.animation;
    const monster = this.state.monster;
    animation.createFighters(hero, animation.hero);
    animation.createFighters(monster, animation.monster);

    this.setState({
      turn: turn + 1,
      endedTurn: false,
      hero: hero,
      flashAP: true,
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
    // animation.animateShield(hero.blockBefore, hero.block, hero.baShield);

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
    animation.animateShield(monster.block, currentAttack.block + monster.block, monster.baShield);

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

    return(

      <Fragment>

        <canvas id="animation" className="animation" />

        <Header
          toggleFullscreen={ this.state.toggleFullscreen }
          mouseLeaveInfoButton={ this.handleMouseLeaveInfoButton }
          mouseEnterInfoButton={ this.handleMouseEnterInfoButton }
        />

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
            endTurn={ this.handleClickEndTurn }
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

      </Fragment>
    )
  }

}

export default withRouter(Battle);
