module.exports = function(prefix: string, msg: string) {
  var concat = require('./strconcat');
  if (msg == null || typeof (msg) === 'undefined') {
    msg = prefix;
    return alert(msg);
  }

  alert(concat(prefix, ' ', msg, '!!!'));
};