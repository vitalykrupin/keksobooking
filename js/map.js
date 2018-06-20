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
var PIN_PROPORTIONS = {
  width: 50,
  heading: 70,
  imageWidth: 40,
  imageHeight: 40
};
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
var dictionary = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

document.querySelector('.map').classList.remove('map--faded');

var addZero = function (num) {
  return num >= 10 ? num : '0' + num;
};

var makeRandomInt = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var copyArr = function (arr) {
  var photos = [];
  for (var i = 0; i < arr.length; i++) {
    photos[i] = arr[i];
  }
  return photos;
};

var createArrOffers = function () {
  var arr = [];
  for (var i = 0; i < NUMBER_OF_CARDS; i++) {
    var location = {
      x: makeRandomInt(LOCATION_COORDINATES.xMin, LOCATION_COORDINATES.xMax),
      y: makeRandomInt(LOCATION_COORDINATES.yMin, LOCATION_COORDINATES.yMax)
    };
    arr.push({
      author: {
        avatar: 'img/avatars/user' + addZero(i + 1) + '.png'
      },
      offer: {
        title: OFFER_TITLE[makeRandomInt(0, OFFER_TITLE.length - 1)],
        address: location.x + ', ' + location.y,
        price: makeRandomInt(PRICE_MIN, PRICE_MAX),
        type: OFFER_TYPE[makeRandomInt(0, OFFER_TYPE.length - 1)],
        rooms: makeRandomInt(ROOMS_MIN, ROOMS_MAX),
        guests: makeRandomInt(GUESTS_MIN, GUESTS_MAX),
        checkin: OFFER_CHECKIN[makeRandomInt(0, OFFER_CHECKIN.length - 1)],
        checkout: OFFER_CHECKOUT[makeRandomInt(0, OFFER_CHECKOUT.length - 1)],
        features: OFFER_FEATURES.slice(0, makeRandomInt(0, OFFER_FEATURES.length - 1)),
        description: '',
        photos: copyArr(OFFER_PHOTOS.sort(function () {
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

var similarCardTemplate = document.querySelector('#similar-card-template')
  .content
  .querySelector('.map__card');

var makePinButton = function (tagName, className, type, pinX, pinY) {
  var x = pinX - PIN_PROPORTIONS.width / 2;
  var y = pinY + PIN_PROPORTIONS.heading;
  var style = 'left:' + x + 'px; top:' + y + 'px;';
  var element = document.createElement(tagName);
  element.classList.add(className);
  element.type = type;
  element.style = style;
  return element;
};

var makeImage = function (src, alt, width, height) {
  var element = document.createElement('img');
  element.src = src;
  element.alt = alt;
  element.width = width;
  element.height = height;
  return element;
};

var renderPin = function (arr) {
  var pinButton = makePinButton('button', 'map__pin', 'button', arr.location.x, arr.location.y);
  var pinImg = makeImage(arr.author.avatar, arr.offer.title, PIN_PROPORTIONS.imageWidth, PIN_PROPORTIONS.imageHeight);
  pinButton.appendChild(pinImg);
  return pinButton;
};

var pinList = document.querySelector('.map__pins');
var createFragmentPins = function () {
  var fragment = document.createDocumentFragment();
  var arr = createArrOffers();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }
  pinList.appendChild(fragment);
};

createFragmentPins();

var renderCard = function (arr) {
  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = arr.author.avatar;
  cardElement.querySelector('.popup__title').textContent = arr.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = arr.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = arr.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = dictionary[arr.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + ' комнаты для ' + arr.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;

  var feature = cardElement.querySelectorAll('.popup__feature');
  for (var i = arr.offer.features.length; i < feature.length; i++) {
    feature[i].style = 'display: none;';
  }

  cardElement.querySelector('.popup__description').textContent = arr.offer.description;

  var container = cardElement.querySelector('.popup__photos');
  var templateImg = cardElement.querySelector('.popup__photo');
  for (i = 0; i < arr.offer.photos.length; i++) {
    var image = templateImg.cloneNode(true);
    image.src = arr.offer.photos[i];
    container.appendChild(image);
  }
  templateImg.remove();

  return cardElement;
};

var card = document.querySelector('.map');
var createFragmentCard = function () {
  var fragment = document.createDocumentFragment();
  var arr = createArrOffers()[0];
  fragment.appendChild(renderCard(arr));
  card.insertBefore(fragment, card.children[1]);
};

createFragmentCard();
