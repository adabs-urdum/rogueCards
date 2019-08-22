import React from 'react';

const message = (props) => {

  const message = props.message;
  const duration = props.duration;
  const showMessage = props.showMessage;

  // console.log(message);
  // console.log(duration);
  // console.log(showMessage);
  // console.log('---------');

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
