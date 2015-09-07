module.exports = function (msg) {
  var concat = require('./strconcat');
  alert(concat('Hello ' + msg + '!'));
};