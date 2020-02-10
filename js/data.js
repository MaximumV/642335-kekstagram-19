'use strict';

(function () {

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

  var PICS_COUNT = 25;
  var AVATARS_COUNT = 6;
  var MAX_COMMENTS = 8;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;

  var makeComment = function () {
    var comment = {};
    comment.avatar = 'img/avatar-' + window.random.getNumber(1, AVATARS_COUNT) + '.svg';
    comment.name = window.random.getArrayElement(NAMES);
    comment.message = window.random.getArrayElement(MESSAGES);
    if (window.random.getBoolean()) {
      comment.message = comment.message + ' ' + window.random.getArrayElement(MESSAGES);
    }
    return comment;
  };

  var makeComments = function () {
    var comments = [];
    var commentsLength = window.random.getNumber(1, MAX_COMMENTS);
    for (var i = 0; i < commentsLength; i++) {
      comments.push(makeComment());
    }
    return comments;
  };

  var makeMock = function (index) {
    return {
      url: 'photos/' + index + '.jpg',
      description: DESCRIPTIONS[index - 1],
      likes: window.random.getNumber(MIN_LIKES, MAX_LIKES),
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


  window.mocks = makeMocks();
})();
