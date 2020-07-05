'use strict';

(function () {
  // Перевод страницы в активное состояние
  var getActivePage = function () {
    window.util.map.classList.remove('map--faded');
    window.util.adForm.classList.remove('ad-form--disabled');
    window.util.mapFilter.classList.remove('map__filters--disabled');
    window.form.activate(window.util.fieldsets);
    window.form.activate(window.util.filterSelects);
    window.form.getAddressValue();
    window.backend.load(window.map.success, function () {});
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
})();
