import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

// import vanilla models
import Hero from '../../vanillaComponents/character/characterClasses/heroes/Hero.js';

// import babylon components
import CharacterAnimation from '../../babylonComponents/CharacterAnimation.js';

// import react components
import Card from '../Card.js';

class Character extends Component{

  constructor(props){

    super(props);

    let hero = props.hero;

    if(!hero){
      hero = new Hero();
      props.setHero(hero);
    }

    this.state = {
      'hero': hero
    }

  }

  componentDidMount(){
    console.log('componentDidMount');
    const animation = new CharacterAnimation();
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

    console.log(hero);

    return(
      <section className="viewCharacter">
        <div className="viewCharacter__character">
          <canvas width="835" height="714" id="viewCharacterScene" className="viewCharacter__canvas" />
        </div>
        <div className="viewCharacter__tropes"></div>
        <div className="viewCharacter__stats">
          <h1>{ hero.name }</h1>
          <div className="viewCharacter__xp_container">
            <p>{ hero.xp } XP</p>
          </div>
          <ul>
            <li>{ hero.health }/{ hero.maxHealth } Health</li>
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
    )
  }

}

export default Character;
