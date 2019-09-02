import * as BABYLON from 'babylonjs';
import React, { Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { TimelineLite, CSSPlugin, AttrPlugin }  from "gsap/all";

import Button from '../uiElements/Button.js';


const startScreen = (props) => {

  // set inital turn
  const animation = props.animation;
  if(animation){
    animation.fixedCamera.rotation.y += Math.PI / 180 * -90;
  }

  const transitionToCharacter = () => {

    // animate turn camera right
    animation.turnCameraY(90, 1);

    // animate html view to left and fadeout
    const plugins = [ CSSPlugin, AttrPlugin ];
    const tl = new TimelineLite({
      onComplete: function(){
        props.history.push('/character');
      }
    });
    const totalFlashDuration = 2.5;
    tl.fromTo(
      '#startScreen', totalFlashDuration / 2, {
      left: '0%',
      opacity: 1,
    }, {
      left: '-100%',
      opacity: 0,
    });

  }

  return(
    <Fragment>
      <div id="startScreen" className="startScreen">
        <h1>{ 'rogueCards alpha v0.1.0' }</h1>
        <p>attempt to build a rogue like/light card deck builder<br/>using react.js and babylon.js</p>
        <a target="_blank" style={{ 'pointerEvents': 'all', 'zIndex': 100, 'position': 'relative' }} href="https://cyrill-lehmann.ch">cyrill-lehmann.ch</a>
        <a target="_blank" style={{ 'pointerEvents': 'all', 'zIndex': 100, 'position': 'relative' }} href="https://github.com/adabs-urdum/rogueCards">github.com/adabs-urdum/rogueCards</a>
        <button className="button" onClick={ transitionToCharacter }>Play</button>
      </div>
    </Fragment>
  )

}

export default withRouter(startScreen);
