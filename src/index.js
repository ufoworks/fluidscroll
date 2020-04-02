(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory(root);
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root.FluidScroll = factory(root);
  }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {

  'use strict';
  const defaults = {
    el: document.querySelector('main'),
    speed: 0.05,
  }
  const Constructor = (options = {}) => {
    this.settings = Object.assign({}, defaults, options)
  }
  return Constructor
});