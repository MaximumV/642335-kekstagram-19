'use strict';

(function () {

  var SIZE_SCALE_INTERVAL = 25;
  var MIN_SIZE = 25;
  var MAX_SIZE = 100;
  var DEFAULT_SIZE = 100;

  var zoom = function () {
    return 'В модуль нужно передать функцию для масштабирования';
  };

  var sizeControls = document.querySelector('.img-upload__scale');
  var sizeIndicator = sizeControls.querySelector('.scale__control--value');


  var setSize = function (size) {
    sizeIndicator.value = size + '%';
    zoom(size);
  };

  var incrementSize = function () {
    var size = parseInt(sizeIndicator.value, 10);
    size = size + SIZE_SCALE_INTERVAL;
    if (size > MAX_SIZE) {
      size = MAX_SIZE;
    }
    setSize(size);
  };

  var decrementSize = function () {
    var size = parseInt(sizeIndicator.value, 10);

    size = size - SIZE_SCALE_INTERVAL;
    if (size < MIN_SIZE) {
      size = MIN_SIZE;
    }
    setSize(size);
  };

  var initSizeControls = function (callbackZoom) {
    var sizeDecControl = sizeControls.querySelector('.scale__control--smaller');
    var sizeIncControl = sizeControls.querySelector('.scale__control--bigger');

    // функция для масштабирования из основного модуля
    zoom = callbackZoom;

    sizeDecControl.addEventListener('click', function () {
      decrementSize();
    });
    sizeIncControl.addEventListener('click', function () {
      incrementSize();
    });

    resetSizeControls();
  };

  var resetSizeControls = function () {
    setSize(DEFAULT_SIZE);
  };

  window.sizer = {
    init: initSizeControls,
    reset: resetSizeControls
  };

})();
