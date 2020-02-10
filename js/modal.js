'use strict';

(function () {
  var showModal = function (modalWindow, cancelButton, resetModalWindow) {

    var closeModal = function () {
      modalWindow.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      document.removeEventListener('keydown', onModalWindowEscKeydown);
      cancelButton.removeEventListener('click', onCancelButtonClick);
      cancelButton.removeEventListener('keydown', onCancelButtonEnterKeydown);
      resetModalWindow();
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

    document.querySelector('body').classList.add('modal-open');
    modalWindow.classList.remove('hidden');

    cancelButton.addEventListener('click', onCancelButtonClick);
    cancelButton.addEventListener('keydown', onCancelButtonEnterKeydown);
    document.addEventListener('keydown', onModalWindowEscKeydown);
  };

  window.modal = {
    show: showModal
  };

})();
