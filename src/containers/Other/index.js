import React from 'react';
import { Button } from 'antd';
import Carousel from '../../components/Carousel';
import styles from './index.less';

export default class Other extends React.Component {
  state = {
    hasError: false,
  }

  newError = () => {
    throw new Error('随手写个错！');
  }

  render() {
    const { hasError } = this.state;
    if(hasError) {
      throw new Error('随手写个错！');
    }
    return (

      <div className={styles.banner}>
        <Carousel />
        <div className={styles.errorBox}>
          <Button onClick={this.newError}>点击产生一个错误</Button>
        </div>
      </div>
    );
  }
}
