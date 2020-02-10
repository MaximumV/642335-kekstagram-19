'use strict';

(function () {

  var DEFAULT_SLIDER_LEVEL = 100;

  var applySlider = function () {
    return 'В модуль нужно передать функцию для слайдера';
  };

  var sliderElement = document.querySelector('.effect-level');
  var sliderPin = sliderElement.querySelector('.effect-level__pin');
  var sliderLine = sliderElement.querySelector('.effect-level__line');
  var sliderValue = sliderElement.querySelector('.effect-level__value');


  var getSliderLevel = function () {
    return sliderValue.value;
  };

  var setSliderLevel = function (level) {
    var sliderDepth = sliderElement.querySelector('.effect-level__depth');

    sliderValue.value = level;
    sliderPin.style.left = level + '%';
    sliderDepth.style.width = level + '%';
    applySlider(level);
  };

  var onSliderMouseup = function (evt) {
    if (evt.button !== 0) {
      return;
    }
    if (evt.target.classList.contains('effect-level__pin')) {
      // клик на сам ползунок - здесь ничего не перемещаем
      return;
    }

    sliderElement.style.cursor = 'grabbing';

    var sliderWidth = sliderElement.offsetWidth;
    var lineWidth = sliderLine.offsetWidth;
    var sliderMargin = (sliderWidth - lineWidth) / 2;
    var posX = evt.offsetX;
    var sliderLevel = 0;

    if (evt.target === evt.currentTarget) {
      // клик снаружи линии - вычитаем поля
      posX = posX < sliderMargin ? 0 : posX - sliderMargin;
      posX = posX < lineWidth ? posX : lineWidth;
    }

    sliderLevel = Math.round(posX / lineWidth * 100);
    setSliderLevel(sliderLevel);
  };

  var initSlider = function (callbackApplySlider) {
    applySlider = callbackApplySlider;
    sliderElement.addEventListener('mouseup', onSliderMouseup);
    sliderPin.style.cursor = 'grab';
  };

  var resetSlider = function (isVisible) {
    setSliderLevel(DEFAULT_SLIDER_LEVEL);
    if (isVisible) {
      sliderElement.classList.remove('hidden');
    } else {
      sliderElement.classList.add('hidden');
    }
  };


  window.slider = {
    init: initSlider,
    reset: resetSlider,
    get: getSliderLevel,
  };

})();
