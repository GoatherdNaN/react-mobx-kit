/**
 * 弹出框组件
 * @params:
 * width: 宽度, 
 * closable：是否显示右上角叉叉, 
 * maskClosable：点击蒙层是否允许关闭, 
 * onClose：关闭的回调, 
 * children【node】：modal的body
 */
import React from 'react';
import Layer from './Layer';
import styles from './index.less';

const Overlay = ({width, closable, maskClosable, onClose, children}) => (
  <Layer>
    <div onClick={maskClosable ? onClose : () => false} className={styles.overlayWrap}>
      <div width={width || 1200} className={styles.overlay}>
        {
          !!closable && (
            <span
              className={styles.overlayClose}
              onClick={onClose}
            >&times;</span>
          )
        }
        { children }
      </div>
    </div>
  </Layer>
)
export default Overlay;
