import React, { Fragment } from 'react';
import Card from '../Card.js';
import DrawPile from './DrawPile.js';
import Ap from './AP.js';
import Pile from './Pile.js';
import Button from '../uiElements/Button.js';

const cardSet = (props) => {

  const drawPile = props.drawPile;
  const drawPileBefore = props.drawPileBefore;
  const hand = props.hand;
  const handBefore = props.handBefore;
  const discardPile = props.discardPile;
  const discardPileBefore = props.discardPileBefore;
  const banishPile = props.banishPile;
  const handleClickCard = props.handleClickCard;
  const handleMouseEnterCard = props.handleMouseEnterCard;
  const handleMouseLeaveCard = props.handleMouseLeaveCard;
  const cardWidth = props.cardWidth;
  const handWidth = props.handWidth;
  const BS = props.BS;
  const endedTurn = props.endedTurn;
  const startedTurn = props.startedTurn;
  const drawnNewCards = props.drawnNewCards;
  const ap = props.ap;
  const apBefore = props.apBefore;
  const maxAp = props.maxAp;
  const endTurn = props.endTurn;

  const hoveredCard = props.hoveredCard;
  const hoveredCardIndex = hand.indexOf(hoveredCard);

  // calculate position of card inside hand
  let cardCount = 0;
  const cardsTotalWidth = cardWidth * hand.length;
  const margin = (handWidth - cardsTotalWidth) / (hand.length - 1);
  const smallMargin = 25;
  let siblingIsHovered = false;

  const handJsx = hand.map(card => {
    let left;

    if(cardsTotalWidth < handWidth){
      // if less than 6 cards, calculate position from center
      left = ( ( ( ( hand.length / -2 + cardCount ) * cardWidth ) + Math.ceil(hand.length / -2 + cardCount) * smallMargin ) + (handWidth / 2) ) * BS;
    }
    else{
      // else calculate from left
      left = (cardCount * cardWidth + cardCount * margin) * BS;

      // move cards after hovered a bit to the right, so we can read the hovered card
      if(siblingIsHovered){
        left += (((cardsTotalWidth - handWidth) / hand.length) + smallMargin * 1) * BS;
        let siblingIsHovered = false;
      }
    }

    if(hoveredCardIndex == cardCount){
      siblingIsHovered = true;
    }

    let additionalClasses = '';

    if(drawnNewCards){
      if(!handBefore.includes(card)){
        additionalClasses = 'card--new';
      }
    }

    cardCount++;

    return (
      <Card
        classes={ additionalClasses }
        key={ card.id }
        card={ card }
        handleClickCard={ handleClickCard }
        handleMouseEnterCard={ handleMouseEnterCard }
        handleMouseLeaveCard={ handleMouseLeaveCard }
        left={ left }
      />
    );

  });

  let handClass = 'deck__hand ';

  if(startedTurn){
    handClass += 'deck__hand--started';
  }
  else if(endedTurn){
    handClass += 'deck__hand--ended';
  }

  let endTurnButtonClasses = 'button--endTurn deck__endTurn';

  return(
    <section className="deck">
      <Button
        id='endTurnButton'
        classes={ endTurnButtonClasses }
        text="End turn"
        onclick={ endTurn }
        disabled={ endedTurn }
      />
      <div key="drawPile" className="deck__drawPile">
        <Pile
          numberId="numberAP"
          old={ apBefore }
          text={ ap }
          textSuffix={ '/' + maxAp }
          type="ap"
          title="ap"
        />
        <Pile
          text={ drawPile.length }
          old={ drawPileBefore }
          type="draw"
          title="draw"
        />
      </div>
      <div key="hand" className={ handClass }>
        { handJsx }
      </div>
      <div key="discardPile" className="deck__discardPile">
        <Pile
          text={ banishPile.length }
          type="banish"
          title="banish"
        />
        <Pile
          text={ discardPile.length }
          text={ discardPileBefore }
          type="discard"
          title="discard"
        />
      </div>
    </section>
  );

}

export default cardSet;
