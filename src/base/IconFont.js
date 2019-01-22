import React from 'react'
import { Icon } from 'antd';


export default function IconFont({ type, ...extraCommonProps }) {
  const MyIconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_885479_ff8l2kx6jyk.js',
    extraCommonProps
  });
  return <MyIconFont type={type} />
};
