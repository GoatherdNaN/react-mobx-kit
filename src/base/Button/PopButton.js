import React from 'react'
import { Popconfirm } from 'antd'
import Button from './Button'

const defaultProps = {
  confirmProps: {
    placement: 'topRight',
    title: '确定删除吗？',
    okText: '删除',
    cancelText: '取消'
  },
}

export default ({
  confirmProps,
  children,
  stopPop=false,
  ...otherProps
}) => {
  return !stopPop ? (
    <Popconfirm {...{...defaultProps.confirmProps,...confirmProps}}>
      <Button {...otherProps}>{children}</Button>
    </Popconfirm>
  ) : (
    <Button {...otherProps}>{children}</Button>
  )
}