const createElement = (tag, options) => {
  const element = document.createElement(tag);
  return Object.assign(element, options);
};

export default createElement;