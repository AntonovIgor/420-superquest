export const createElement = (template = ``, tagName = `div`) => {
  const outer = document.createElement(tagName);
  outer.innerHTML = template;
  return outer;
};

const main = document.getElementById(`main`);

export const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};
