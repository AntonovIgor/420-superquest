import {createElement, changeView, updateView} from '../util';
import {INITIAL_GAME, changeLevel, canContinue, die, Result} from '../data/quest';
import QUEST from '../data/quest-data';
import FooterView from "./footer-view";
import HeaderView from "./header-view";
import LevelView from "./level-view";
import EndView from "../end-view";

let gameState = Object.assign({}, INITIAL_GAME);

const gameContainerElement = createElement();
const headerContainer = createElement();
const levelContainer = createElement();

// init game content
gameContainerElement.appendChild(headerContainer);
gameContainerElement.appendChild(levelContainer);
gameContainerElement.appendChild(new FooterView().element);

const getLevel = () => QUEST[`level-${gameState.level}`];

const end = new EndView().element;

const onUserAnswer = (answer) => {
  const result = answer.result;
  switch (result) {
    case Result.DIE:
      gameState = die(gameState);
      break;
    case Result.WIN:
      changeView(end);
      break;
    case Result.NEXT_LEVEL:
      gameState = changeLevel(gameState, gameState.level + 1);
      break;
    case Result.NOOP:
      // just do nothing
      break;
    default:
      throw new Error(`Unknown result: ${result}`);
  }
  if (!canContinue(gameState)) {
    changeView(end);
  } else {
    updateGame(gameState);
  }
};

const updateGame = (state) => {
  updateView(headerContainer, new HeaderView(state));
  const level = new LevelView(getLevel(state.level));
  updateView(levelContainer, level);
  level.focus();
  level.onAnswer = onUserAnswer;
};

// Load first level on start!
updateGame(gameState);

export default gameContainerElement;
