'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  // функция отрисовки метки
  var renderPin = function (data) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.querySelector('img').alt = data.offer.title;
    pinElement.style.left = data.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = data.location.y - PIN_HEIGHT + 'px';

    pinElement.addEventListener('click', function () {
      window.map.closeCard();
      pinElement.classList.add('map__pin--active');
      window.cards.generate(data);
      document.addEventListener('keydown', window.map.onCardEscDown);
    });

    return pinElement;
  };

  var insertPins = function (elements) {
    var pinFragment = document.createDocumentFragment();

    for (var i = 0; i < elements.length; i++) {
      if (elements[i].offer) {
        pinFragment.appendChild(renderPin(elements[i]));
      }
    }

    window.util.mapPins.appendChild(pinFragment);
  };

  var removePins = function () {
    var adsPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    adsPins.forEach(function (adsPin) {
      adsPin.remove();
    });
  };

  window.pinCreate = {
    insertPins: insertPins,
    removePins: removePins
  };
})();
