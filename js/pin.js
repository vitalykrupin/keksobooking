'use strict';

(function () {
  var pinProportions = window.constants.PIN_PROPORTIONS;
  var mainPinElement = document.querySelector('.map__pin--main');
  var startMainPinPosition = mainPinElement.style.cssText;

  var makePinButton = function (tagName, className, type, pinX, pinY, index) {
    var x = pinX - pinProportions.width / 2;
    var y = pinY - pinProportions.height;
    var style = 'left:' + x + 'px; top:' + y + 'px;';
    var element = document.createElement(tagName);
    element.classList.add(className);
    element.type = type;
    element.style = style;
    element.dataset.index = index;
    return element;
  };

  var makeImage = function (src, alt, width, height) {
    var element = document.createElement('img');
    element.src = src;
    element.alt = alt;
    element.width = width;
    element.height = height;
    return element;
  };

  var renderPin = function (offer) {
    var pinButton = makePinButton('button', 'map__pin', 'button', offer.location.x, offer.location.y, offer.index);
    var pinImg = makeImage(offer.author.avatar, offer.offer.title, pinProportions.imageWidth, pinProportions.imageHeight);
    pinButton.appendChild(pinImg);

    return pinButton;
  };

  var mapElement = document.querySelector('.map');
  var mapCardElement = mapElement.querySelector('.map__card');

  var onClickPin = function (evt) {
    var element = evt.target;

    while (element && element.tagName !== 'BUTTON') {
      element = element.parentNode;
    }

    mapElement.insertBefore(window.card.render(window.data.OFFERS[element.dataset.index]), mapCardElement);
  };

  var pinListElement = document.querySelector('.map__pins');

  window.pin = {
    createByOffers: function (offers) {
      var fragment = document.createDocumentFragment();
      offers.slice(0, window.constants.NUMBER_OF_CARDS).forEach(function (offer) {
        var pinNode = renderPin(offer);
        pinNode.addEventListener('click', onClickPin);

        fragment.appendChild(pinNode);
      });

      pinListElement.appendChild(fragment);
    },
    removeAll: function () {
      var mapPinsElement = document.querySelector('.map__pins');
      var pinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      [].forEach.call(pinElements, function (pin) {
        mapPinsElement.removeChild(pin);
      });
    },
    resetMainPin: function () {
      mainPinElement.style = startMainPinPosition;
    }
  };

})();
