import React from 'react';
import CountUp from 'react-countup';

const character = (props) => {

  const name = props.character.name;
  const health = props.character.health;
  const oldHealth = props.character.oldHealth;
  const maxHealth = props.character.maxHealth;
  const strength = props.character.strength;
  const block = props.character.block;
  const oldBlock = props.character.oldBlock;
  const containerClass = props.containerClass;
  const deck = props.character.deck;
  const blockChanged = props.character.blockChanged;
  const healthChanged = props.character.healthChanged;

  // const {forwardedRef, ...rest} = this.props;

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
        <li><h2>{ name }</h2></li>
        <li className="redHealth">Health: <span className={healthChanged ? 'animateScale' : null}>
            <CountUp
              duration={1.5}
              start={oldHealth}
              end={health}
            />
          </span>/{ maxHealth }</li>
        <li className="blueBlock">Block: <span className={blockChanged ? 'animateScale' : null}>
            <CountUp
              duration={1.5}
              start={oldBlock}
              end={block}
            />
          </span>
        </li>
        <li>{ deck ? 'Handsize: ' + deck.handsize : null }</li>
      </ul>
      { nextAttack ? nextAttack : null }
    </div>
  )
}

export default character;
