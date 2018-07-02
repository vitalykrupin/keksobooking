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
  window.LOCATION_COORDINATES = {
    xMin: 0,
    xMax: 1200,
    yMin: 130,
    yMax: 500
  };

  var createArrOffers = function () {
    var arr = [];
    for (var i = 0; i < NUMBER_OF_CARDS; i++) {
      var location = {
        x: window.utils.makeRandomInt(LOCATION_COORDINATES.xMin, LOCATION_COORDINATES.xMax),
        y: window.utils.makeRandomInt(LOCATION_COORDINATES.yMin, LOCATION_COORDINATES.yMax)
      };
      arr.push({
        author: {
          avatar: 'img/avatars/user' + window.utils.addZero(i + 1) + '.png'
        },
        offer: {
          title: window.utils.chooseRandArrItem(OFFER_TITLE),
          address: location.x + ', ' + location.y,
          price: window.utils.makeRandomInt(PRICE_MIN, PRICE_MAX),
          type: window.utils.chooseRandArrItem(OFFER_TYPE),
          rooms: window.utils.makeRandomInt(ROOMS_MIN, ROOMS_MAX),
          guests: window.utils.makeRandomInt(GUESTS_MIN, GUESTS_MAX),
          checkin: window.utils.chooseRandArrItem(OFFER_CHECKIN),
          checkout: window.utils.chooseRandArrItem(OFFER_CHECKOUT),
          features: OFFER_FEATURES.slice(0, window.utils.makeRandomInt(0, OFFER_FEATURES.length - 1)),
          description: '',
          photos: window.utils.copyArr(OFFER_PHOTOS.sort(function () {
            return Math.random() - 0.5;
          }))
        },
        location: {
          x: location.x,
          y: location.y
        }
      });
    }
    return arr;
  };
  window.OFFERS = createArrOffers();
})();
