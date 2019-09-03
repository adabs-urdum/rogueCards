import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Router, Link, NavLink, Switch, Redirect, withRouter } from 'react-router-dom';
import Character from '../reactComponents/views/Character.js';

// import react components
import Header from '../reactComponents/Header.js';
import Animation from '../reactComponents/Animation.js';
import StartScreen from '../reactComponents/views/StartScreen.js';
import Battle from '../reactComponents/views/Battle.js';
import Map from '../reactComponents/views/Map.js';

// import Vanilla components
import Enemy from '../vanillaComponents/character/characterClasses/monsters/Enemy.js';

class App extends Component {

  constructor(props){
    super(props);

    this.monsters = [
      Enemy,
    ];

    this.state = {
      BS: 100 / 2560,
      inFullscreen: false,
      showInfo: false,
      hero: null,
      monster: null,
      battleLogs: [],
      heroStatsChanged: false,
      shopCards: [],
      animation: null,
    }

  }

  componentDidMount(){
    const loader = document.getElementById('loader');
    loader.parentNode.removeChild(loader);
  }

  setShopCards = (cards) => {
    this.setState({
      shopCards: cards,
    });
  }

  setAnimation = (animation) => {
    this.setState({
      animation: animation,
    });
  }

  setNewMonster = (currentStar) => {
    const Monster = this.monsters.getRandomValue();
    const newMonster = new Monster();
    newMonster.baId = currentStar.id;
    newMonster.baType = currentStar.type;
    this.setState({
      monster: newMonster,
    });
  }

  setHero = (hero) => {
    hero.baBody = null;
    hero.baShield = null;
    hero.fleet = [];
    hero.healthBefore = hero.health;
    hero.isDead = false;
    hero.block = 0;
    this.setState({
      hero: hero,
    });
  }

  setNewBattleLog = (battleLog) => {
    const battleLogs = this.state.battleLogs;
    battleLogs.push(battleLog);
    this.setState({
      battleLogs: battleLogs,
      heroStatsChanged: true,
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
      console.log('Browser doesn\'t support js fullscreen');
    }
  }

  render(){

    const BS = this.state.BS;
    const toggleFullscreen = this.toggleFullscreen;

    return (
      <Fragment>

        <Header
          toggleFullscreen={ (e) => { this.toggleFullscreen(e) } }
          mouseEnterInfoButton={ this.handleMouseEnterInfoButton }
          mouseLeaveInfoButton={ this.handleMouseLeaveInfoButton }
        />

        <BrowserRouter>

          <Switch>

            <Route path="/battle" exact render={() =>
              <Battle
                BS={BS}
                hero={this.state.hero}
                showInfo={this.state.showInfo}
                setNewBattleLog={this.setNewBattleLog}
                removeHero={this.removeHero}
              />
            } />

            <Route path="/character" exact render={() =>
              <Character
                animation={ this.state.animation }
                hero={ this.state.hero }
                setShopCards={ this.setShopCards }
                shopCards={ this.state.shopCards }
                setHero={ this.setHero }
                setGold={ this.setGold }
                battleLogs={ this.state.battleLogs }
                heroStatsChanged={ this.state.heroStatsChanged }
              />
            } />

            <Route path="/map" exact render={() =>
              <Map
                animation={ this.state.animation }
                monster={ this.state.monster }
                setNewMonster={ this.setNewMonster }
              />
            }/>

            <Route path="/" render={() =>
              <StartScreen
                animation={ this.state.animation }
              />
            }/>

          </Switch>

        </BrowserRouter>

        <Animation setAnimation={ this.setAnimation } />

      </Fragment>
    );

  }
}

export default App;
