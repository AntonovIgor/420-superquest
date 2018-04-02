import {createElement, changeView} from './util';
import renderHeader from './game/header';
import renderLevel from './game/game-level';
import {INITIAL_GAME, changeLevel} from './data/quest';
import QUEST from './data/quest-data';
import end from './end';

const footer = `<div class="result"></div>
<small>Для справки введите <i>help</i></small></ul>`;

let element;

let game = Object.assign({}, INITIAL_GAME);

const getLevel = () => QUEST[`level-${game.level}`];

const updateLevel = (num) => {
  game = changeLevel(game, num);
  const level = getLevel(num);

  element = createElement(`
          ${renderHeader(game)}
          ${renderLevel(level)}
          ${footer}`);
  return element;
};

// Load first level on start!
element = updateLevel(0);

document.onkeydown = (evt) => {
  if (evt.keyCode === 13) {
    const next = game.level + 1;
    if (getLevel(next)) {
      changeView(updateLevel(next));
    } else {
      updateLevel(0);
      changeView(end);
    }
  }
};

export default element;
