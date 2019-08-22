import React, { Fragment } from 'react';
import Card from '../Card.js';
import DrawPile from './DrawPile.js';
import Ap from './AP.js';
import BanishPile from './BanishPile.js';
import DiscardPile from './DiscardPile.js';
import Pile from './Pile.js';
import Button from '../uiElements/Button.js';

const cardSet = (props) => {

  const drawPile = props.drawPile;
  const hand = props.hand;
  const playedCards = props.playedCards;
  const discardPile = props.discardPile;
  const banishPile = props.banishPile;
  const handleClickCard = props.handleClickCard;
  const handleMouseEnterCard = props.handleMouseEnterCard;
  const handleMouseLeaveCard = props.handleMouseLeaveCard;
  const cardWidth = props.cardWidth;
  const handWidth = props.handWidth;
  const BS = props.BS;
  const endTurn = props.endTurn;
  const endedTurn = props.endedTurn;
  const ap = props.ap;
  const maxAp = props.maxAp;

  const flashAP = props.flashAP;
  const flashEndTurn = props.flashEndTurn;

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
      <Button
        classes="button--endTurn deck__endTurn"
        text="End turn"
        onclick={ endTurn }
        disabled={ endedTurn }
        flash={ flashEndTurn }
      />
      <div key="drawPile" className="deck__drawPile">
        <Pile
          text={ ap }
          textSuffix={ '/' + maxAp }
          type="ap"
          title="ap"
          flash={ flashAP }
        />
        <Pile
          text={ drawPile.length }
          type="draw"
          title="draw"
        />
      </div>
      <div key="hand" className={ endedTurn ? 'deck__hand deck__hand--ended' : 'deck__hand' }>
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
          type="discard"
          title="discard"
        />
      </div>
    </section>
  );

}

export default cardSet;
