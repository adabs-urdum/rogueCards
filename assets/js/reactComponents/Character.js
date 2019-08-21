import React from 'react';

const character = (props) => {

  const name = props.character.name;
  const health = props.character.health;
  const strength = props.character.strength;
  const block = props.character.block;
  const containerClass = props.containerClass;
  let nextAttack = props.nextAttack;

  if(nextAttack){
    nextAttack = <li>ATK: { nextAttack.attack }, BLK: { nextAttack.block }</li>;
  }

  return(
    <div className={ containerClass }>
      <ul>
        <li>{ name }</li>
        <li>Health: { health }</li>
        <li>Block: { block }</li>
        <li>Strength: { strength }</li>
        { nextAttack ? nextAttack : null }
      </ul>
    </div>
  )
}

export default character;
