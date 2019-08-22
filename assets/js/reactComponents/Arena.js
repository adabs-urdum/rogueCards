import React from 'react';
import Card from './Card.js';

const arena = props => {

  const deck = props.deck;
  const playedCards = deck.playedCards;
  const endedTurn = props.endedTurn;

  const playedCardsJsx = playedCards.map(card => {
    return(
      <Card
        key={ card.id }
        card={ card }
      />
    );
  });

  return(
    <section id="arena" className={ endedTurn ? 'arena arena--ended' : 'arena' }>
      { playedCardsJsx }
    </section>
  );

}

export default arena;
