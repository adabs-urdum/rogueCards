import React, { Component, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import CountUp from 'react-countup';

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

    this.state = {
      'hero': hero,
      'battleLogs': props.battleLogs,
      'heroStatsChanged': props.heroStatsChanged,
      'setGold': props.setGold,
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

    this.setState({
      heroStatsChanged: !this.state.heroStatsChanged,
      hero: hero,
    });
  }

  render(){

    const hero = this.state.hero;
    let counter = 0;

    const cardsJsx = hero.deck.deck.map(card => {
      counter += 1;
      return(
        <Card
          key={ card.id + counter}
          card={ card }
        />
      )
    });

    let battleLogJsx = null;
    if(this.state.heroStatsChanged){
      battleLogJsx = (
        <BattleLog
          toggleHeroStatsChanged={ this.toggleHeroStatsChanged }
          battleLogs={ this.state.battleLogs }
        />
      );
    }

    console.log(hero);

    return(
      <Fragment>
        { battleLogJsx }
        <section className="viewCharacter">
          <div className="viewCharacter__character">
            <canvas width="835" height="714" id="viewCharacterScene" className="viewCharacter__canvas" />
          </div>
          <div className="viewCharacter__tropes"></div>
          <div className="viewCharacter__stats">
            <h1>{ hero.name }</h1>
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
            </ul>
          </div>
          <div className="viewCharacter__cards">
            <div className="viewCharacter__cards_wrapper">
              { cardsJsx }
            </div>
          </div>
          <div className="viewCharacter__navigation">
            <NavLink className="button" to="/">Main</NavLink>
            <NavLink className="button" to="/battle">engage</NavLink>
          </div>
        </section>
      </Fragment>
    )
  }

}

export default Character;