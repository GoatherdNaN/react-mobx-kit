import React from 'React'
import { Spin } from 'antd';
export default function LoadingComponent({ error }) {
  return <div style={{ height: '100%', textAligh: 'center' }}>
    { ! error
      ? <Spin size="large" />
      : 'Error!'
    }
  </div>;
}
