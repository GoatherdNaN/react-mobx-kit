/**
 * @desc:错误边界的回调
 * React新特性：render方法新增返回类型：
 * 在React 16中，render方法支持直接返回string，number，boolean，null，portal，以及fragments(带有key属性的数组)
 */
import React from 'react';

export default function Fallback(props) {
  const { error, errorInfo, ...otherProps } = props;
  console.log('otherProps',otherProps);
  return [
    <h1 key='error'>Error: {error.toString()}</h1>,
    <p key='info'>Error: {errorInfo.componentStack}</p>
  ];
};
