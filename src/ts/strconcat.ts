/// <reference path="../Scripts/typings/tsd.d.ts" />

module.exports = function (...args):string {
  var ret ="";
  for(var i = 0; i < args.length; i++) {
    ret = ret + args[i];
  }
  return ret;
};