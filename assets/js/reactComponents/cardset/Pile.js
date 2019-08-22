import React from 'react';

const pile = (props) => {

  const type = props.type;
  const text = props.text;
  const title = props.title;

  return(
    <div className={"pile pile--" + type }>
      <div className="pile__number">
        <span>{ text }</span>
      </div>
      <span className="pile__title">{ title }</span>
    </div>
  )
}

export default pile;
