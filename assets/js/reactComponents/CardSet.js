import React, { Fragment } from 'react';
import Card from './Card.js';
import DrawPile from './DrawPile.js';
import DiscardPile from './DiscardPile.js';

const cardSet = (props) => {

  const drawPile = props.drawPile;
  const hand = props.hand;
  const playedCards = props.playedCards;
  const discardPile = props.discardPile;
  const handleClickCard = props.handleClickCard;
  const handleMouseEnterCard = props.handleMouseEnterCard;
  const handleMouseLeaveCard = props.handleMouseLeaveCard;
  const cardWidth = props.cardWidth;
  const handWidth = props.handWidth;
  const BS = props.BS;

  const hoveredCard = props.hoveredCard;
  const hoveredCardIndex = hand.indexOf(hoveredCard);

  let cardCount = 0;
  // calculate position of card inside hand from left
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

      if(siblingIsHovered){
        // left += (cardWidth / hand.length) * BS;
        left += (((cardsTotalWidth - handWidth) / hand.length) + smallMargin * 1) * BS;
        let siblingIsHovered = false;
      }
    }

    if(hoveredCardIndex == cardCount){
      siblingIsHovered = true;
    }

    cardCount++;

    return (
      <Card
        key={ card.id }
        card={ card }
        handleClickCard={ handleClickCard }
        handleMouseEnterCard={ handleMouseEnterCard }
        handleMouseLeaveCard={ handleMouseLeaveCard }
        left={ left }
      />
    );

  });

  return(
    <section className="deck">
      <div key="drawPile" className="deck__drawPile">
        <DrawPile
          count={ drawPile.length }
        />
      </div>
      <div key="hand" className="deck__hand">
        { handJsx }
      </div>
      <div key="discardPile" className="deck__discardPile">
        <DiscardPile
          count={ discardPile.length }
        />
      </div>
    </section>
  );

}

export default cardSet;
