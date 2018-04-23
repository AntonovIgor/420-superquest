import {
  INITIAL_GAME,
  changeLevel,
  die, tick
} from './quest';

class QuestModel {
  constructor(data, playerName) {
    this.data = data;
    this.playerName = playerName;
    this.restart();
  }

  get state() {
    return this._state;
  }

  hasNextLevel() {
    return this.getLevel(this._state.level + 1) !== void 0;
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

  getLevel(levelNumber) {
    return this.data[`level-${levelNumber}`];
  }

  getCurrentLevel() {
    return this.getLevel(this.state.level);
  }

  tick() {
    this._state = tick(this._state);
  }
}

export default QuestModel;
