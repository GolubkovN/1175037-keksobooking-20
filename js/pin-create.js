'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  // функция отрисовки метки
  var renderPin = function (data) {
    var pin = pinTemplate.cloneNode(true);

    pin.querySelector('img').src = data.author.avatar;
    pin.querySelector('img').alt = data.offer.title;
    pin.style.left = data.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = data.location.y - PIN_HEIGHT + 'px';

    pin.addEventListener('click', function () {
      window.map.closeCard();
      pin.classList.add('map__pin--active');
      window.cards.generate(data);
      document.addEventListener('keydown', window.map.onCardEscDown);
    });

    return pin;
  };

  var insertPins = function (elements) {
    var pinFragment = document.createDocumentFragment();

    elements.forEach(function (element) {
      if (element.offer) {
        pinFragment.appendChild(renderPin(element));
      }
    });

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
