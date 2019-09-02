import React, { Component } from 'react';
import MainAnimation from '../babylonComponents/MainAnimation.js';


class Animation extends Component {

  constructor(props){

    super(props);

    this.state = {
      animation: null,
      setAnimation: props.setAnimation,
    }

  }

  componentDidMount(){

    const animation = new MainAnimation();

    this.setState({
      animation: animation,
    }, () => {
      this.state.setAnimation(animation);
    });

  }

  render(){

    return(
      <section className="animationLayer">
        <canvas id="babylon" className="animationLayer__canvas" width="2560" height="1440"></canvas>
      </section>
    )

  }

}

export default Animation;
