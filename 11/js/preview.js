'use strict';

(function () {

  var COMMENTS_TO_SHOW = 5;

  var outputtedComments = 0; /* количество показанных комментариев */
  var commentsData = []; /* ссылается на все комментарии с сервера */
  var isShownAllComments = false;

  var bigPictureElement = document.querySelector('.big-picture');
  var commentsListElement = document.querySelector('.social__comments');
  var commentsLoaderButton = bigPictureElement.querySelector('.comments-loader');
  var commentsCountContainerElement = bigPictureElement.querySelector('.social__comment-count');

  var getCommentTemplate = function () {
    return (
      '<li class="social__comment">' +
          '<img class="social__picture" width="35" height="35">' +
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

  var appendComments = function (comments) {
    // показывает новую порцию комментариев в разметке
    var fragment = document.createDocumentFragment();
    comments.forEach(function (comment) {
      fragment.appendChild(createCommentElement(comment));
    });
    commentsListElement.appendChild(fragment);

    // обновляет количество комментариев
    outputtedComments += comments.length;
    isShownAllComments = outputtedComments < commentsData.length ? false : true;
    commentsCountContainerElement.firstChild.textContent = outputtedComments + ' из ';

    // нужно показывать кнопку загрузки новых комментариев?
    if (isShownAllComments) {
      commentsLoaderButton.classList.add('hidden');
    }
  };

  var showFullScreenPicture = function (pictureClicked) {
    var imgElement = bigPictureElement.querySelector('.big-picture__img img');
    var headerElement = bigPictureElement.querySelector('.social__header');
    var captionElement = headerElement.querySelector('.social__caption');
    var likesElement = headerElement.querySelector('.social__likes .likes-count');
    var cancelButton = bigPictureElement.querySelector('#picture-cancel');
    var newCommentInput = bigPictureElement.querySelector('.social__footer-text');
    var commentsCountElement = commentsCountContainerElement.querySelector('.comments-count');

    // получает номер картинки из названия файла
    var pictureFileName = pictureClicked.src.match(/\d{1,2}\.jpg$/);
    var number = parseInt(pictureFileName, 10);
    var pictureNumber = !isNaN(number) ? +number : 1;
    var pictureData = window.picturesData[pictureNumber - 1];
    commentsData = pictureData.comments;

    // заполняет информацию о фото в разметке
    imgElement.src = pictureData.url;
    captionElement.textContent = pictureData.description;
    imgElement.alt = pictureData.description;
    likesElement.textContent = pictureData.likes;

    // очищает список комментариев
    commentsListElement.innerHTML = '';
    commentsLoaderButton.classList.remove('hidden');
    commentsCountElement.textContent = commentsData.length;
    outputtedComments = 0;
    isShownAllComments = false;

    appendComments(commentsData.slice(0, COMMENTS_TO_SHOW));

    if (!isShownAllComments) {
      commentsLoaderButton.addEventListener('click', onCommentsLoaderButtonClick);
    }

    window.modal.show(bigPictureElement, cancelButton, resetFullPictureWindow);

    newCommentInput.focus();
    if (!isShownAllComments) {
      commentsLoaderButton.focus();
    }
  };

  var resetFullPictureWindow = function () {
    var newCommentInput = bigPictureElement.querySelector('.social__footer-text');
    newCommentInput.value = '';
    commentsLoaderButton.removeEventListener('click', onCommentsLoaderButtonClick);
  };

  var onCommentsLoaderButtonClick = function () {
    appendComments(commentsData.slice(outputtedComments, outputtedComments + COMMENTS_TO_SHOW));
  };

  window.preview = {
    show: showFullScreenPicture,
    reset: resetFullPictureWindow
  };

})();
