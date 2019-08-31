import React, { Component, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import CountUp from 'react-countup';
import { TimelineLite, CSSPlugin, AttrPlugin }  from "gsap/all";

// import vanilla models
import Hero from '../../vanillaComponents/character/characterClasses/heroes/Hero.js';

// import babylon components
import CharacterAnimation from '../../babylonComponents/CharacterAnimation.js';

// import react components
import Card from '../Card.js';
import BattleLog from '../overlays/BattleLog.js';

class Character extends Component{

  constructor(props){

    super(props);

    let hero = props.hero;

    if(!hero){
      hero = new Hero();
      props.setHero(hero);
    }
    else{
      hero.xpBefore = hero.xp;
      hero.goldBefore = hero.gold;
    }

    let showBattleLog = false;
    if(props.location.state){
      if(props.location.state.showBattleLog){
        showBattleLog = true;
      }
    }

    this.state = {
      'hero': hero,
      'battleLogs': props.battleLogs,
      'showBattleLog': showBattleLog,
      'setGold': props.setGold,
      'setHero': props.setHero,
    }

  }

  componentDidMount(){
    const animation = new CharacterAnimation();
  }

  toggleHeroStatsChanged = (xp, gold, card) => {

    const hero = this.state.hero;
    hero.xpBefore = hero.xp;
    hero.xp += xp;
    hero.goldBefore = hero.gold;
    hero.gold += gold;

    this.state.setHero(hero);

    this.setState({
      showBattleLog: false,
    });
  }

  removeCard = (card) => {
    const hero = this.state.hero;

    hero.deck.removeCardFromDeck(card);
    hero.goldBefore = hero.gold;
    hero.gold -= card.value;
    hero.xpBefore = hero.xp;

    const plugins = [ CSSPlugin, AttrPlugin ];
    const tl = new TimelineLite({
      onComplete: () => {
        this.setState({
          hero: hero
        });
			}
    });

    tl.fromTo(
      '#card_' + card.id, 0.5, {
      left: 1,
    }, {
      opacity: 0,
    });

  }

  render(){

    const hero = this.state.hero;
    let counter = 0;

    // list all of the character's cards
    const cardsJsx = hero.deck.deck.map(card => {
      counter += 1;
      let removeButtonText = hero.gold < card.value ? 'too expensive' : 'remove';
      removeButtonText = hero.deck.deck.length <= 8 ? 'min. 8 cards' : removeButtonText;
      return(
        <Card
          key={ card.id + counter}
          card={ card }
          handleClickCard={ () => {} }
        >
          <div className="viewCharacter__cardOverlay">
            <p>Removal cost: { card.value } gold</p>
            <button disabled={ removeButtonText != 'remove' } onClick={ () => this.removeCard(card) } className="button">{ removeButtonText }</button>
          </div>
        </Card>
      )
    });

    let battleLogJsx = null;
    if(this.state.showBattleLog){
      battleLogJsx = (
        <BattleLog
          toggleHeroStatsChanged={ this.toggleHeroStatsChanged }
          battleLogs={ this.state.battleLogs }
        />
      );
    }

    return(
      <Fragment>
        { battleLogJsx }
        <section className="viewCharacter">
          <div className="viewCharacter__character">
            <canvas width="835" height="714" id="viewCharacterScene" className="viewCharacter__canvas" />
          </div>
          <div className="viewCharacter__tropes"></div>
          <div className="viewCharacter__stats">
            <h2>{ hero.name }</h2>
            <div className="viewCharacter__xp_container">
              <p><CountUp
                start={hero.xpBefore}
                end={hero.xp}
                duration={Math.random() + 0.5}
              /> XP</p>
            </div>
            <ul>
              <li>{ hero.health }/{ hero.maxHealth } Health</li>
              <li><CountUp
                start={hero.goldBefore}
                end={hero.gold}
                duration={Math.random() + 0.5}
              /> Gold</li>
              <li>
                Decksize: { hero.deck.deck.length }
              </li>
            </ul>
          </div>
          <div className="viewCharacter__cards">
            <div className="viewCharacter__cards_wrapper">
              { cardsJsx }
            </div>
          </div>
          <div className="viewCharacter__navigation">
            <NavLink className="button" to="/">Main</NavLink>
            <button className="button">Shop</button>
            <NavLink className="button" to="/battle">Battle</NavLink>
          </div>
        </section>
      </Fragment>
    )
  }

}

export default withRouter(Character);
