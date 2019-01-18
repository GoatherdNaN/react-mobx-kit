import React, { PureComponent } from 'react';
import Weather from 'components/Weather'

export default class Workplace extends PureComponent {render() {
    return (
      <div style={{width: 300, background: '#eee'}}>
        <Weather />
      </div>
    )
  }
}