import React from 'react'
import { Card } from 'antd'

export default function BaseCard({pageWapper=true, ...otherProps}) {
  const expandConfig = {};
  if (pageWapper) {
    const padding = 16;
    expandConfig.headStyle = {
      fontSize: 18,
      padding: `0 ${padding}px`
    };
    expandConfig.bodyStyle = {
      padding: `0 ${padding}px ${padding}px`,
    };
  }
  return (
    <Card {...expandConfig} {...otherProps} />
  )
}