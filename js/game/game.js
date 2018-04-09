import {createElement, changeView} from '../util';
import renderHeader from './header';
import renderLevel from './level';
import footer from './footer';
import {INITIAL_GAME, changeLevel} from '../data/quest';
import QUEST from '../data/quest-data';
import end from '../end';

let game = Object.assign({}, INITIAL_GAME);

const gameContainerElement = createElement();
const headerElement = createElement();
const levelElement = createElement();

// init game content
gameContainerElement.appendChild(headerElement);
gameContainerElement.appendChild(levelElement);
gameContainerElement.appendChild(footer);

const getLevel = () => QUEST[`level-${game.level}`];

const updateLevel = (num) => {
  game = changeLevel(game, num);

  headerElement.innerHTML = renderHeader(game);
  levelElement.innerHTML = renderLevel(getLevel(num));
};

// Load first level on start!
updateLevel(0);

document.onkeydown = (evt) => {
  if (evt.keyCode === 13) {
    const next = game.level + 1;
    if (getLevel(next)) {
      updateLevel(next);
    } else {
      updateLevel(0);
      changeView(end);
    }
  }
};

export default gameContainerElement;
