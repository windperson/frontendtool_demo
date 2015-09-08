require('../css/style.css');
require(['hash-change', './alert'], function (hashChange, yell) {

  hashChange.on('change', function (hash) {
    yell('Hello',hash);
  });
});

function sayHello() {
  var text = document.getElementById("myTxtBox").value;
  require(['./alert.js'], function (yell) {
    yell(text);
  });
}

window.sayHello = sayHello;