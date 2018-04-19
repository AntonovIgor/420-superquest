import AbstractView from '../abstract-view';
import Application from '../application';

class StatsScreen extends AbstractView {

  constructor(model) {
    super();
    this.playerName = model.playerName;
    this.stats = model.state;
  }

  get template() {
    return `
      <div class="end">
        <p>Ну что ж, ${this.playerName}?! Вот и закончились твои приключения =(<br>
        А вот немного статистики о тебе: <br>
        Прошел за: ${this.stats.time}<br>
        Осталось жизней: ${this.stats.lives}<br>
        Дошел до уровня: ${this.stats.level}<br>
        <p>Начнем по новой?</p>
        <div class="repeat"><span class="repeat-action">Да</span></div>
      </div>`;
  }


  bind() {
    this.element.querySelector(`span.repeat-action`).onclick = (evt) => {
      evt.preventDefault();

      Application.showGame();
    };
  }
}

export default StatsScreen;
