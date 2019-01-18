export default function globalConfig(global=window) {
  // requestAnimationFrame兼容
  var lastTime = 0;
  var vendors = ["ms", "moz", "webkit", "o"];
  for (var x = 0; x < vendors.length && !global.requestAnimationFrame; ++x) {
    global.requestAnimationFrame = global[vendors[x] + "RequestAnimationFrame"];
    global.cancelAnimationFrame = global[vendors[x] + "CancelAnimationFrame"] || global[vendors[x] + "CancelRequestAnimationFrame"]
  }
  if (!global.requestAnimationFrame) {
    global.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = global.setTimeout(function () {
        callback(currTime + timeToCall)
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id
    }
  }
  if (!global.cancelAnimationFrame) {
    global.cancelAnimationFrame = function (id) {
      clearTimeout(id)
    }
  }
  // 一次性获取屏幕高度
  global._clientHeight = document.documentElement.clientHeight;
  global._clientWidth = document.documentElement.clientWidth;
};