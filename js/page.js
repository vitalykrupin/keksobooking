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

  var formOffers = function (response) {
    response.forEach(function (offer, index) {
      offer.index = index;
    });
    window.data = {
      OFFERS: response
    };
    window.pin.createByOffers(window.data.OFFERS);
  };

  window.page = {
    onActivatePage: function () {
      window.page.activate();
    },
    activate: function () {
      mapElement.classList.remove('map--faded');
      adFormElement.classList.remove('ad-form--disabled');
      setDisabledValue(selectElements, false);
      setDisabledValue(fieldsetElements, false);
      window.form.setAddressValues();
      window.backend.request('https://js.dump.academy/keksobooking/data', 'GET', formOffers);

      mapPinMainElement.addEventListener('mousedown', window.map.onMousedownPin);
      mapPinMainElement.removeEventListener('click', window.page.onActivatePage);
      mapFiltersElement.addEventListener('change', window.filters.onChangeForm);
    },
    deactivate: function () {
      adFormElement.classList.add('ad-form--disabled');
      setDisabledValue(selectElements, true);
      setDisabledValue(fieldsetElements, true);
      window.card.close();
      window.pin.removeAll();
      window.pin.resetMainPin();
      mapElement.classList.add('map--faded');

      mapPinMainElement.addEventListener('click', window.page.onActivatePage);
      mapFiltersElement.removeEventListener('change', window.filters.onChangeForm);
    }
  };

})();
