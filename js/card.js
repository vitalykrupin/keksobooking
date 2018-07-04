'use strict';

(function () {

  var similarCardTemplate = document.querySelector('#similar-card-template')
      .content
      .querySelector('.map__card');

  var cardElement = similarCardTemplate.cloneNode(true);
  var features = cardElement.querySelectorAll('.popup__feature');
  var containerCardImg = cardElement.querySelector('.popup__photos');
  var templateImg = containerCardImg.querySelector('.popup__photo').cloneNode(true);

  containerCardImg.querySelector('.popup__photo').remove();

  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  var closePopup = function () {
    var popup = document.querySelector('.popup');
    popup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  window.card = {
    render: function (arr) {
      cardElement.classList.remove('hidden');

      [].forEach.call(features, function (featureElement) {
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

      containerCardImg.innerHTML = '';
      [].forEach.call(arr.offer.photos, function (photo) {
        var image = templateImg.cloneNode(true);
        image.src = photo;
        containerCardImg.appendChild(image);
      });

      var popupClose = cardElement.querySelector('.popup__close');

      popupClose.addEventListener('click', function () {
        closePopup();
      });
      document.addEventListener('keydown', onPopupEscPress);
      popupClose.addEventListener('keydown', function (evt) {
        window.utils.isEnterEvent(evt, closePopup);
      });

      return cardElement;
    },
    closePopup: function () {
      var popup = document.querySelector('.popup');
      if (popup) {
        popup.classList.add('hidden');
      }
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };
})();
