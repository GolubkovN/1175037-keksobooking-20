'use strict';

(function () {
  var mapFilter = window.util.map.querySelector('.map__filters');
  var filterSelects = mapFilter.querySelectorAll('select');

  // Перевод страницы в активное состояние
  var getActivePage = function () {
    window.util.map.classList.remove('map--faded');
    window.util.adForm.classList.remove('ad-form--disabled');
    mapFilter.classList.remove('map__filters--disabled');
    window.pinCreate.generateObject();
    activateForm(fieldsets);
    activateForm(filterSelects);
    window.form.etAddressValue();
  };

  window.util.mainPin.addEventListener('mousedown', function (evt) {
    switch (evt.button) {
      case 0:
        getActivePage();
        break;
    }
  });

  // доступ к метке с клавиатуры
  window.util.mainPin.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    switch (evt.key) {
      case 'Enter':
        getActivePage();
        break;
    }
  });
  var fieldsets = window.util.adForm.querySelectorAll('fieldset');

  // блокировка полей форм
  var disableForm = function (elem) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].disabled = true;
    }
  };
  disableForm(fieldsets);
  disableForm(filterSelects);

  // разблокирование полей форм
  var activateForm = function (elem) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].disabled = false;
    }
  };

  window.main = {
    activateForm: activateForm,
    getActivePage: getActivePage
  };
})();
