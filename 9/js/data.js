'use strict';

(function () {

  window.picturesData = [];

  window.backend.load(function onSuccessCase(response) {
    try {
      window.picturesData = Array.from(response);
      window.show(window.picturesData);
    } catch (err) {
      window.util.renderErrorMessage('Не удалось показать фото других пользователей: ' + err.message);
    }
  }, function onErrorCase(response) {
    window.util.renderErrorMessage('Не удалось загрузить фото других пользователей: ' + response);
  });
})();
