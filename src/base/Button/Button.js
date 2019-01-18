import React from 'react'
import classNames from 'classnames'
import { Button } from 'antd'
import styles from './index.less'

export default ({
  className,
  type,
  disabled,
  children,
  ...otherProps
}) => {
  if (type === 'text') {
    return (
      <a
        {...otherProps}
        className={classNames(
          className,
          {
            [styles.disabled]: disabled
          }
        )}
      >{children}</a>
    )
  }
  return (
    <Button
      type={type}
      className={className}
      disabled={disabled}
      {...otherProps}
    >{children}</Button>
  )
}