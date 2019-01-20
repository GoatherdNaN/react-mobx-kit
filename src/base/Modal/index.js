import React from 'react'
import { Modal } from 'antd'
import styles from './index.less'

export default function BaseModal({
  children,
  ...otherProps}) {
  return (
    <Modal
      width={800}
      maskClosable={false}
      maskStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
      }}
      {...otherProps}
    >
      {children}
    </Modal>
  )
}