'use strict';

(function () {
  var PRICES_TO_COMPARE = {
    low: 10000,
    high: 50000
  };

  var mapFiltersElement = document.querySelector('.map__filters');
  var selectorFilterElements = mapFiltersElement.querySelectorAll('select');
  var featuresFilterElements;

  var FilterRules = {
    'housing-type': 'type',
    'housing-rooms': 'rooms',
    'housing-guests': 'guests'
  };

  var checkSelects = function (offer) {
    for (var i = 0; i < selectorFilterElements.length; i++) {
      var selector = selectorFilterElements[i];
      if (selector.value === 'any') {
        continue;
      }
      if (selector.id === 'housing-price') {
        if (selector.value === 'middle' && (offer.offer.price < PRICES_TO_COMPARE.low || offer.offer.price >= PRICES_TO_COMPARE.high)) {
          return false;
        }
        if (selector.value === 'low' && offer.offer.price >= PRICES_TO_COMPARE.low) {
          return false;
        }
        if (selector.value === 'high' && offer.offer.price < PRICES_TO_COMPARE.high) {
          return false;
        }
      } else if (offer.offer[FilterRules[selector.id]].toString() !== selector.value) {
        return false;
      }
    }
    return true;
  };

  var checkFeatures = function (offer) {
    for (var i = 0; i < featuresFilterElements.length; i++) {
      var feature = featuresFilterElements[i];
      if (offer.offer.features.indexOf(feature.value) === -1) {
        return false;
      }
    }
    return true;
  };

  var updatePins = function (offers) {
    featuresFilterElements = mapFiltersElement.querySelectorAll('input[type=checkbox]:checked');


    var filteredOffers = [];
    for (var i = 0; i < offers.length; i++) {
      if (checkSelects(offers[i]) && checkFeatures(offers[i])) {
        filteredOffers.push(offers[i]);
        if (filteredOffers.length >= window.constants.NUMBER_OF_CARDS) {
          break;
        }
      }
    }

    if (filteredOffers.length) {
      window.pin.create(filteredOffers);
    }
  };

  var onChangeFilters = function () {
    window.card.close();
    window.pin.remove();
    updatePins(window.data.OFFERS);
  };

  window.filters = {
    onChange: window.utils.debounce(onChangeFilters, 500)
  };

})();
