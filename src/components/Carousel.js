import React, { Component } from 'react';
import { Carousel } from 'antd';
import styles from '../containers/Other/index.less';
import { ThemeContext } from '../containers/App';

export default class Index extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {context => {
          console.log('爷传孙context：',context);
          return (
            <Carousel autoplay>
              <div className={styles.imgBox}>
                <img src={require('assets/1.jpg')} alt="图片加载错误" />
              </div>
              <div className={styles.imgBox}>
                <img src={require('assets/2.jpg')} alt="图片加载错误" />
              </div>
              <div className={styles.imgBox}>
                <img src={require('assets/3.jpg')} alt="图片加载错误" />
              </div>
              {/* <div><h3>1</h3></div>
              <div><h3>2</h3></div>
              <div><h3>3</h3></div>
              <div><h3>4</h3></div> */}
            </Carousel>
          )
        }}
      </ThemeContext.Consumer>
    );
  }
}
