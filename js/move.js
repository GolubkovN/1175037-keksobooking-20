'use strict';

(function () {
  window.util.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var Coordslimits = {
      left: window.util.minX - window.util.mainPin.offsetHeight / 2,
      right: window.util.maxX - window.util.mainPin.offsetWidth / 2,
      top: window.util.minY + window.util.mainPin.offsetHeight - window.form.MAIN_PIN_HEIGHT,
      bottom: window.util.maxY + window.util.mainPin.offsetHeight - window.form.MAIN_PIN_HEIGHT
    };

    var checkCoords = function () {
      if (window.util.mainPin.offsetLeft <= Coordslimits.left) {
        window.util.mainPin.style.left = Coordslimits.left + 'px';
      }
      if (window.util.mainPin.offsetLeft >= Coordslimits.right) {
        window.util.mainPin.style.left = Coordslimits.right + 'px';
      }
      if (window.util.mainPin.offsetTop <= Coordslimits.top) {
        window.util.mainPin.style.top = Coordslimits.top + 'px';
      }
      if (window.util.mainPin.offsetTop >= Coordslimits.bottom) {
        window.util.mainPin.style.top = Coordslimits.bottom + 'px';
      }
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.util.mainPin.style.top = (window.util.mainPin.offsetTop - shift.y) + 'px';
      window.util.mainPin.style.left = (window.util.mainPin.offsetLeft - shift.x) + 'px';
      window.form.getAddressValue();
      checkCoords();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
