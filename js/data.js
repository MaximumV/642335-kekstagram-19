'use strict';

(function () {

  window.picturesData = [];

  window.backend.load(function (response) {
    try {
      window.picturesData = Array.from(response);
      window.filter.init();
      window.gallery.show(window.picturesData);
    } catch (err) {
      window.message.renderErrorLine('Не удалось показать фото других пользователей: ' + err.message);
    }
  }, function (response) {
    window.message.renderErrorLine('Не удалось загрузить фото других пользователей: ' + response);
  });
})();
