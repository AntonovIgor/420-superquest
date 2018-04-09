import {createElement, changeView} from '../util';
import renderHeader from './header';
import renderLevel from './level';
import footer from './footer';
import {INITIAL_GAME, changeLevel, canContinue, die} from '../data/quest';
import QUEST from '../data/quest-data';
import end from '../end';

const ENTER_KEY_CODE = 13;
let game;

const resetGame = () => {
  game = Object.assign({}, INITIAL_GAME);
};

const gameContainerElement = createElement();
const headerElement = createElement();
const levelElement = createElement();

// init game content
gameContainerElement.appendChild(headerElement);
gameContainerElement.appendChild(levelElement);
gameContainerElement.appendChild(footer);

levelElement.addEventListener(`keydown`, ({keyCode}) => {
  if (keyCode === ENTER_KEY_CODE) {
    const current = getLevel(game.level);
    const {value = ``} = levelElement.querySelector(`input`);
    const userAnswer = value.toUpperCase();
    for (const answer of current.answers) {
      if (userAnswer === answer.action.toUpperCase()) {
        const nextLevel = answer.go();
        try {
          game = changeLevel(game, nextLevel);
        } catch (e) {
          if (canContinue(game)) {
            game = die(game);
          } else {
            resetGame();
            changeView(end);
          }
        }
        updateGame(game);
      }
    }
  }
});

const getLevel = () => QUEST[`level-${game.level}`];

const updateGame = (state) => {
  headerElement.innerHTML = renderHeader(state);
  levelElement.innerHTML = renderLevel(getLevel(state.level));
};

// Load first level on start!
resetGame();
updateGame(game);

export default gameContainerElement;
