import React from 'react';

const message = (props) => {

  const message = props.message;
  const duration = props.duration;
  const showMessage = props.showMessage;
  const nonClickable = props.nonClickable;

  const style = {
    'animationDuration': duration + 'ms',
  };

  if(nonClickable){
    style['pointerEvents'] = 'none';
  }

  if(showMessage){
    return(
      <section className="message" style={ style }><span>{ message }</span></section>
    );
  }
  else{
    return null;
  }
}

export default message;
