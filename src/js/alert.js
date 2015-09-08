module.exports = function (prefix, msg) {
  var concat = require('./strconcat');
  if (msg == null || typeof (msg) === 'undefined') {
    msg = prefix;
    return alert(msg);
  }

  alert(concat(prefix + ' ' + msg + '!'));
};