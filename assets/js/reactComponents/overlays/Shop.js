import React from 'react';
import CountUp from 'react-countup';
import Card from '../Card.js';

const shop = (props) => {

  const hero = props.hero;
  const shopCards = props.shopCards;
  let counter = 0;

  const shopCardsJsx = shopCards.map(card => {

    counter += 1;

    const cardInDeck = hero.deck.deck.find(loopCard => loopCard.id == card.id );

    const soldButtonText = 'sold';
    let buyButtonText = hero.gold < card.price ? 'too expensive' : 'buy';
    buyButtonText = cardInDeck ? soldButtonText : buyButtonText;

    return(
      <Card
        classes={ cardInDeck ? 'card--bought' : null }
        key={ card.id + counter}
        card={ card }
        handleClickCard={ () => {} }
      >
        <div className="shop__cardOverlay">
          { buyButtonText == soldButtonText ? null : <p>Price: { card.price } gold</p> }
          <button disabled={ buyButtonText != 'buy' } onClick={ () => props.buyCard(card) } className="button">{ buyButtonText }</button>
        </div>
      </Card>
    )

  });

  return(
    <section className="shop">
      <div className="shop__wrapper">
        <h1>Welcome, stranger!</h1>
        <p>New cards after every battle.</p>
        <div className="viewCharacter__xp_container">
          <h3>You have <span><CountUp
            start={hero.goldBefore}
            end={hero.gold}
            duration={Math.random() + 0.5}
          /></span> gold and <span><CountUp
            start={hero.healthBefore}
            end={hero.health}
            duration={Math.random() + 0.5}
          /></span>/<span><CountUp
            start={hero.maxHealthBefore}
            end={hero.maxHealth}
            duration={Math.random() + 0.5}
          /></span> health.</h3>
        </div>
        <div className="shop__cardswrapper">
          { shopCardsJsx }
        </div>
        <div className="shop__controls">
          <button className="button" disabled={ hero.health >= hero.maxHealth || hero.gold < 20 } onClick={ () => props.buyHealth(5, 20) }>Heal 5 for 20 gold</button>
          <button className="button" disabled={ hero.gold < 40 } onClick={ () => props.buyMaxHealth(5, 40) }>Gain 5 max health for 40 gold</button>
          <button className="button" onClick={ props.toggleShop }>close</button>
        </div>
      </div>
    </section>
  );
}

export default shop;
