import React from 'react';

const info = (props) => {
  const mouseLeaveInfoButton = props.mouseLeaveInfoButton;
  const mouseEnterInfoButton = props.mouseEnterInfoButton;
  return(
    <div className="infobutton" onMouseEnter={(e) => mouseEnterInfoButton(e)} onMouseLeave={(e) => mouseLeaveInfoButton(e)}>
      <span className="infobutton__text">?</span>
    </div>
  )
}

export default info;
