'use strict';

(function () {

  var similarCardTemplateElement = document.querySelector('#similar-card-template')
      .content
      .querySelector('.map__card');

  var cardElement = similarCardTemplateElement.cloneNode(true);
  var featuresElement = cardElement.querySelectorAll('.popup__feature');
  var containerCardImgElement = cardElement.querySelector('.popup__photos');
  var templateImgElement = containerCardImgElement.querySelector('.popup__photo').cloneNode(true);

  containerCardImgElement.querySelector('.popup__photo').remove();

  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, onClickPopupClose);
  };

  var onPopupEnterPress = function (evt) {
    window.utils.isEnterEvent(evt, onClickPopupClose);
  };

  var onClickPopupClose = function () {
    var popupElement = document.querySelector('.popup');
    popupElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var popupCloseElement = cardElement.querySelector('.popup__close');

  window.card = {
    render: function (offer) {
      cardElement.classList.remove('hidden');

      featuresElement.forEach(function (featureElement) {
        var classPart = featureElement.classList[1].replace('popup__feature--', '');
        featureElement.style.display = (offer.offer.features.indexOf(classPart) >= 0) ? 'inline-block' : 'none';
      });

      cardElement.querySelector('.popup__avatar').src = offer.author.avatar;
      cardElement.querySelector('.popup__title').textContent = offer.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = offer.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = offer.offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').textContent = window.constants.DICTIONARY[offer.offer.type].translate;
      cardElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
      cardElement.querySelector('.popup__description').textContent = offer.offer.description;

      containerCardImgElement.innerHTML = '';
      offer.offer.photos.forEach(function (photo) {
        var image = templateImgElement.cloneNode(true);
        image.src = photo;
        containerCardImgElement.appendChild(image);
      });

      popupCloseElement.addEventListener('click', onClickPopupClose);
      document.addEventListener('keydown', onPopupEscPress);
      popupCloseElement.addEventListener('keydown', function (evt) {
        window.utils.isEnterEvent(evt, onClickPopupClose);
      });
      return cardElement;
    },
    close: function () {
      var popupElement = document.querySelector('.popup');
      if (popupElement) {
        popupElement.classList.add('hidden');
      }

      document.removeEventListener('keydown', onPopupEscPress);
      popupCloseElement.removeEventListener('keydown', onPopupEnterPress);
      popupCloseElement.removeEventListener('click', onClickPopupClose);
    }
  };
})();
