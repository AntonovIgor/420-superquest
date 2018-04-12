export const createElement = (template = ``, tagName = `div`) => {
  const outer = document.createElement(tagName);
  outer.innerHTML = template.trim();
  return outer;
};

const main = document.getElementById(`main`);

export const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

export const updateView = (parent, view) => {
  parent.innerHTML = ``;
  parent.appendChild(view.element);
};
