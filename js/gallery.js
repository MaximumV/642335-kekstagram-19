'use strict';

(function () {

  var miniPictureCreate = function (pictureData) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = pictureData.url;
    pictureElement.querySelector('.picture__img').title = pictureData.description;
    pictureElement.querySelector('.picture__img').alt = pictureData.description;
    pictureElement.querySelector('.picture__info .picture__comments').textContent = pictureData.comments.length;
    pictureElement.querySelector('.picture__info .picture__likes').textContent = pictureData.likes;

    return pictureElement;
  };

  var onPicturesContainerClick = function (evt) {
    // если был клик по картинке
    if (evt.target.classList.contains('picture')
    || evt.target.matches('.picture [class^="picture__"]')) {
      // элемент img
      var pictureClicked = evt.target.closest('.pictures .picture').firstElementChild;
      window.preview.show(pictureClicked);
    }
  };

  window.gallery = {
    show: function (picturesData) {
      var containerElement = document.querySelector('.pictures.container');
      var fragment = document.createDocumentFragment();

      containerElement.querySelectorAll('a.picture').forEach(function (miniPicture) {
        miniPicture.remove();
      });

      picturesData.forEach(function (pictureData) {
        fragment.appendChild(miniPictureCreate(pictureData));
      });
      containerElement.appendChild(fragment);
      containerElement.addEventListener('click', onPicturesContainerClick);
    }
  };

})();
