'use strict';

(function () {
  var Keycode = {
    ESC: 27,
    ENTER: 13
  };

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === Keycode.ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === Keycode.ENTER) {
        action();
      }
    },
    // makeRandomInt: function (min, max) {
    //   return Math.floor(min + Math.random() * (max + 1 - min));
    // },
    // addZero: function (number) {
    //   return number < 10 ? '0' + number : number;
    // },
    // copyArr: function (arr) {
    //   var photos = [];
    //   for (var j = 0; j < arr.length; j++) {
    //     photos[j] = arr[j];
    //   }
    //   return photos;
    // },
    // chooseRandArrItem: function (arr) {
    //   return arr[Math.floor(Math.random() * arr.length)];
    // },
    debounce: function (fun, interval) {
      var lastTimeout = null;

      return function () {
        var args = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          fun.apply(null, args);
        }, interval);
      };
    }
  };
})();
