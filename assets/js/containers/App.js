import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Link, NavLink, Switch, Redirect, withRouter } from 'react-router-dom';
import Character from '../reactComponents/views/Character.js';

// import react components
import Header from '../reactComponents/Header.js';

// import all views
import StartScreen from '../reactComponents/views/StartScreen.js';
import Battle from '../reactComponents/views/Battle.js';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      BS: 100 / 2560,
      inFullscreen: false,
      showInfo: false,
      hero: null,
      battleLogs: [],
      heroStatsChanged: false
    }

  }

  componentDidUpdate = () => {
    // console.log('App componentDidUpdate');
    // console.log(this.state);
    // console.log('----------');

  }

  setHero = (hero) => {
    hero.baBody = null;
    hero.baShield = null;
    hero.fleet = [];
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
              />
            } />

            <Route path="/character" exact render={() =>
              <Character
                hero={ this.state.hero }
                setHero={ this.setHero }
                setGold={ this.setGold }
                battleLogs={ this.state.battleLogs }
                heroStatsChanged={ this.state.heroStatsChanged }
              />
            } />

            <Route path="/" exact render={() =>
              <StartScreen />
            }/>

          </Switch>

        </BrowserRouter>

      </Fragment>
    );

  }
}

export default App;
