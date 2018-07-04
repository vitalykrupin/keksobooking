'use strict';

(function () {
  var selects = document.querySelectorAll('select');
  var fieldset = document.querySelectorAll('fieldset');
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');

  window.page = {
    activate: function () {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      [].forEach.call(selects, function (item) {
        item.disabled = false;
      });
      [].forEach.call(fieldset, function (item) {
        item.disabled = false;
      });
      window.form.setAddressValues();
      // window.pin.createPins(window.data.OFFERS);
      window.backend.request('https://js.dump.academy/keksobooking/data', 'GET', function (response) {
        response.forEach(function (offer, index) {
          offer.index = index;
        });
        window.data = {
          OFFERS: response
        };
        window.pin.createPins(window.data.OFFERS);
      });

      mapPinMain.removeEventListener('mousedown', window.page.activate);
    },
    deactivate: function () {
      window.form.resetAdForm();
      adForm.classList.add('ad-form--disabled');
      // map.classList.add('map--faded');
      // document.querySelector('.ad-form').classList.add('ad-form--disabled');
      [].forEach.call(selects, function (item) {
        item.disabled = true;
      });
      [].forEach.call(fieldset, function (item) {
        item.disabled = true;
      });
      window.card.closePopup();
      window.pin.removePins();
      window.pin.resetMainPin();
      map.classList.add('map--faded');
      window.form.setAddressValues();

      var adFormReset = adForm.querySelector('.ad-form__reset');
      adFormReset.removeEventListener('click', window.page.deactivate);
      mapPinMain.addEventListener('mousedown', window.page.activate);
    }
  };
})();
