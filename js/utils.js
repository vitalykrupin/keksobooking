'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    makeRandomInt: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    addZero: function (number) {
      return number < 10 ? '0' + number : number;
    },
    copyArr: function (arr) {
      var photos = [];
      for (var j = 0; j < arr.length; j++) {
        photos[j] = arr[j];
      }
      return photos;
    },
    chooseRandArrItem: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  };
})();
