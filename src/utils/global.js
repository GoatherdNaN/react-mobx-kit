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

  // warning
  global.warning = function (message) {
    /* eslint-disable no-console */
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(message)
    }
    /* eslint-enable no-console */
    try {
      // This error was thrown as a convenience so that if you enable
      // "break on all exceptions" in your console,
      // it would pause the execution at this line.
      throw new Error(message)
    } catch (e) {} // eslint-disable-line no-empty
  }
};