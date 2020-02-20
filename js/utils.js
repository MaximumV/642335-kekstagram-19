'use strict';

(function () {

  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    },

    renderErrorMessage: function (errorMessage) {
      var container = document.querySelector('main');
      var element = document.createElement('p');
      element.className = 'backend-error';
      element.style = 'margin: 0,3em 1em; padding: 1em; width: auto; border-top: 1px solid #fff; color: #ffe753; background-color: #3c3614; text-align: center;';
      element.textContent = errorMessage;
      container.prepend(element);
    },

    removeErrorMessage: function () {
      var container = document.querySelector('main');
      container.querySelectorAll('.backend-error').forEach(function (element) {
        element.remove();
      });
    }
  };

})();
