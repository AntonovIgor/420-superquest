import WelcomeScreen from './welcome/welcome-screen';
import GameScreen from './game/game-screen';
import QuestModel from './data/quest-model';
import StatsScreen from './stats/stats-screen';
import SplashScreen from './splash/splash-screen';
import ErrorView from "./error/error-screen";
import {adaptServerData} from "./data/data-adapter";

const main = document.getElementById(`main`);
const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};


let questData;
export default class Application {

  static start() {
    const splash = new SplashScreen();
    changeView(splash.element);
    splash.start();
    window.fetch(`https://es.dump.academy/text-quest/quest`).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => adaptServerData(data)).
      then(Application.showWelcome).
      catch(Application.showError).
      then(() => splash.stop());
  }

  static showWelcome(data) {
    questData = data;
    const welcome = new WelcomeScreen();
    changeView(welcome.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen(new QuestModel(questData, playerName));
    changeView(gameScreen.element);
    gameScreen.startGame();
  }

  static showStats(model) {
    const statistics = new StatsScreen(model);
    changeView(statistics.element);
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    changeView(errorView.element);
  }

}
