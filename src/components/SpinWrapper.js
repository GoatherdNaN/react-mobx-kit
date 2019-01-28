import React from 'react'
import { Spin } from 'antd'
import { Card, Button } from 'base'
import { OPERATE_ITEM } from 'constants/config'

export default function SpinWrapper({
  onOk,
  mode,
  title,
  footer,
  onCancel,
  continuity,
  confirmLoading,
  initFormLoading=false,
  ...otherProps
}) {
  const formTitle = title || (mode ? OPERATE_ITEM[mode].title : '');

  const isAdd = mode === OPERATE_ITEM.add.code;
  const isUpdate = mode === OPERATE_ITEM.update.code;
  const isCheck = mode === OPERATE_ITEM.check.code;

  initFormLoading = isAdd ? false : initFormLoading

  if (!footer) {
    if (isAdd || isUpdate) {
      footer = [
        <Button key="back" name="back" onClick={onCancel}>
          返回
        </Button>,
        <Button
          type="primary"
          key="sure"
          name="sure"
          onClick={onOk}
          loading={confirmLoading}
        >
          {isAdd ? '添加' : '确定'}
        </Button>
      ];
      if (isAdd && continuity) {
        footer.push(
          <Button
            type="info"
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
    else if (isCheck) {
      footer = [
        <Button key="back" name="back" onClick={onCancel}>
          返回
      </Button>
      ]
    }
  }

  return (
    <Card {...otherProps}>
      {
        !!formTitle && (
          <h2 style={{ margin: '20px 0', paddingLeft: 14 }}>{formTitle}</h2>
        )
      }
      <Spin spinning={initFormLoading} tip="Loading..." size="large">
        <div style={{ padding: '20px 0' }}>{otherProps.children}</div>
      </Spin>
      <div className="buttonGroupRight">
        {footer}
      </div>
    </Card>
  )
}