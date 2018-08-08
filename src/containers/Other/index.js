import React from 'react';
import Carousel from '../../components/Carousel';
import styles from './index.less';

export default class Other extends React.Component {
  render() {
    return (
      <div className={styles.banner}>
        <Carousel />
      </div>
    );
  }
}
