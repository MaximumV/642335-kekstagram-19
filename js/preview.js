'use strict';

(function () {

  var COMMENTS_TO_SHOW = 5;

  var outputtedComments = 0; /* количество показанных комментариев */
  var commentsData = []; /* ссылается на все комментарии с сервера */
  var isShownAllComments = false;

  var bigPicture = document.querySelector('.big-picture');
  var commentsList = document.querySelector('.social__comments');
  var commentsLoaderButton = bigPicture.querySelector('.comments-loader');
  var commentsCountContainer = bigPicture.querySelector('.social__comment-count');

  var getCommentTemplate = function () {
    return (
      '<li class="social__comment">' +
          '<img class="social__picture" width="35" height="35">' +
          '<p class="social__text"></p>' +
      '</li>'
    );
  };

  var createCommentElement = function (commentData) {
    var template = document.createElement('template');
    template.innerHTML = getCommentTemplate() + '\n';
    var comment = template.content.cloneNode(true);

    var image = comment.querySelector('.social__picture');
    var message = comment.querySelector('.social__text');

    image.src = commentData.avatar;
    image.alt = commentData.name;
    image.title = commentData.name;
    message.textContent = commentData.message;

    return comment;
  };

  var appendComments = function (comments) {
    // показывает новую порцию комментариев в разметке
    var fragment = document.createDocumentFragment();
    comments.forEach(function (comment) {
      fragment.appendChild(createCommentElement(comment));
    });
    commentsList.appendChild(fragment);

    // обновляет количество комментариев
    outputtedComments += comments.length;
    isShownAllComments = outputtedComments < commentsData.length ? false : true;
    commentsCountContainer.firstChild.textContent = outputtedComments + ' из ';

    // нужно показывать кнопку загрузки новых комментариев?
    if (isShownAllComments) {
      commentsLoaderButton.classList.add('hidden');
    }
  };

  var showFullScreenPicture = function (pictureClicked) {
    var image = bigPicture.querySelector('.big-picture__img img');
    var header = bigPicture.querySelector('.social__header');
    var caption = header.querySelector('.social__caption');
    var likes = header.querySelector('.social__likes .likes-count');
    var cancelButton = bigPicture.querySelector('#picture-cancel');
    var newCommentInput = bigPicture.querySelector('.social__footer-text');
    var commentsCount = commentsCountContainer.querySelector('.comments-count');

    // получает номер картинки из названия файла
    var pictureFileName = pictureClicked.src.match(/\d{1,2}\.jpg$/);
    var number = parseInt(pictureFileName, 10);
    var pictureNumber = !isNaN(number) ? +number : 1;
    var pictureData = window.picturesData[pictureNumber - 1];
    commentsData = pictureData.comments;

    // заполняет информацию о фото в разметке
    image.src = pictureData.url;
    caption.textContent = pictureData.description;
    image.alt = pictureData.description;
    likes.textContent = pictureData.likes;

    // очищает список комментариев
    commentsList.innerHTML = '';
    commentsLoaderButton.classList.remove('hidden');
    commentsCount.textContent = commentsData.length;
    outputtedComments = 0;
    isShownAllComments = false;

    appendComments(commentsData.slice(0, COMMENTS_TO_SHOW));

    if (!isShownAllComments) {
      commentsLoaderButton.addEventListener('click', onCommentsLoaderButtonClick);
    }

    window.modal.show(bigPicture, cancelButton, resetFullPictureWindow);

    newCommentInput.focus();
    if (!isShownAllComments) {
      commentsLoaderButton.focus();
    }
  };

  var resetFullPictureWindow = function () {
    var newCommentInput = bigPicture.querySelector('.social__footer-text');
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
