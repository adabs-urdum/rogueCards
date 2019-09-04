import React, { Component, Fragment } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import Message from './../uiElements/Message.js';
import Button from './../uiElements/Button.js';

class Map extends Component{

  constructor(props){

    super(props);

    this._isMounted = false;

    window.addEventListener('setCurrentStar', this.setCurrentStar, false);

    this.state = {
      currentStar: null,
    };

  }

  setCurrentStar = (e) => {
    const animation = this.props.animation;
    const currentStar = e.detail.currentStar;
    animation.currentStar = currentStar;
    this.setState({
      currentStar: currentStar
    }, () => {
      this.props.setNewMonster(currentStar);
    });
  }

  componentDidMount(){

    this._isMounted = true;

    if(this.props.animation){
      this.props.animation.resetHeroPositionCharacterView(()=>{
        if(this._isMounted){
          this.props.animation.scene.activeCamera = this.props.animation.freeCamera;
        }
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

  componentWillUnmount() {
    this._isMounted = false;
  }

  transitionToCharacter = () => {
    this.props.history.push('/character');
  }

  render(){

    const animation = this.props.animation;

    const monster = this.props.monster;

    const currentStar = this.state.currentStar;
    let currentStarJsx;
    if(currentStar){
      const type = currentStar.type.type;
      currentStarJsx = (
        <h1>{ type }</h1>
      );
    }

    return(
      <section className="map">
        <div className="map__content">
          <Message
            duration={ 2000 }
            message={ 'click on any star in the sky' }
            showMessage={ true }
            nonClickable={ true }
          />
          <Button
            text='back'
            onclick={ this.transitionToCharacter }
            classes=''
          />
          <Button
            text='autopilot to random star'
            onclick={ animation ? animation.movePivotMainToRandomStar : null }
            classes=''
          />
          <NavLink className="button" to="/battle">Battle</NavLink>
          { currentStarJsx }
        </div>
      </section>
    );
  }
}

export default withRouter(Map);
