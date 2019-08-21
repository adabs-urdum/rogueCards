import React from 'react';

const button = (props) => {

  const classes = props.classes;
  const text = props.text;
  const onclick = props.onclick;
  const disabled = props.disabled;

  return(
    <button
      className={"button " + classes}
      onClick={onclick ? (e) => onclick(e) : null}
      disabled={ disabled }
    >
      { text }
    </button>
  );
}

export default button;
