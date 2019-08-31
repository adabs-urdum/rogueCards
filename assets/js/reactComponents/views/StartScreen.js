import React, { Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import Button from '../uiElements/Button.js';


const startScreen = (props) => {

  return(
    <Fragment>
      <div className="startScreen">
        <h1>{ 'rogueCards alpha v0.0.6' }</h1>
        <p>attempt to build a rogue like/light card deck builder<br/>using react.js and babylon.js</p>
        <a target="_blank" style={{ 'pointerEvents': 'all', 'zIndex': 100, 'position': 'relative' }} href="https://cyrill-lehmann.ch">cyrill-lehmann.ch</a>
        <a target="_blank" style={{ 'pointerEvents': 'all', 'zIndex': 100, 'position': 'relative' }} href="https://github.com/adabs-urdum/rogueCards">github.com/adabs-urdum/rogueCards</a>
        <NavLink className="button" to="/character">Play</NavLink>
      </div>
    </Fragment>
  )

}

export default withRouter(startScreen);
