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
    // 没权限处理
    if (!isPass) {
      // return null
      return <Component {...props} {...extraProps} onClick={() => message.info('没有相关权限!')} />
    }
    // 已经有权限，需要逻辑劫持
    if (!hasAuth && typeof noMatch === 'function') {
      return <Component {...props} {...extraProps} onClick={noMatch} />
    }
    // 一路通畅的
    return <Component {...props} />
  }
));
