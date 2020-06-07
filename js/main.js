'use strict';

var QUANTITY_COUNT = 8;

var AVATAR = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var TITLE = [
  'Уютное гнездышко для молодоженов',
  'Брутальный ЛОФТ',
  'Тупо однушка',
  'Квартирка с атмосферой',
  'Шикарные апартоменты',
  'Холостяцкая берлога',
  'Сдам квартиру дорого',
  'Крутая точка для вписки'
];

var TYPE = [
  'palace',
  'flat',
  'hous',
  'bungalo'
];

var CHECKIN = ['12:00', '13:00', '14:00'];

var CHECKOUT = ['12:00', '13:00', '14:00'];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var DESCR = [
  'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
  'Идейные соображения высшего порядка, а также реализация намеченных плановых заданий влечет за собой процесс внедрения и модернизации направлений прогрессивного развити',
  'Задача организации, в особенности же укрепление и развитие структуры требуют от нас анализа новых предложений.',
  'Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности представляет собой интересный эксперимент проверки дальнейших направлений развития.',
  'Товарищи! постоянный количественный рост и сфера нашей активности позволяет выполнять важные задания по разработке модели развития.',
  'Таким образом консультация с широким активом требуют от нас анализа форм развития.'
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var maxWidth = 1155;

var maxHeight = 630;

var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var mapPins = document.querySelector('.map__pins');

var pinFragment = document.createDocumentFragment();

// Временно убираем класс скрытия с .Map
document.querySelector('.map').classList.remove('map--faded');

// функция генерации случайных чисел
var getRandomNumb = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// функция случайного индекса массива
var getRandomIndex = function (arr) {
  return Math.floor(Math.random() * Math.floor(arr.length));
};

// функция для создания массива
var generateData = function () {
  var data = {
    author: {
      avatar: AVATAR[getRandomIndex(AVATAR)]
    },
    offer: {
      title: TITLE [getRandomIndex(TITLE)],
      address: getRandomNumb(1, 600) + ', ' + getRandomNumb(1, 350),
      price: getRandomNumb(10000, 50000),
      type: TYPE[getRandomIndex(TYPE)],
      rooms: getRandomNumb(1, 3),
      guests: getRandomNumb(1, 3),
      checkin: CHECKIN[getRandomIndex(CHECKIN)],
      checkout: CHECKOUT[getRandomIndex(CHECKOUT)],
      features: FEATURES.slice(0, getRandomNumb(0, FEATURES.length)),
      description: DESCR[getRandomIndex(DESCR)],
      photos: PHOTOS.slice(0, getRandomNumb(0, PHOTOS.length)),
    },
    location: {
      x: getRandomNumb(45, maxWidth),
      y: getRandomNumb(130, maxHeight)
    }
  };
  return data;
};

// функция отрисовки метки
var renderPin = function (data) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.querySelector('img').src = data.author.avatar;
  pinElement.querySelector('img').alt = data.offer.title;
  pinElement.style = 'left: ' + data.location.x + 'px; top: ' + data.location.y + 'px;';

  return pinElement;
};

for (var i = 0; i < QUANTITY_COUNT; i++) {
  pinFragment.appendChild(renderPin(generateData()));
  mapPins.appendChild(pinFragment);
}

