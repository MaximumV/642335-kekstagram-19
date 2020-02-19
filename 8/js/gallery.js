'use strict';

(function () {

  window.show = function (picturesData) {
    var containerElement = document.querySelector('.pictures.container');
    var fragment = document.createDocumentFragment();

    picturesData.forEach(function (pictureData) {
      fragment.appendChild(window.miniPictureCreate(pictureData));
    });
    containerElement.appendChild(fragment);
    containerElement.addEventListener('click', onPicturesContainerClick);
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
})();
