module.exports = function () {
  var ret ="";
  for(var i = 0; i < arguments.length; i++) {
    ret = ret + arguments[i];
  }
  return ret;
};