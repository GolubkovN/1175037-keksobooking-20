'use strict';

(function () {
  var PRICE_VALUES = {
    low: 'low',
    mid: 'middle',
    high: 'high'
  };

  var PRICE_BORDERS = {
    min: 10000,
    max: 50000
  };

  var housingType = window.util.mapFilter.querySelector('#housing-type');
  var housingPrice = window.util.mapFilter.querySelector('#housing-price');
  var housingRooms = window.util.mapFilter.querySelector('#housing-rooms');
  var housingGuests = window.util.mapFilter.querySelector('#housing-guests');
  var defaultValue = 'any';

  window.util.mapFilter.addEventListener('change', window.debounce(function () {
    window.map.closeCard();
    window.pinCreate.removePins();
    updatePins();
  }));

  var getFilteredElems = function (elements, callback, count) {
    var filteredElems = [];

    for (var i = 0; i < elements.length; i++) {
      if (callback(elements[i])) {
        filteredElems.push(elements[i]);
        if (filteredElems.length === count) {
          break;
        }
      }
    }
    return filteredElems;
  };

  var elemsFilter = function (it, elem, key) {
    return it.value === elem[key].toString() || it.value === defaultValue;
  };

  var filterByType = function (it) {
    return elemsFilter(housingType, it.offer, 'type');
  };

  var filterByPrice = function (it) {
    switch (housingPrice.value) {
      case PRICE_VALUES.low:
        return it.offer.price <= PRICE_BORDERS.min;
      case PRICE_VALUES.mid:
        return it.offer.price >= PRICE_BORDERS.min &&
               it.offer.price <= PRICE_BORDERS.max;
      case PRICE_VALUES.high:
        return it.offer.price >= PRICE_BORDERS.max;
      default:
        return true;
    }
  };

  var filterByRooms = function (it) {
    return elemsFilter(housingRooms, it.offer, 'rooms');
  };

  var filterByGuests = function (it) {
    return elemsFilter(housingGuests, it.offer, 'guests');
  };

  var filterByFeatures = function (it) {
    var checkedFeatures = Array.from(window.util.mapFilter.querySelectorAll('input[type="checkbox"]:checked'));

    return checkedFeatures.every(function (feature) {
      return it.offer.features.includes(feature.value, 0);
    });
  };

  var filters = [
    filterByType,
    filterByPrice,
    filterByRooms,
    filterByGuests,
    filterByFeatures
  ];

  var initFilters = function (it) {
    return filters.every(function (callback) {
      return callback(it);
    });
  };

  var updatePins = function () {
    window.pinCreate.insertPins(getFilteredElems(window.util.filteredOffers, initFilters, window.util.MAX_PINS_QUANTITY));
  };

  window.filter = {
    updatePins: updatePins
  };

})();

