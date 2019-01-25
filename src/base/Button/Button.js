import React from 'react'
import classNames from 'classnames'
import { Button } from 'antd'
import styles from './index.less'

const antdBtnTypes = ['default', 'primary', 'ghost', 'dashed', 'danger'];
const privateTypes = ['success', 'info', 'warning', 'dangerous']; // 扩展的type


export default ({
  type,
  className,
  disabled,
  children,
  ...otherProps
}) => {
  // 扩展之：文字按钮
  if (type === 'text') {
    const textCls = classNames(className, {
      [styles.textDisabled]: disabled
    });
    return <a className={textCls} {...otherProps}>{ children }</a>
  }
  // 扩展之：颜色按钮
  if (!antdBtnTypes.includes(type) && privateTypes.includes(type)) {
    const cls = classNames(className, styles.privateType, styles[type], {
      [styles.disabled]: disabled
    });
    return (
      <Button
        className={cls}
        disabled={disabled}
        {...otherProps}
      >{children}</Button>
    )
  }
  return (
    <Button
      {...type ? { type } : {}}
      className={className}
      disabled={disabled}
      {...otherProps}
    >{children}</Button>
  )
}