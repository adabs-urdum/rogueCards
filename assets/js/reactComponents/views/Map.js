import React, { Component } from 'react';

class Map extends Component{

  componentDidMount(){

    if(this.props.animation){
      this.props.animation.scene.activeCamera = this.props.animation.freeCamera;
      this.props.animation.resetHeroPositionCharacterView();
      console.log(this.props.animation.scene.activeCamera);
    }

  }

  componentDidUpdate(){

    if(this.props.animation){
      this.props.animation.scene.activeCamera = this.props.animation.freeCamera;
      console.log(this.props.animation.scene.activeCamera);
    }

  }

  render(){
    return(
      <h1>map</h1>
    );
  }
}

export default Map;
