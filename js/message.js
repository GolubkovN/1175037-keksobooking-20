'use strict';

(function () {
  // Показ сообщения об успешной загрузке
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var showSuccessMessage = function () {
    var successMessage = successTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successMessage);

    document.addEventListener('keydown', onSuccessMessageEscPres);
    document.addEventListener('click', onSuccessMessageClick);
  };

  // взможность скрыть сообщение об успешной загрузке
  var removeSuccesMessage = function () {
    document.querySelector('.success').remove();
  };

  var onSuccessMessageEscPres = function (evt) {
    switch (evt.key) {
      case 'Escape':
        evt.preventDefault();
        removeSuccesMessage();
        document.removeEventListener('keydown', onSuccessMessageEscPres);
        document.removeEventListener('click', onSuccessMessageClick);
        break;
    }
  };

  var onSuccessMessageClick = function (evt) {
    if (evt.target.matches('div.success')) {
      evt.preventDefault();
      removeSuccesMessage();
      document.removeEventListener('keydown', onSuccessMessageEscPres);
      document.removeEventListener('click', onSuccessMessageClick);
    }
  };

  window.message = {
    showSuccessMessage: showSuccessMessage,
    onSuccessMessageEscPres: onSuccessMessageEscPres,
    onSuccessMessageClick: onSuccessMessageClick
  };
})();
