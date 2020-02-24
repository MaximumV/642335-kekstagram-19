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
      if (window.modal.isModalOpen()) {
        return;
      }
      var container = document.querySelector('main');
      var element = document.createElement('p');
      element.className = 'backend-error';
      element.style = 'margin: 0.2em 1em; padding: 1em; left:0; right: 0; '
      + 'border-top: 1px solid #fff; color: #ffe753; background-color: #3c3614; '
      + 'text-align: center; position: relative; z-index: 3; height: 4em; '
      + 'overflow-y: auto;';
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
