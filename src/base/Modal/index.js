import React from 'react'
import { Modal } from 'antd'
import Button from '../Button/Button'
import { OPERATE_ITEM } from 'constants/config'
import styles from './index.less'

export default function BaseModal({
  onOk,
  mode,
  confirmLoading,
  onCancel,
  continuity,
  children,
  ...otherProps }) {
  const extraProps = {
    title: OPERATE_ITEM[mode].title,
    onCancel,
  };

  if (mode === OPERATE_ITEM.add.code) {
    extraProps.footer = [
      <Button key="cancel" name="close" onClick={onCancel}>
        取消
      </Button>,
      <Button
        type="primary"
        key="sure"
        name="sure"
        onClick={onOk}
        loading={confirmLoading}
      >
        添加
      </Button>
    ];
    if (continuity) {
      extraProps.footer.push(
        <Button
          type="primary"
          key="continuityAdd"
          name="continuityAdd"
          loading={confirmLoading}
          onClick={() => onOk(true)}
        >
          连续添加
        </Button>
      )
    }
  }
  // 查看是底部按钮组只显示关闭
  else if (mode === OPERATE_ITEM.check.code) {
    extraProps.footer = [
      <Button key="close" name="close" onClick={onCancel}>
        关闭
      </Button>
    ]
  } else {
    extraProps.onOk = onOk;
    extraProps.onCancel = onCancel;
    extraProps.confirmLoading = confirmLoading;
  }
  return (
    <Modal
      width={800}
      maskClosable={false}
      maskStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
      }}
      {...extraProps}
      {...otherProps}
    >
      {children}
    </Modal>
  )
}