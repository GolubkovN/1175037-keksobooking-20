'use strict';

(function () {
  var TIMEOUT_IN_MS = 5000;
  var StatusCode = {
    OK: 200
  };
  var Method = {
    get: 'GET',
    post: 'POST'
  };

  var createXhr = function (onSuccess, onError, type, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(type, url);
    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    createXhr(onSuccess, onError, Method.get, 'https://javascript.pages.academy/keksobooking/data');
  };

  var upload = function (data, onSuccess, onError) {
    createXhr(onSuccess, onError, Method.post, 'https://javascript.pages.academy/keksobooking', data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
