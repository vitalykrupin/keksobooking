'use strict';

(function () {
  var selectElements = document.querySelectorAll('select');
  var fieldsetElements = document.querySelectorAll('fieldset');
  var mapElement = document.querySelector('.map');
  var mapFiltersElement = mapElement.querySelector('.map__filters');
  var mapPinMainElement = mapElement.querySelector('.map__pin--main');
  var adFormElement = document.querySelector('.ad-form');

  var setDisabledValue = function (element, value) {
    [].forEach.call(element, function (item) {
      item.disabled = value;
    });
  };

  window.page = {
    activate: function () {
      mapElement.classList.remove('map--faded');
      adFormElement.classList.remove('ad-form--disabled');
      setDisabledValue(selectElements, false);
      setDisabledValue(fieldsetElements, false);
      window.form.setAddressValues();
      window.backend.request('https://js.dump.academy/keksobooking/data', 'GET', function (response) {
        response.forEach(function (offer, index) {
          offer.index = index;
        });
        window.data = {
          OFFERS: response
        };
        window.pin.create(window.data.OFFERS);
      });

      mapPinMainElement.removeEventListener('mousedown', window.page.activate);
      mapFiltersElement.addEventListener('change', window.filters.onChange);
    },
    deactivate: function () {
      window.form.reset();
      adFormElement.classList.add('ad-form--disabled');
      setDisabledValue(selectElements, true);
      setDisabledValue(fieldsetElements, true);
      window.card.close();
      window.pin.remove();
      window.pin.reset();
      mapElement.classList.add('map--faded');
      window.form.setAddressValues();

      mapPinMainElement.addEventListener('mousedown', window.page.activate);
      mapFiltersElement.removeEventListener('change', window.filters.onChange);
    }
  };

})();
