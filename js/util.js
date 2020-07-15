'use strict';

(function () {
  var MAX_PINS_QUANTITY = 5;
  var MAXY = 630;
  var MINY = 130;
  var MAXX = document.querySelector('.map__overlay').offsetWidth;
  var MINX = 0;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mainPin = map.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var mapFilter = map.querySelector('.map__filters');
  var filterSelects = mapFilter.querySelectorAll('select');
  var fieldsets = adForm.querySelectorAll('fieldset');
  var filterContainer = map.querySelector('.map__filters-container');
  var filteredOffers = [];

  var getRandomIndex = function (arrLength) {
    return Math.floor(Math.random() * arrLength);
  };


  window.util = {
    getRandomIndex: getRandomIndex,
    map: map,
    adForm: adForm,
    mainPin: mainPin,
    mapPins: mapPins,
    mapFilter: mapFilter,
    filterSelects: filterSelects,
    fieldsets: fieldsets,
    filterContainer: filterContainer,
    maxY: MAXY,
    minY: MINY,
    maxX: MAXX,
    minX: MINX,
    MAX_PINS_QUANTITY: MAX_PINS_QUANTITY,
    filteredOffers: filteredOffers
  };
})();
