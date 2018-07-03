'use strict';

(function () {
  var pinProportions = window.constants.PIN_PROPORTIONS;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('input[name=address]');

  window.setAddressValues = function () {
    var coordinatePinX = mapPinMain.offsetLeft + pinProportions.mainPinWidth / 2;
    var coordinatePinY = mapPinMain.offsetTop;
    if (map.classList.contains('map--faded')) {
      coordinatePinY += pinProportions.mainPinHeight / 2;
    } else {
      coordinatePinY += pinProportions.mainPinHeight + pinProportions.pointerHeight;
    }
    inputAddress.value = Math.floor(coordinatePinX) + ', ' + Math.floor(coordinatePinY);
  };

  window.setAddressValues();

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

  var TITLE_LENGTH_MAX = 30;
  inputTitle.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < TITLE_LENGTH_MAX) {
      target.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    } else {
      target.setCustomValidity('');
    }
  });

  var selectType = adForm.querySelector('select[name=type]');
  var inputPrice = adForm.querySelector('input[name=price]');
  var dictionary = window.constants.DICTIONARY;

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

  var changeSelection = function (arr1, arr2) {
    arr1.value = arr2.value;
  };

  selectTimein.addEventListener('change', function () {
    changeSelection(selectTimeout, selectTimein);
  });

  selectTimeout.addEventListener('change', function () {
    changeSelection(selectTimein, selectTimeout);
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

  var resetAdForm = function () {
    adForm.reset();
    window.setAddressValues();
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(adForm), function (response) {
      resetAdForm();
    }, function (response) {
      var errorMassage = document.createElement('div');
      errorMassage.style = 'margin: 0 auto; text-align: center; color: red;';
      errorMassage.style.fontSize = '16px';
      errorMassage.textContent = response + '. Попробуйте отправить форму еще раз.';
      adForm.insertAdjacentElement('beforeend', errorMassage);
    });
    evt.preventDefault();
  });
})();
