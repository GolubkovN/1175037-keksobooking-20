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
// var countNumber = 8;
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var mapWidth = document.querySelector('.map__pins').offsetWidth;
var pinFragment = document.createDocumentFragment();

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

// Временно убираем класс скрытия с .Map
var map = document.querySelector('.map');
map.classList.remove('map--faded');

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
};
generateObject();

mapPins.appendChild(pinFragment);

// Создание карточек объявлений
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// функции для склонения слов
var getGuestsValue = function (value) {
  if (value === 1) {
    return value + ' гостя';
  } else {
    return value + ' гостей';
  }
};

var getRoomsValue = function (value) {
  if (value === 1) {
    return value + ' комната';
  } else if (value <= 4) {
    return value + ' комнаты';
  } else {
    return value + ' комнат';
  }
};

var getFeature = function (arr, elem) {
  var featureFragment = document.createDocumentFragment();

  elem.innerHTML = '';

  for (var i = 0; i < arr.length; i++) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature', 'popup__feature--' + arr[i]);
    featureFragment.appendChild(featureItem);
  }

  elem.appendChild(featureFragment);
};
// Наполнение шаблона из объекта
var renderAd = function (card) {
  var cardElement = cardTemplate.cloneNode(true);
  // объект с типом жилья
  var apartment = {
    flat: 'Кваритира',
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец'
  };
  // Поиск списка удобств
  var features = cardElement.querySelector('.popup__features');
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = apartment[card.offer.type];
  cardElement.querySelector('.popup__text--capacity')
  .textContent = getRoomsValue(card.offer.rooms) + ' для ' + getGuestsValue(card.offer.guests);
  cardElement.querySelector('.popup__text--time')
    .textContent = 'Заезд после ' + card.offer.checkin + ', ' + 'Выезд до ' + card.offer.checkout;
  getFeature(card.offer.features, features);
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  var popupPhotos = cardElement.querySelector('.popup__photos');
  var photo = popupPhotos.querySelector('img');
  for (var i = 0; i < card.offer.photos.length; i++) {
    var photoElem = photo.cloneNode(true);
    photoElem.src = card.offer.photos[i];
    popupPhotos.appendChild(photoElem);
  }
  photo.remove();

  return cardElement;
};

var cardFragment = document.createDocumentFragment();
for (var i = 0; i < arrObject.length; i++) {
  cardFragment.appendChild(renderAd(arrObject[i]));
}
var filterContainer = map.querySelector('.map__filters-container');
map.insertBefore(cardFragment, filterContainer);

