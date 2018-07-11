'use strict';

(function () {
  var Keycode = {
    ESC: 27
  };

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === Keycode.ESC) {
        action();
      }
    },
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
    },
  };

})();
