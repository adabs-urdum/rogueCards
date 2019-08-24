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
      >
        <span className="button__svg_wrapper">
          <canvas className="button__canvas" width="29" height="29"></canvas>
          <svg className="button__svg" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.25 24C4.25 24.4142 4.58579 24.75 5 24.75H11.75C12.1642 24.75 12.5 24.4142 12.5 24C12.5 23.5858 12.1642 23.25 11.75 23.25H5.75V17.25C5.75 16.8358 5.41421 16.5 5 16.5C4.58579 16.5 4.25 16.8358 4.25 17.25V24ZM12.4697 15.4697L4.46967 23.4697L5.53033 24.5303L13.5303 16.5303L12.4697 15.4697Z" fill="black"/>
            <path d="M24.75 5C24.75 4.58579 24.4142 4.25 24 4.25H17.25C16.8358 4.25 16.5 4.58579 16.5 5C16.5 5.41421 16.8358 5.75 17.25 5.75H23.25V11.75C23.25 12.1642 23.5858 12.5 24 12.5C24.4142 12.5 24.75 12.1642 24.75 11.75V5ZM16.5303 13.5303L24.5303 5.53033L23.4697 4.46967L15.4697 12.4697L16.5303 13.5303Z" fill="black"/>
            <path d="M5 4.25C4.58579 4.25 4.25 4.58579 4.25 5V11.75C4.25 12.1642 4.58579 12.5 5 12.5C5.41421 12.5 5.75 12.1642 5.75 11.75V5.75H11.75C12.1642 5.75 12.5 5.41421 12.5 5C12.5 4.58579 12.1642 4.25 11.75 4.25H5ZM13.5303 12.4697L5.53033 4.46967L4.46967 5.53033L12.4697 13.5303L13.5303 12.4697Z" fill="black"/>
            <path d="M24 24.75C24.4142 24.75 24.75 24.4142 24.75 24V17.25C24.75 16.8358 24.4142 16.5 24 16.5C23.5858 16.5 23.25 16.8358 23.25 17.25V23.25H17.25C16.8358 23.25 16.5 23.5858 16.5 24C16.5 24.4142 16.8358 24.75 17.25 24.75H24ZM15.4697 16.5303L23.4697 24.5303L24.5303 23.4697L16.5303 15.4697L15.4697 16.5303Z" fill="black"/>
          </svg>
        </span>

    </Button>

    </section>
  )
}


export default header;
