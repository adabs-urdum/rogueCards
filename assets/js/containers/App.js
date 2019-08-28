import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Link, NavLink, Switch, Redirect, withRouter } from 'react-router-dom';
import CountUp from 'react-countup';
import Info from '../reactComponents/Info.js';
import Animation from '../babylonComponents/Animation.js';
import { TimelineLite, CSSPlugin, AttrPlugin }  from "gsap/all";

// import all views
import StartScreen from '../reactComponents/views/StartScreen.js';
import Battle from '../reactComponents/views/Battle.js';

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

  componentDidUpdate = () => {

    if(DEBUG){
      console.log('componentDidUpdate()');
    }

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

    if(DEBUG){
      console.log('render()');
    }

    const BS = this.state.BS;
    const toggleFullscreen = this.toggleFullscreen;

    const startScreen = this.state.startScreen;

    const showInfo = this.state.showInfo;

    const mouseLeaveInfoButton = this.handleMouseLeaveInfoButton;
    const mouseEnterInfoButton = this.handleMouseEnterInfoButton;

    let gameLoop = null;
    if(this.state.battleStarted){
      gameLoop = this.getGameLoop();
    }

    //this.getGameLoop()

    return (
      <Fragment>

        <BrowserRouter>

          <Switch>

            <Route path="/battle" exact render={() =>
              <Battle
                BS={BS}
                toggleFullscreen={toggleFullscreen}
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
