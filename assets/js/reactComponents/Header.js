import React from 'react';
import Button from './uiElements/Button.js';
import InfoButton from './Header/InfoButton.js';

const header = ( props ) => {

  const toggleFullscreen = props.toggleFullscreen;
  const showInfo = props.showInfo;

  return(
    <section className="header">

      <InfoButton
        showInfo={ showInfo }
        mouseLeaveInfoButton={ props.mouseLeaveInfoButton }
        mouseEnterInfoButton={ props.mouseEnterInfoButton }
      />

      <Button
        classes="button--fullscreen"
        onclick={ (e) => toggleFullscreen(e) }
        text="Fullscreen"
      />

    </section>
  )
}


export default header;
