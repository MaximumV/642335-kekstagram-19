'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

// ----------------------------------------------
// тестовые данные
// ----------------------------------------------
var PICS_COUNT = 25;
var AVATARS_COUNT = 6;
var MAX_COMMENTS = 8;
var COMMENTS_TO_SHOW = 5;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var DEFAULT_PHOTO = 'img/upload-default-image.jpg';

var SIZE_SCALE_INTERVAL = 25;
var DEFAULT_SIZE = 100;
var MIN_SIZE = 25;
var MAX_SIZE = 100;
var DEFAULT_SLIDER_LEVEL = 100;

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

var NAMES = [
  'Кексик',
  'Рудольф',
  'Снежок',
  'Семён',
  'Адольф',
  'Феликс',
  'Бегемот',
  'Матроскин',
  'Толстопуз',
  'Чучело Мяучело',
  'Шашлык',
];

var DESCRIPTIONS = [
  'Набережная Mulini Beach в Хорватии',
  'Дорожный указатель к пляжу',
  'Лучшее место для плавания',
  'Фотосессия в бикини',
  'Креативный способ подачи харчо',
  'McLaren 650S Matte Black',
  'Десерт из клубники на небольшом деревянном подносе',
  'Компот из винограда',
  'Пляж Махо острова Сен-Мартен: девушка и летящий самолёт',
  'Органайзер для хранения обуви под кроватью',
  'Пляжи Майами',
  'Audi S5 белого цвета',
  'Сашими из лосося с овощами',
  'Maago, суши-кот',
  'Угги ОБЧР со звуком',
  'Самолёт, летящий над облаками. Инверсионный след',
  'Евангельский хор Вашингтонгского Университета',
  'Классический Шевроле Импала',
  'Домашние тапочки с LED-подсветкой',
  'Пальмы перед Long Beach Hotel на Маврикии',
  'Сервированый цыпленок по-тайски',
  'Закат солнца над морем',
  'Краб',
  'На концерте Джей-Зи и Канье Уэста',
  'Сафари-парк на Бали. Джип в озере с гиппопотамами',
];

// -------------------------------------------------
// вспомогательные функции
// -------------------------------------------------
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomBoolean = function () {
  return !!(Math.round(Math.random()));
};

var getRandomArrayElement = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

// ----------------------------------------------
// создание массива моков
// ----------------------------------------------
var makeComment = function () {
  var comment = {};
  comment.avatar = 'img/avatar-' + getRandomNumber(1, AVATARS_COUNT) + '.svg';
  comment.name = getRandomArrayElement(NAMES);
  comment.message = getRandomArrayElement(MESSAGES);
  if (getRandomBoolean()) {
    comment.message = comment.message + ' ' + getRandomArrayElement(MESSAGES);
  }
  return comment;
};

var makeComments = function () {
  var comments = [];
  var commentsLength = getRandomNumber(1, MAX_COMMENTS);
  for (var i = 0; i < commentsLength; i++) {
    comments.push(makeComment());
  }
  return comments;
};

var makeMock = function (index) {
  return {
    url: 'photos/' + index + '.jpg',
    description: DESCRIPTIONS[index - 1],
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: makeComments(),
  };
};

var makeMocks = function () {
  var mocksData = [];
  for (var i = 0; i < PICS_COUNT; i++) {
    mocksData[i] = makeMock(i + 1);
  }
  return mocksData;
};

// ----------------------------------------------
// создание разметки
// ----------------------------------------------
var createPictureElement = function (mock) {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = mock.url;
  pictureElement.querySelector('.picture__img').title = mock.description;
  pictureElement.querySelector('.picture__img').alt = mock.description;
  pictureElement.querySelector('.picture__info .picture__comments').textContent = mock.comments.length;
  pictureElement.querySelector('.picture__info .picture__likes').textContent = mock.likes;

  return pictureElement;
};

// ----------------------------------------------
// отрисовка списка фотографий на странице
// ----------------------------------------------
var showPictures = function (mocks) {
  var containerElement = document.querySelector('.pictures.container');
  var fragment = document.createDocumentFragment();

  mocks.forEach(function (mock) {
    fragment.appendChild(createPictureElement(mock));
  });
  containerElement.appendChild(fragment);
};

// ----------------------------------------------
// показывает полноразмерное изображение
// ----------------------------------------------
var getCommentTemplate = function () {
  return (
    '<li class="social__comment">' +
        '<img ' +
            'class="social__picture" ' +
            'src="" ' +
            'alt="" ' +
            'width="35" height="35">' +
        '<p class="social__text"></p>' +
    '</li>'
  );
};

var createCommentElement = function (comment) {
  var templateElement = document.createElement('template');
  templateElement.innerHTML = getCommentTemplate() + '\n';

  var commentElement = templateElement.content.cloneNode(true);
  var imgElement = commentElement.querySelector('.social__picture');
  imgElement.src = comment.avatar;
  imgElement.alt = comment.name;
  imgElement.title = comment.name;

  var messageElement = commentElement.querySelector('.social__text');
  messageElement.textContent = comment.message;

  return commentElement;
};

var showCommentsList = function (comments) {
  var commentsListElement = document.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();

  comments.slice(0, COMMENTS_TO_SHOW).forEach(function (comment) {
    fragment.appendChild(createCommentElement(comment));
  });
  commentsListElement.innerHTML = '';
  commentsListElement.appendChild(fragment);
};

var showFullScreenPicture = function (mock) {
  if (!mock) {
    return; /* чтобы линтер не ругался */
  }
  var bigPictureElement = document.querySelector('.big-picture');

  var imgElement = bigPictureElement.querySelector('.big-picture__img img');
  var headerElement = bigPictureElement.querySelector('.social__header');
  var captionElement = headerElement.querySelector('.social__caption');
  var likesElement = headerElement.querySelector('.social__likes .likes-count');

  // заполняет информацию о фото в разметке
  imgElement.src = mock.url;
  captionElement.textContent = mock.description;
  likesElement.textContent = mock.likes;

  showCommentsList(mock.comments);

  // скрывает кнопку загрузки новых комментариев
  var commentsLoaderButton = bigPictureElement.querySelector('.comments-loader');
  commentsLoaderButton.classList.add('hidden');

  // скрывает блок счётчика комментариев
  var commentsCountContainerElement = bigPictureElement.querySelector('.social__comment-count');
  commentsCountContainerElement.classList.add('hidden');

  // показывает количество комментариев
  var commentsTotal = Math.min(mock.comments.length, COMMENTS_TO_SHOW);
  commentsCountContainerElement.firstChild.textContent = commentsTotal + ' из ';
  var commentsCountElement = commentsCountContainerElement.querySelector('.comments-count');
  commentsCountElement.textContent = mock.comments.length;

  document.querySelector('body').classList.add('modal-open');
  bigPictureElement.classList.remove('hidden');
};

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
  var editWindow = document.querySelector('.img-upload__overlay');

  var uploadFileName = getUploadFileName();
  if (uploadFileName.length === 0) {
    uploadFileName = DEFAULT_PHOTO;
  }
  editWindow.querySelector('.img-upload__preview img').src = uploadFileName;

  document.addEventListener('keydown', onEditWindowEscKeydown);
  editWindow.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  addEditImageProcessing();
};

var closeUploadForm = function () {
  var editWindow = document.querySelector('.img-upload__overlay');
  var uploadFileInput = document.querySelector('#upload-file');

  document.querySelector('body').classList.remove('modal-open');
  editWindow.classList.add('hidden');
  uploadFileInput.value = '';
  document.removeEventListener('keydown', onEditWindowEscKeydown);
};

var onEditWindowEscKeydown = function (evt) {
  if (evt.key === ESC_KEY) {
    closeUploadForm();
  }
};

var onResetButtonEnterKeydown = function (evt) {
  if (evt.key === ENTER_KEY) {
    closeUploadForm();
  }
};

var addUploadProcessing = function () {
  var uploadForm = document.querySelector('#upload-select-image');
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
var setSize = function (size) {
  var imageElement = document.querySelector('.img-upload__preview img');
  var sizeControls = document.querySelector('.img-upload__scale');
  var sizeIndicator = sizeControls.querySelector('.scale__control--value');

  sizeIndicator.value = size + '%';
  imageElement.style.transform = 'scale(' + size / 100 + ')';
};

var incrementSize = function () {
  var sizeControls = document.querySelector('.img-upload__scale');
  var sizeIndicator = sizeControls.querySelector('.scale__control--value');
  var size = parseInt(sizeIndicator.value, 10);

  size = size + SIZE_SCALE_INTERVAL;
  if (size > MAX_SIZE) {
    size = MAX_SIZE;
  }
  setSize(size);
};

var decrementSize = function () {
  var sizeControls = document.querySelector('.img-upload__scale');
  var sizeIndicator = sizeControls.querySelector('.scale__control--value');
  var size = parseInt(sizeIndicator.value, 10);

  size = size - SIZE_SCALE_INTERVAL;
  if (size < MIN_SIZE) {
    size = MIN_SIZE;
  }
  setSize(size);
};

var initSizeControls = function () {
  var sizeControls = document.querySelector('.img-upload__scale');
  var sizeDecControl = sizeControls.querySelector('.scale__control--smaller');
  var sizeIncControl = sizeControls.querySelector('.scale__control--bigger');

  sizeDecControl.addEventListener('click', function () {
    decrementSize();
  });
  sizeIncControl.addEventListener('click', function () {
    incrementSize();
  });

  setSize(DEFAULT_SIZE);
};

// слайдер
var getSliderLevel = function () {
  var sliderElement = document.querySelector('.effect-level');
  var sliderValue = sliderElement.querySelector('.effect-level__value');
  return sliderValue.value;
};

var setSliderLevel = function (level) {
  var sliderElement = document.querySelector('.effect-level');
  var sliderPin = sliderElement.querySelector('.effect-level__pin');
  var sliderDepth = sliderElement.querySelector('.effect-level__depth');
  var sliderValue = sliderElement.querySelector('.effect-level__value');

  sliderValue.value = level;
  sliderPin.style.left = level + '%';
  sliderDepth.style.width = level + '%';
  applyEffectLevel();
};

var showSlider = function () {
  var sliderElement = document.querySelector('.effect-level');
  sliderElement.classList.remove('hidden');
};

var hideSlider = function () {
  var sliderElement = document.querySelector('.effect-level');
  sliderElement.classList.add('hidden');
};

var resetSlider = function () {
  setSliderLevel(DEFAULT_SLIDER_LEVEL);
  var effect = getCurrentEffect();
  if (effect === 'none') {
    hideSlider();
  } else {
    showSlider();
  }
};

var onSliderMouseup = function (evt) {
  var sliderElement = document.querySelector('.effect-level');
  var sliderLine = sliderElement.querySelector('.effect-level__line');

  var sliderWidth = sliderElement.offsetWidth;
  var lineWidth = sliderLine.offsetWidth;
  var sliderMargin = (sliderWidth - lineWidth) / 2;
  var mouseX = evt.offsetX; /* mouseX coord */
  var sliderLevel = 0;

  if (mouseX > lineWidth + sliderMargin) {
    sliderLevel = 100;
  } else if (mouseX > sliderMargin) {
    sliderLevel = Math.round((mouseX - sliderMargin) / lineWidth * 100);
  }
  setSliderLevel(sliderLevel);
};

var initSlider = function () {
  var sliderElement = document.querySelector('.effect-level');
  sliderElement.addEventListener('mouseup', onSliderMouseup);
};

// эффекты
var getCurrentEffect = function () {
  var uploadForm = document.querySelector('#upload-select-image');
  var effectsRadioNodeList = uploadForm.effect;

  return effectsRadioNodeList.value;
};

var applyFilter = function (effect) {
  var imageElement = document.querySelector('.img-upload__preview img');

  imageElement.classList.forEach(function (className) {
    if (className.includes('effects__preview--')) {
      imageElement.classList.remove(className);
    }
  });
  resetSlider();
  imageElement.classList.add('effects__preview--' + effect);
};

var initFilter = function () {
  var effectsContainer = document.querySelector('.effects');

  effectsContainer.addEventListener('change', function () {
    applyFilter(getCurrentEffect());
  });
  applyFilter('none');
};

// применить фильтры и уровень слайдера к картинке
var getFilterStyleString = function (effect, effectLevel) {
  // var cssString = 'none';
  var cssString = '';

  switch (effect) {
    case ('none'):
      cssString = '';
      break;
    case ('chrome'):
      cssString = 'grayscale(' + effectLevel / 100 + ')';
      break;
    case ('sepia'):
      cssString = 'sepia(' + effectLevel / 100 + ')';
      break;
    case ('marvin'):
      cssString = 'invert(' + effectLevel + '%)';
      break;
    case ('phobos'):
      cssString = 'blur(' + (1 + 2 * effectLevel / 100) + 'px)';
      break;
    case ('heat'):
      cssString = 'brightness(' + (1 + 2 * effectLevel / 100) + ')';
      break;
  }
  return cssString;
};

var applyEffectLevel = function () {
  // применяет текушие значенияк контролов к картинке
  var imageElement = document.querySelector('.img-upload__preview img');
  var effect = getCurrentEffect();
  var level = getSliderLevel();

  imageElement.style.filter = getFilterStyleString(effect, level);
};

// окно редактирования
var addEditImageProcessing = function () {
  initSizeControls();
  initSlider();
  initFilter();
};

// ----------------------------------------------
// основная часть
// ----------------------------------------------
var mocks = makeMocks();
showPictures(mocks);
showFullScreenPicture();
addUploadProcessing();
