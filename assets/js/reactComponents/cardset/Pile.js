import React, { Fragment } from 'react';
import CountUp from 'react-countup';

const pile = (props, ref) => {
  const numberId = props.numberId;
  const type = props.type;
  const text = props.text;
  const title = props.title;
  const flash = props.flash;
  const old = props.old > 0 ? props.old : 0;
  const delimiter = '|';
  const textSuffix = props.textSuffix ? (<Fragment><span>{delimiter}</span><span>{props.textSuffix}</span></Fragment>) : null;

  return(
    <div className={"pile pile--" + type }>
      <div className="pile__number">
        <span>
          <span id={numberId} className={ flash ? 'animateScale' : null }>
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
};

export default pile;
