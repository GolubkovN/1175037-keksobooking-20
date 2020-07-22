'use strict';

(function () {
  // Создание карточек объявлений
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // функции для склонения слов
  var getGuestsValue = function (value) {
    if (value === 1) {
      return value + ' гостя';
    } else {
      return value + ' гостей';
    }
  };

  var getRoomsValue = function (value) {
    if (value === 1) {
      return value + ' комната';
    } else if (value <= 4) {
      return value + ' комнаты';
    } else {
      return value + ' комнат';
    }
  };

  var getFeatureItem = function (arr, elem) {
    var featureFragment = document.createDocumentFragment();

    elem.innerHTML = '';

    arr.forEach(function (i) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature', 'popup__feature--' + i);
      featureFragment.appendChild(featureItem);
    });

    elem.appendChild(featureFragment);
  };

  // Наполнение шаблона из объекта
  var fillAds = function (popup) {
    var card = cardTemplate.cloneNode(true);

    // объект с типом жилья
    var Apartment = {
      FLAT: 'Кваритира',
      HOUSE: 'Дом',
      BUNGALO: 'Бунгало',
      PALACE: 'Дворец'
    };

    var features = card.querySelector('.popup__features');

    card.querySelector('.popup__avatar').src = popup.author.avatar;
    card.querySelector('.popup__title').textContent = popup.offer.title;
    card.querySelector('.popup__text--address').textContent = popup.offer.address;
    card.querySelector('.popup__text--price').textContent = popup.offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = Apartment[popup.offer.type];

    card.querySelector('.popup__text--capacity')
    .textContent = getRoomsValue(popup.offer.rooms) + ' для ' + getGuestsValue(popup.offer.guests);

    card.querySelector('.popup__text--time')
      .textContent = 'Заезд после ' + popup.offer.checkin + ', ' + 'Выезд до ' + popup.offer.checkout;

    getFeatureItem(popup.offer.features, features);
    card.querySelector('.popup__description').textContent = popup.offer.description;

    var popupPhotos = card.querySelector('.popup__photos');
    var photo = popupPhotos.querySelector('img');
    popup.offer.photos.forEach(function (image) {
      var photoElem = photo.cloneNode(true);
      photoElem.src = image;
      popupPhotos.appendChild(photoElem);
    });

    photo.remove();
    var closePopup = card.querySelector('.popup__close');
    closePopup.addEventListener('click', window.map.onClosePopupClick);

    return card;
  };

  window.cards = {
    generate: function (offer) {
      window.util.filterContainer.before(fillAds(offer));
    }
  };
})();
