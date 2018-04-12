import gameScreen from './game/game-screen';
import {changeView} from './util';
import PreviewView from "./preview-view";

const preview = new PreviewView();

changeView(preview.element);

preview.onAgreeClick = () => {
  changeView(gameScreen);
};

