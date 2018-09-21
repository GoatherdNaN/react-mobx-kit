import React from 'react';
import { Button } from 'antd';
import Carousel from '../../components/Carousel';
import withWrapError from '../../components/ErrorHandle';
import styles from './index.less';

@withWrapError
export default class Other extends React.Component {
  newError = () => {
    throw new Error('随手写个错！');
  }

  render() {
    return (
      <div className={styles.banner}>
        <Carousel />
        <Button onClick={this.newError}>点击产生一个错误</Button>
      </div>
    );
  }
}
