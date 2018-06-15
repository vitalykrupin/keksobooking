'use strict';

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
var LOCATION_COORDINATES = {
  xMin: 300,
  xMax: 900,
  yMin: 130,
  yMax: 630
};

document.querySelector('.map').classList.remove('map--faded');

var addZero = function (num) {
  return num >= 10 ? num : '0' + num;
};

var makeRandomInt = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var createArrOffers = function () {
  var arrOffers = [];
  for (var i = 0; i < NUMBER_OF_CARDS; i++) {
    arrOffers.push({
      author: {
        avatar: 'img/avatars/user' + addZero(i + 1) + '.png'
      },
      offer: {

      },
      location: {

      }
    });
  };
};
