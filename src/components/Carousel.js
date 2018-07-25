import React, { Component } from 'react';
import { Carousel } from 'antd';
import styles from '../containers/Other/index.less';

export default class Index extends Component {
  handleChange = (...rest) => {
    console.info('rest',rest);
  }
  render() {
    return (
      <Carousel autoplay afterChange={this.handleChange}>
        <div className={styles.imgBox}>
          <img src={require('assets/1.jpg')}/>
        </div>
        <div className={styles.imgBox}>
          <img src={require('assets/2.jpg')}/>
        </div>
        <div className={styles.imgBox}>
          <img src={require('assets/3.jpg')}/>
        </div>
        {/* <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div> */}
      </Carousel>
    )
  }
}
