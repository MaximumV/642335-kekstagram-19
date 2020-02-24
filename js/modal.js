'use strict';

(function () {

  var modalWindow;
  var cancelButton;
  var resetModalWindow;

  var closeModal = function () {
    if (isModalOpen()) {
      modalWindow.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      document.removeEventListener('keydown', onModalWindowEscKeydown);
      cancelButton.removeEventListener('click', onCancelButtonClick);
      cancelButton.removeEventListener('keydown', onCancelButtonEnterKeydown);
      resetModalWindow();
      modalWindow = undefined;
      cancelButton = undefined;
      resetModalWindow = undefined;
    }
  };

  var onModalWindowEscKeydown = function (evt) {
    window.util.isEscEvent(evt, closeModal);
  };

  var onCancelButtonEnterKeydown = function (evt) {
    window.util.isEnterEvent(evt, closeModal);
  };

  var onCancelButtonClick = function () {
    closeModal();
  };

  var isModalOpen = function () {
    return document.querySelector('body').classList.contains('modal-open');
  };


  var showModal = function (modal, cancel, callbackReset) {
    if (!isModalOpen()) {
      modalWindow = modal;
      cancelButton = cancel;
      resetModalWindow = callbackReset;

      document.querySelector('body').classList.add('modal-open');
      modalWindow.classList.remove('hidden');

      cancelButton.addEventListener('click', onCancelButtonClick);
      cancelButton.addEventListener('keydown', onCancelButtonEnterKeydown);
      document.addEventListener('keydown', onModalWindowEscKeydown);
    }
  };

  var mustCloseByEsc = function (isEnabled) {
    if (isEnabled) {
      document.removeEventListener('keydown', onModalWindowEscKeydown);
      document.addEventListener('keydown', onModalWindowEscKeydown);
    } else {
      document.removeEventListener('keydown', onModalWindowEscKeydown);
    }
  };

  window.modal = {
    show: showModal,
    close: closeModal,
    mustCloseByEsc: mustCloseByEsc
  };

})();
