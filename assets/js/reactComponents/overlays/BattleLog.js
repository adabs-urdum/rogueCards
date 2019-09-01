import React, { Fragment } from 'react';
import Card from '../../vanillaComponents/cards/Card.js';

const battleLog = (props) => {

  const battleLogs = props.battleLogs;
  const setGold = props.setGold;

  const battleLog = battleLogs[battleLogs.length - 1];

  const heroName = battleLog.hero[0].name;
  const playedRounds = Object.keys(battleLog).filter(key => key.includes(heroName)).length;

  // filter out enemy attacks from battle log
  let playedCards = Object.keys(battleLog).map(key => {

    if(Array.isArray(battleLog[key])){
      const moves = battleLog[key].map(move => {
        if(move instanceof Card){
          return move;
        }
        else{
          return null;
        }
      });
      return moves.filter(move => {
        return move instanceof Card;
      });
    }
    else{
      return null;
    }

  }).filter(card => card != null);

  const monsterHealthSum = battleLog.monster.map(loopMonster => {
    return loopMonster.maxHealth;
  }).reduce((total, value) => total + value);

  playedCards = playedCards.flat();

  const lootGold = Math.floor(
    (playedCards.length * playedRounds / Math.PI /1.4) + monsterHealthSum / 10 * Math.random()
  );

  const lootXp = Math.floor(
    (playedCards.length * playedRounds * Math.PI / 1.7) + monsterHealthSum  / 10  * Math.random()
  );

  const battleLogJsx = (
    <Fragment>
      <div className="battleLog__stats">
        <p>You bravely survived <span>{ playedRounds }</span> rounds playing <span>{ playedCards.length }</span> cards.</p>
      </div>
      <div className="battleLog__loot_container">
        <h2 className="battleLog__title">Loot</h2>
        <p>Through your great deed you gained <span>{ lootXp }</span> XP.</p>
        <p>After the battle you searched the battlefield and found <span>{ lootGold }</span> scrap.</p>
      </div>
    </Fragment>
  );

  return(
    <section className="battleLog">
      <div className="battleLog__container">
        <h1>Battle Log</h1>
        { battleLogJsx }
        <button className="button" onClick={ () => props.toggleHeroStatsChanged(lootXp, lootGold, null) }>
          close
        </button>
      </div>
    </section>
  )
}

export default battleLog;
