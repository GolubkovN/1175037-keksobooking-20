'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var DEBOUNCE_INTERVAL = 500;
  var MAX_PINS_QUANTITY = 5;
  var MAX_Y = 630;
  var MIN_Y = 130;
  var MAX_X = document.querySelector('.map__overlay').offsetWidth;
  var MIN_X = 0;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mainPin = map.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var mapFilter = map.querySelector('.map__filters');
  var filterSelects = mapFilter.querySelectorAll('select');
  var fieldsets = adForm.querySelectorAll('fieldset');
  var filterContainer = map.querySelector('.map__filters-container');
  var filteredOffers = [];

  window.util = {
    map: map,
    adForm: adForm,
    mainPin: mainPin,
    mapPins: mapPins,
    mapFilter: mapFilter,
    filterSelects: filterSelects,
    fieldsets: fieldsets,
    filterContainer: filterContainer,
    maxY: MAX_Y,
    minY: MIN_Y,
    maxX: MAX_X,
    minX: MIN_X,
    MAX_PINS_QUANTITY: MAX_PINS_QUANTITY,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    MIN_TITLE_LENGTH: MIN_TITLE_LENGTH,
    MAX_TITLE_LENGTH: MAX_TITLE_LENGTH,
    filteredOffers: filteredOffers
  };
})();
