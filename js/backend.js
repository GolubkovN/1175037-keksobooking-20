'use strict';

(function () {
  var URL = {
    GET: 'https://javascript.pages.academy/keksobooking/data'
  };
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 5000;
  var method = {
    get: 'GET',
    post: 'POST'
  };

  var createXhr = function (onSuccess, onError, type) {
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


    xhr.open(type, URL.GET);
    xhr.send();
  };

  var load = function (onSuccess, onError) {
    createXhr(onSuccess, onError, method.get);
  };

  window.backend = {
    load: load,
  };
})();
