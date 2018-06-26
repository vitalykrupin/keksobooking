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
  imageHeight: 40,
  mainPinWidth: 65,
  mainPinHeight: 65,
  pointerWidth: 10,
  pointerHeight: 22
};
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
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

var addZero = function (num) {
  return num >= 10 ? num : '0' + num;
};

var makeRandomInt = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var chooseRandArrItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
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
        title: chooseRandArrItem(OFFER_TITLE),
        address: location.x + ', ' + location.y,
        price: makeRandomInt(PRICE_MIN, PRICE_MAX),
        type: chooseRandArrItem(OFFER_TYPE),
        rooms: makeRandomInt(ROOMS_MIN, ROOMS_MAX),
        guests: makeRandomInt(GUESTS_MIN, GUESTS_MAX),
        checkin: chooseRandArrItem(OFFER_CHECKIN),
        checkout: chooseRandArrItem(OFFER_CHECKOUT),
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

var OFFERS = createArrOffers();

var similarCardTemplate = document.querySelector('#similar-card-template')
  .content
  .querySelector('.map__card');

var makePinButton = function (tagName, className, type, pinX, pinY, index) {
  var x = pinX - PIN_PROPORTIONS.width / 2;
  var y = pinY + PIN_PROPORTIONS.heading;
  var style = 'left:' + x + 'px; top:' + y + 'px;';
  var element = document.createElement(tagName);
  element.classList.add(className);
  element.type = type;
  element.style = style;
  element.dataset.index = index;
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

var renderPin = function (arr, i) {
  var pinButton = makePinButton('button', 'map__pin', 'button', arr.location.x, arr.location.y, i);
  var pinImg = makeImage(arr.author.avatar, arr.offer.title, PIN_PROPORTIONS.imageWidth, PIN_PROPORTIONS.imageHeight);
  pinButton.appendChild(pinImg);
  return pinButton;
};

var pinList = document.querySelector('.map__pins');
var createFragmentPins = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i], i));
  }
  pinList.appendChild(fragment);
};

var cardElement = similarCardTemplate.cloneNode(true);
var feature = cardElement.querySelectorAll('.popup__feature');
var containerCardImg = cardElement.querySelector('.popup__photos');
var templateImg = containerCardImg.querySelector('.popup__photo').cloneNode(true);

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var closePopup = function () {
  var popup = document.querySelector('.popup');
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

containerCardImg.querySelector('.popup__photo').remove();

var renderCard = function (arr) {
  cardElement.classList.remove('hidden');
  cardElement.querySelector('.popup__avatar').src = arr.author.avatar;
  cardElement.querySelector('.popup__title').textContent = arr.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = arr.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = arr.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = dictionary[arr.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + ' комнаты для ' + arr.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;

  for (var i = 0; i < feature.length; i++) {
    feature[i].style = 'display: none;';
  }

  for (i = arr.offer.features.length; i < feature.length; i++) {
    feature[i].style = 'display: inline-block;';
  }

  cardElement.querySelector('.popup__description').textContent = arr.offer.description;

  containerCardImg.innerHTML = '';
  for (i = 0; i < arr.offer.photos.length; i++) {
    var image = templateImg.cloneNode(true);
    image.src = arr.offer.photos[i];
    containerCardImg.appendChild(image);
  }

  var popupClose = cardElement.querySelector('.popup__close');

  popupClose.addEventListener('click', function () {
    closePopup();
  });
  document.addEventListener('keydown', onPopupEscPress);
  popupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  return cardElement;
};

var map = document.querySelector('.map');
var selects = document.querySelectorAll('select');
var activatePage = function () {
  map.classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  for (var i = 0; i < selects.length; i++) {
    selects[i].disabled = false;
  }
  document.querySelector('fieldset').disabled = false;
  setAddressValues();
  createFragmentPins(OFFERS);
  mapPinMain.removeEventListener('mouseup', activatePage);
};

var mapPinMain = map.querySelector('.map__pin--main');
var inputAddress = document.querySelector('input[name=address]');
var setAddressValues = function () {
  var coordinatePinX = mapPinMain.offsetLeft + PIN_PROPORTIONS.mainPinWidth / 2;
  var coordinatePinY = mapPinMain.offsetTop;
  if (map.classList.contains('map--faded')) {
    coordinatePinY += PIN_PROPORTIONS.mainPinHeight / 2;
  } else {
    coordinatePinY += PIN_PROPORTIONS.mainPinHeight + PIN_PROPORTIONS.pointerHeight;
  }
  inputAddress.value = Math.floor(coordinatePinX) + ', ' + Math.floor(coordinatePinY);
};

setAddressValues();

mapPinMain.addEventListener('mouseup', activatePage);

var mapPins = map.querySelector('.map__pins');
mapPins.addEventListener('click', function (evt) {
  var button = evt.target;
  while (button && button.tagName !== 'BUTTON') {
    button = evt.target.parentNode;
  }
  if (!button) {
    return;
  }
  if (typeof button.dataset.index === 'undefined') {
    return;
  }
  map.insertBefore(renderCard(OFFERS[button.dataset.index]), map.children[1]);
});
