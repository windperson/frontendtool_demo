require('./css/style.css');
require(['hash-change','./js/alert.js'], function (hashChange, yell) {
  
  hashChange.on('change', function (hash) {
    yell(hash);
  });
}); 

function sayHello(){
  var text = document.getElementById("myTxtBox").value;
  require(['./js/alert.js'], function(yell){
    yell(text);
  });
}

window.sayHello = sayHello;