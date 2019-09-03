import React from 'react';

const button = (props) => {

  let classes = props.classes;
  const id = props.id;
  const text = props.text ? props.text : '';
  const onclick = props.onclick;
  const disabled = props.disabled;
  const flash = props.flash;
  const style = props.style;

  if(flash){
    classes += ' button--flashButton';
  }

  return(
    <button
      id={id}
      className={"button " + classes}
      onClick={onclick ? (e) => onclick(e) : null}
      disabled={ disabled }
      style={ style }
    >
    <span className="button__content">{ text }</span>
    { props.children }
    </button>
  );
}

export default button;
