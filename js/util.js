'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mainPin = map.querySelector('.map__pin--main');

  var getRandomNumb = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getRandomIndex = function (arrLength) {
    return Math.floor(Math.random() * arrLength);
  };

  window.util = {
    getRandomNumb: getRandomNumb,
    getRandomIndex: getRandomIndex,
    map: map,
    adForm: adForm,
    mainPin: mainPin
  };
})();
