'use strict';

(function () {
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
  var PRICE_MIN = 10000;
  var PRICE_MAX = 50000;

  // функция для создания объекта
  var generateData = function (i) {
    var mapWidth = document.querySelector('.map__pins').offsetWidth;

    var locY = window.util.getRandomNumb(MIN_Y, MAX_Y);
    var locX = window.util.getRandomNumb(0, mapWidth);

    var ads = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Заголовок' + (i + 1),
        address: locX + ', ' + locY,
        price: window.util.getRandomNumb(PRICE_MIN, PRICE_MAX),
        type: TYPE[window.util.getRandomIndex(TYPE.length)],
        rooms: window.util.getRandomNumb(1, 3),
        guests: window.util.getRandomNumb(1, 3),
        checkin: CHECKING_TIME[window.util.getRandomIndex(CHECKING_TIME.length)],
        checkout: CHECKING_TIME[window.util.getRandomIndex(CHECKING_TIME.length)],
        features: FEATURES.slice(window.util.getRandomIndex(FEATURES.length)),
        description: 'Описание' + (i + 1),
        photos: PHOTOS.slice(window.util.getRandomIndex(PHOTOS.length)),
      },
      location: {
        x: locX,
        y: locY
      }
    };

    return ads;
  };

  window.data = {
    generateData: generateData
  };
})();
