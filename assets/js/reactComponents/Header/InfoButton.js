import React from 'react';

const info = (props) => {
  const mouseLeaveInfoButton = props.mouseLeaveInfoButton;
  const mouseEnterInfoButton = props.mouseEnterInfoButton;
  return(
    <div onMouseEnter={(e) => mouseEnterInfoButton(e)} onMouseLeave={(e) => mouseLeaveInfoButton(e)}>
      <span>InfoButton</span>
    </div>
  )
}

export default info;
