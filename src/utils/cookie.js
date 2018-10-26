/*
 * @Author: Edlan
 * @Date: 2018-10-22 16:05:23
 * @Description: cookie封装
 */
import {
  COOKIE_EXPIRE,
} from 'constants/config'

// 加密字符串
const compileStr = code => {
  let c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return c
}
// 解密字符串
function uncompileStr(code) {
  code = unescape(code);
  let c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}

class Cookie {
  setCookie(name, value, expireTime) {
    const Days = expireTime || COOKIE_EXPIRE;
    const exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    const expires = `expires=${  exp.toUTCString()}`;
    document.cookie = `${name  }=${  compileStr(value)  }; ${  expires}`;
  }

  getCookie(name) {
    name += '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) != -1) {
        return uncompileStr(c.substring(name.length, c.length));
      }
    }
    return '';
  }

  delCookie(name) {
    this.setCookie(name, '', -1);
  }
}

export default new Cookie();