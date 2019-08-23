import React from 'react';
import CountUp from 'react-countup';

const pile = (props) => {

  const type = props.type;
  const text = props.text;
  const title = props.title;
  const flash = props.flash;
  const textSuffix = props.textSuffix;
  const old = props.oldAP > 0 ? props.oldAP : 0;

  return(
    <div className={"pile pile--" + type }>
      <div className="pile__number">
        <span>
          <span className={ flash ? 'animateScale' : null }>
            <CountUp
              start={old}
              end={text}
              duration={1.5}
            />
          </span>
          { textSuffix }
        </span>
      </div>
      <span className="pile__title">{ title }</span>
    </div>
  )
}

export default pile;
