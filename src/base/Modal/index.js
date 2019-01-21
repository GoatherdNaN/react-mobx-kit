import React from 'react'
import { Modal, Button } from 'antd'
import styles from './index.less'

export default function BaseModal({
  isCheck,
  children,
  ...otherProps }) {
  const extraProps = {};
  // 查看是底部按钮组只显示关闭
  if (isCheck) {
    extraProps.footer = [
      <Button key="close" name="close" onClick={otherProps.onCancel}>
        关闭
      </Button>
    ]
  }
  return (
    <Modal
      width={800}
      maskClosable={false}
      maskStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
      }}
      {...otherProps}
      {...extraProps}
    >
      {children}
    </Modal>
  )
}