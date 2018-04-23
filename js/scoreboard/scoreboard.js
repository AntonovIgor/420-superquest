import ScoreBoardView from './scoreboard-view';

export default class ScoreBoard {
  constructor(playerName) {
    this.view = new ScoreBoardView(playerName);
  }

  showScores(scores) {
    this.view.showScores(scores);
  }
}
