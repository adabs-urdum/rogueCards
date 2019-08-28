import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Link, NavLink, Switch, Redirect, withRouter } from 'react-router-dom';
import Animation from '../babylonComponents/Animation.js';
import { TimelineLite, CSSPlugin, AttrPlugin }  from "gsap/all";

// import all views
import StartScreen from '../reactComponents/views/StartScreen.js';
import Battle from '../reactComponents/views/Battle.js';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      BS: 100 / 2560
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

        <BrowserRouter>

          <Switch>

            <Route path="/battle" exact render={() =>
              <Battle
                BS={BS}
                toggleFullscreen={toggleFullscreen}
                hero={this.state.hero}
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
