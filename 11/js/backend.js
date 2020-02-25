'use strict';

(function () {

  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  var URL_POST = 'https://js.dump.academy/kekstagram';
  var TIMEOUT = 5000; /* 5sec */

  var codeToMessage = {
    '400': 'синтаксическая ошибка',
    '401': 'требуется аутентификация',
    '403': 'ограничение доступа',
    '404': 'страница не найдена',
    '500': 'внутренняя ошибка сервера',
    '502': 'сервер получил ошибку от прокси',
    '503': 'сервер временно недоступен'
  };

  var setupXMLHttpRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа ' + xhr.status + ' - ' + codeToMessage[xhr.status]);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = setupXMLHttpRequest(onLoad, onError);
      xhr.timeout = TIMEOUT;
      xhr.open('GET', URL_GET);
      xhr.send();
    },

    send: function (data, onLoad, onError) {
      var xhr = setupXMLHttpRequest(onLoad, onError);
      xhr.timeout = TIMEOUT;
      xhr.open('POST', URL_POST);
      xhr.send(data);
    }
  };

})();
