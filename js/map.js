'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mapPinMainElement = mapElement.querySelector('.map__pin--main');

  mapPinMainElement.addEventListener('click', window.page.onActivatePage);

  window.map = {
    onMousedownPin: function (evt) {
      evt.preventDefault();

      var startCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      var checkBorders = function (shift) {
        var coordinates = window.constants.LOCATION_COORDINATES;
        var pinHeight = window.constants.PIN_PROPORTIONS.mainPinHeight;
        var pinWidth = window.constants.PIN_PROPORTIONS.mainPinWidth;
        var pointerHeight = window.constants.PIN_PROPORTIONS.pointerHeight;

        if (shift.y < 0 && mapPinMainElement.offsetTop + shift.y + pinHeight + pointerHeight <= coordinates.yMin) {
          mapPinMainElement.style.top = coordinates.yMin - pinHeight - pointerHeight + 'px';
        }
        if (shift.y > 0 && mapPinMainElement.offsetTop + shift.y + pinHeight + pointerHeight >= coordinates.yMax) {
          mapPinMainElement.style.top = coordinates.yMax - pinHeight - pointerHeight + 'px';
        }
        if (shift.x < 0 && mapPinMainElement.offsetLeft + shift.x + pinWidth / 2 <= coordinates.xMin) {
          mapPinMainElement.style.left = coordinates.xMin - pinWidth / 2 + 'px';
        }
        if (shift.x > 0 && mapPinMainElement.offsetLeft + shift.x + pinWidth / 2 >= coordinates.xMax) {
          mapPinMainElement.style.left = coordinates.xMax - pinWidth / 2 + 'px';
        }
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: moveEvt.clientX - startCoordinates.x,
          y: moveEvt.clientY - startCoordinates.y
        };

        startCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mapPinMainElement.style.top = (mapPinMainElement.offsetTop + shift.y) + 'px';
        mapPinMainElement.style.left = (mapPinMainElement.offsetLeft + shift.x) + 'px';

        checkBorders(shift);
        window.form.setAddressValues();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

})();
