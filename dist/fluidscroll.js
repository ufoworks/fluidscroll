"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory(root);
    });
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    module.exports = factory(root);
  } else {
    root.FluidScroll = factory(root);
  }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : void 0, function (window) {
  'use strict';

  var _this = this;

  var formatNumber = function formatNumber(number) {
    return Number(number.toFixed(2));
  };

  var defaults = {
    el: document.querySelector('main'),
    speed: 0.05,
    resizeFactor: 25,
    maxScale: 1.8,
    resizeBody: true,
    onAnimate: null
  };
  defaults.resizeSpeed = defaults.speed;

  var Constructor = function Constructor() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var settings = Object.assign({}, defaults, options);
    var scroll = {
      position: 0,
      lastPosition: 0,
      percent: 0,
      speed: 0
    };
    var el = {
      htmlInstance: settings.el,
      position: 0,
      scale: 1
    };

    var setupElement = function setupElement() {
      var htmlInstance = el.htmlInstance;
      Object.assign(htmlInstance.style, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        "will-change": "transform"
      });
    };

    var initEvents = function initEvents() {
      document.addEventListener('scroll', onScroll);
      settings.resizeBody && window.addEventListener('resize', resizeBody);
    };

    var onScroll = function onScroll() {
      scroll.position = window.pageYOffset || document.documentElement.scrollTop;
    };

    var resizeBody = function resizeBody() {
      var htmlInstance = el.htmlInstance;
      document.body.style.height = "".concat(htmlInstance.offsetHeight, "px");
    };

    var animate = function animate() {
      var resizeFactor = settings.resizeFactor,
          speed = settings.speed,
          maxScale = settings.maxScale,
          onAnimate = settings.onAnimate;
      scroll.speed = Math.abs(scroll.position - scroll.lastPosition);
      scroll.lastPosition = scroll.position;
      var elDistToScroll = scroll.position - el.position;
      var elScaleDistToScroll = Math.max(scroll.speed / resizeFactor, 1) - el.scale;
      el.position = el.position + elDistToScroll * speed;
      el.scale = el.scale + elScaleDistToScroll * speed;
      scroll.percent = scroll.position / (el.htmlInstance.offsetHeight - window.innerHeight);
      el.htmlInstance.style.transform = "translateY(-".concat(el.position, "px) scaleY(").concat(Math.min(el.scale, maxScale), ")");
      el.htmlInstance.style.transformOrigin = "50% ".concat(scroll.percent * 100, "%");

      if (onAnimate && Math.abs(elDistToScroll) > 1) {
        onAnimate.call(_this, {
          scroll: {
            position: formatNumber(scroll.position),
            percent: formatNumber(scroll.percent)
          },
          el: {
            position: formatNumber(el.position),
            scale: formatNumber(el.scale)
          }
        });
      }

      requestAnimationFrame(animate);
    };

    var init = function init() {
      setupElement();
      initEvents();
      settings.resizeBody && resizeBody();
      animate();
    };

    return {
      init: init,
      resizeBody: resizeBody
    };
  };

  return Constructor;
});