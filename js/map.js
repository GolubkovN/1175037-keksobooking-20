'use strict';

(function () {
  var getActiveCard = function (id) {
    window.backend.load(function (data) {
      window.cards.generate(data[id]);
    }, function () {});
  };

  var showCard = function () {
    var pins = window.util.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin, id) {
      pin.addEventListener('click', function (evt) {
        evt.preventDefault();
        var popup = document.querySelector('.popup');
        if (popup !== null) {
          popup.remove();
          getActiveCard(id);
        } else {
          getActiveCard(id);
        }
      });
    });
  };

  window.map = {
    showCard: showCard
  };
})();

