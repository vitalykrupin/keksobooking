'use strict';

(function () {
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

  mapPinMain.addEventListener('mousedown', activatePage);

  var mapPins = map.querySelector('.map__pins');
  mapPins.addEventListener('click', function (evt) {
    var button = evt.target;
    while (button && button.tagName.toLowerCase() !== 'button') {
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

  var adForm = document.querySelector('.ad-form');
  var inputTitle = adForm.querySelector('input[name=title]');

  inputTitle.addEventListener('invalid', function () {
    if (inputTitle.validity.tooShort) {
      inputTitle.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    } else if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Обязательное поле');
    } else {
      inputTitle.setCustomValidity('');
    }
  });

  inputTitle.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 30) {
      target.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    } else {
      target.setCustomValidity('');
    }
  });

  var selectType = adForm.querySelector('select[name=type]');
  var inputPrice = adForm.querySelector('input[name=price]');
  var changeInputPrice = function () {
    inputPrice.setAttribute('min', dictionary[selectType.value].minPrice);
    inputPrice.placeholder = dictionary[selectType.value].minPrice;
  };

  selectType.addEventListener('change', function () {
    changeInputPrice();
  });

  inputPrice.addEventListener('invalid', function () {
    if (inputPrice.validity.rangeOverflow) {
      inputPrice.setCustomValidity('Цена превышает максимальное значение: ' + inputPrice.max);
    } else if (inputPrice.validity.rangeUnderflow) {
      inputPrice.setCustomValidity('Цена ниже минимального значения: ' + inputPrice.min);
    } else if (inputPrice.validity.valueMissing) {
      inputPrice.setCustomValidity('Обязательное поле');
    } else {
      inputPrice.setCustomValidity('');
    }
  });

  inputPrice.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value < inputPrice.min) {
      target.setCustomValidity('Цена ниже минимального значения: ' + inputPrice.min);
    } else if (target.value > inputPrice.max) {
      target.setCustomValidity('Цена превышает максимальное значение: ' + inputPrice.max);
    } else {
      target.setCustomValidity('');
    }
  });

  var selectTimein = adForm.querySelector('select[name=timein]');
  var selectTimeout = adForm.querySelector('select[name=timeout]');

  var changeSelectTimein = function () {
    for (var i = 0; i < selectTimein.length; i++) {
      if (selectTimein[i].value === selectTimeout.value) {
        selectTimein[i].selected = true;
      }
    }
  };

  var changeSelectTimeout = function () {
    for (var i = 0; i < selectTimeout.length; i++) {
      if (selectTimeout[i].value === selectTimein.value) {
        selectTimeout[i].selected = true;
      }
    }
  };

  selectTimein.addEventListener('change', function () {
    changeSelectTimeout();
  });

  selectTimeout.addEventListener('change', function () {
    changeSelectTimein();
  });

  var selectRooms = adForm.querySelector('select[name=rooms]');
  var selectCapacity = adForm.querySelector('select[name=capacity]');

  var roomMap = {
    1: {
      optionStates: [true, true, false, true],
      selectItem: 2
    },
    2: {
      optionStates: [true, false, false, true],
      selectItem: 1
    },
    3: {
      optionStates: [false, false, false, true],
      selectItem: 0
    },
    100: {
      optionStates: [true, true, true, false],
      selectItem: 3
    }
  };

  var changeSelectCapacity = function () {
    roomMap[selectRooms.value].optionStates.forEach(function (item, i) {
      selectCapacity[i].disabled = item;
    });
    selectCapacity[roomMap[selectRooms.value].selectItem].selected = true;
  };

  selectRooms.addEventListener('change', function () {
    changeSelectCapacity();
  });
})();
