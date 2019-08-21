import React from 'react';

const card = ( props ) => {

  const card = props.card;
  const handleClickCard = props.handleClickCard;
  const handleMouseEnterCard = props.handleMouseEnterCard;
  const handleMouseLeaveCard = props.handleMouseLeaveCard;
  const left = props.left + 'vw';

  return(
    <div style={{ left: left }} className="card" data-key={ card.id } onMouseLeave={ handleMouseLeaveCard } onMouseEnter={ handleMouseEnterCard } onClick={ (e) => handleClickCard(e, card.id) }>
      <div className="card__img_wrapper">
        <p className="card__name">{ card.name }</p>
        <div className="card__stats_wrapper">
          <p className="card__stats card__stats--atk"><span className="card__unit">atk:</span>{ card.attack ? card.attack : 0 }</p>
          <p className="card__stats card__stats--blk"><span className="card__unit">blk:</span>{ card.block ? card.block : 0 }</p>
        </div>
      </div>
      <p className="card__cost">
        <span>{ card.cost }</span>
      </p>
      <div className="card__description">
        { card.description }
      </div>
    </div>
  );
}

export default card;
