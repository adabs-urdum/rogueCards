import React, { Component, Fragment } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import Message from './../uiElements/Message.js';
import Button from './../uiElements/Button.js';
import Shop from './../overlays/Shop.js';

class Map extends Component{

  constructor(props){

    super(props);

    this._isMounted = false;

    window.addEventListener('setCurrentStar', this.setCurrentStar, false);

    this.state = {
      currentStar: null,
      showShop: false,
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
        if(this._isMounted){
          this.props.animation.scene.activeCamera = this.props.animation.freeCamera;
        }
      });
    }

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  transitionToCharacter = () => {
    this.props.history.push('/character');
  }

  toggleShop = () => {
    this.setState({
      showShop: !this.state.showShop,
    });
  }

  render(){

    const animation = this.props.animation;
    const monster = this.props.monster;
    const currentStar = this.state.currentStar;

    let currentStarJsx;
    if(currentStar && monster){

      const type = currentStar.type.type;
      currentStarJsx = (
        <div>
          <h1>{ monster.name }</h1>
          <p>{ type }</p>
          <p>{ monster.baId }</p>
          { type == 'enemy' ? <div><ul>
            <li>Health: { monster.health }</li>
            <li>{ monster.baId }</li>
            </ul>
            <NavLink className="button" to="/battle">Battle</NavLink></div> : null }
          { type == 'shop' ? <div>
            {/* <button className="button" onClick={ this.toggleShop }>Merchant</button> */}
          </div>: null }
        </div>
      );
    }

    return(
      <section className="map">
        <div className="map__content">
          { this.state.showShop ? <Shop
            fadeOutShop={ this.state.fadeOutShop }
            toggleShop={ this.toggleShop }
            buyCard={ this.buyCard }
            buyHealth={ this.buyHealth }
            buyMaxHealth={ this.buyMaxHealth }
            hero={ this.state.hero }
            shopCards={ this.state.shopCards } />
          : null }
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
          { currentStarJsx }
        </div>
      </section>
    );
  }
}

export default withRouter(Map);
