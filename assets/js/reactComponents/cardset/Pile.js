import React from 'react';

const pile = (props) => {

  const type = props.type;
  const text = props.text;
  const title = props.title;
  const flash = props.flash;
  const textSuffix = props.textSuffix;

  return(
    <div className={"pile pile--" + type }>
      <div className="pile__number">
        <span><span className={ flash ? 'animateScale' : null }>{ text }</span>{ textSuffix }</span>
      </div>
      <span className="pile__title">{ title }</span>
    </div>
  )
}

export default pile;
