import {changeView} from './util';
import game from './game/game-screen';
import AbstractView from "./abstract-view";

export default class EndView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
<div class="end">
  <p>КОНЕЦ!</p>
  <p>Повторим?!</p>
  <div class="repeat"><span class="repeat-action">Да</span>|<span class="repeat-action">Не</a></div>
</div>`;
  }

  bind(element) {
    element.querySelector(`span.repeat-action`).onclick = (evt) => {
      evt.preventDefault();

      changeView(game);
    };
  }
}
