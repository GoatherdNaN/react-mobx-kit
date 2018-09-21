import React from 'react';

export default function Fallback(props) {
  const { error, errorInfo, ...otherProps } = props;
  console.log('otherProps',otherProps);
  return [
    <h1 key='error'>Error: {error.toString()}</h1>,
    <p key='info'>Error: {errorInfo.componentStack}</p>
  ];
};
