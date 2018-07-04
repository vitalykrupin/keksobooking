'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  // var adForm = document.querySelector('.ad-form');
  // var resetButton = adForm.querySelector('.ad-form__reset');

  // resetButton.addEventListener('click', window.page.deactivate);
  mapPinMain.addEventListener('mousedown', window.page.activate);

  var mapPins = map.querySelector('.map__pins');
  mapPins.addEventListener('click', function (evt) {
    var element = evt.target;
    while (element && element.tagName !== 'BUTTON') {
      element = element.parentNode;
    }
    if (!element) {
      return;
    }
    if (typeof element.dataset.index === 'undefined') {
      return;
    }
    map.insertBefore(window.card.render(window.data.OFFERS[element.dataset.index]), map.children[1]);
  });

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      var coordinates = window.constants.LOCATION_COORDINATES;
      var pinHeight = window.constants.PIN_PROPORTIONS.mainPinHeight;
      var pinWidth = window.constants.PIN_PROPORTIONS.mainPinWidth;
      var pointerHeight = window.constants.PIN_PROPORTIONS.pointerHeight;

      if (mapPinMain.offsetTop - shift.y < coordinates.yMin - pinHeight - pointerHeight) {
        mapPinMain.style.top = coordinates.yMin - pinHeight - pointerHeight + 'px';
      }
      if (mapPinMain.offsetTop - shift.y > coordinates.yMax + pinHeight / 2 + pointerHeight) {
        mapPinMain.style.top = coordinates.yMax + pinHeight / 2 + pointerHeight + 'px';
      }
      if (mapPinMain.offsetLeft - shift.x < coordinates.xMin - pinWidth / 2) {
        mapPinMain.style.left = coordinates.xMin - pinWidth / 2 + 'px';
      }
      if (mapPinMain.offsetLeft - shift.x > coordinates.xMax - pinWidth / 2) {
        mapPinMain.style.left = coordinates.xMax - pinWidth / 2 + 'px';
      }

      window.form.setAddressValues();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      // window.form.setAddressValues();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
