import WelcomeScreen from './welcome/welcome-screen';
import GameScreen from './game/game-screen';
import QuestModel from './data/quest-model';
import StatsScreen from './stats/stats-screen';

const main = document.getElementById(`main`);
const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};


export default class Application {

  static showWelcome() {
    const welcome = new WelcomeScreen();
    changeView(welcome.element);
  }

  static showGame() {
    const gameScreen = new GameScreen(new QuestModel());
    changeView(gameScreen.element);
    gameScreen.startGame();
  }

  static showStats(model) {
    const statistics = new StatsScreen(model.state);
    changeView(statistics.element);
  }

}
