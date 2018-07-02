'use strict';

(function () {
  var OFFER_TITLE = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 5;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 10;
  var NUMBER_OF_CARDS = 8;

  var locationsCoords = window.constants.LOCATION_COORDINATES;
  var randomInt = window.utils.makeRandomInt;
  var randomArrItem = window.utils.chooseRandArrItem;

  var createArrOffers = function () {
    var arr = [];
    for (var i = 0; i < NUMBER_OF_CARDS; i++) {
      var location = {
        x: randomInt(locationsCoords.xMin, locationsCoords.xMax),
        y: randomInt(locationsCoords.yMin, locationsCoords.yMax)
      };
      arr.push({
        author: {
          avatar: 'img/avatars/user' + window.utils.addZero(i + 1) + '.png'
        },
        offer: {
          title: randomArrItem(OFFER_TITLE),
          address: location.x + ', ' + location.y,
          price: randomInt(PRICE_MIN, PRICE_MAX),
          type: randomArrItem(OFFER_TYPE),
          rooms: randomInt(ROOMS_MIN, ROOMS_MAX),
          guests: randomInt(GUESTS_MIN, GUESTS_MAX),
          checkin: randomArrItem(OFFER_CHECKIN),
          checkout: randomArrItem(OFFER_CHECKOUT),
          features: OFFER_FEATURES.slice(0, randomInt(0, OFFER_FEATURES.length - 1)),
          description: '',
          photos: window.utils.copyArr(OFFER_PHOTOS.sort(function () {
            return Math.random() - 0.5;
          }))
        },
        location: location
      });
    }
    return arr;
  };

  window.data = {
    OFFERS: createArrOffers()
  };
})();
