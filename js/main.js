'use strict';

(function () {
  // Перевод страницы в активное состояние
  var getActivePage = function () {
    window.util.map.classList.remove('map--faded');
    window.util.adForm.classList.remove('ad-form--disabled');
    window.util.mapFilter.classList.remove('map__filters--disabled');
    window.backend.load(function (offers) {
      window.pinCreate.generateObject(offers);
      window.map.showCard();
    }, function () {});
    window.form.activate(window.util.fieldsets);
    window.form.activate(window.util.filterSelects);
    window.form.getAddressValue();
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
})();
