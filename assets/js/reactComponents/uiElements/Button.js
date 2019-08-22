import React from 'react';

const button = (props) => {

  let classes = props.classes;
  const text = props.text;
  const onclick = props.onclick;
  const disabled = props.disabled;
  const flash = props.flash;
  const style = props.style;

  if(flash){
    classes += ' button--flashButton';
  }

  return(
    <button
      className={"button " + classes}
      onClick={onclick ? (e) => onclick(e) : null}
      disabled={ disabled }
      style={ style }
    >
      { text }
    </button>
  );
}

export default button;
