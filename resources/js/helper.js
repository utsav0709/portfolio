// Animation Helper
function promiseAnimate ({duration, timing, draw}) {
  return new Promise (function (resolve) {
    function animate ({duration, timing, draw}) {
      const start = performance.now();

      requestAnimationFrame(function animate(time) {
        var timeFraction = (time - start) / duration;
        if (timeFraction > 1) {
          timeFraction = 1;
          resolve(duration)
        }
        const progress = timing(timeFraction)

        draw(progress);
        if (timeFraction < 1) {
          requestAnimationFrame(animate)
        }
      })
    }
    animate({duration, timing, draw})
  })
}
// timing functions

function bounce(timeFraction) {
      for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
          return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
      }
    }
    function circ (timeFraction) {
      return 1 - Math.sin(Math.acos(timeFraction))
    }

    function linear (timeFraction) {
      return timeFraction
    }
    // getting coordinates of section
    function getTopCoordinates (elem) {
      return elem.getBoundingClientRect().top + pageYOffset;
    }

    // element visibility helper functions

    function isPartiallyVisible(el) {
          var elementBoundary = el.getBoundingClientRect();

          var top = elementBoundary.top;
          var bottom = elementBoundary.bottom;
          var height = elementBoundary.height;

          return ((top + height >= 0) && (height + window.innerHeight >= bottom));
        }

        function isFullyVisible(el) {
          var elementBoundary = el.getBoundingClientRect();

          var top = elementBoundary.top;
          var bottom = elementBoundary.bottom;

          return ((top >= 0) && (bottom <= window.innerHeight));
        }

        // mobile scroll disabler
        function preventDefault(e) {
          e = e || window.event;
          if (e.preventDefault)
              e.preventDefault();
          e.returnValue = false;
        }
function disable_scroll_mobile(){
  document.addEventListener('touchmove',preventDefault, false);
}
function enable_scroll_mobile(){
  document.removeEventListener('touchmove',preventDefault, false);
}
