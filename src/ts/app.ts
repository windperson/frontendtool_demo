import {angularDemo} from './route';

(
  (): void => {
    
    // load Angular
    require('angular');
    require('angular-route');

    angular.module('angularDemo', ['ngRoute', require('angular-bluebird-promises')])
      .config(angularDemo.Routes.configureRoutes);

    angular.module('mwl.bluebird').run(($q, $log) => {
      $q.onPossiblyUnhandledRejection(function(err) {
        // $log.warn('Unhandled rejection', err);
      });
    });

    angular.element(document).ready(() => {
      angular.bootstrap(document.getElementById("angularContainer"), ['angularDemo']);
    });
  }
  )();

require('../css/style.css');
require(['hash-change', './alert'], function(hashChange, yell) {

  hashChange.on('change', function(hash) {
    yell('Hello', hash);
  });
});

function sayHello() {
  var text = (<HTMLInputElement>document.getElementById("myTxtBox")).value;
  require(['./alert'], function(yell) {
    yell(text);
  });
}

(<any>window).sayHello = sayHello;