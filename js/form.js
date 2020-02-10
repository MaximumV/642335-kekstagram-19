'use strict';

(function () {

  var DEFAULT_PHOTO = 'img/upload-default-image.jpg';

  var MAX_HASHTAGS_COUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_COMMENT_LENGTH = 140;

  var editWindow = document.querySelector('.img-upload__overlay');
  var uploadForm = document.querySelector('#upload-select-image');
  var imageElement = document.querySelector('.img-upload__preview img');

  // ----------------------------------------------
  // загрузка изображения
  // ----------------------------------------------
  // пока загружает фото только из из папки проекта
  var getUploadFileName = function () {
    var uploadFileInput = document.querySelector('#upload-file');
    var fullFileName = '';
    if (uploadFileInput.value.startsWith('C:\\fakepath')
      && (uploadFileInput.files[0].type === 'image/jpeg')) {
      var fileName = uploadFileInput.value.slice(12);
      fullFileName = 'photos/' + fileName;
    }
    return fullFileName;
  };

  var showEditWindow = function () {
    var uploadFileName = getUploadFileName();
    if (uploadFileName.length === 0) {
      uploadFileName = DEFAULT_PHOTO;
    }
    editWindow.querySelector('.img-upload__preview img').src = uploadFileName;

    resetEditImage();

    document.addEventListener('keydown', onEditWindowEscKeydown);
    editWindow.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
  };

  var closeUploadForm = function () {
    var uploadFileInput = document.querySelector('#upload-file');

    document.querySelector('body').classList.remove('modal-open');
    editWindow.classList.add('hidden');
    uploadFileInput.value = '';
    document.removeEventListener('keydown', onEditWindowEscKeydown);
  };

  var onEditWindowEscKeydown = function (evt) {
    window.util.isEscEvent(evt, function () {
      resetEditImage();
      closeUploadForm();
    });
  };

  var onResetButtonEnterKeydown = function (evt) {
    window.util.isEnterEvent(evt, function () {
      resetEditImage();
      closeUploadForm();
    });
  };

  var addUploadProcessing = function () {
    var uploadFileInput = document.querySelector('#upload-file');
    var resetButton = uploadForm.querySelector('#upload-cancel');

    uploadForm.action = 'https://js.dump.academy/kekstagram';
    uploadFileInput.accept = 'image/*';
    resetButton.tabindex = '0';

    uploadFileInput.addEventListener('change', function () {
      showEditWindow();
    });
    resetButton.addEventListener('click', function () {
      closeUploadForm();
    });
    resetButton.addEventListener('keydown', onResetButtonEnterKeydown);
  };

  // ----------------------------------------------
  // редактирование изображения
  // ----------------------------------------------

  // масштабирование
  var zoomPicture = function (size) {
    imageElement.style.transform = 'scale(' + size / 100 + ')';
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
    imageElement.classList.forEach(function (className) {
      if (className.includes('effects__preview--')) {
        imageElement.classList.remove(className);
      }
    });
    var isSliderVisible = (effect === 'none') ? false : true;
    window.slider.reset(isSliderVisible);
    imageElement.classList.add('effects__preview--' + effect);
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

    imageElement.style.filter = getFilterStyleString(effect, level);
  };

  // ----------------------------------------------
  // текстовые поля
  // ----------------------------------------------

  // хэштеги
  var checkHashtagsValidity = function () {
    var isArrayUnique = function (array) {
      for (var i = 0; i < array.length - 1; i++) {
        if (array.includes(array[i], i + 1)) {
          return false;
        }
      }
      return true;
    };

    var hashtagsInput = document.querySelector('.text__hashtags');
    hashtagsInput.setCustomValidity('');
    hashtagsInput.value = makeSpaced('#', hashtagsInput.value);

    // разделяет строку на отдельные слова
    var tags = hashtagsInput.value.split(' ');
    tags = tags.filter(function (tag) {
      return tag !== '';
    });

    if (tags.length > MAX_HASHTAGS_COUNT) {
      hashtagsInput.setCustomValidity('Нельзя указать больше ' + MAX_HASHTAGS_COUNT + ' хэш-тегов');
      return;
    }

    tags.forEach(function (tag) {
      if (tag[0] !== '#') {
        hashtagsInput.setCustomValidity('Хэш-тег должен начинаться с символа #');
        return;
      }
      if (tag === '#') {
        hashtagsInput.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
        return;
      }
      if (tag.length > MAX_HASHTAG_LENGTH) {
        hashtagsInput.setCustomValidity('Максимальная длина  хэш-тега ' + MAX_HASHTAG_LENGTH + ' символов');
        return;
      }
      if (!tag.match(/^#[0-9a-zA-Zа-яА-Я]+$/)) {
        hashtagsInput.setCustomValidity('Строка после решётки должна состоять из букв и чисел');
        return;
      }
    });

    // уникальные
    if (!isArrayUnique(tags.map(function (item) {
      return item.toUpperCase();
    }))) {
      hashtagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    }
  };

  var makeSpaced = function (mark, text) {
    if (text.length === 0) {
      return '';
    }
    var textResult = text[0];
    for (var i = 1; i < text.length; i++) {
      if (text[i] === mark) {
        textResult += (text[i - 1] === ' ') ? mark : ' ' + mark;
      } else {
        textResult += text[i];
      }
    }
    return textResult;
  };

  var initHashtags = function () {
    var hashtagsInput = document.querySelector('.text__hashtags');

    hashtagsInput.addEventListener('focus', function () {
      document.removeEventListener('keydown', onEditWindowEscKeydown);
    });
    hashtagsInput.addEventListener('blur', function (evt) {
      evt.target.value = makeSpaced('#', evt.target.value);
      document.addEventListener('keydown', onEditWindowEscKeydown);
    });
    hashtagsInput.addEventListener('change', function () {
      checkHashtagsValidity();
    });
    hashtagsInput.addEventListener('input', function (evt) {
      // добавляет пробел при вводе символа # с клавиатуры
      if (evt.data === '#') {
        evt.target.value = makeSpaced('#', evt.target.value);
      }
    });
  };

  var clearHashtags = function () {
    var hashtagsInput = document.querySelector('.text__hashtags');
    hashtagsInput.setCustomValidity('');
    hashtagsInput.value = '';
  };

  // комментарий
  var checkCommentValidity = function () {
    var userDescription = document.querySelector('.text__description');

    if (userDescription.value.length > MAX_COMMENT_LENGTH) {
      userDescription.setCustomValidity('длина комментария не может составлять больше ' + MAX_COMMENT_LENGTH + ' символов');
    } else {
      userDescription.setCustomValidity('');
    }
  };

  var initComment = function () {
    var userDescription = document.querySelector('.text__description');

    userDescription.addEventListener('focus', function () {
      document.removeEventListener('keydown', onEditWindowEscKeydown);
    });
    userDescription.addEventListener('blur', function () {
      document.addEventListener('keydown', onEditWindowEscKeydown);
    });

    userDescription.addEventListener('change', function () {
      checkCommentValidity();
    });
    userDescription.addEventListener('input', function (evt) {
      if (evt.target.value.length <= MAX_COMMENT_LENGTH) {
        evt.target.setCustomValidity('');
      }
    });
  };

  var clearComment = function () {
    var userDescription = document.querySelector('.text__description');
    userDescription.setCustomValidity('');
    userDescription.value = '';
  };

  // окно редактирования
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
  };


  addUploadProcessing();
  addEditImageProcessing();
})();
