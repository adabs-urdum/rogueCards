import React from 'react';

const info = (props) => {
  return(
    <section className="info">
      <p className="info__you" dangerouslySetInnerHTML={{ __html: 'your stats.<br>protect your health.<br>block can help you with that.<br>your playable cards.<br>all your cards.' }}></p>
      <p className="info__monster" dangerouslySetInnerHTML={{ __html: 'enemie\'s stats.' }}></p>
      <p className="info__ap" dangerouslySetInnerHTML={{ __html: 'your moves this turn.' }}></p>
      <p className="info__banish" dangerouslySetInnerHTML={{ __html: 'removed from this battle.' }}></p>
      <p className="info__discard" dangerouslySetInnerHTML={{ __html: 'played cards before shuffle.' }}></p>
      <p className="info__draw" dangerouslySetInnerHTML={{ __html: 'cards in your draw pile.' }}></p>
      <p className="info__hand" dangerouslySetInnerHTML={{ __html: 'cards you can play this turn.' }}></p>
      <p className="info__endturn" dangerouslySetInnerHTML={{ __html: 'end this turn.' }}></p>
      <p className="info__enemyattack" dangerouslySetInnerHTML={{ __html: 'enemie\'s move at the end of this turn.' }}></p>
    </section>
  )
}

export default info;
