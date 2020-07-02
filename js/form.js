'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;

  // Заполнение поля адреса
  var getAddressValue = function () {
    var pinCenterX = window.util.mainPin.offsetLeft + Math.round(MAIN_PIN_WIDTH / 2);
    var pinCenterY = Math.round(window.util.mainPin.offsetTop - MAIN_PIN_HEIGHT);

    var inputAddress = window.util.adForm.querySelector('#address');
    inputAddress.value = pinCenterX + ', ' + pinCenterY;
    inputAddress.disabled = true;
  };

  // блокировка полей форм
  var disableForm = function (elem) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].disabled = true;
    }
  };
  disableForm(window.util.fieldsets);
  disableForm(window.util.filterSelects);

  // разблокирование полей форм
  var activateForm = function (elem) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].disabled = false;
    }
  };

  // Валидация поля заголовка объявления
  var adTitle = document.querySelector('#title');

  var getValidityTitle = function () {
    var MIN_TITLE_LENGTH = 30;
    var MAX_TITLE_LENGTH = 100;
    var titleValueLength = adTitle.value.length;
    if (adTitle.validity.tooShort) {
      adTitle.setCustomValidity('Камон, должно быть не меньше 30 символов! ' + 'Ещё ' + (MIN_TITLE_LENGTH - titleValueLength) + ' символов');
    } else if (adTitle.validity.tooLong) {
      adTitle.setCustomValidity('Нет-нет... Это уже перебор, максимум 100 симвалов! ' + 'Удалите лишние ' + (MAX_TITLE_LENGTH - titleValueLength) + ' символов');
    } else if (adTitle.validity.valueMissing) {
      adTitle.setCustomValidity('Это поле обязательно к заполнению!!!');
    } else {
      adTitle.setCustomValidity('');
    }
  };

  var onTitleChange = function () {
    getValidityTitle();
  };

  adTitle.addEventListener('change', onTitleChange);

  // Валидация типа жилья и минимальной цены
  var price = document.querySelector('#price');
  var type = document.querySelector('#type');
  var minPrice = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  var getMinPrice = function () {
    price.min = price.placeholder = minPrice[type.value];
  };

  var onTypeChange = function () {
    getMinPrice();
  };
  type.addEventListener('change', onTypeChange);

  // Валидация Кол-ва комнат и гостей
  var roomQuantity = document.querySelector('#room_number');
  var roomCapacity = document.querySelector('#capacity');

  var roomsAndGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0'],
  };

  var validateRoomsValue = function () {
    var guestsOptions = roomsAndGuests[roomQuantity.value];
    var errorMessage = '';

    if (guestsOptions.indexOf(roomCapacity.value) === -1) {
      switch (roomQuantity.value) {
        case '1':
          errorMessage = 'только для  1го гостя';
          break;
        case '2':
          errorMessage = 'только 2х или 1го гостя';
          break;
        case '3':
          errorMessage = 'Можно выбрать 3х, 2х или 1го гостя';
          break;
        case '100':
          errorMessage = 'Не для гостей';
          break;
        default:
          errorMessage = 'Не верно заполнено поле';
          break;
      }
    }
    roomCapacity.setCustomValidity(errorMessage);
  };

  var onRoomQuantityChange = function () {
    validateRoomsValue();
  };

  var onRoomCapacityChange = function () {
    validateRoomsValue();
  };

  roomQuantity.addEventListener('change', onRoomQuantityChange);
  roomCapacity.addEventListener('change', onRoomCapacityChange);

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var checkTimeIn = function () {
    timeOut.value = timeIn.value;
  };

  var checkTimeOut = function () {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener('change', checkTimeIn);
  timeOut.addEventListener('change', checkTimeOut);


  window.form = {
    getAddressValue: getAddressValue,
    validateRoomsValue: validateRoomsValue,
    getValidityTitle: getValidityTitle,
    activate: activateForm
  };
})();
