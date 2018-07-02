'use strict';

(function () {
  var selects = document.querySelectorAll('select');

  window.activatePage = function () {
    map.classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    for (var i = 0; i < selects.length; i++) {
      selects[i].disabled = false;
    }
    document.querySelector('fieldset').disabled = false;
    setAddressValues();
    createFragmentPins(OFFERS);
    mapPinMain.removeEventListener('mousedown', activatePage);
  };
})();
