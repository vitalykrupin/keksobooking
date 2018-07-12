'use strict';

(function () {

  var similarCardTemplateElement = document.querySelector('#similar-card-template')
      .content
      .querySelector('.map__card');

  var cardElement = similarCardTemplateElement.cloneNode(true);
  var containerCardImgElement = cardElement.querySelector('.popup__photos');
  var templateImgElement = containerCardImgElement.querySelector('.popup__photo').cloneNode(true);

  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, onClickPopupClose);
  };

  var onClickPopupClose = function () {
    var popupElement = document.querySelector('.popup');
    popupElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var popupCloseElement = cardElement.querySelector('.popup__close');

  var imageAddToCard = function (offer) {
    containerCardImgElement.innerHTML = '';
    offer.offer.photos.forEach(function (photo) {
      var image = templateImgElement.cloneNode(true);
      image.src = photo;
      containerCardImgElement.appendChild(image);
    });
  };

  var featuresAddToCard = function (offer) {
    cardElement.querySelector('.popup__features').innerHTML = '';

    for (var i = 0; i < offer.offer.features.length; i++) {
      cardElement.querySelector('.popup__features').innerHTML += '<li class="popup__feature popup__feature--' + offer.offer.features[i] + '"></li>';
    }
  };

  var cardCreate = function (offer) {
    cardElement.querySelector('.popup__avatar').src = offer.author.avatar;
    cardElement.querySelector('.popup__title').textContent = offer.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = offer.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = offer.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.constants.DICTIONARY[offer.offer.type].translate;
    cardElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = offer.offer.description;
  };

  window.card = {
    render: function (offer) {
      cardElement.classList.remove('hidden');
      cardCreate(offer);
      featuresAddToCard(offer);
      imageAddToCard(offer);

      popupCloseElement.addEventListener('click', onClickPopupClose);
      document.addEventListener('keydown', onPopupEscPress);

      return cardElement;
    },
    close: function () {
      var popupElement = document.querySelector('.popup');
      if (popupElement) {
        popupElement.classList.add('hidden');
      }

      document.removeEventListener('keydown', onPopupEscPress);
      popupCloseElement.removeEventListener('click', onClickPopupClose);
    }
  };

})();
