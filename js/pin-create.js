'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  var pinFragment = document.createDocumentFragment();

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
    for (var i = 0; i < window.mock.arrObject.length; i++) {
      pinFragment.appendChild(renderPin(window.mock.arrObject[i]));
    }
    mapPins.appendChild(pinFragment);
  };

  window.pinCreate = {
    generateObject: generateObject
  };
})();
