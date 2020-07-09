'use strict';

(function () {
  // Функуия возвращает исходное состояние страницы
  // после отправки данных
  var getDisabledPage = function () {
    window.util.map.classList.add('map--faded');
    window.util.adForm.classList.add('ad-form--disabled');
    window.util.adForm.reset();
    window.util.mapFilter.classList.add('map__filters--disabled');
    window.form.disable(window.util.fieldsets);
    window.form.disable(window.util.filterSelects);
    window.pinCreate.removePins();
    window.map.closeCard();
    window.util.mainPin.addEventListener('mousedown', onMainPinMouseDown);
    window.util.mainPin.addEventListener('keydown', onMainPinKeyDown);
  };

  // Перевод страницы в активное состояние
  var getActivePage = function () {
    window.util.map.classList.remove('map--faded');
    window.util.adForm.classList.remove('ad-form--disabled');
    window.util.mapFilter.classList.remove('map__filters--disabled');
    window.form.activate(window.util.fieldsets);
    window.form.activate(window.util.filterSelects);
    window.form.getAddressValue();
    window.backend.load(window.map.success, window.map.error);
  };

  var onMainPinMouseDown = function (evt) {
    switch (evt.button) {
      case 0:
        getActivePage();
        break;
    }
    window.util.mainPin.removeEventListener('mousedown', onMainPinMouseDown);
    window.util.mainPin.removeEventListener('keydown', onMainPinKeyDown);
  };

  // доступ к метке с клавиатуры
  var onMainPinKeyDown = function (evt) {
    evt.preventDefault();
    switch (evt.key) {
      case 'Enter':
        getActivePage();
        break;
    }
    window.util.mainPin.removeEventListener('mousedown', onMainPinMouseDown);
    window.util.mainPin.removeEventListener('keydown', onMainPinKeyDown);
  };

  window.util.mainPin.addEventListener('mousedown', onMainPinMouseDown);
  window.util.mainPin.addEventListener('keydown', onMainPinKeyDown);

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
    if (evt.target.matches('.succes')) {
      evt.preventDefault();
      removeSuccesMessage();
      document.removeEventListener('keydown', onSuccessMessageEscPres);
      document.removeEventListener('click', onSuccessMessageClick);
    }
  };

  // Отправка данных с формы
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(window.util.adForm), showSuccessMessage, window.map.error);
    getDisabledPage();
  };

  window.util.adForm.addEventListener('submit', onFormSubmit);

  // Очистка формы
  var onFormReset = function () {
    window.util.adForm.reset();
  };

  window.util.adForm.addEventListener('reset', onFormReset);

})();
