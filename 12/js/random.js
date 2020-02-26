'use strict';

(function () {

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.random = {
    getBoolean: function () {
      return !!(Math.round(Math.random()));
    },

    getArrayElement: function (array) {
      return array[getRandomNumber(0, array.length - 1)];
    },

    getNumber: getRandomNumber
  };

})();
