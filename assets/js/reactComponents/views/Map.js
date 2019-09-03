import React, { Component } from 'react';

class Map extends Component{

  componentDidMount(){

    if(this.props.animation){
      this.props.animation.resetHeroPositionCharacterView(()=>{
        this.props.animation.scene.activeCamera = this.props.animation.freeCamera;
      });
    }

  }

  componentDidUpdate(){

    if(this.props.animation){
      this.props.animation.resetHeroPositionCharacterView(()=>{
        this.props.animation.scene.activeCamera = this.props.animation.freeCamera;
      });
    }

  }

  render(){
    return(
      <h1>map</h1>
    );
  }
}

export default Map;
