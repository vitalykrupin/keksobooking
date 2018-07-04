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
    window.utils.isEscEvent(evt, closePopup);
  };

  var onPopupEnterPress = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  };

  var closePopup = function () {
    var popupElement = document.querySelector('.popup');
    popupElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var popupClose = cardElement.querySelector('.popup__close');

  window.card = {
    render: function (arr) {
      cardElement.classList.remove('hidden');

      [].forEach.call(featuresElement, function (featureElement) {
        var classPart = featureElement.classList[1].replace('popup__feature--', '');
        featureElement.style.display = (arr.offer.features.indexOf(classPart) >= 0) ? 'inline-block' : 'none';
      });

      cardElement.querySelector('.popup__avatar').src = arr.author.avatar;
      cardElement.querySelector('.popup__title').textContent = arr.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = arr.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = arr.offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').textContent = window.constants.DICTIONARY[arr.offer.type].translate;
      cardElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + ' комнаты для ' + arr.offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;

      cardElement.querySelector('.popup__description').textContent = arr.offer.description;

      containerCardImgElement.innerHTML = '';
      [].forEach.call(arr.offer.photos, function (photo) {
        var image = templateImgElement.cloneNode(true);
        image.src = photo;
        containerCardImgElement.appendChild(image);
      });

      popupClose.addEventListener('click', closePopup);
      document.addEventListener('keydown', onPopupEscPress);
      popupClose.addEventListener('keydown', function (evt) {
        window.utils.isEnterEvent(evt, closePopup);
      });

      return cardElement;
    },
    closePopup: function () {
      var popupElement = document.querySelector('.popup');
      if (popupElement) {
        popupElement.classList.add('hidden');
      }
      document.removeEventListener('keydown', onPopupEscPress);
      popupClose.removeEventListener('keydown', onPopupEnterPress);
      popupClose.removeEventListener('click', closePopup);
    }
  };
})();
