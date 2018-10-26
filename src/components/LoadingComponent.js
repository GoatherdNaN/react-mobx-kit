import React from 'react';
import { Spin } from 'antd';

const style = {
  position: 'fixed',
  top: 72,
  left: 0,
  right: 0,
  bottom: 0,
}

export default function LoadingComponent({ error }) {
  return (
    <div style={style}>
      {!error ? (
        <Spin
          size="large"
          style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }} />
      ) : 'Error!'}
    </div>
  );
}
