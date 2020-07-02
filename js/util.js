'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mainPin = map.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var mapFilter = map.querySelector('.map__filters');
  var filterSelects = mapFilter.querySelectorAll('select');
  var fieldsets = adForm.querySelectorAll('fieldset');

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
    mainPin: mainPin,
    mapPins: mapPins,
    mapFilter: mapFilter,
    filterSelects: filterSelects,
    fieldsets: fieldsets
  };
})();
