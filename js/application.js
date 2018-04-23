import WelcomeScreen from './welcome/welcome-screen';
import GameScreen from './game/game-screen';
import QuestModel from './data/quest-model';
import SplashScreen from './splash/splash-screen';
import ErrorView from "./error/error-screen";
import Loader from "./loader";
import ScoreBoard from "./scoreboard/scoreboard";

const main = document.getElementById(`main`);
const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

let questData;
export default class Application {

  static start() {
    const splash = new SplashScreen();
    changeView(splash.element);
    splash.start();
    Loader.loadData().
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
    const playerName = model.playerName;
    const scoreBoard = new ScoreBoard(playerName);
    changeView(scoreBoard.view.element);
    Loader.saveResults(model.state, playerName).
      then(() => Loader.loadResults(playerName)).
      then((data) => scoreBoard.showScores(data)).
      catch(Application.showError);
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    changeView(errorView.element);
  }

}
