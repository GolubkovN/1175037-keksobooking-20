'use strict';

var TYPE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var CHECKING_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var MAX_Y = 630;
var MIN_Y = 130;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PRICE_MIN = 10000;
var PRICE_MAX = 50000;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var mapWidth = document.querySelector('.map__pins').offsetWidth;
var pinFragment = document.createDocumentFragment();
var map = document.querySelector('.map');

// функция генерации случайных чисел
var getRandomNumb = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// функция случайного индекса массива
var getRandomIndex = function (arrLength) {
  return Math.floor(Math.random() * arrLength);
};

// функция для создания объекта
var generateData = function (i) {
  var locY = getRandomNumb(MIN_Y, MAX_Y);
  var locX = getRandomNumb(0, mapWidth);

  var ads = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: 'Заголовок' + (i + 1),
      address: locX + ', ' + locY,
      price: getRandomNumb(PRICE_MIN, PRICE_MAX),
      type: TYPE[getRandomIndex(TYPE.length)],
      rooms: getRandomNumb(1, 3),
      guests: getRandomNumb(1, 3),
      checkin: CHECKING_TIME[getRandomIndex(CHECKING_TIME.length)],
      checkout: CHECKING_TIME[getRandomIndex(CHECKING_TIME.length)],
      features: FEATURES.slice(getRandomIndex(FEATURES.length)),
      description: 'Описание' + (i + 1),
      photos: PHOTOS.slice(getRandomIndex(PHOTOS.length)),
    },
    location: {
      x: locX,
      y: locY
    }
  };

  return ads;
};

// Функция создания массива
var generateMock = function (count) {
  var arr = [];
  for (var i = 0; i < count; i++) {
    arr.push(generateData(i));
  }
  return arr;
};
var arrObject = generateMock(8);

// функция отрисовки метки
var renderPin = function (data) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('img').src = data.author.avatar;
  pinElement.querySelector('img').alt = data.offer.title;
  pinElement.style.left = data.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = data.location.y - PIN_HEIGHT + 'px';

  return pinElement;
};

var generateObject = function () {
  for (var i = 0; i < arrObject.length; i++) {
    pinFragment.appendChild(renderPin(arrObject[i]));
  }
  mapPins.appendChild(pinFragment);
};

// Создание карточек объявлений
// var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// // функции для склонения слов
// var getGuestsValue = function (value) {
//   if (value === 1) {
//     return value + ' гостя';
//   } else {
//     return value + ' гостей';
//   }
// };

// var getRoomsValue = function (value) {
//   if (value === 1) {
//     return value + ' комната';
//   } else if (value <= 4) {
//     return value + ' комнаты';
//   } else {
//     return value + ' комнат';
//   }
// };

// var getFeature = function (arr, elem) {
//   var featureFragment = document.createDocumentFragment();

//   elem.innerHTML = '';

//   for (var i = 0; i < arr.length; i++) {
//     var featureItem = document.createElement('li');
//     featureItem.classList.add('popup__feature', 'popup__feature--' + arr[i]);
//     featureFragment.appendChild(featureItem);
//   }

//   elem.appendChild(featureFragment);
// };

// // Наполнение шаблона из объекта
// var fillAds = function (card) {
//   var cardElement = cardTemplate.cloneNode(true);
//   // объект с типом жилья
//   var apartment = {
//     flat: 'Кваритира',
//     house: 'Дом',
//     bungalo: 'Бунгало',
//     palace: 'Дворец'
//   };

//   // Поиск списка удобств
//   var features = cardElement.querySelector('.popup__features');
//   cardElement.querySelector('.popup__avatar').src = card.author.avatar;
//   cardElement.querySelector('.popup__title').textContent = card.offer.title;
//   cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
//   cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
//   cardElement.querySelector('.popup__type').textContent = apartment[card.offer.type];
//   cardElement.querySelector('.popup__text--capacity')
//   .textContent = getRoomsValue(card.offer.rooms) + ' для ' + getGuestsValue(card.offer.guests);
//   cardElement.querySelector('.popup__text--time')
//     .textContent = 'Заезд после ' + card.offer.checkin + ', ' + 'Выезд до ' + card.offer.checkout;
//   getFeature(card.offer.features, features);
//   cardElement.querySelector('.popup__description').textContent = card.offer.description;
//   var popupPhotos = cardElement.querySelector('.popup__photos');
//   var photo = popupPhotos.querySelector('img');
//   for (var i = 0; i < card.offer.photos.length; i++) {
//     var photoElem = photo.cloneNode(true);
//     photoElem.src = card.offer.photos[i];
//     popupPhotos.appendChild(photoElem);
//   }
//   photo.remove();

//   return cardElement;
// };

// var cardFragment = document.createDocumentFragment();
// var generateAd = function () {
//   for (var i = 0; i < arrObject.length; i++) {
//     cardFragment.appendChild(fillAds(arrObject[i]));
//   }
//   var filterContainer = map.querySelector('.map__filters-container');
//   map.insertBefore(cardFragment, filterContainer);
// };
// generateAd();

var adForm = document.querySelector('.ad-form');
var mainPin = map.querySelector('.map__pin--main');
var mapFilter = map.querySelector('.map__filters');
var filterSelects = mapFilter.querySelectorAll('select');

// Перевод страницы в активное состояние
var getActivePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
  generateObject();
  activateForm(fieldsets);
  activateForm(filterSelects);
  getAddressValue();
};

mainPin.addEventListener('mousedown', function (evt) {
  switch (evt.button) {
    case 0:
      getActivePage();
      break;
  }
});

// доступ к метке с клавиатуры
mainPin.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  switch (evt.key) {
    case 'Enter':
      getActivePage();
      break;
  }
});
var fieldsets = adForm.querySelectorAll('fieldset');

// блокировка полей форм
var disableForm = function (elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].disabled = true;
  }
};
disableForm(fieldsets);
disableForm(filterSelects);

// разблокирование полей форм
var activateForm = function (elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].disabled = false;
  }
};

// Заполнение поля адреса
var getAddressValue = function () {
  var pinCenterX = mainPin.offsetLeft + Math.round(MAIN_PIN_WIDTH / 2);
  var pinCenterY = Math.round(mainPin.offsetTop - MAIN_PIN_HEIGHT);

  var inputAddress = adForm.querySelector('#address');
  inputAddress.value = pinCenterX + ', ' + pinCenterY;
  inputAddress.disabled = true;
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
