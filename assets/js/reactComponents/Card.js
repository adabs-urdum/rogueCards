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

  return(
    <div style={{ left: left }} className={ className } data-key={ card.id } onMouseLeave={ handleMouseLeaveCard } onMouseEnter={ handleMouseEnterCard } onClick={ (e) => handleClickCard(e, card.id) }>
      <div className="card__img_wrapper">
        <p className="card__name">{ card.name }</p>
        <div className="card__description" dangerouslySetInnerHTML={{__html: card.description}}></div>
        <div className="card__stats_wrapper">
          { card.attack ? <p className="card__stats"><span className="card__stats_bubble card__stats_bubble--health"><span>{ card.attack ? card.attack : 0 }</span></span></p> : null }
          { card.block ? <p className="card__stats"><span  className="card__stats_bubble card__stats_bubble--block"><span>{ card.block ? card.block : 0 }</span></span></p> : null }
        </div>
      </div>
      <p className="card__cost">
        <span>{ card.cost }</span>
      </p>
    </div>
  );
}

export default card;
