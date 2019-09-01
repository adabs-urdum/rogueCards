import React from 'react';

const card = ( props ) => {

  const card = props.card;
  const classes = props.classes;
  const handleClickCard = props.handleClickCard;
  const handleMouseEnterCard = props.handleMouseEnterCard;
  const handleMouseLeaveCard = props.handleMouseLeaveCard;
  const left = props.left + 'vw';
  const startedTurn = props.startedTurn;

  let className = 'card';

  if(startedTurn){
    className += ' card--started';
  }

  if(classes){
    className += ' ' + classes;
  }

  // <style type="text/css">
  //   .st0{fill:none;stroke:#000000;stroke-linecap:round;stroke-miterlimit:10;}
  //   .st1{fill:none;stroke:#000000;stroke-miterlimit:10;}
  //   .st2{fill:none;stroke:#000000;stroke-width:0.56;stroke-miterlimit:10;}
  //   .st3{fill:none;stroke:#000000;stroke-width:0.75;stroke-miterlimit:10;}
  // </style>

  return(
    <div id={ 'card_' + card.id } style={{ left: left }} className={ className } data-key={ card.id } onMouseLeave={ handleMouseLeaveCard } onMouseEnter={ handleMouseEnterCard } onClick={ (e) => handleClickCard(e, card.id) }>
      { props.children }
      <div className="card__content_wrapper">
        <p className="card__name">{ card.name }</p>
        <div className="card__description" dangerouslySetInnerHTML={{__html: card.description}}></div>
      </div>
      <div className="card__stats_wrapper">
        <p className="card__cost"><span>{ card.cost }</span></p>
        { card.attack ? <p className="card__stats"><span className="card__stats_bubble card__stats_bubble--health"><span>{ card.attack ? card.attack : 0 }</span></span></p> : null }
        { card.block ? <p className="card__stats"><span  className="card__stats_bubble card__stats_bubble--block"><span>{ card.block ? card.block : 0 }</span></span></p> : null }
      </div>
      <svg className="card__svg" x="0px" y="0px" viewBox="0 0 300 450" style={{ 'enableBackground': 'new 0 0 300 450' }}>
        <path d="M273.7,45.2l-0.1-21.8C246.2,4.2,186.8,3.8,157,3.8h-14c-29.7,0-88.6,0.4-116.2,19.3v22.1"/>
        <path d="M26.3,405.1l0.1,21.8c27.4,19.2,86.8,19.6,116.7,19.6h14c29.7,0,88.6-0.4,116.2-19.3v-22.1"/>
      </svg>
    </div>
  );
}

export default card;
