import AbstractView from '../abstract-view';
import Application from '../application';

export default class ScoreBoardView extends AbstractView {

  get template() {
    return `
<div class="end">
  <div class="scoreboard">Scoreboard is loading...</div>
  <br>
  <div class="repeat"><span class="repeat-action">Сыграть заново</span>&nbsp;|&nbsp;<a class="repeat-action" href="https://google.com">Выйти</a>🐌</div>
</div>`;
  }

  bind() {
    this.element.querySelector(`span.repeat-action`).onclick = (evt) => {
      evt.preventDefault();
      this.onRepeat();
    };

    this._scoreBoardContainer = this.element.querySelector(`div.scoreboard`);
  }

  showScores(scores) {
    this._scoreBoardContainer.innerHTML = `
<h1>Мои лучшие результаты</h1>

<table class="scores">
  ${scores.map((it, i) => `<tr>
    <td><small>${i + 1}.</small></td>
    <td style="text-align: right;">${it.time} сек</td>
    <td>${new Array(3 - it.lives).fill(`💔`).concat(new Array(it.lives).fill(`❤️`)).join(``)}</td>
    <td>${new Intl.DateTimeFormat(`ru-RU`).format(new Date(it.date))}</td>
  </tr>`).join(``)}
</table>`;
  }

  onRepeat() {
    Application.start();
  }
}
