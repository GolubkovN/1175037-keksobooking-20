'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;

  // Заполнение поля адреса
  var getAddressValue = function () {
    var pinX = window.util.mainPin.offsetLeft + Math.round(MAIN_PIN_WIDTH / 2);
    var pinY = Math.round(window.util.mainPin.offsetTop - MAIN_PIN_HEIGHT);

    var inputAddress = window.util.adForm.querySelector('#address');
    inputAddress.value = pinX + ', ' + pinY;
    inputAddress.setAttribute('readonly', 'readonly');
    inputAddress.classList.add('ad-form--disabled');
  };
  getAddressValue();

  // блокировка полей форм
  var disableForm = function (elements) {
    elements.forEach(function (element) {
      element.disabled = true;
    });
  };

  disableForm(window.util.fieldsets);
  disableForm(window.util.filterSelects);

  // разблокирование полей форм
  var activateForm = function (elements) {
    elements.forEach(function (element) {
      element.disabled = false;
    });
  };

  // Валидация поля заголовка объявления
  var adTitle = document.querySelector('#title');

  var getValidityTitle = function () {
    var titleValueLength = adTitle.value.length;
    if (adTitle.validity.tooShort) {
      adTitle.setCustomValidity('Камон, должно быть не меньше 30 символов! ' + 'Ещё ' + (window.util.MIN_TITLE_LENGTH - titleValueLength) + ' символов');
    } else if (adTitle.validity.tooLong) {
      adTitle.setCustomValidity('Нет-нет... Это уже перебор, максимум 100 симвалов! ' + 'Удалите лишние ' + (window.util.MAX_TITLE_LENGTH - titleValueLength) + ' символов');
    } else if (adTitle.validity.valueMissing) {
      adTitle.setCustomValidity('Это поле обязательно к заполнению!!!');
    } else {
      adTitle.setCustomValidity('');
    }
  };

  var onTitleChange = function () {
    getValidityTitle();
  };

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

  // Валидация времени заезды/выезда
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var onTimeInChange = function () {
    timeOut.value = timeIn.value;
  };

  var onTimeOutChange = function () {
    timeIn.value = timeOut.value;
  };

  var addEventListeners = function () {
    adTitle.addEventListener('change', onTitleChange);
    type.addEventListener('change', onTypeChange);
    roomQuantity.addEventListener('change', onRoomQuantityChange);
    roomCapacity.addEventListener('change', onRoomCapacityChange);
    timeIn.addEventListener('change', onTimeInChange);
    timeOut.addEventListener('change', onTimeOutChange);
  };
  addEventListeners();

  window.form = {
    getAddressValue: getAddressValue,
    validateRoomsValue: validateRoomsValue,
    getValidityTitle: getValidityTitle,
    activate: activateForm,
    disable: disableForm,
  };
})();
