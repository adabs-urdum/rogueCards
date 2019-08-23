import React from 'react';

const card = ( props ) => {

  const card = props.card;
  const handleClickCard = props.handleClickCard;
  const handleMouseEnterCard = props.handleMouseEnterCard;
  const handleMouseLeaveCard = props.handleMouseLeaveCard;
  const left = props.left + 'vw';
  const startedTurn = props.startedTurn;

  return(
    <div style={{ left: left }} className={ startedTurn ? 'card card--started' : 'card' } data-key={ card.id } onMouseLeave={ handleMouseLeaveCard } onMouseEnter={ handleMouseEnterCard } onClick={ (e) => handleClickCard(e, card.id) }>
      <div className="card__img_wrapper">
        <p className="card__name">{ card.name }</p>
        <div className="card__stats_wrapper">
          <p className="card__stats redHealth">{ card.attack ? card.attack : 0 } <span className="card__unit">atk</span></p>
          <p className="card__stats blueBlock">{ card.block ? card.block : 0 } <span className="card__unit">blk</span></p>
        </div>
      </div>
      <p className="card__cost">
        <span>{ card.cost }</span>
      </p>
      <div className="card__description" dangerouslySetInnerHTML={{__html: card.description}}>
      </div>
    </div>
  );
}

export default card;
