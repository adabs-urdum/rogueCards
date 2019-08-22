import React from 'react';

const message = (props) => {

  const message = props.message;
  const duration = props.duration;
  const showMessage = props.showMessage;

  // console.log(message);
  // console.log(duration);
  // console.log(showMessage);
  // console.log('---------');

  if(showMessage){
    return(
      <section className="message"><span>{ message }</span></section>
    );
  }
  else{
    return null;
  }
}

export default message;
