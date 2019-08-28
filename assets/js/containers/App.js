import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Link, NavLink, Switch, Redirect, withRouter } from 'react-router-dom';
import Animation from '../babylonComponents/Animation.js';
import { TimelineLite, CSSPlugin, AttrPlugin }  from "gsap/all";

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
    }

  }

  componentDidMount = () => {

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
