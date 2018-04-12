import {createElement} from "../util";
import AbstractView from "../abstract-view";

const FOOTER_ELEMENT = createElement(`
<div class="result"></div>
<small>Для справки введите <i>help</i></small>`, `footer`);

export default class FooterView extends AbstractView {
  constructor() {
    super();
  }

  get element() {
    return FOOTER_ELEMENT;
  }
}
