'use strict';

(function () {

  var miniPictureCreate = function (pictureData) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var picture = pictureTemplate.cloneNode(true);

    picture.querySelector('.picture__img').src = pictureData.url;
    picture.querySelector('.picture__img').title = pictureData.description;
    picture.querySelector('.picture__img').alt = pictureData.description;
    picture.querySelector('.picture__info .picture__comments').textContent = pictureData.comments.length;
    picture.querySelector('.picture__info .picture__likes').textContent = pictureData.likes;

    return picture;
  };

  var onPicturesContainerClick = function (evt) {
    // если был клик по картинке
    if (evt.target.classList.contains('picture')
    || evt.target.matches('.picture [class^="picture__"]')) {
      // находит элемент img
      var pictureClicked = evt.target.closest('.pictures .picture').firstElementChild;
      window.preview.show(pictureClicked);
    }
  };

  window.gallery = {
    show: function (picturesData) {
      var container = document.querySelector('.pictures.container');
      var fragment = document.createDocumentFragment();

      container.querySelectorAll('a.picture').forEach(function (miniPicture) {
        miniPicture.remove();
      });

      picturesData.forEach(function (pictureData) {
        fragment.appendChild(miniPictureCreate(pictureData));
      });
      container.appendChild(fragment);
      container.addEventListener('click', onPicturesContainerClick);
    }
  };

})();
