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
var MAX_HEIGHT = 630;
var MIN_HEIGHT = 130;
var PRICE_MIN = 10000;
var PRICE_MAX = 50000;
var PIN_WIDTH = 50 / 2;
var countNumber = 8;
var similarPinTemplate = document.querySelector('#pin')
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
  var locY = getRandomNumb(MIN_HEIGHT, MAX_HEIGHT);
  var locX = getRandomNumb(0 + PIN_WIDTH, mapWidth - PIN_WIDTH);

  var ads = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: 'Заголовок',
      address: locX + ', ' + locY,
      price: getRandomNumb(PRICE_MIN, PRICE_MAX),
      type: TYPE[getRandomIndex(TYPE)],
      rooms: getRandomNumb(1, 3),
      guests: getRandomNumb(1, 3),
      checkin: CHECKING_TIME[getRandomIndex(CHECKING_TIME)],
      checkout: CHECKING_TIME[getRandomIndex(CHECKING_TIME)],
      features: FEATURES.slice(getRandomIndex(FEATURES)),
      description: 'Описание',
      photos: PHOTOS.slice(getRandomIndex(PHOTOS)),
    },
    location: {
      x: locX,
      y: locY
    }
  };

  return ads;
};

// Временно убираем класс скрытия с .Map
document.querySelector('.map').classList.remove('map--faded');

// функция отрисовки метки
var renderPin = function (data) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.querySelector('img').src = data.author.avatar;
  pinElement.querySelector('img').alt = data.offer.title;
  pinElement.style = 'left: ' + data.location.x + 'px; top: ' + data.location.y + 'px;';

  return pinElement;
};

for (var i = 0; i < countNumber; i++) {
  pinFragment.appendChild(renderPin(generateData(i)));
}
mapPins.appendChild(pinFragment);
