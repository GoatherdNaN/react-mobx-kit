import React from 'react'
import { Card, Spin, Button } from 'antd'

export default function SpinWrapper({
  initFormLoading=false,
  confirmLoading=false,
  isCheck=false,
  ...otherProps
}) {
  return (
    <Card>
      <h2>{otherProps.title}</h2>
      <Spin spinning={initFormLoading} tip="Loading..." size="large">
        <div style={{ padding: '20px 0' }}>{otherProps.children}</div>
      </Spin>
      <div>
        <Button name="back" onClick={otherProps.onBack}>
          返回
        </Button>
        {
          !isCheck && (
            <Button 
              name="sure" 
              type="primary" 
              loading={initFormLoading || confirmLoading}
              onClick={otherProps.onSure}
              style={{ marginLeft: 20 }}
            >
              确定
            </Button>
          )
        }
      </div>
    </Card>
  )
}