import Component from "./component";

const React = {
  createElement,
  Component,
};

function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children,
    key: attrs.key || null, 
  };
}

export default React;
