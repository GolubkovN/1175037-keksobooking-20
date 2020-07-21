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

  var getFeatureElement = function (arr, elem) {
    var featureFragment = document.createDocumentFragment();

    elem.innerHTML = '';

    for (var i = 0; i < arr.length; i++) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature', 'popup__feature--' + arr[i]);
      featureFragment.appendChild(featureItem);
    }

    elem.appendChild(featureFragment);
  };

  // Наполнение шаблона из объекта
  var fillAds = function (card) {
    var cardElement = cardTemplate.cloneNode(true);

    // объект с типом жилья
    var apartment = {
      flat: 'Кваритира',
      house: 'Дом',
      bungalo: 'Бунгало',
      palace: 'Дворец'
    };

    var features = cardElement.querySelector('.popup__features');

    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = apartment[card.offer.type];

    cardElement.querySelector('.popup__text--capacity')
    .textContent = getRoomsValue(card.offer.rooms) + ' для ' + getGuestsValue(card.offer.guests);

    cardElement.querySelector('.popup__text--time')
      .textContent = 'Заезд после ' + card.offer.checkin + ', ' + 'Выезд до ' + card.offer.checkout;

    getFeatureElement(card.offer.features, features);
    cardElement.querySelector('.popup__description').textContent = card.offer.description;

    var popupPhotos = cardElement.querySelector('.popup__photos');
    var photo = popupPhotos.querySelector('img');
    for (var i = 0; i < card.offer.photos.length; i++) {
      var photoElem = photo.cloneNode(true);
      photoElem.src = card.offer.photos[i];
      popupPhotos.appendChild(photoElem);
    }

    photo.remove();
    var closePopup = cardElement.querySelector('.popup__close');
    closePopup.addEventListener('click', window.map.onClosePopupClick);

    return cardElement;
  };

  window.cards = {
    generate: function (offer) {
      window.util.filterContainer.before(fillAds(offer));
    }
  };
})();
