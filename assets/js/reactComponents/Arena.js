import React from 'react';
import Card from './Card.js';

const arena = props => {

  const deck = props.deck;
  const playedCards = deck.playedCards;

  const playedCardsJsx = playedCards.map(card => {
    return(
      <Card
        key={ card.id }
        card={ card }
      />
    );
  });

  return(
    <section id="arena" className="arena">
      { playedCardsJsx }
    </section>
  );

}

export default arena;
