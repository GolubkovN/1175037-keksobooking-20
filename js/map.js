'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var onSuccessLoad = function (offer) {
    window.pinCreate.insertPins(offer);
    window.util.filterContainer.classList.remove('hidden');
  };

  var onErrorLoad = function (errorText) {
    var errorMessage = errorTemplate.cloneNode(true);
    var errContent = errorMessage.querySelector('.error__message');
    errContent.textContent = errorText;
    document.querySelector('main').appendChild(errorMessage);

    var errButton = errorMessage.querySelector('.error__button');
    errButton.addEventListener('click', onErrButtonClick);
    document.addEventListener('keydown', onErrMessageEscPres);
    document.addEventListener('click', onErrMessageClick);
  };

  // Возможность закрыть сообщение об ошибке
  var removeErrorMessage = function () {
    document.querySelector('.error').remove();
  };

  var onErrButtonClick = function () {
    removeErrorMessage();
    document.removeEventListener('keydown', onErrMessageEscPres);
    document.removeEventListener('click', onErrMessageClick);
  };

  var onErrMessageEscPres = function (evt) {
    switch (evt.key) {
      case 'Escape':
        evt.preventDefault();
        removeErrorMessage();
        document.removeEventListener('keydown', onErrMessageEscPres);
        document.removeEventListener('click', onErrMessageClick);
        break;
    }
  };

  var onErrMessageClick = function (evt) {
    if (evt.target.matches('.error')) {
      evt.preventDefault();
      removeErrorMessage();
      document.removeEventListener('keydown', onErrMessageEscPres);
      document.removeEventListener('click', onErrMessageClick);
    }
  };

  var onCardEscDown = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeCard();
    }
  };

  // Возможность закрыть карточку объявления
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
    error: onErrorLoad,
    closeCard: closeCard,
    onCardEscDown: onCardEscDown,
    onClosePopupClick: onClosePopupClick
  };
})();

