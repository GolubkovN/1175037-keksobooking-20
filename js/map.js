'use strict';

(function () {
  var onSuccessLoad = function (offer) {
    window.pinCreate.insertPins(offer);
    window.util.filterContainer.classList.remove('hidden');
  };

  var onCardEscDown = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeCard();
    }
  };

  var onClosePopupClick = function () {
    closeCard();
  };

  var closeCard = function () {
    var popup = document.querySelector('.popup');
    var activePin = document.querySelector('.map__pin--active');

    if (popup) {
      popup.remove();
      activePin.classList.remove('map__pin--active');
    }

    document.removeEventListener('keydown', onCardEscDown);
  };

  window.map = {
    success: onSuccessLoad,
    closeCard: closeCard,
    onCardEscDown: onCardEscDown,
    onClosePopupClick: onClosePopupClick
  };
})();

