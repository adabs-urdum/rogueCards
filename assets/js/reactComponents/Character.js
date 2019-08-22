import React from 'react';

const character = (props) => {

  const name = props.character.name;
  const health = props.character.health;
  const maxHealth = props.character.maxHealth;
  const strength = props.character.strength;
  const block = props.character.block;
  const containerClass = props.containerClass;
  const deck = props.character.deck;
  let nextAttack = props.nextAttack;

  if(nextAttack){
    nextAttack = (
      <div className="characters__next_attack">
        <h4>Next enemy attack</h4>
        <p className="redHealth">ATK: { nextAttack.attack }</p>
        <p className="blueBlock">BLK: { nextAttack.block }</p>
      </div>
    );
  }

  return(
    <div className={ containerClass }>
      <ul>
        <li><h3>{ name }</h3></li>
        <li className="redHealth">Health: { health }/{ maxHealth }</li>
        <li className="blueBlock">Block: { block }</li>
        <li>Strength: { strength }</li>
        <li>{ deck ? 'Handsize: ' + deck.handsize : null }</li>
      </ul>
      { nextAttack ? nextAttack : null }
    </div>
  )
}

export default character;
