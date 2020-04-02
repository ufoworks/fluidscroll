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
  const formatNumber = (number) => Number(number.toFixed(2))
  const defaults = {
    el: document.querySelector('main'),
    speed: 0.05,
    resizeFactor: 25,
    resizeBody: true,
    maxScale: 1.8,
    onAnimate: null,
  }
  defaults.resizeSpeed = defaults.speed
  const Constructor = (options = {}) => {
    const settings = Object.assign({}, defaults, options)
    const scroll = {
      position: 0,
      lastPosition: 0,
      percent: 0,
      speed: 0,
    }
    const el = {
      htmlInstance: settings.el,
      position: 0,
      scale: 1,
    }
    const initEvents = () => {
      document.addEventListener('scroll', onScroll)
      settings.resizeBody && window.addEventListener('resize', resizeBody)
    }
    const onScroll = () => {
      scroll.position = window.pageYOffset || document.documentElement.scrollTop
    }
    const resizeBody = () => {
      const { htmlInstance } = el
      document.body.style.height = `${htmlInstance.offsetHeight}px`
    }
    const animate = () => {
      const { resizeFactor, speed, resizeSpeed, maxScale, onAnimate } = settings

      scroll.speed = Math.abs(scroll.position - scroll.lastPosition)
      scroll.lastPosition = scroll.position

      const elDistToScroll = scroll.position - el.position
      const elScaleDistToScroll = Math.max(scroll.speed / resizeFactor, 1) - el.scale
      
      el.position = el.position + elDistToScroll * speed
      el.scale = el.scale + elScaleDistToScroll * resizeSpeed
      scroll.percent = scroll.position / (el.htmlInstance.offsetHeight - window.innerHeight)

      el.htmlInstance.style.transform = `translateY(-${el.position}px) scaleY(${Math.min(el.scale, maxScale)})`
      el.htmlInstance.style.transformOrigin = `50% ${scroll.percent * 100}%`

      if (onAnimate && Math.abs(elDistToScroll) > 1) {
        onAnimate.call(this, {
          scroll: {
            position: formatNumber(scroll.position),
            percent: formatNumber(scroll.percent)
          },
          el: {
            position: formatNumber(el.position),
            scale: formatNumber(el.scale)
          }
        })
      }
      requestAnimationFrame(animate)
    }
    const init = () => {
      initEvents()
      settings.resizeBody && resizeBody()
      animate()
    }

    return {
      init,
      resizeBody
    }
  }
  return Constructor
});