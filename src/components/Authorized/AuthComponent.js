/*
 * @Author: Edlan
 * @Date: 2019-01-16 09:17:27
 * @Description: 权限组件
 */
import React from 'react'
import { message } from 'antd'
import { inject, observer } from 'mobx-react'

// extraProps用来扩展无权限时的特殊处理情况，如：删除按钮的确认框，在无权时不弹出
export default (Component, extraProps={}) => inject("loginStore")(observer(
  ({ loginStore: { authArr }, code, hasAuth, noMatch, ...props }) => {
    let isPass = true;
    if (
      (code && !authArr.includes(code)) ||  // code传了，是否有权直接通过code判断
      (!code && hasAuth === undefined)      // code和hasAuth都没传, 无权
    ) {
      isPass = false;
    }

    !hasAuth && typeof noMatch === 'function' && console.log('////////',noMatch);
    if (
      (code && isPass && hasAuth) ||
      (hasAuth && typeof noMatch !== 'function')
    ) {
      return <Component {...props} />
    }
    else if (isPass && !hasAuth && typeof noMatch === 'function') {
      return <Component {...props} {...extraProps} onClick={noMatch} />
    }
    else {
      // return null
      return <Component {...props} {...extraProps} onClick={() => message.info('没有相关权限!')} />
    }
  }
));
