import React from 'react';
import { Button } from 'antd';
import Carousel from '../../components/Carousel';
import Overlay from '../../components/Overlay';
import styles from './index.less';

export default class Other extends React.Component {
  state = {
    hasError: false,
    overlayActive: false,
  }

  newError = () => {
    this.setState({ hasError: true });
  }

  openOverlay = () => {
    this.setState({ overlayActive: true });
  }

  closeOverlay = () => {
    this.setState({ overlayActive: false });
  }

  render() {
    const { hasError, overlayActive } = this.state;
    if(hasError) {
      throw new Error('随手写个错！');
    }
    return (

      <div className={styles.banner}>
        <Carousel />
        <div className={styles.errorBox}>
          <Button onClick={this.newError}>点击产生一个错误</Button>
          <Button className={styles.newModal} onClick={this.openOverlay}>点击产生一个弹框</Button>
        </div>
        {
          overlayActive && (
            <Overlay maskClosable closable onClose={this.closeOverlay}>
              <div className={styles.modalBody}>
                <h2>React16新特性之createPortal</h2>
                <p>
                  Portals机制提供了一种最直接的方式可以把一个子组件渲染到父组件渲染的DOM树之外。
                  默认情况下，React组件树和DOM树是完全对应的，因此对于一些Modal,Overlay之类的组件，
                  通常是将它们放在顶层，但逻辑上它们可能只是属于某个子组件，不利于组件的代码组织。
                  通过使用createPortal，我们可以将组件渲染到我们想要的任意DOM节点中，但该组件依然处在React的父组件之内。
                  带来的一个特性就是，在子组件产生的event依然可以被React父组件捕获，但在DOM结构中，它却不是你的父组件。
                  对于组件组织，代码切割来说，这是一个很好的属性。
                </p>
              </div>
            </Overlay>
          )
        }
      </div>
    );
  }
}
