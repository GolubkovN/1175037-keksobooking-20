'use strict';

(function () {
// Функция создания массива
  var generateMock = function (count) {
    var arr = [];
    for (var i = 0; i < count; i++) {
      arr.push(window.data.generateData(i));
    }
    return arr;
  };
  var arrObject = generateMock(8);

  window.mock = {
    arrObject: arrObject
  };
})();
