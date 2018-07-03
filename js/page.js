'use strict';

(function () {
  var selects = document.querySelectorAll('select');
  var map = document.querySelector('.map');
  var fieldset = document.querySelectorAll('fieldset');
  // var mapPinMain = map.querySelector('.map__pin--main');
  // var adForm = document.querySelector('.ad-form');
  // var resetButton = adForm.querySelector('.ad-form__reset');

  window.page = {
    activate: function () {
      map.classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      for (var i = 0; i < selects.length; i++) {
        selects[i].disabled = false;
      }

      for (i = 0; i < fieldset.length; i++) {
        fieldset[i].disabled = false;
      }

      window.setAddressValues();
      window.pin.createFragmentPins(window.data.OFFERS);
      // mapPinMain.removeEventListener('mousedown', window.page.activate);
    },
    // deactivate: function () {
    //   map.classList.add('map--faded');
    //   window.pin.deleteFragmentPins();
    //   window.card.deleteCard();
    //   document.querySelector('.ad-form').classList.add('ad-form--disabled');
    //   for (var i = 0; i < selects.length; i++) {
    //     selects[i].disabled = true;
    //   }
    //   document.querySelector('fieldset').disabled = true;

      // resetButton.removeEventListener('click', window.page.deactivate);
      // mapPinMain.addEventListener('mousedown', window.page.activate);
    }
  };
})();
