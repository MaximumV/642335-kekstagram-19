'use strict';

(function () {

  var ERROR_LINE_STYLE = 'margin: 0.2em 1em; padding: 1em; left:0; right: 0; '
  + 'border-top: 1px solid #fff; color: #ffe753; background-color: #3c3614; '
  + 'text-align: center; position: absolute; height: 4em; overflow-y: auto;';

  var container = document.querySelector('main');
  var messageWindow;
  var closeButton;

  var onMessageWindowEscKeydown = function (evt) {
    window.util.isEscEvent(evt, closeMessageWindow);
  };

  var onCloseButtonEnterKeydown = function (evt) {
    window.util.isEnterEvent(evt, closeMessageWindow);
  };

  var onMessageWindowClick = function (evt) {
    if (evt.target.parentElement === container) {
      closeMessageWindow();
    }
  };

  var onCloseButtonClick = function () {
    closeMessageWindow();
  };

  var closeMessageWindow = function () {
    closeButton.removeEventListener('click', onCloseButtonClick);
    closeButton.removeEventListener('keydown', onCloseButtonEnterKeydown);
    messageWindow.removeEventListener('click', onMessageWindowClick);
    document.removeEventListener('keydown', onMessageWindowEscKeydown);
    messageWindow.remove();
  };

  var showMessageWindow = function (windowName) {
    var template = document.querySelector('#' + windowName).content.cloneNode(true);
    messageWindow = template.querySelector('section' + '.' + windowName);
    closeButton = messageWindow.querySelector('button');

    closeButton.addEventListener('click', onCloseButtonClick);
    closeButton.addEventListener('keydown', onCloseButtonEnterKeydown);
    messageWindow.addEventListener('click', onMessageWindowClick);
    document.addEventListener('keydown', onMessageWindowEscKeydown);
    container.append(messageWindow);
  };

  var renderErrorMessageLine = function (errorMessage) {
    var element = document.createElement('p');
    element.className = 'backend-error';
    element.style = ERROR_LINE_STYLE;
    element.textContent = errorMessage;
    container.prepend(element);
  };

  window.message = {
    showSuccess: function () {
      showMessageWindow('success');
    },
    showError: function () {
      showMessageWindow('error');
    },
    renderErrorLine: renderErrorMessageLine
  };

})();
