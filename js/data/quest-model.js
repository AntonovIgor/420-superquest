import {
  INITIAL_GAME,
  changeLevel,
  die, tick
} from './quest';

import QUEST from './quest-data';

const getLevel = (state) => QUEST[`level-${state.level}`];

class QuestModel {
  constructor(playerName) {
    this.playerName = playerName;
    this.restart();
  }

  get state() {
    return this._state;
  }

  hasNextLevel() {
    return getLevel(this._state.level + 1) !== void 0;
  }

  nextLevel() {
    this._state = changeLevel(this._state, this._state.level + 1);
  }

  die() {
    this._state = die(this._state);
  }

  restart() {
    this._state = INITIAL_GAME;
  }

  isDead() {
    return this._state.lives <= 0;
  }

  getCurrentLevel() {
    return getLevel(this._state);
  }

  tick() {
    this._state = tick(this._state);
  }
}

export default QuestModel;
