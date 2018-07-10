'use strict';

(function () {
  var PRICES_TO_COMPARE = {
    low: 10000,
    high: 50000
  };

  var mapFiltersElement = document.querySelector('.map__filters');

  var filterState = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any',
    'features': []
  };

  // кэш ключей для housing
  var housingFilterKeys = Object.keys(filterState).filter(function (prop) {
    return prop.indexOf('housing-') === 0;
  });

  var onChangeForm = function () {
    var updatedStateFilter = updateFilterState();
    var filteredOffers = applyFilterAtOffers(updatedStateFilter, window.data.OFFERS.slice());

    window.pin.removeAll();
    window.pin.createByOffers(filteredOffers);
  };

  var updateFilterState = function () {
    filterState.features = []; // reset

    var selectFields = mapFiltersElement.querySelectorAll('select');
    var featuresInputs = mapFiltersElement.querySelectorAll('input:checked');

    selectFields.forEach(function (node) {
      var value = node.value;

      // конвертация некоторых типов для состояния фильтра
      if (['housing-rooms', 'housing-guests'].includes(node.name) && node.value !== 'any') {
        value = parseInt(value, 10);
      }

      filterState[node.name] = value;
    });

    featuresInputs.forEach(function (node) {
      filterState.features.push(node.value);
    });

    return filterState;
  };

  var applyFilterAtOffers = function (stateFilter, offers) {
    return offers.filter(function (offer) {
      // фильтрация по housing-
      var isOfferMatch = !housingKeysFilter(stateFilter, offer);

      if (isOfferMatch === false) {
        return false;
      }

      if (filterState.features.length === 0) {
        return true;
      }

      // фильтрация по features
      var hasFeatures = featuresFilter(filterState, offer);

      return hasFeatures;
    });
  };

  var housingKeysFilter = function (stateFilter, offer) {
    return housingFilterKeys.some(function (key) {
      if (stateFilter[key] === 'any') {
        return false;
      }

      var field = key.split('-')[1];
      var value = stateFilter[key];

      if (key === 'housing-price') {
        return priceSubFilter(value, offer.offer.price);
      }

      return offer.offer[field] !== value;
    });
  };

  var featuresFilter = function (stateFilter, offer) {
    var filteredFeatures = stateFilter.features.filter(function (feature) {
      return offer.offer.features.indexOf(feature) !== -1;
    });

    return filteredFeatures.length === stateFilter.features.length;
  };

  var priceSubFilter = function (filterValue, offerPrice) {
    if (filterValue === 'middle') {
      return offerPrice < PRICES_TO_COMPARE.low || offerPrice >= PRICES_TO_COMPARE.high;
    }

    if (filterValue === 'low') {
      return offerPrice >= PRICES_TO_COMPARE.low;
    }

    if (filterValue === 'high') {
      return offerPrice < PRICES_TO_COMPARE.high;
    }
    return offerPrice;
    // switch (filterValue) {
    //   case 'middle':
    //     return offerPrice < PRICES_TO_COMPARE.low || offerPrice >= PRICES_TO_COMPARE.high;
    //     break;
    //   case 'low':
    //     return offerPrice >= PRICES_TO_COMPARE.low;
    //     break;
    //   case 'high':
    //     return offerPrice < PRICES_TO_COMPARE.high;
    //     break;
    //   default:
    //     return offerPrice;
    // }
  };

  window.filters = {
    onChangeForm: window.utils.debounce(onChangeForm, 500)
  };

})();
