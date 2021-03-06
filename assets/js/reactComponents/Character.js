import React from 'react';
import CountUp from 'react-countup';

const character = (props) => {

  const name = props.character.name;
  const health = props.character.health;
  const oldHealth = props.character.oldHealth;
  const maxHealth = props.character.maxHealth;
  const strength = props.character.strength;
  const block = props.character.block;
  const blockBefore = props.character.blockBefore;
  const containerClass = props.containerClass;
  const deck = props.character.deck;
  const blockChanged = props.character.blockChanged;
  const healthChanged = props.character.healthChanged;
  const fleetSize = props.character.fleetSize;

  const healthBarWidth = 100 / maxHealth * health;
  const healthBarStyles = {
    width: healthBarWidth + '%',
  };

  const BlockBarWidth = 100 / health * block;
  const blockBarStyles = {
    width: BlockBarWidth + '%',
  };

  let nextAttack = props.nextAttack;

  if(nextAttack){
    nextAttack = (
      <div id="MonsterNextAttack" className="characters__next_attack">
        <h4>Next attack</h4>
        <p className="redHealth">ATK: { nextAttack.attack }</p>
        <p className="blueBlock">BLK: { nextAttack.block }</p>
      </div>
    );
  }

  return(
    <div className={ containerClass }>
      <ul>
        <li><h2>{ name }</h2></li>
        <li className="characters__health_bar_wrapper">
          <span className="characters__health_bar">
            <span className="characters__health_bar_health" style={ healthBarStyles }>
              <span className="characters__health_bar_block" style={ blockBarStyles }></span>
            </span>
          </span>
        </li>
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
              start={blockBefore}
              end={block}
            />
          </span>
        </li>
        <li>{ deck ? 'Handsize: ' + deck.handsize : null }</li>
        <li>{ deck ? 'Decksize: ' + deck.decksize : null }</li>
        <li>{ 'Fleetsize: ' + fleetSize }</li>
      </ul>
      { nextAttack ? nextAttack : null }
    </div>
  )
}

export default character;
