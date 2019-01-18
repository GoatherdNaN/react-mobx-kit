import React from 'react'
import { Icon } from 'antd';


export default function IconFont({ type, ...extraCommonProps }) {
  const MyIconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_885479_ynu5saom6oa.js',
    extraCommonProps
  });
  return <MyIconFont type={type} />
};
