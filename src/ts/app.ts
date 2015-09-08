/// <reference path="../Scripts/typings/tsd.d.ts" />

// load Angular
require('angular');

angular.element(document).ready(function () {
  angular.bootstrap(document, [appModule.name], {
    //strictDi: true
  });
});


require('../css/style.css');
require(['hash-change', './alert'], function (hashChange, yell) {

  hashChange.on('change', function (hash) {
    yell('Hello',hash);
  });
});

function sayHello() {
  var text = (<HTMLInputElement>document.getElementById("myTxtBox")).value ;
  require(['./alert'], function (yell) {
    yell(text);
  });
}

(<any>window).sayHello = sayHello;