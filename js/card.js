'use strict';

(function () {

  var similarCardTemplate = document.querySelector('#similar-card-template')
      .content
      .querySelector('.map__card');

  var cardElement = similarCardTemplate.cloneNode(true);
  var feature = cardElement.querySelectorAll('.popup__feature');
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
    renderCard: function (arr) {
      cardElement.classList.remove('hidden');

      cardElement.querySelector('.popup__avatar').src = arr.author.avatar;
      cardElement.querySelector('.popup__title').textContent = arr.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = arr.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = arr.offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').textContent = window.constants.DICTIONARY[arr.offer.type].translate;
      cardElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + ' комнаты для ' + arr.offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;

      for (var i = 0; i < feature.length; i++) {
        feature[i].style = 'display: none;';
      }

      for (i = arr.offer.features.length; i < feature.length; i++) {
        feature[i].style = 'display: inline-block;';
      }

      cardElement.querySelector('.popup__description').textContent = arr.offer.description;

      containerCardImg.innerHTML = '';
      for (i = 0; i < arr.offer.photos.length; i++) {
        var image = templateImg.cloneNode(true);
        image.src = arr.offer.photos[i];
        containerCardImg.appendChild(image);
      }

      var popupClose = cardElement.querySelector('.popup__close');

      popupClose.addEventListener('click', function () {
        closePopup();
      });
      document.addEventListener('keydown', onPopupEscPress);
      popupClose.addEventListener('keydown', function (evt) {
        window.utils.isEnterEvent(evt, closePopup);
      });

      return cardElement;
    }
  };
})();
