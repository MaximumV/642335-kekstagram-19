'use strict';

(function () {

  var DEFAULT_SLIDER_LEVEL = 100;
  var SLIDER_ARROWKEYS_STEP = 5;

  var applySlider = function () {
    return 'В модуль нужно передать функцию для слайдера';
  };

  var sliderControl = document.querySelector('.effect-level');
  var sliderPin = sliderControl.querySelector('.effect-level__pin');
  var sliderLine = sliderControl.querySelector('.effect-level__line');
  var sliderValue = sliderControl.querySelector('.effect-level__value');


  var getSliderLevel = function () {
    return sliderValue.value;
  };

  var setSliderLevel = function (level) {
    var sliderDepth = sliderControl.querySelector('.effect-level__depth');

    sliderValue.value = level;
    sliderPin.style.left = level + '%';
    sliderDepth.style.width = level + '%';
    applySlider(level);
  };

  // управление мышью
  var onSliderPinMousedown = function (evt) {
    if (evt.button !== 0) {
      return;
    }
    evt.preventDefault();
    sliderPin.style.cursor = 'grabbing';

    var lineWidth = sliderLine.offsetWidth;
    var lineLeft = sliderLine.getBoundingClientRect().left;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      document.body.style.cursor = 'grabbing';
      var pinPosition = (moveEvt.clientX < lineLeft) ? 0 : moveEvt.clientX - lineLeft;
      var sliderLevel = Math.round((pinPosition) / lineWidth * 100);
      sliderLevel = (sliderLevel < 100) ? sliderLevel : 100;
      setSliderLevel(sliderLevel);
    };

    var onMouseUp = function (moveEvt) {
      moveEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = 'default';
      sliderPin.style.cursor = 'grab';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // управление с клавиатуры
  var onArrowKeyDown = function (keyEvt) {
    var direction = '';
    switch (keyEvt.key) {
      case 'ArrowLeft':
        direction = -1;
        break;
      case 'ArrowRight':
        direction = 1;
        break;
      default:
        return;
    }
    var sliderLevel = +getSliderLevel() + direction * SLIDER_ARROWKEYS_STEP;
    sliderLevel = (sliderLevel < 100) ? sliderLevel : 100;
    sliderLevel = (sliderLevel < 0) ? 0 : sliderLevel;
    setSliderLevel(sliderLevel);
  };

  var onEscKeydown = function (evt) {
    window.util.isEscEvent(evt, function () {
      sliderPin.blur(); /* прекращается управление слайдером */
      document.removeEventListener('keydown', onEscKeydown);
    });
  };

  var onEnterKeydown = function (evt) {
    window.util.isEnterEvent(evt, function () {
      document.addEventListener('keydown', onArrowKeyDown);
      window.modal.mustCloseByEsc(false);
      document.addEventListener('keydown', onEscKeydown);
      evt.preventDefault();
    });
  };

  var onSliderPinFocus = function () {
    document.addEventListener('keydown', onEnterKeydown);
  };

  var initSlider = function (callbackApplySlider) {
    applySlider = callbackApplySlider;
    sliderPin.addEventListener('mousedown', onSliderPinMousedown);
    sliderPin.addEventListener('focus', onSliderPinFocus);
    sliderPin.addEventListener('blur', function () {
      document.removeEventListener('keydown', onEnterKeydown);
      document.removeEventListener('keydown', onArrowKeyDown);
      window.modal.mustCloseByEsc(true);
    });
    sliderPin.style.cursor = 'grab';
  };

  var resetSlider = function (isVisible) {
    setSliderLevel(DEFAULT_SLIDER_LEVEL);
    if (isVisible) {
      sliderControl.classList.remove('hidden');
    } else {
      sliderControl.classList.add('hidden');
    }
  };


  window.slider = {
    init: initSlider,
    reset: resetSlider,
    get: getSliderLevel,
  };

})();
