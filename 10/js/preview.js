'use strict';

(function () {

  var COMMENTS_TO_SHOW = 5;

  var bigPictureElement = document.querySelector('.big-picture');

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

  var showFullScreenPicture = function (pictureClicked) {
    var imgElement = bigPictureElement.querySelector('.big-picture__img img');
    var headerElement = bigPictureElement.querySelector('.social__header');
    var captionElement = headerElement.querySelector('.social__caption');
    var likesElement = headerElement.querySelector('.social__likes .likes-count');
    var cancelButton = bigPictureElement.querySelector('#picture-cancel');
    var newCommentInput = bigPictureElement.querySelector('.social__footer-text');

    // номер картинки из названия файла
    var pictureFileName = pictureClicked.src.match(/\d{1,2}\.jpg$/);
    var number = parseInt(pictureFileName, 10);
    var pictureNumber = !isNaN(number) ? +number : 1;
    var pictureData = window.picturesData[pictureNumber - 1];

    // заполняет информацию о фото в разметке
    imgElement.src = pictureData.url;
    captionElement.textContent = pictureData.description;
    imgElement.alt = pictureData.description;
    likesElement.textContent = pictureData.likes;

    showCommentsList(pictureData.comments);

    // скрывает кнопку загрузки новых комментариев
    var commentsLoaderButton = bigPictureElement.querySelector('.comments-loader');
    commentsLoaderButton.classList.add('hidden');

    // скрывает блок счётчика комментариев
    var commentsCountContainerElement = bigPictureElement.querySelector('.social__comment-count');
    commentsCountContainerElement.classList.add('hidden');

    // показывает количество комментариев
    var commentsTotal = Math.min(pictureData.comments.length, COMMENTS_TO_SHOW);
    commentsCountContainerElement.firstChild.textContent = commentsTotal + ' из ';
    var commentsCountElement = commentsCountContainerElement.querySelector('.comments-count');
    commentsCountElement.textContent = pictureData.comments.length;

    window.modal.show(bigPictureElement, cancelButton, resetFullPictureWindow);
    newCommentInput.focus();
  };

  var resetFullPictureWindow = function () {
    var newCommentInput = bigPictureElement.querySelector('.social__footer-text');
    newCommentInput.value = '';
  };

  window.preview = {
    show: showFullScreenPicture,
    reset: resetFullPictureWindow
  };

})();
