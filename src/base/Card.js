import React from 'react'
import { Card } from 'antd'
import { findRouteByPath } from '../routes'

export default function BaseCard({pageWapper=true, title, ...otherProps}) {
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
    if (!title) {
      try {
        const currentRouterInfo = findRouteByPath(location.pathname);
        title = currentRouterInfo.name;
      } catch {
        title = null;
      }
    }
  }
  return (
    <Card title={title} {...expandConfig} {...otherProps} />
  )
}