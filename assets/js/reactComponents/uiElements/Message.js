import React from 'react';

const message = (props) => {

  const message = props.message;
  const duration = props.duration;
  const showMessage = props.showMessage;

  const style = {
    'animationDuration': duration + 'ms',
  };

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
