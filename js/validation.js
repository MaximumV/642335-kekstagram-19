'use strict';

(function () {

  var INVALID_STYLE = '0 0 3px 2px #f00';

  var MAX_COMMENT_LENGTH = 140;

  // ----------------------------------------------
  // хэштеги
  // ----------------------------------------------
  var MAX_HASHTAGS_COUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;

  var TagErrorState = {
    NO_HASHSIGN: 1,
    HASHSIGN_ONLY: 2,
    TOO_LONG: 4,
    NOT_ALPHANUMERIC: 8
  };

  var tagErrorStateToString = {
    '1': 'Хэш-тег должен начинаться с символа #.',
    '2': 'Хэш-тег не может состоять только из одной решётки.',
    '4': 'Максимальная длина  хэш-тега ' + MAX_HASHTAG_LENGTH + ' символов.',
    '8': 'Строка после решётки должна состоять из букв и чисел.',
  };

  var hashtagsInput = document.querySelector('.text__hashtags');

  // проверяет массив на неповторяемость элементов
  var isArrayUnique = function (array) {
    for (var i = 0; i < array.length - 1; i++) {
      if (array.includes(array[i], i + 1)) {
        return false;
      }
    }
    return true;
  };

  // в переданной строке символы mark отделяет пробелом
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

  // возвращает состояние ошибки для одного тега
  var checkHashtag = function (tag) {
    var errorState = 0;
    if (tag[0] !== '#') {
      return TagErrorState.NO_HASHSIGN;
    }
    if (tag === '#') {
      return TagErrorState.HASHSIGN_ONLY;
    }
    if (tag.length > MAX_HASHTAG_LENGTH) {
      errorState = TagErrorState.TOO_LONG;
    }
    if (!tag.match(/^#[0-9a-zA-Zа-яА-Я]+$/)) {
      errorState = errorState | TagErrorState.NOT_ALPHANUMERIC;
    }
    return errorState;
  };

  // валидация строки тегов
  var checkHashtagsValidity = function () {
    var validityCheckResult = [];
    var tagCheckResult = 0; /* битовая карта состояния ошибки */

    hashtagsInput.setCustomValidity('');
    hashtagsInput.value = makeSpaced('#', hashtagsInput.value);

    // разделяет строку на отдельные слова
    var tags = hashtagsInput.value.split(' ');
    tags = tags.filter(function (tag) {
      return tag !== '';
    });

    // проверка количества тегов
    if (tags.length > MAX_HASHTAGS_COUNT) {
      validityCheckResult.push('Нельзя указать больше ' + MAX_HASHTAGS_COUNT + ' хэш-тегов.');
    }

    // проверка уникальности тегов
    if (!isArrayUnique(tags.map(function (item) {
      return item.toUpperCase();
    }))) {
      validityCheckResult.push('Один и тот же хэш-тег не может быть использован дважды.');
    }

    // проверка каждого тега и заполнение битовой карты
    tags.forEach(function (tag) {
      tagCheckResult = tagCheckResult | checkHashtag(tag);
    });

    Object.values(TagErrorState).forEach(function (state) {
      if (tagCheckResult & state) {
        validityCheckResult.push(tagErrorStateToString[state]);
      }
    });

    hashtagsInput.setCustomValidity(validityCheckResult.join('\n'));
  };

  // добавляет обработчики для валидации
  var addHashtagsValidation = function () {
    hashtagsInput.addEventListener('change', function (evt) {
      checkHashtagsValidity();
      if (evt.target.validity.valid) {
        evt.target.style.boxShadow = 'none';
      }
    });
    hashtagsInput.addEventListener('input', function (evt) {
      // добавляет пробел при вводе символа # с клавиатуры
      if (evt.data === '#') {
        evt.target.value = makeSpaced('#', evt.target.value);
      }
      checkHashtagsValidity();
      if (evt.target.validity.valid) {
        evt.target.style.boxShadow = 'none';
      }
    });
    hashtagsInput.addEventListener('invalid', function (evt) {
      evt.target.style.boxShadow = INVALID_STYLE;
    });
  };

  // ----------------------------------------------
  // Комментарий
  // ----------------------------------------------
  var userDescription = document.querySelector('.text__description');

  // валидация комментария
  var checkCommentValidity = function () {
    if (userDescription.value.length > MAX_COMMENT_LENGTH) {
      userDescription.setCustomValidity('длина комментария не может составлять больше ' + MAX_COMMENT_LENGTH + ' символов');
    } else {
      userDescription.setCustomValidity('');
    }
  };

  // добавляет обработчики для валидации
  var addCommentValidation = function () {
    userDescription.addEventListener('change', function (evt) {
      checkCommentValidity();
      if (evt.target.validity.valid) {
        evt.target.style.boxShadow = 'none';
      }
    });
    userDescription.addEventListener('input', function (evt) {
      checkCommentValidity();
      evt.target.reportValidity();
      if (evt.target.validity.valid) {
        evt.target.style.boxShadow = 'none';
      }
    });
    userDescription.addEventListener('invalid', function (evt) {
      evt.target.style.boxShadow = INVALID_STYLE;
    });
  };


  window.validation = {
    addHashtags: addHashtagsValidation,
    addComment: addCommentValidation
  };

})();
