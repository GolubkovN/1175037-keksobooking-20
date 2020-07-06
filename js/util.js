'use strict';

(function () {
  var offersToFilter = [];
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mainPin = map.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var mapFilter = map.querySelector('.map__filters');
  var filterSelects = mapFilter.querySelectorAll('select');
  var fieldsets = adForm.querySelectorAll('fieldset');
  var filterContainer = map.querySelector('.map__filters-container');
  var maxY = 630;
  var minY = 130;
  var maxX = document.querySelector('.map__overlay').offsetWidth;
  var minX = 0;

  var getRandomNumb = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getRandomIndex = function (arrLength) {
    return Math.floor(Math.random() * arrLength);
  };


  window.util = {
    getRandomNumb: getRandomNumb,
    getRandomIndex: getRandomIndex,
    offersToFilter: offersToFilter,
    map: map,
    adForm: adForm,
    mainPin: mainPin,
    mapPins: mapPins,
    mapFilter: mapFilter,
    filterSelects: filterSelects,
    fieldsets: fieldsets,
    filterContainer: filterContainer,
    maxY: maxY,
    minY: minY,
    maxX: maxX,
    minX: minX
  };
})();
