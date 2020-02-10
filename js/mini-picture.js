'use strict';

(function () {

  window.miniPictureCreate = function (mock) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = mock.url;
    pictureElement.querySelector('.picture__img').title = mock.description;
    pictureElement.querySelector('.picture__img').alt = mock.description;
    pictureElement.querySelector('.picture__info .picture__comments').textContent = mock.comments.length;
    pictureElement.querySelector('.picture__info .picture__likes').textContent = mock.likes;

    return pictureElement;
  };

})();
