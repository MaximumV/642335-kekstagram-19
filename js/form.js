'use strict';

(function () {

  var DEFAULT_PHOTO = 'img/upload-default-image.jpg';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var FILE_INPUT_ACCEPT_LIST = '.gif, .jpg, .jpeg, .png';
  var FORM_ACTION_ADDRESS = 'https://js.dump.academy/kekstagram';

  var uploadForm = document.querySelector('#upload-select-image');
  var resetButton = uploadForm.querySelector('#upload-cancel');
  var editWindow = document.querySelector('.img-upload__overlay');
  var imagePreview = document.querySelector('.img-upload__preview img');

  var hashtagsInput = document.querySelector('.text__hashtags');
  var userDescription = document.querySelector('.text__description');

  // ----------------------------------------------
  // загрузка изображения и показ формы
  // ----------------------------------------------
  var setUploadedImage = function (imagePath) {
    editWindow.querySelector('.img-upload__preview img').src = imagePath;
    editWindow.querySelectorAll('.effects__preview').forEach(function (preview) {
      preview.style.backgroundImage = 'url(' + imagePath + ')';
    });
  };

  var getUploadFileName = function () {
    var uploadFileInput = document.querySelector('#upload-file');
    var file = uploadFileInput.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        setUploadedImage(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  var showEditWindow = function () {
    resetEditImage();
    getUploadFileName();

    window.modal.show(editWindow, resetButton, function () {
      resetEditImage();
      resetUploadForm();
    });
  };

  var resetUploadForm = function () {
    var uploadFileInput = document.querySelector('#upload-file');
    uploadFileInput.value = '';
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.send(new FormData(uploadForm), function () {
      window.modal.close();
      window.message.showSuccess();
    }, function () {
      window.modal.close();
      window.message.showError();
    });
  };

  var addUploadProcessing = function () {
    var uploadFileInput = document.querySelector('#upload-file');

    uploadForm.action = FORM_ACTION_ADDRESS;
    uploadFileInput.accept = FILE_INPUT_ACCEPT_LIST;
    resetButton.tabindex = '0';

    uploadFileInput.addEventListener('change', function () {
      showEditWindow();
    });
    uploadForm.addEventListener('submit', onFormSubmit);
  };

  var addEditImageProcessing = function () {
    window.sizer.init(zoomPicture);
    initFilter();
    initHashtags();
    initComment();
  };

  var resetEditImage = function () {
    window.sizer.reset();
    resetFilter();
    clearHashtags();
    clearComment();
    setUploadedImage(DEFAULT_PHOTO);
  };

  // ----------------------------------------------
  // редактирование изображения
  // ----------------------------------------------

  // масштабирование
  var zoomPicture = function (size) {
    imagePreview.style.transform = 'scale(' + size / 100 + ')';
  };

  // эффекты и слайдер
  var getCurrentEffect = function () {
    var effectsRadioNodeList = uploadForm.effect;

    return effectsRadioNodeList.value;
  };

  var setCurrentEffect = function (effect) {
    uploadForm.effect.value = effect;
  };

  var applyFilter = function (effect) {
    imagePreview.classList.forEach(function (className) {
      if (className.includes('effects__preview--')) {
        imagePreview.classList.remove(className);
      }
    });
    var isSliderVisible = (effect === 'none') ? false : true;
    window.slider.reset(isSliderVisible);
    imagePreview.classList.add('effects__preview--' + effect);
  };

  var initFilter = function () {
    var effectsContainer = document.querySelector('.effects');
    window.slider.init(applyEffectLevel);

    effectsContainer.addEventListener('change', function () {
      applyFilter(getCurrentEffect());
    });
    resetFilter();
  };

  var resetFilter = function () {
    setCurrentEffect('none');
    applyFilter('none');
  };

  var getFilterStyleString = function (effect, effectLevel) {
    switch (effect) {
      case ('none'):
        return '';
      case ('chrome'):
        return 'grayscale(' + effectLevel / 100 + ')';
      case ('sepia'):
        return 'sepia(' + effectLevel / 100 + ')';
      case ('marvin'):
        return 'invert(' + effectLevel + '%)';
      case ('phobos'):
        return 'blur(' + (1 + 2 * effectLevel / 100) + 'px)';
      case ('heat'):
        return 'brightness(' + (1 + 2 * effectLevel / 100) + ')';
    }
    return '';
  };

  // применить фильтры и уровень слайдера к картинке
  var applyEffectLevel = function () {
    // применяет текушие значенияк контролов к картинке
    var effect = getCurrentEffect();
    var level = window.slider.get();

    imagePreview.style.filter = getFilterStyleString(effect, level);
  };

  // ----------------------------------------------
  // текстовые поля
  // ----------------------------------------------

  // хэштеги
  var initHashtags = function () {
    hashtagsInput.addEventListener('focus', function () {
      window.modal.mustCloseByEsc(false);
    });
    hashtagsInput.addEventListener('blur', function (evt) {
      evt.target.reportValidity();
      window.modal.mustCloseByEsc(true);
    });
    window.validation.addHashtags();
  };

  var clearHashtags = function () {
    hashtagsInput.setCustomValidity('');
    hashtagsInput.value = '';
    hashtagsInput.style.boxShadow = 'none';
  };

  // комментарий
  var initComment = function () {
    userDescription.addEventListener('focus', function () {
      window.modal.mustCloseByEsc(false);
    });
    userDescription.addEventListener('blur', function () {
      window.modal.mustCloseByEsc(true);
    });
    window.validation.addComment();
  };

  var clearComment = function () {
    userDescription.setCustomValidity('');
    userDescription.value = '';
    userDescription.style.boxShadow = 'none';
  };

  // ----------------------------------------------

  addUploadProcessing();
  addEditImageProcessing();
})();
