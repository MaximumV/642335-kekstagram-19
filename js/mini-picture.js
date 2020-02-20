'use strict';

(function () {

  window.miniPictureCreate = function (pictureData) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = pictureData.url;
    pictureElement.querySelector('.picture__img').title = pictureData.description;
    pictureElement.querySelector('.picture__img').alt = pictureData.description;
    pictureElement.querySelector('.picture__info .picture__comments').textContent = pictureData.comments.length;
    pictureElement.querySelector('.picture__info .picture__likes').textContent = pictureData.likes;

    return pictureElement;
  };

})();
