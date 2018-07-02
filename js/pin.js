'use strict';

(function () {
  window.PIN_PROPORTIONS = {
    width: 50,
    heading: 70,
    imageWidth: 40,
    imageHeight: 40,
    mainPinWidth: 65,
    mainPinHeight: 65,
    pointerWidth: 10,
    pointerHeight: 22
  };

  var makePinButton = function (tagName, className, type, pinX, pinY, index) {
    var x = pinX - PIN_PROPORTIONS.width / 2;
    var y = pinY + PIN_PROPORTIONS.heading;
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

  var renderPin = function (arr, i) {
    var pinButton = makePinButton('button', 'map__pin', 'button', arr.location.x, arr.location.y, i);
    var pinImg = makeImage(arr.author.avatar, arr.offer.title, PIN_PROPORTIONS.imageWidth, PIN_PROPORTIONS.imageHeight);
    pinButton.appendChild(pinImg);
    return pinButton;
  };

  var pinList = document.querySelector('.map__pins');
  window.createFragmentPins = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderPin(arr[i], i));
    }
    pinList.appendChild(fragment);
  };
})();
