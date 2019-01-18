import React from 'react';
import { Spin } from 'antd';

const fullPageStyle = {
  position: 'fixed',
  top: 72,
  left: 0,
  right: 0,
  bottom: 0,
};
const localPageStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
};

export default function LoadingComponent({ isGlobal = true, error }) {
  return (
    <div style={isGlobal ? fullPageStyle :localPageStyle}>
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
